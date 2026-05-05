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
    price: 130K,
    color: '#F97316',
    perks: ['Finisher Medal', 'Jersey', 'Random Secret Souvenir', 'BIB Number'],

export default function Home() {
  const [step, setStep] = useState<Step>('home')
  const [tickets, setTickets] = useState<TicketType[]>(BASE_TICKETS)
  const [slotsLoading, setSlotsLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState('')
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    emergencyContact: '',
    shirtSize: '',
    ticket: null,
    paymentMethod: '',
  })
  const [orderId] = useState(() => 'MFS-' + Math.random().toString(36).substring(2, 8).toUpperCase())

  // Fetch live slot counts directly from Apps Script (client-side avoids server redirect issues)
  useEffect(() => {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL
    if (!scriptUrl) { setSlotsLoading(false); return }

    setSlotsLoading(true)
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
      .finally(() => { clearTimeout(timeout); setSlotsLoading(false) })
  }, [])

  const handleHome = () => {
    setStep('home')
    setFormData({ fullName: '', email: '', phone: '', dob: '', gender: '', emergencyContact: '', shirtSize: '', ticket: null, paymentMethod: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 4000)
  }

  const handlePaymentSubmit = async (paymentMethod: string) => {
    // Race condition check — slot may have been taken since page load
    if ((formData.ticket?.remaining ?? 0) <= 0) {
      showToast('Slot sudah habis! Silakan pilih kategori lain.')
      return
    }

    setSubmitting(true)
    const updated = { ...formData, paymentMethod }

    try {
      const res = await fetch('/api/register', {
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
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        showToast(data.error ?? 'Pendaftaran gagal. Silakan coba lagi.')
        return
      }

      setFormData(updated)
      setTickets(prev => prev.map(t =>
        t.id === updated.ticket?.id ? { ...t, remaining: Math.max(0, t.remaining - 1) } : t
      ))
      setStep('confirmation')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      showToast('Koneksi gagal. Periksa internet dan coba lagi.')
    } finally {
      setSubmitting(false)
    }
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
          submitting={submitting}
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

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl font-semibold text-sm flex items-center gap-2 whitespace-nowrap animate-bounce">
          ⚠️ {toast}
        </div>
      )}
    </div>
  )
}
