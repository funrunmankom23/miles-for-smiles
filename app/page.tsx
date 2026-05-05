"use client"

import { useState, useEffect } from "react"
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
    price: 130000,
    color: '#F97316',
    perks: ['Finisher Medal', 'Event Jersey (Baju)', 'Nomor BIB', 'Random Souvenir'],
    quota: 500,
    remaining: 500,
  },
]

export default function Home() {
  const [tickets, setTickets] = useState<TicketType[]>(BASE_TICKETS)
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

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
        ticket={selectedTicket}
      />
    </div>
  )
}
