"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TicketsSection } from "@/components/tickets-section"
import { RegisterForm } from "@/components/register-form"
import { PaymentSection } from "@/components/payment-section"
import { ConfirmationSection } from "@/components/confirmation-section"
import { Footer } from "@/components/footer"

export type Step = 'home' | 'register' | 'payment' | 'confirmation'

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

export interface FormData {
  fullName: string
  email: string
  phone: string
  dob: string
  gender: string
  emergencyContact: string
  shirtSize: string
  ticket: TicketType | null
  paymentMethod: string
}

const BASE_TICKETS: TicketType[] = [
  {
    id: 'fun5k',
    name: 'Fun Run',
    distance: '5K',
    price: 0,
    color: '#F97316',
    perks: ['Finisher Medal', 'Event T-Shirt', 'Snack Pack', 'BIB Number'],
    quota: 500,
    remaining: 187,
  },
  {
    id: 'run10k',
    name: 'Charity Run',
    distance: '10K',
    price: 75000,
    color: '#8B5CF6',
    perks: ['Finisher Medal', 'Event T-Shirt', 'Snack Pack', 'BIB Number', 'Certificate'],
    quota: 300,
    remaining: 92,
  },
  {
    id: 'hero21k',
    name: 'Hero Run',
    distance: '21K',
    price: 150000,
    color: '#EC4899',
    perks: ['Finisher Medal', 'Premium Jacket', 'Goodie Bag', 'BIB Number', 'Certificate', 'Priority Start'],
    quota: 150,
    remaining: 43,
  },
]

export default function Home() {
  const [step, setStep] = useState<Step>('home')
  const [tickets, setTickets] = useState<TicketType[]>(BASE_TICKETS)
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    emergencyContact: '',
    shirtSize: '',
    ticket: null,
    paymentMethod: '',
  })
  const [orderId] = useState(() => 'MFS-' + Math.random().toString(36).substring(2, 8).toUpperCase())

  // Fetch live slot counts on mount
  useEffect(() => {
    setSlotsLoading(true)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000) // 5s timeout

    fetch('/api/slots', { signal: controller.signal })
      .then(r => r.json())
      .then((data: Record<string, { quota: number; remaining: number }>) => {
        setTickets(prev => prev.map(t => ({
          ...t,
          quota: data[t.id]?.quota ?? t.quota,
          remaining: data[t.id]?.remaining ?? t.remaining,
        })))
      })
      .catch(() => {}) // silently fall back to defaults on timeout/error
      .finally(() => { clearTimeout(timeout); setSlotsLoading(false) })
  }, [])

  const handleHome = () => {
    setStep('home')
    setFormData({ fullName: '', email: '', phone: '', dob: '', gender: '', emergencyContact: '', shirtSize: '', ticket: null, paymentMethod: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePaymentSubmit = async (paymentMethod: string) => {
    const updated = { ...formData, paymentMethod }
    setFormData(updated)

    // Submit to Google Sheets (non-blocking — don't stop user flow on failure)
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        fullName: updated.fullName,
        email: updated.email,
        phone: updated.phone,
        dob: updated.dob,
        gender: updated.gender,
        emergencyContact: updated.emergencyContact,
        shirtSize: updated.shirtSize,
        ticketId: updated.ticket?.id,
        ticketName: updated.ticket?.name,
        ticketDistance: updated.ticket?.distance,
        paymentMethod,
        totalPrice: updated.ticket?.price === 0 ? 'Gratis' : `Rp ${updated.ticket?.price.toLocaleString('id-ID')}`,
      }),
    }).catch(err => console.error('Failed to save registration:', err))

    // Decrement slot count locally immediately
    setTickets(prev => prev.map(t =>
      t.id === updated.ticket?.id ? { ...t, remaining: Math.max(0, t.remaining - 1) } : t
    ))

    setStep('confirmation')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#1A8FD1] font-body">
      <Navbar step={step} onHome={handleHome} />
      {step === 'home' && (
        <>
          <HeroSection onGetTicket={() => {
            document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })
          }} />
          <TicketsSection tickets={tickets} loading={slotsLoading} onSelect={(ticket) => {
            setFormData(prev => ({ ...prev, ticket }))
            setStep('register')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }} />
        </>
      )}
      {step === 'register' && formData.ticket && (
        <RegisterForm
          ticket={formData.ticket}
          onSubmit={(data) => {
            setFormData(prev => ({ ...prev, ...data }))
            setStep('payment')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onBack={() => setStep('home')}
        />
      )}
      {step === 'payment' && formData.ticket && (
        <PaymentSection
          formData={formData}
          onSubmit={handlePaymentSubmit}
          onBack={() => setStep('register')}
        />
      )}
      {step === 'confirmation' && (
        <ConfirmationSection
          formData={formData}
          orderId={orderId}
          onHome={handleHome}
        />
      )}
      <Footer />
    </div>
  )
}
