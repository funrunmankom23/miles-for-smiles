"use client"

import { useState } from "react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  namaLengkap: string
  email: string
  telepon: string
  jenisKelamin: string
  ukuranBaju: string
  kontakDarurat: string
  teleponDarurat: string
  riwayatKesehatan: string
  persetujuan: boolean
}

interface FormErrors {
  [key: string]: string
}

const UKURAN_BAJU = ["S", "M", "L", "XL", "XXL", "XXXL"]

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: "",
    email: "",
    telepon: "",
    jenisKelamin: "",
    ukuranBaju: "",
    kontakDarurat: "",
    teleponDarurat: "",
    riwayatKesehatan: "",
    persetujuan: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = "Nama lengkap wajib diisi"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.telepon.trim()) {
      newErrors.telepon = "Nomor telepon wajib diisi"
    } else if (!/^[0-9]{10,13}$/.test(formData.telepon.replace(/[-\s]/g, ""))) {
      newErrors.telepon = "Nomor telepon harus 10-13 digit"
    }

    if (!formData.ukuranBaju) {
      newErrors.ukuranBaju = "Ukuran baju wajib dipilih"
    }

    if (!formData.kontakDarurat.trim()) {
      newErrors.kontakDarurat = "Nama kontak darurat wajib diisi"
    }

    if (!formData.persetujuan) {
      newErrors.persetujuan = "Anda harus menyetujui syarat dan ketentuan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        namaLengkap: "",
        email: "",
        telepon: "",
        jenisKelamin: "",
        ukuranBaju: "",
        kontakDarurat: "",
        teleponDarurat: "",
        riwayatKesehatan: "",
        persetujuan: false,
      })
      setErrors({})
      setIsSuccess(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284c7] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Formulir Pendaftaran</h2>
              <p className="text-white/80 text-sm mt-1">5K Fun Run - Rp 130.000</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-white/80 hover:text-white transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h3>
              <p className="text-gray-600 mb-6">
                Terima kasih telah mendaftar Miles for Smiles 2026. Detail pembayaran akan dikirim ke email Anda.
              </p>
              <button
                onClick={handleClose}
                className="bg-[#0EA5E9] hover:bg-[#0284c7] text-white font-semibold px-8 py-3 rounded-full transition-colors"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Data Pribadi */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Data Pribadi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama Lengkap */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap (sesuai KTP) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.namaLengkap}
                      onChange={(e) => handleInputChange("namaLengkap", e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors ${
                        errors.namaLengkap ? "border-red-300 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.namaLengkap && <p className="text-red-500 text-sm mt-1">{errors.namaLengkap}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="contoh@email.com"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors ${
                        errors.email ? "border-red-300 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Telepon */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.telepon}
                      onChange={(e) => handleInputChange("telepon", e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors ${
                        errors.telepon ? "border-red-300 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.telepon && <p className="text-red-500 text-sm mt-1">{errors.telepon}</p>}
                  </div>
                </div>
              </div>

              {/* Ukuran Baju */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Ukuran Baju
                </h3>
                <div className="flex flex-wrap gap-2">
                  {UKURAN_BAJU.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleInputChange("ukuranBaju", size)}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                        formData.ukuranBaju === size
                          ? "bg-[#0EA5E9] text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.ukuranBaju && <p className="text-red-500 text-sm mt-2">{errors.ukuranBaju}</p>}
              </div>

              {/* Kontak Darurat */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Kontak Darurat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Kontak Darurat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kontakDarurat}
                      onChange={(e) => handleInputChange("kontakDarurat", e.target.value)}
                      placeholder="Nama lengkap"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors ${
                        errors.kontakDarurat ? "border-red-300 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.kontakDarurat && <p className="text-red-500 text-sm mt-1">{errors.kontakDarurat}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telepon Darurat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.teleponDarurat}
                      onChange={(e) => handleInputChange("teleponDarurat", e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors ${
                        errors.teleponDarurat ? "border-red-300 bg-red-50" : "border-gray-200"
                      }`}
                    />
                    {errors.teleponDarurat && <p className="text-red-500 text-sm mt-1">{errors.teleponDarurat}</p>}
                  </div>
                </div>
              </div>

              {/* Riwayat Kesehatan */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sky-100 text-[#0EA5E9] rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Riwayat Kesehatan (Opsional)
                </h3>
                <textarea
                  value={formData.riwayatKesehatan}
                  onChange={(e) => handleInputChange("riwayatKesehatan", e.target.value)}
                  placeholder="Tuliskan jika Anda memiliki kondisi kesehatan tertentu (alergi, asma, dll)"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-colors resize-none"
                />
              </div>

              {/* Benefit Info */}
              <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-5 border border-sky-100">
                <h4 className="font-bold text-[#0c4a6e] mb-3">Yang Anda Dapatkan:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Running Jersey Eksklusif",
                    "Finisher Medal",
                    "Nomor BIB",
                    "Random Souvenir",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#0c4a6e]">
                      <svg className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Persetujuan */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="persetujuan"
                  checked={formData.persetujuan}
                  onChange={(e) => handleInputChange("persetujuan", e.target.checked)}
                  className="mt-1 w-5 h-5 text-[#0EA5E9] border-2 border-gray-300 rounded focus:ring-[#0EA5E9]"
                />
                <label htmlFor="persetujuan" className="text-sm text-gray-600">
                  Saya menyetujui <span className="text-[#0EA5E9] font-semibold cursor-pointer hover:underline">Syarat dan Ketentuan</span> serta{" "}
                  <span className="text-[#0EA5E9] font-semibold cursor-pointer hover:underline">Kebijakan Privasi</span> Miles for Smiles 2026 <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.persetujuan && <p className="text-red-500 text-sm -mt-4">{errors.persetujuan}</p>}

              {/* Total & Submit */}
              <div className="bg-gray-50 -mx-6 -mb-6 px-6 py-5 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-semibold">Total Pembayaran</span>
                  <span className="text-2xl font-bold text-[#0EA5E9]">Rp 130.000</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span>Daftar & Bayar</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
