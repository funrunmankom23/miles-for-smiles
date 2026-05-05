"use client"

import type { Step } from "@/app/page"

interface NavbarProps {
  step: Step
  onHome: () => void
}

const STEPS = [
  { key: 'home', label: 'Tickets' },
  { key: 'register', label: 'Register' },
  { key: 'payment', label: 'Payment' },
  { key: 'confirmation', label: 'Done' },
]

export function Navbar({ step, onHome }: NavbarProps) {
  const currentIndex = STEPS.findIndex(s => s.key === step)

  return (
    <nav className="sticky top-0 z-50 bg-[#1268A1] border-b-4 border-[#FFD700] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#FFE234] rounded-full flex items-center justify-center border-2 border-[#1268A1] shadow-md group-hover:scale-110 transition-transform">
            <span className="text-[10px] font-black text-[#1268A1] leading-tight text-center">MFS</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-black text-sm leading-none">MILES FOR SMILES</div>
            <div className="text-[#FFE234] text-[10px] font-bold tracking-widest">RUN FOR CHARITY 2026</div>
          </div>
        </button>

        {step !== 'home' && (
          <div className="flex items-center gap-1">
            {STEPS.slice(1).map((s, t) => {
              const r = t + 1
              const done = currentIndex > r
              const active = currentIndex === r
              return (
                <div key={s.key} className="flex items-center">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold transition-all ${active ? 'bg-[#FFE234] text-[#1268A1]' : done ? 'bg-green-400 text-white' : 'bg-white/20 text-white/60'}`}>
                    <span>{done ? '✓' : r}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {t < STEPS.length - 2 && (
                    <div className={`w-4 h-0.5 mx-1 ${done ? 'bg-green-400' : 'bg-white/30'}`} />
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="text-right">
          <div className="text-[#FFE234] text-xs font-black tracking-wider">20 JUNI 2026</div>
          <div className="text-white/70 text-[10px]">Padang, Sumatera Barat</div>
        </div>
      </div>
    </nav>
  )
}
