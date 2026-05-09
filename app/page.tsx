"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TicketsSection } from "@/components/tickets-section"
import { BenefitsSection } from "@/components/benefits-section"
import { RegistrationModal } from "@/components/registration-modal"
import { Footer } from "@/components/footer"

export interface TicketType {
  id: 'fun5k' | 'run10k' | 'hero21k'
  name: string
  distance: string
  price: number
  color: string
  perks: string[]
  quota: number
  remaining: number
}

const BASE_TICKETS: TicketType[] = [
  {
    id: 'fun5k',
    name: 'Fun Run',
    distance: '5K',
    price: 140000,
    color: '#F97316',
    perks: ['Finisher Medal', 'Event Jersey (Baju)', 'Nomor BIB', 'Random Sport Item','Acara Hiburan Gratis','Voucher dan Akses Semua Booth Tenant'],
    quota: 500,
    remaining: 500,
  },
]

export default function Home() {
  const [tickets, setTickets] = useState<TicketType[]>(BASE_TICKETS)
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [errorBanner, setErrorBanner] = useState<string | null>(null)

  const handleCloseWithoutProof = () => {
    setShowSnackbar(true)
  }

  const handleError = (message: string) => {
    setErrorBanner(message)
  }

  useEffect(() => {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL
    if (!scriptUrl) { setSlotsLoading(false); return }

    const fetchSlots = (initial = false) => {
      if (initial) setSlotsLoading(true)
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)

      fetch(scriptUrl, { signal: controller.signal })
        .then(r => r.json())
        .then((data: Record<string, { quota: number; remaining: number }>) => {
          setTickets(prev => prev.map(t => ({
            ...t,
            quota: data[t.id]?.quota ?? t.quota,
            remaining: data[t.id]?.remaining ?? t.remaining,
          })))
        })
        .catch(() => {})
        .finally(() => { clearTimeout(timeout); if (initial) setSlotsLoading(false) })
    }

    fetchSlots(true)
    const interval = setInterval(() => fetchSlots(), 30_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#1A8FD1] font-body">
      <SplashScreen />
      <Navbar />
      <HeroSection onGetTicket={() => {
        document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })
      }} />
      <TicketsSection tickets={tickets} loading={slotsLoading} onSelect={(ticket) => {
        setSelectedTicket(ticket)
        setModalOpen(true)
      }} />
      <BenefitsSection price={BASE_TICKETS[0].price} />
      <Footer />

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCloseWithoutProof={handleCloseWithoutProof}
        onError={handleError}
        ticket={selectedTicket}
      />

      {errorBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-red-600 text-white px-4 py-3 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>⚠️</span>
            <span>{errorBanner}</span>
          </div>
          <button onClick={() => setErrorBanner(null)} className="shrink-0 text-white/80 hover:text-white text-lg leading-none">✕</button>
        </div>
      )}

      {showSnackbar && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-sm bg-gray-900 text-white rounded-2xl shadow-2xl px-5 py-4 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-bold text-sm">Pendaftaran kamu sudah tercatat!</p>
            <button onClick={() => setShowSnackbar(false)} className="text-gray-400 hover:text-white text-lg leading-none shrink-0 -mt-0.5">✕</button>
          </div>
          <p className="text-xs text-gray-300">Belum upload bukti transfer? Hubungi CS kami untuk mendapatkan QR pembayaran yang valid:</p>
          <div className="flex gap-3 mt-2 flex-wrap">
            <a href="https://wa.me/6281270893558" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
              💬 WhatsApp
            </a>
            <a href="mailto:funrunmankom23@gmail.com"
              className="flex items-center gap-1.5 bg-[#1268A1] hover:bg-[#0e5587] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors">
              ✉️ Email
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
