"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import type { TicketType } from "@/app/page"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  onCloseWithoutProof: () => void
  onError: (message: string) => void
  ticket: TicketType | null
}

interface FormData {
  namaLengkap: string
  email: string
  telepon: string
  ukuranBaju: string
  kontakDarurat: string
  teleponDarurat: string
  riwayatKesehatan: string
  persetujuan: boolean
}

interface FormErrors {
  [key: string]: string
}

type ModalStep = 'form' | 'payment' | 'success'

const UKURAN_BAJU = ["S", "M", "L", "XL", "XXL", "XXXL"]

const EMPTY_FORM: FormData = {
  namaLengkap: "",
  email: "",
  telepon: "",
  ukuranBaju: "",
  kontakDarurat: "",
  teleponDarurat: "",
  riwayatKesehatan: "",
  persetujuan: false,
}

export function RegistrationModal({ isOpen, onClose, onCloseWithoutProof, onError, ticket }: RegistrationModalProps) {
  const [orderId, setOrderId] = useState(() => 'MFS-' + Math.random().toString(36).substring(2, 8).toUpperCase())
  const [step, setStep] = useState<ModalStep>('form')
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Payment proof
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [proofPreview, setProofPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)


  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!formData.namaLengkap.trim()) e.namaLengkap = "Nama lengkap wajib diisi"
    if (!formData.email.trim()) e.email = "Email wajib diisi"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Format email tidak valid"
    if (!formData.telepon.trim()) e.telepon = "Nomor telepon wajib diisi"
    else if (!/^[0-9]{10,13}$/.test(formData.telepon.replace(/[-\s]/g, ""))) e.telepon = "Nomor telepon harus 10-13 digit"
    if (!formData.ukuranBaju) e.ukuranBaju = "Ukuran baju wajib dipilih"
    if (!formData.kontakDarurat.trim()) e.kontakDarurat = "Nama kontak darurat wajib diisi"
    if (!formData.persetujuan) e.persetujuan = "Anda harus menyetujui syarat dan ketentuan"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          fullName: formData.namaLengkap,
          email: formData.email,
          phone: formData.telepon,
          shirtSize: formData.ukuranBaju,
          emergencyContact: formData.kontakDarurat,
          emergencyPhone: formData.teleponDarurat,
          healthNotes: formData.riwayatKesehatan,
          ticketId: ticket?.id,
          ticketName: ticket?.name,
          ticketDistance: ticket?.distance,
          totalPrice: ticket ? `Rp ${ticket.price.toLocaleString('id-ID')}` : '-',
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) { onError(data.error ?? 'Pendaftaran gagal. Silakan coba lagi.'); return }
      setStep('payment')
    } catch {
      onError('Koneksi gagal. Periksa internet dan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setProofFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setProofPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleUploadProof = async () => {
    if (!proofFile) return
    setIsUploading(true)
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve((reader.result as string).split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(proofFile)
      })

      const res = await fetch('/api/upload-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          proofBase64: base64,
          fileName: proofFile.name,
          mimeType: proofFile.type || 'image/jpeg',
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) { onError(data.error ?? 'Upload gagal. Coba lagi.'); return }
      setStep('success')
    } catch {
      onError('Upload gagal. Periksa internet dan coba lagi.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    if (isSubmitting || isUploading) return
    if (step === 'payment' && !proofFile) {
      onCloseWithoutProof()
    }
    setStep('form')
    setFormData(EMPTY_FORM)
    setErrors({})
    setProofFile(null)
    setProofPreview(null)
    setOrderId('MFS-' + Math.random().toString(36).substring(2, 8).toUpperCase())
    onClose()
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }))
  }

  if (!isOpen) return null

  const totalPrice = ticket ? `Rp ${ticket.price.toLocaleString('id-ID')}` : 'Rp 130.000'

  const headerTitle =
    step === 'form' ? 'Formulir Pendaftaran' :
    step === 'payment' ? 'Selesaikan Pembayaran' :
    'Pendaftaran Selesai!'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1268A1] to-[#0ea5e9] px-6 py-5 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white">{headerTitle}</h2>
              <p className="text-white/80 text-sm mt-0.5">
                {step === 'form' && `${ticket?.distance ?? '5K'} ${ticket?.name ?? 'Fun Run'} · ${totalPrice}`}
                {step === 'payment' && `Order ID: ${orderId}`}
                {step === 'success' && 'Terima kasih telah berpartisipasi!'}
              </p>
            </div>
            <button onClick={handleClose} disabled={isSubmitting || isUploading} className="text-white/80 hover:text-white transition-colors disabled:opacity-40">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {(['form', 'payment', 'success'] as ModalStep[]).map((s, i) => {
              const labels = ['Data Diri', 'Pembayaran', 'Selesai']
              const done = ['form', 'payment', 'success'].indexOf(step) > i
              const active = step === s
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${active ? 'bg-[#FFE234] text-[#1268A1]' : done ? 'bg-green-400 text-white' : 'bg-white/20 text-white/50'}`}>
                    <span>{done ? '✓' : i + 1}</span>
                    <span className="hidden sm:inline">{labels[i]}</span>
                  </div>
                  {i < 2 && <div className={`w-6 h-0.5 ${done ? 'bg-green-400' : 'bg-white/30'}`} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">

          {/* ── STEP 1: Form ── */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Data Pribadi */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  Data Pribadi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap (sesuai KTP) <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.namaLengkap} onChange={e => handleInputChange("namaLengkap", e.target.value)} placeholder="Masukkan nama lengkap"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors text-sm ${errors.namaLengkap ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                    {errors.namaLengkap && <p className="text-red-500 text-xs mt-1">{errors.namaLengkap}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} placeholder="contoh@email.com"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors text-sm ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nomor Telepon <span className="text-red-500">*</span></label>
                    <input type="tel" value={formData.telepon} onChange={e => handleInputChange("telepon", e.target.value.replace(/\D/g, ''))} placeholder="08xxxxxxxxxx"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors text-sm ${errors.telepon ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                    {errors.telepon && <p className="text-red-500 text-xs mt-1">{errors.telepon}</p>}
                  </div>
                </div>
              </div>

              {/* Ukuran Baju */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  Ukuran Baju
                </h3>
                <div className="flex flex-wrap gap-2">
                  {UKURAN_BAJU.map(size => (
                    <button key={size} type="button" onClick={() => handleInputChange("ukuranBaju", size)}
                      className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${formData.ukuranBaju === size ? "bg-[#1268A1] text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {size}
                    </button>
                  ))}
                </div>
                {errors.ukuranBaju && <p className="text-red-500 text-xs mt-2">{errors.ukuranBaju}</p>}
              </div>

              {/* Kontak Darurat */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  Kontak Darurat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.kontakDarurat} onChange={e => handleInputChange("kontakDarurat", e.target.value)} placeholder="Nama lengkap"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors text-sm ${errors.kontakDarurat ? "border-red-300 bg-red-50" : "border-gray-200"}`} />
                    {errors.kontakDarurat && <p className="text-red-500 text-xs mt-1">{errors.kontakDarurat}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nomor Telepon</label>
                    <input type="tel" value={formData.teleponDarurat} onChange={e => handleInputChange("teleponDarurat", e.target.value.replace(/\D/g, ''))} placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors text-sm" />
                  </div>
                </div>
              </div>

              {/* Riwayat Kesehatan */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  Riwayat Kesehatan <span className="text-gray-400 font-normal text-sm">(Opsional)</span>
                </h3>
                <textarea value={formData.riwayatKesehatan} onChange={e => handleInputChange("riwayatKesehatan", e.target.value)}
                  placeholder="Tuliskan jika ada kondisi kesehatan tertentu (alergi, asma, dll)" rows={2}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors resize-none text-sm" />
              </div>

              {/* Persetujuan */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={formData.persetujuan}
                  onClick={() => handleInputChange("persetujuan", !formData.persetujuan)}
                  className={`shrink-0 w-5 h-5 rounded-[5px] border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    formData.persetujuan
                      ? 'bg-[#1268A1] border-[#1268A1] scale-105'
                      : 'bg-white border-gray-300 hover:border-[#1268A1]'
                  }`}
                >
                  <svg
                    className={`w-3 h-3 text-white transition-all duration-200 ${formData.persetujuan ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                    viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="1,5 4.5,8.5 11,1" />
                  </svg>
                </button>
                <label onClick={() => handleInputChange("persetujuan", !formData.persetujuan)} className="text-sm text-gray-600 cursor-pointer">
                  Saya menyetujui{" "}
                  <a href="/tnc" target="_blank" rel="noopener noreferrer" className="text-[#1268A1] font-semibold underline hover:text-[#0e5587]" onClick={e => e.stopPropagation()}>Syarat dan Ketentuan</a>
                  {" "}serta{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1268A1] font-semibold underline hover:text-[#0e5587]" onClick={e => e.stopPropagation()}>Kebijakan Privasi</a>
                  {" "}Miles for Smiles 2026 <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.persetujuan && <p className="text-red-500 text-xs -mt-4">{errors.persetujuan}</p>}

              {/* Footer */}
              <div className="bg-gray-50 -mx-6 px-6 py-5 border-t flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-500">Total Pembayaran</div>
                  <div className="text-xl font-black text-[#1268A1]">{totalPrice}</div>
                </div>
                <button type="submit" disabled={isSubmitting || !formData.persetujuan}
                  className="flex-1 max-w-xs bg-[#1268A1] hover:bg-[#0e5587] text-white font-black py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg">
                  {isSubmitting ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg><span>Memproses...</span></>
                  ) : <span>Lanjut ke Pembayaran →</span>}
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === 'payment' && (
            <div className="p-6 space-y-6">
              {/* Amount */}
              <div className="bg-[#1268A1]/5 border border-[#1268A1]/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 font-medium">Total yang harus dibayar</div>
                  <div className="text-2xl font-black text-[#1268A1]">{totalPrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Order ID</div>
                  <div className="font-black text-gray-800 tracking-wider">{orderId}</div>
                </div>
              </div>

              {/* QRIS */}
              <div className="text-center">
                <div className="text-sm font-bold text-gray-700 mb-3">Scan QRIS untuk Bayar</div>
                <div className="inline-block bg-white border-2 border-gray-200 rounded-2xl p-3 shadow-sm">
                  <Image src="/qris.jpeg" alt="QRIS Miles for Smiles" width={220} height={220} className="rounded-lg" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Gunakan aplikasi apapun yang mendukung QRIS</p>
              </div>

              {/* Upload proof */}
              <div>
                <div className="text-sm font-bold text-gray-700 mb-2">Upload Bukti Transfer <span className="text-red-500">*</span></div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProofChange} />

                {proofPreview ? (
                  <div className="space-y-3">
                    <div className="relative rounded-xl overflow-hidden border-2 border-green-300 bg-green-50">
                      <img src={proofPreview} alt="Bukti transfer" className="w-full max-h-48 object-contain" />
                      <button type="button" onClick={() => { setProofFile(null); setProofPreview(null) }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600">✕</button>
                    </div>
                    <p className="text-xs text-green-600 font-medium text-center">✓ {proofFile?.name}</p>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1268A1] hover:bg-blue-50 transition-all">
                    <div className="text-2xl mb-1">📤</div>
                    <div className="text-sm font-semibold text-gray-600">Klik untuk pilih gambar</div>
                    <div className="text-xs text-gray-400 mt-0.5">JPG, PNG, HEIC · Maks 10MB</div>
                  </button>
                )}
              </div>

              {/* Confirm button */}
              <div className="bg-gray-50 -mx-6 px-6 py-5 border-t">
                <button onClick={handleUploadProof} disabled={!proofFile || isUploading}
                  className="w-full bg-[#1268A1] hover:bg-[#0e5587] text-white font-black py-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg">
                  {isUploading ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg><span>Mengupload...</span></>
                  ) : <span>✅ Konfirmasi Pembayaran</span>}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === 'success' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Pembayaran Terkirim!</h3>
              <p className="text-gray-500 text-sm mb-1">Order ID: <span className="font-black text-gray-800">{orderId}</span></p>
              <p className="text-gray-500 text-sm mb-6">
                Tim kami akan memverifikasi bukti transfer kamu dalam <strong>1×24 jam</strong>. Pantau WhatsApp kamu untuk konfirmasi lebih lanjut.
              </p>
              <div className="bg-blue-50 rounded-2xl p-4 text-sm text-[#1268A1] mb-6">
                📱 Hubungi kami jika ada pertanyaan:<br />
                <span className="font-black">WA: 0812-7089-3558</span>
              </div>
              <button onClick={handleClose} className="bg-[#1268A1] hover:bg-[#0e5587] text-white font-black px-8 py-3 rounded-full transition-colors">
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
