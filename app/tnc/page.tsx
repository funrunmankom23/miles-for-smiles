import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — Miles for Smiles 2026',
  description: 'Syarat dan ketentuan pendaftaran dan keikutsertaan dalam event Miles for Smiles 2026 Fun Run 5K di Universitas Andalas, Padang.',
}

export default function TNCPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1268A1] border-b-4 border-[#FFD700]">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">← Kembali</Link>
          <div>
            <div className="text-white font-black text-lg leading-none">Syarat &amp; Ketentuan</div>
            <div className="text-[#FFE234] text-[10px] font-bold tracking-widest">MILES FOR SMILES 2026</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <p className="text-gray-500 text-sm">Terakhir diperbarui: Mei 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">1. Penerimaan Ketentuan</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Dengan mendaftarkan diri pada event Miles for Smiles 2026, peserta dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku. Panitia berhak mengubah ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">2. Persyaratan Peserta</h2>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Peserta merupakan individu yang telah berusia minimal 12 tahun.</li>
            <li>Peserta berusia di bawah 17 tahun wajib mendapatkan izin tertulis dari orang tua atau wali.</li>
            <li>Peserta dalam kondisi sehat jasmani dan rohani serta layak untuk mengikuti kegiatan lari.</li>
            <li>Peserta dengan kondisi medis tertentu disarankan untuk berkonsultasi dengan dokter sebelum mendaftar.</li>
            <li>Setiap peserta hanya diperbolehkan mendaftar satu kali dengan satu alamat email.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">3. Pendaftaran dan Pembayaran</h2>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Pendaftaran dinyatakan sah setelah formulir terisi lengkap dan bukti transfer berhasil diunggah.</li>
            <li>Biaya pendaftaran sebesar <strong>Rp 140.000</strong> per peserta untuk kategori 5K Fun Run.</li>
            <li>Pembayaran dilakukan melalui transfer bank atau QRIS yang tertera pada halaman pembayaran.</li>
            <li>Slot terbatas 500 peserta. Pendaftaran ditutup otomatis setelah kuota terpenuhi.</li>
            <li>Panitia akan melakukan verifikasi bukti transfer dalam 1×24 jam pada hari kerja.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">4. Kebijakan Pembatalan dan Pengembalian Dana</h2>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Biaya pendaftaran yang telah dibayarkan <strong>tidak dapat dikembalikan</strong> (non-refundable).</li>
            <li>Nomor BIB dan perlengkapan race kit tidak dapat dipindahtangankan kepada peserta lain.</li>
            <li>Apabila event dibatalkan karena force majeure (bencana alam, kondisi keamanan, dll.), panitia akan memberikan pengumuman resmi melalui media sosial dan email.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">5. Peraturan Event</h2>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Peserta wajib hadir di titik start minimal 30 menit sebelum flag off pukul 06:00 WIB.</li>
            <li>Peserta wajib mengenakan nomor BIB yang terlihat jelas di bagian depan baju selama lomba.</li>
            <li>Peserta wajib mengikuti rute yang telah ditentukan dan mematuhi arahan panitia serta marshal.</li>
            <li>Dilarang menggunakan alat bantu seperti sepeda, skuter, atau kendaraan lain selama lomba.</li>
            <li>Panitia berhak mendiskualifikasi peserta yang terbukti melanggar peraturan.</li>
            <li>Peserta bertanggung jawab atas keselamatan diri sendiri selama mengikuti event.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">6. Perlengkapan dan Race Kit</h2>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Race kit (jersey event, nomor BIB, dan souvenir) akan dibagikan pada hari H atau sesuai pengumuman panitia.</li>
            <li>Ukuran jersey dipilih saat pendaftaran dan tidak dapat ditukar setelah konfirmasi.</li>
            <li>Pengambilan race kit wajib dilakukan sendiri atau diwakilkan dengan menunjukkan bukti konfirmasi pendaftaran.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">7. Kesehatan dan Keselamatan</h2>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Panitia menyediakan tim medis dan pos pertolongan pertama di sepanjang rute.</li>
            <li>Peserta wajib mengisi kontak darurat yang dapat dihubungi saat pendaftaran.</li>
            <li>Peserta yang merasa tidak sehat selama lomba dianjurkan segera berhenti dan menghubungi panitia.</li>
            <li>Panitia tidak bertanggung jawab atas cedera atau kondisi medis yang terjadi akibat kelalaian peserta sendiri.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">8. Hak Gambar dan Publisitas</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Dengan berpartisipasi dalam event ini, peserta memberikan izin kepada panitia untuk menggunakan foto dan video yang diambil selama event untuk keperluan dokumentasi dan promosi tanpa kompensasi.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">9. Hubungi Kami</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Pertanyaan mengenai syarat dan ketentuan dapat diajukan melalui:<br />
            📧 <a href="mailto:funrunmankom23@gmail.com" className="text-[#1268A1] font-semibold">funrunmankom23@gmail.com</a><br />
            📱 WhatsApp: <a href="https://wa.me/6281270893558" className="text-[#1268A1] font-semibold">0812-7089-3558</a>
          </p>
        </section>

        <div className="pt-4 border-t border-gray-200">
          <Link href="/" className="inline-block bg-[#1268A1] hover:bg-[#0e5587] text-white font-black px-6 py-3 rounded-full text-sm transition-colors">
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  )
}
