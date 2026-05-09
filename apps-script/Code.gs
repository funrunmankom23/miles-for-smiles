// ============================================================
// Miles for Smiles 2026 — Google Apps Script Backend
// ============================================================
// Setup:
//  1. Go to script.google.com and create a new project.
//  2. Replace getActiveSpreadsheet() with
//     SpreadsheetApp.openById("YOUR_SHEET_ID") if standalone.
//  3. Run setupSheet() once to initialise headers.
//  4. Deploy → New deployment → Web app:
//       Execute as  : Me
//       Who has access: Anyone
//  5. Copy the /exec URL into your env:
//       APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
//
// Data flow:
//   POST (no action)    → registerParticipant → append row
//   POST action=uploadProof → save image to Drive, update row
//   GET                 → getSlotsData (keyed by ticket ID)
// ==============================================================

var SHEET_REGISTRATIONS = "Registrations";
var SHEET_CONFIG        = "Config";
var TOTAL_SLOTS         = 500;
var DRIVE_FOLDER_NAME   = "MFS2026_PaymentProofs";

// ---- POST dispatcher -------------------------------------------
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === "uploadProof") {
      return jsonResponse(uploadPaymentProof(data));
    }
    return jsonResponse(registerParticipant(data));
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  } finally {
    lock.releaseLock();
  }
}

