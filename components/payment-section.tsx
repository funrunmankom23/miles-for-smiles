"use client"

import { useState } from "react"
import type { FormData } from "@/app/page"

interface PaymentSectionProps {
  formData: FormData
  submitting?: boolean
  onSubmit: (paymentMethod: string) => void
  onBack: () => void
}

interface PaymentMethod {
  id: string
  name: string
  type: string
  logo: string
  info: string
  accountNo?: string
  accountName?: string
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'bsi', name: 'Bank Syariah Indonesia', type: 'Transfer Bank', logo: '🏦', info: 'Transfer BSI', accountNo: '7193840021', accountName: 'YAY. MILES FOR SMILES' },
  { id: 'bri', name: 'BRI', type: 'Transfer Bank', logo: '🏦', info: 'Transfer BRI', accountNo: '1234-01-005678-50-3', accountName: 'YAY. MILES FOR SMILES' },
  { id: 'mandiri', name: 'Bank Mandiri', type: 'Transfer Bank', logo: '🏦', info: 'Transfer Mandiri', accountNo: '1310012345678', accountName: 'YAY. MILES FOR SMILES' },
  { id: 'gopay', name: 'GoPay', type: 'Dompet Digital', logo: '💚', info: 'Transfer GoPay', accountNo: '0812-3456-7890', accountName: 'Miles for Smiles' },
  { id: 'ovo', name: 'OVO', type: 'Dompet Digital', logo: '💜', info: 'Transfer OVO', accountNo: '0812-3456-7890', accountName: 'Miles for Smiles' },
  { id: 'dana', name: 'DANA', type: 'Dompet Digital', logo: '💙', info: 'Transfer DANA', accountNo: '0812-3456-7890', accountName: 'Miles for Smiles' },
  { id: 'shopee', name: 'ShopeePay', type: 'Dompet Digital', logo: '🧡', info: 'Transfer ShopeePay', accountNo: '0812-3456-7890', accountName: 'Miles for Smiles' },
  { id: 'qris', name: 'QRIS', type: 'Scan & Pay', logo: '📱', info: 'Scan QR Code dengan aplikasi apapun' },
]

const FREE_METHOD: PaymentMethod = {
  id: 'free',
  name: 'Daftar Gratis',
  type: 'Tanpa Pembayaran',
  logo: '🎉',
  info: 'Tiket ini gratis! Klik konfirmasi untuk melanjutkan.',
}

export function PaymentSection({ formData, submitting = false, onSubmit, onBack }: PaymentSectionProps) {
  const [selected, setSelected] = useState<PaymentMethod | null>(null)
  const [uploaded, setUploaded] = useState(false)
  const [error, setError] = useState('')
  const isFree = formData.ticket?.price === 0

  const methods = isFree ? [FREE_METHOD] : PAYMENT_METHODS
  const grouped = methods.reduce<Record<string, PaymentMethod[]>>((acc, m) => {
    if (!acc[m.type]) acc[m.type] = []
    acc[m.type].push(m)
    return acc
  }, {})

  const handleConfirm = () => {
    if (!selected) { setError('Pilih metode pembayaran terlebih dahulu'); return }
    if (!isFree && !uploaded) { setError('Mohon upload bukti pembayaran terlebih dahulu'); return }
    onSubmit(selected.name)
  }

  return (
    <section className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Order summary */}
        <div className="bg-white rounded-3xl p-5 mb-6 shadow-lg border border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ringkasan Pesanan</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-black text-slate-800">{formData.ticket?.name} — {formData.ticket?.distance}</div>
              <div className="text-slate-500 text-sm">{formData.fullName}</div>
            </div>
            <div className="text-right">
              {isFree ? (
                <span className="text-2xl font-black text-green-600">GRATIS</span>
              ) : (
                <>
                  <div className="text-xl font-black text-slate-800">Rp {formData.ticket?.price.toLocaleString('id-ID')}</div>
                  <div className="text-xs text-slate-400">total pembayaran</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <h2 className="text-2xl font-black text-[#1268A1] mb-2">
            {isFree ? 'Konfirmasi Pendaftaran' : 'Metode Pembayaran'}
          </h2>
          {!isFree && (
            <p className="text-slate-500 text-sm mb-6">Semua metode tanpa biaya admin. Pembayaran merupakan donasi charity.</p>
          )}

          <div className="space-y-6 mb-6">
            {Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{type}</div>
                <div className="space-y-2">
                  {items.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => { setSelected(m); setError('') }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                        selected?.id === m.id ? 'border-[#1268A1] bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${selected?.id === m.id ? 'bg-[#1268A1]' : 'bg-slate-100'}`}>
                        {m.logo}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 text-sm">{m.name}</div>
                        {m.accountNo ? (
                          <div className="text-slate-500 text-xs font-mono">{m.accountNo} · {m.accountName}</div>
                        ) : (
                          <div className="text-slate-500 text-xs">{m.info}</div>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected?.id === m.id ? 'border-[#1268A1] bg-[#1268A1]' : 'border-slate-300'}`}>
                        {selected?.id === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Upload proof */}
          {!isFree && selected && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mb-6">
              <div className="font-bold text-amber-800 text-sm mb-3">📎 Upload Bukti Pembayaran</div>
              <p className="text-amber-700 text-xs mb-4">Setelah transfer, upload screenshot/foto bukti pembayaran di sini.</p>
              <label className={`block w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${uploaded ? 'border-green-400 bg-green-50' : 'border-amber-300 hover:border-amber-400 hover:bg-amber-100'}`}>
                <input type="file" accept="image/*" className="hidden" onChange={() => setUploaded(true)} />
                {uploaded ? (
                  <div className="text-green-600 font-bold text-sm">✅ Bukti berhasil diupload!</div>
                ) : (
                  <>
                    <div className="text-2xl mb-2">📤</div>
                    <div className="text-amber-700 text-sm font-semibold">Klik untuk upload bukti pembayaran</div>
                    <div className="text-amber-500 text-xs mt-1">JPG, PNG · Maks. 5MB</div>
                  </>
                )}
              </label>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 shadow-[0_4px_0_0_rgba(0,0,0,0.08)] active:translate-y-1 active:shadow-none transition-[transform,box-shadow] duration-75"
            >
              ← Kembali
            </button>
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="flex-1 py-3.5 rounded-2xl font-black text-white text-sm bg-[#1268A1] hover:bg-[#0e5587] shadow-[0_4px_0_#0a3d66] active:translate-y-1 active:shadow-none transition-[transform,box-shadow] duration-75 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:active:translate-y-0"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </span>
              ) : isFree ? '🎉 Konfirmasi Pendaftaran' : '✅ Konfirmasi Pembayaran →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
