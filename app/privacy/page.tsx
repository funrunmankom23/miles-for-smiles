import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — Miles for Smiles 2026',
  description: 'Kebijakan privasi dan perlindungan data peserta event Miles for Smiles 2026 Fun Run 5K di Universitas Andalas, Padang.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1268A1] border-b-4 border-[#FFD700]">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">← Kembali</Link>
          <div>
            <div className="text-white font-black text-lg leading-none">Kebijakan Privasi</div>
            <div className="text-[#FFE234] text-[10px] font-bold tracking-widest">MILES FOR SMILES 2026</div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <p className="text-gray-500 text-sm">Terakhir diperbarui: Mei 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">1. Pendahuluan</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Panitia Miles for Smiles 2026 berkomitmen untuk melindungi privasi seluruh peserta. Kebijakan ini menjelaskan data apa yang kami kumpulkan, bagaimana data tersebut digunakan, dan hak-hak peserta atas data pribadi mereka.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">2. Data yang Kami Kumpulkan</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">Saat pendaftaran, kami mengumpulkan data berikut:</p>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li><strong>Identitas:</strong> Nama lengkap</li>
            <li><strong>Kontak:</strong> Alamat email dan nomor telepon</li>
            <li><strong>Preferensi:</strong> Ukuran baju (jersey)</li>
            <li><strong>Darurat:</strong> Nama dan nomor telepon kontak darurat</li>
            <li><strong>Kesehatan:</strong> Riwayat kesehatan yang relevan (diisi secara sukarela)</li>
            <li><strong>Pembayaran:</strong> Bukti transfer yang diunggah (gambar)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">3. Tujuan Penggunaan Data</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">Data yang dikumpulkan digunakan semata-mata untuk:</p>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Memproses dan memverifikasi pendaftaran peserta</li>
            <li>Mengatur distribusi race kit (jersey, BIB, souvenir)</li>
            <li>Menghubungi peserta terkait informasi event</li>
            <li>Keperluan keselamatan dan medis selama event berlangsung</li>
            <li>Dokumentasi dan pelaporan internal panitia</li>
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Kami <strong>tidak</strong> menggunakan data peserta untuk keperluan pemasaran pihak ketiga atau menjualnya kepada siapapun.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">4. Penyimpanan Data</h2>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Data formulir pendaftaran disimpan di Google Sheets yang hanya dapat diakses oleh panitia resmi Miles for Smiles 2026.</li>
            <li>Bukti transfer pembayaran disimpan di Google Drive dalam folder terbatas yang hanya dapat diakses oleh panitia keuangan.</li>
            <li>Data disimpan selama penyelenggaraan event dan maksimal 6 bulan setelahnya untuk keperluan administrasi.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">5. Keamanan Data</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Kami mengambil langkah-langkah teknis yang wajar untuk melindungi data peserta dari akses tidak sah, pengungkapan, atau kehilangan. Akses ke data peserta dibatasi hanya kepada anggota panitia yang memerlukan data tersebut untuk menjalankan tugasnya.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">6. Berbagi Data dengan Pihak Ketiga</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Kami tidak menjual, memperdagangkan, atau mengalihkan data pribadi peserta kepada pihak luar. Data hanya dapat dibagikan apabila diwajibkan oleh hukum atau otoritas yang berwenang.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">7. Hak Peserta</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">Peserta memiliki hak untuk:</p>
          <ul className="text-gray-600 text-sm leading-relaxed space-y-2 list-disc list-inside">
            <li>Mengakses data pribadi yang kami simpan</li>
            <li>Meminta koreksi data yang tidak akurat</li>
            <li>Meminta penghapusan data setelah event selesai</li>
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed mt-2">
            Untuk mengajukan permintaan tersebut, hubungi kami melalui kontak di bawah.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">8. Perubahan Kebijakan</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini. Penggunaan layanan pendaftaran setelah perubahan diterbitkan dianggap sebagai persetujuan terhadap kebijakan yang diperbarui.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-gray-900">9. Hubungi Kami</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Pertanyaan mengenai kebijakan privasi dapat diajukan melalui:<br />
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
