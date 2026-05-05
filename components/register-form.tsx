"use client"

import { useState } from "react"
import type { TicketType, FormData } from "@/app/page"

interface RegisterFormProps {
  ticket: TicketType
  onSubmit: (data: Partial<FormData>) => void
  onBack: () => void
}

const SHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const TODAY = new Date().toISOString().split('T')[0]

function inputClass(error: string | undefined) {
  return `w-full px-4 py-3 rounded-xl border-2 text-sm font-medium focus:outline-none transition-all ${
    error
      ? 'border-red-400 bg-red-50'
      : 'border-slate-200 bg-white focus:border-[#1268A1] hover:border-slate-300'
  }`
}

export function RegisterForm({ ticket, onSubmit, onBack }: RegisterFormProps) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    emergencyContact: '',
    shirtSize: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = () => {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email tidak valid'
    if (!form.phone.replace(/[-\s]/g, '').match(/^[0-9]{10,13}$/)) e.phone = 'Nomor HP tidak valid (10-13 digit)'
    if (!form.dob) e.dob = 'Tanggal lahir wajib diisi'
    if (!form.gender) e.gender = 'Jenis kelamin wajib dipilih'
    if (!form.emergencyContact.trim()) e.emergencyContact = 'Kontak darurat wajib diisi'
    if (!form.shirtSize) e.shirtSize = 'Ukuran kaos wajib dipilih'
    if (Object.keys(e).length > 0) { setErrors(e); return }
    onSubmit(form)
  }

  return (
    <section className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Ticket banner */}
        <div className="bg-white rounded-3xl p-5 mb-6 border-2 border-[#FFE234] flex items-center gap-4 shadow-lg">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0"
            style={{ backgroundColor: ticket.color }}
          >
            {ticket.distance}
          </div>
          <div className="flex-1">
            <div className="font-black text-slate-800">{ticket.name} — {ticket.distance}</div>
            <div className="text-slate-500 text-sm">Miles for Smiles 2026 · 20 Juni 2026</div>
          </div>
          <div className="text-right">
            {ticket.price === 0 ? (
              <span className="text-green-600 font-black text-lg">GRATIS</span>
            ) : (
              <span className="text-slate-800 font-black">Rp {ticket.price.toLocaleString('id-ID')}</span>
            )}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <h2 className="text-2xl font-black text-[#1268A1] mb-6">Data Peserta</h2>
          <div className="space-y-5">

            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={e => set('fullName', e.target.value)}
                placeholder="Sesuai KTP/ID"
                className={inputClass(errors.fullName)}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="nama@email.com"
                  className={inputClass(errors.email)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  No. HP / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className={inputClass(errors.phone)}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* DOB + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.dob}
                  max={TODAY}
                  onChange={e => set('dob', e.target.value)}
                  className={inputClass(errors.dob)}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {['Laki-laki', 'Perempuan'].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set('gender', g)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                        form.gender === g
                          ? 'bg-[#1268A1] border-[#1268A1] text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-[#1268A1]'
                      }`}
                    >
                      {g === 'Laki-laki' ? '👨 ' : '👩 '}{g}
                    </button>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Kontak Darurat (Nama &amp; No. HP) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.emergencyContact}
                onChange={e => set('emergencyContact', e.target.value)}
                placeholder="Contoh: Budi - 081234567890"
                className={inputClass(errors.emergencyContact)}
              />
              {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
            </div>

            {/* Shirt Size */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Ukuran Kaos <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {SHIRT_SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => set('shirtSize', size)}
                    className={`w-12 h-12 rounded-xl font-black text-sm border-2 transition-all ${
                      form.shirtSize === size
                        ? 'border-[#1268A1] bg-[#1268A1] text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-[#1268A1]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errors.shirtSize && <p className="text-red-500 text-xs mt-1">{errors.shirtSize}</p>}
            </div>

            {/* Terms */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="text-xs text-slate-600 leading-relaxed">
                Dengan mendaftar, kamu menyetujui bahwa data yang diberikan benar dan bersedia mengikuti seluruh ketentuan event{' '}
                <strong>Miles for Smiles 2026</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={onBack}
              className="px-5 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 shadow-[0_4px_0_0_rgba(0,0,0,0.08)] active:translate-y-1 active:shadow-none transition-[transform,box-shadow] duration-75"
            >
              ← Kembali
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3.5 rounded-2xl font-black text-white text-sm hover:opacity-90 [box-shadow:0_4px_0_var(--shadow-color)] active:translate-y-1 active:shadow-none transition-[transform,box-shadow] duration-75"
              style={{ backgroundColor: ticket.color, '--shadow-color': `${ticket.color}88` } as React.CSSProperties}
            >
              Lanjut ke Pembayaran →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
