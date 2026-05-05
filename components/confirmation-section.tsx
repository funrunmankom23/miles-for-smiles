"use client"

import type { FormData } from "@/app/page"

interface ConfirmationSectionProps {
  formData: FormData
  orderId: string
  onHome: () => void
}

export function ConfirmationSection({ formData, orderId, onHome }: ConfirmationSectionProps) {
  const isFree = formData.ticket?.price === 0

  const NEXT_STEPS = [
    { step: '1', text: 'Cek email konfirmasi yang akan dikirim dalam 1x24 jam' },
    { step: '2', text: isFree ? 'Datang ke lokasi & tunjukkan nomor order untuk pengambilan BIB' : 'Pengambilan BIB dilakukan H-1 event di lokasi race expo' },
    { step: '3', text: 'Flag off pukul 05:30 WIB — pastikan sudah hadir 30 menit sebelumnya' },
  ]

  return (
    <section className="min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="max-w-lg w-full">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="text-6xl animate-bounce mb-4">🎉</div>
          <div className="inline-block bg-[#FFE234] text-[#1268A1] font-black text-sm px-5 py-2 rounded-full">
            PENDAFTARAN BERHASIL!
          </div>
        </div>

        {/* Ticket card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-100">
          <div className="h-3" style={{ backgroundColor: formData.ticket?.color ?? '#1268A1' }} />
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-black text-[#1268A1] text-xl">MILES FOR SMILES</div>
                <div className="text-slate-400 text-xs font-bold tracking-widest">RUN FOR CHARITY 2026</div>
              </div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: formData.ticket?.color }}
              >
                {formData.ticket?.distance}
              </div>
            </div>

            {/* Order ID */}
            <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Nomor Order</div>
              <div className="font-black text-slate-800 text-xl font-mono tracking-wider">{orderId}</div>
              <div className="text-xs text-slate-400 mt-1">Simpan nomor ini untuk pengambilan BIB</div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Nama', value: formData.fullName },
                { label: 'Email', value: formData.email },
                { label: 'Kategori', value: `${formData.ticket?.name} (${formData.ticket?.distance})` },
                { label: 'Metode', value: isFree ? 'Gratis' : formData.paymentMethod },
                { label: 'Ukuran Kaos', value: formData.shirtSize },
                { label: 'Total', value: isFree ? 'Rp 0' : `Rp ${formData.ticket?.price.toLocaleString('id-ID')}` },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-xs text-slate-400 font-semibold mb-0.5">{item.label}</div>
                  <div className="font-bold text-slate-800 text-sm truncate">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-slate-200 my-5" />

            {/* Event info */}
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex-1">
                <div className="font-black text-slate-800">📅 20 Juni 2026</div>
                <div className="text-xs text-slate-500">Lokasi: Padang, Sumatera Barat</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Flag off</div>
                <div className="font-black text-slate-800">05:30 WIB</div>
              </div>
            </div>
          </div>
          <div className="h-2" style={{ backgroundColor: formData.ticket?.color ?? '#1268A1' }} />
        </div>

        {/* Next steps */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mt-6 border border-white/30">
          <div className="text-white font-black text-sm mb-4">📋 Langkah Selanjutnya</div>
          <div className="space-y-3">
            {NEXT_STEPS.map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#FFE234] text-[#1268A1] rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div className="text-white/90 text-sm">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3.5 rounded-2xl border-2 border-white/40 text-white font-bold text-sm hover:bg-white/10 shadow-[0_4px_0_0_rgba(255,255,255,0.15)] active:translate-y-1 active:shadow-none transition-[transform,box-shadow] duration-75"
          >
            🖨️ Print Tiket
          </button>
          <button
            onClick={onHome}
            className="flex-1 py-3.5 rounded-2xl bg-[#FFE234] text-[#1268A1] font-black text-sm hover:opacity-90 shadow-[0_4px_0_#c9a800] active:translate-y-1 active:shadow-none transition-[transform,box-shadow] duration-75"
          >
            🏃 Daftar Kategori Lain
          </button>
        </div>
      </div>
    </section>
  )
}