// ---- GET: slot counts (keyed by ticket ID) ---------------------
function doGet() {
  try {
    return jsonResponse(getSlotsData());
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ---- Registration ----------------------------------------------
function registerParticipant(data) {
  Logger.log("registerParticipant: orderId=" + data.orderId + " email=" + data.email);
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var regSh = ss.getSheetByName(SHEET_REGISTRATIONS);

  var usedSlots = Math.max(regSh.getLastRow() - 1, 0);
  var remaining = TOTAL_SLOTS - usedSlots;

  if (remaining <= 0) {
    return { success: false, error: "Maaf, slot sudah penuh." };
  }

  // Duplicate email guard (email is column D = 4)
  if (usedSlots > 0) {
    var emails = regSh.getRange(2, 4, usedSlots, 1).getValues().flat();
    if (emails.indexOf(data.email) !== -1) {
      return { success: false, error: "Email ini sudah terdaftar." };
    }
  }

  // Duplicate orderId guard
  if (usedSlots > 0) {
    var orderIds = regSh.getRange(2, 2, usedSlots, 1).getValues().flat();
    if (orderIds.indexOf(data.orderId) !== -1) {
      return { success: false, error: "Order ini sudah diproses." };
    }
  }

  var kategori = ((data.ticketDistance || "") + " " + (data.ticketName || "")).trim() || "5K Fun Run";

  // Timestamp in GMT+7 (WIB) — formatDate handles the conversion from UTC
  var timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

  // Normalize phone: replace leading 0 with +62
  var phone = (data.phone || "").replace(/^0/, "+62");

  regSh.appendRow([
    timestamp,                             // A: Timestamp (WIB)
    data.orderId          || "",           // B: Order ID
    data.fullName         || "",           // C: Nama Lengkap
    data.email            || "",           // D: Email
    phone,                                 // E: Telepon
    data.shirtSize        || "",           // F: Ukuran Baju
    data.emergencyContact || "",                                       // G: Kontak Darurat
    (data.emergencyPhone || "").replace(/^0/, "+62") || "-",          // H: Telepon Darurat
    data.healthNotes      || "-",          // I: Riwayat Kesehatan
    kategori,                              // J: Kategori
    data.totalPrice       || "",           // K: Total Harga
    "Pending Payment",                     // L: Status
    "",                                    // M: Payment Proof URL
    "",                                    // N: Proof Uploaded At
    "",                                    // O: Notes
  ]);

  return {
    success: true,
    orderId: data.orderId,
    slotsRemaining: remaining - 1,
    message: "Pendaftaran berhasil!",
  };
}

// ---- Upload proof image ----------------------------------------
function uploadPaymentProof(data) {
  var orderId    = data.orderId;
  var base64     = data.proofBase64;
  var mimeType   = data.mimeType || "image/jpeg";
  var ext        = (data.fileName || "jpg").split(".").pop() || "jpg";
  var fileName   = orderId + "." + ext;

  if (!orderId || !base64) {
    return { success: false, error: "Data tidak lengkap." };
  }

  Logger.log("uploadPaymentProof: orderId=" + orderId + " mimeType=" + mimeType + " size=" + base64.length);

  // Save image to Google Drive
  var bytes  = Utilities.base64Decode(base64);
  var blob   = Utilities.newBlob(bytes, mimeType, fileName);

  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  var folder  = folders.hasNext() ? folders.next() : DriveApp.createFolder(DRIVE_FOLDER_NAME);
  var file    = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var fileUrl = file.getUrl();

  // Find the row for this orderId and update it
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var regSh = ss.getSheetByName(SHEET_REGISTRATIONS);
  var lastRow = regSh.getLastRow();

  if (lastRow < 2) {
    return { success: false, error: "Order tidak ditemukan." };
  }

  var orderIds = regSh.getRange(2, 2, lastRow - 1, 1).getValues().flat();
  var rowIndex = orderIds.indexOf(orderId);

  if (rowIndex === -1) {
    return { success: false, error: "Order tidak ditemukan." };
  }

  var row = rowIndex + 2; // +1 header, +1 for 1-based index
  var uploadedAt = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
  regSh.getRange(row, 13).setValue(fileUrl);             // M: Payment Proof URL
  regSh.getRange(row, 12).setValue("Payment Uploaded");  // L: Status
  regSh.getRange(row, 14).setValue(uploadedAt);          // N: Proof Uploaded At (WIB)

  return { success: true, proofUrl: fileUrl };
}

// ---- Slot data (keyed by ticket ID for client) -----------------
function getSlotsData() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var regSh = ss.getSheetByName(SHEET_REGISTRATIONS);
  var used  = Math.max(regSh.getLastRow() - 1, 0);
  var remaining = Math.max(TOTAL_SLOTS - used, 0);

  // Return keyed by ticket ID — matches client expectation:
  // data['fun5k'].quota / data['fun5k'].remaining
  return {
    fun5k: {
      quota: TOTAL_SLOTS,
      remaining: remaining,
    },
  };
}

// ---- One-time sheet setup -------------------------------------
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var regSh = ss.getSheetByName(SHEET_REGISTRATIONS);
  if (!regSh) regSh = ss.insertSheet(SHEET_REGISTRATIONS);

  if (regSh.getLastRow() === 0) {
    var headers = [
      "Timestamp",          // A
      "Order ID",           // B
      "Nama Lengkap",       // C
      "Email",              // D
      "Telepon",            // E
      "Ukuran Baju",        // F
      "Kontak Darurat",     // G
      "Telepon Darurat",    // H
      "Riwayat Kesehatan",  // I
      "Kategori",           // J
      "Total Harga",        // K
      "Status",             // L
      "Payment Proof URL",  // M
      "Proof Uploaded At",  // N
      "Notes",              // O
    ];
    regSh.appendRow(headers);
    var hr = regSh.getRange(1, 1, 1, headers.length);
    hr.setBackground("#1268A1").setFontColor("#FFFFFF").setFontWeight("bold").setHorizontalAlignment("center");
    regSh.setFrozenRows(1);
    regSh.setColumnWidth(1, 160);  // Timestamp
    regSh.setColumnWidth(2, 150);  // Order ID
    regSh.setColumnWidth(3, 180);  // Nama Lengkap
    regSh.setColumnWidth(4, 200);  // Email
    regSh.setColumnWidth(13, 300); // Payment Proof URL
  }

  var cfgSh = ss.getSheetByName(SHEET_CONFIG);
  if (!cfgSh) cfgSh = ss.insertSheet(SHEET_CONFIG);
  if (cfgSh.getLastRow() === 0) {
    cfgSh.appendRow(["Key", "Value", "Description"]);
    cfgSh.appendRow(["total_slots",     TOTAL_SLOTS,                    "Total quota pendaftaran"]);
    cfgSh.appendRow(["event_name",      "Miles for Smiles 2026",        "Nama event"]);
    cfgSh.appendRow(["ticket_price_5k", 140000,                         "Harga tiket 5K Fun Run (IDR)"]);
    cfgSh.appendRow(["event_date",      "2026-06-07",                   "Tanggal event (YYYY-MM-DD)"]);
    cfgSh.appendRow(["event_location",  "Universitas Andalas, Padang",  "Lokasi event"]);
    cfgSh.appendRow(["contact_wa",      "0812-7089-3558",               "WhatsApp panitia"]);
    cfgSh.appendRow(["contact_email",   "funrunmankom23@gmail.com",     "Email panitia"]);
  }

  SpreadsheetApp.flush();
  Logger.log("Sheet setup done.");
}

// ---- Utility ---------------------------------------------------
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
