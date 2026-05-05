"use client"

import type { TicketType } from "@/app/page"

interface TicketsSectionProps {
  tickets: TicketType[]
  loading?: boolean
  onSelect: (ticket: TicketType) => void
}

const CARD_STYLES: Record<string, { bg: string; border: string }> = {
  fun5k: { bg: 'bg-orange-50', border: 'border-orange-200' },
  run10k: { bg: 'bg-violet-50', border: 'border-violet-200' },
  hero21k: { bg: 'bg-pink-50', border: 'border-pink-200' },
}

export function TicketsSection({ tickets, loading = false, onSelect }: TicketsSectionProps) {
  return (
    <section id="tickets" className="bg-[#F0F9FF] pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-block bg-[#1268A1] text-[#FFE234] text-xs font-black tracking-[0.3em] px-5 py-2 rounded-full mb-4">
            PILIH KATEGORI
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-[#1268A1]"
            style={{ textShadow: '3px 3px 0 rgba(18,104,161,0.1)' }}
          >
            Tiket Tersedia
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-sm">
            Kategori 5K Fun Run dengan semua benefit lengkap!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-0 max-w-sm mx-auto w-full">
          {tickets.map(ticket => {
            const styles = CARD_STYLES[ticket.id]
            const r = Math.round(ticket.remaining / ticket.quota * 100)
            const almostOut = ticket.remaining < 100

            return (
              <div
                key={ticket.id}
                className={`relative rounded-3xl border-2 ${styles.border} ${styles.bg} overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col`}
              >
                <div className="h-2" style={{ backgroundColor: ticket.color }} />
                {ticket.remaining === 0 ? (
                  <div className="absolute top-4 right-4 bg-slate-500 text-white text-[10px] font-black px-2 py-1 rounded-full">
                    HABIS
                  </div>
                ) : almostOut && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">
                    HAMPIR HABIS!
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-4xl font-black leading-none" style={{ color: ticket.color }}>
                      {ticket.distance}
                    </div>
                    <div>
                      <div className="font-black text-slate-800 text-lg leading-none">{ticket.name}</div>
                      <div className="text-slate-500 text-xs mt-1">{ticket.quota} slot tersedia</div>
                    </div>
                  </div>

                  <div className="mb-5">
                    {ticket.price === 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-green-600">GRATIS</span>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Free</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-3xl font-black text-slate-800">Rp {ticket.price.toLocaleString('id-ID')}</span>
                        <div className="text-slate-400 text-xs mt-0.5">Donasi Charity</div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 mb-6">
                    {ticket.perks.map(perk => (
                      <div key={perk} className="flex items-center gap-2 text-sm text-slate-700">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0"
                          style={{ backgroundColor: ticket.color, color: 'white' }}
                        >
                          ✓
                        </div>
                        {perk}
                      </div>
                    ))}
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>{loading ? '...' : `${ticket.remaining} sisa`}</span>
                      <span>{loading ? '' : `${r}%`}</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${loading ? 'animate-pulse bg-slate-300' : ''}`}
                        style={loading ? { width: '60%' } : { width: `${r}%`, backgroundColor: ticket.color }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onSelect(ticket)}
                    disabled={loading || ticket.remaining === 0}
                    className="w-full py-3.5 rounded-2xl font-black text-white text-sm [box-shadow:0_4px_0_var(--shadow-color)] transition-[transform,box-shadow] duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:opacity-90 active:translate-y-1 active:shadow-none"
                    style={{ backgroundColor: ticket.color, '--shadow-color': `${ticket.color}88` } as React.CSSProperties}
                  >
                    {loading ? 'Memuat...' : ticket.remaining === 0 ? 'Slot Habis' : `Daftar ${ticket.distance} →`}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
