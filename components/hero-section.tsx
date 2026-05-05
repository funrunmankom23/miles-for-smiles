"use client"

interface HeroSectionProps {
  onGetTicket: () => void
}

export function HeroSection({ onGetTicket }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#FFE234]/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 -right-10 w-56 h-56 bg-[#FF6B6B]/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#4ECDC4]/20 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 text-center">
        {/* Badge */}
        <div className="inline-block mb-8 animate-bounce" style={{ animationDuration: '2s' }}>
          <div className="bg-[#FFE234] text-[#1268A1] text-xs font-black tracking-[0.3em] uppercase px-6 py-2 rounded-full border-4 border-white shadow-xl">
            ★ RUN FOR CHARITY ★
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="font-display text-white leading-none">
            <span
              className="block text-[4rem] sm:text-[7rem] font-black tracking-tight drop-shadow-2xl"
              style={{ WebkitTextStroke: '3px #FFE234', textShadow: '6px 6px 0 #1268A1, 8px 8px 0 rgba(0,0,0,0.2)' }}
            >
              MILES
            </span>
            <span
              className="block text-[2rem] sm:text-[3.5rem] font-black text-[#FFE234] tracking-widest my-1"
              style={{ textShadow: '3px 3px 0 #1268A1' }}
            >
              for
            </span>
            <span
              className="block text-[4rem] sm:text-[7rem] font-black tracking-tight"
              style={{ color: '#FF6B6B', WebkitTextStroke: '3px #FFE234', textShadow: '6px 6px 0 #1268A1, 8px 8px 0 rgba(0,0,0,0.2)' }}
            >
              SMILES
            </span>
          </h1>
          <div className="text-white/90 text-xl sm:text-3xl font-black tracking-[0.2em] mt-2" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
            2026
          </div>
        </div>

        {/* Info badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: '📅', text: '20 Juni 2026' },
            { icon: '📍', text: 'Padang, Sumbar' },
            { icon: '🏃', text: '5K · 10K · 21K' },
            { icon: '❤️', text: 'Run for Charity' },
          ].map(item => (
            <div key={item.text} className="bg-white/20 backdrop-blur-sm border border-white/40 text-white font-bold text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-colors">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetTicket}
          className="group relative inline-flex items-center gap-3 bg-[#FFE234] text-[#1268A1] font-black text-xl px-10 py-5 rounded-2xl [box-shadow:0_8px_0_#c9a800,0_12px_20px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 active:[box-shadow:none] active:translate-y-2 transition-[transform,box-shadow] duration-75"
        >
          <span className="text-2xl">🎟️</span>
          <span>DAFTAR SEKARANG</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
          <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full border-2 border-white animate-bounce">
            GRATIS!
          </div>
        </button>

        <p className="text-white/70 text-sm mt-5">Tiket terbatas · Daftar sekarang sebelum kehabisan</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-12">
          {[
            { value: '950', label: 'Slot Total' },
            { value: '3', label: 'Kategori' },
            { value: '100%', label: 'Charity' },
          ].map(item => (
            <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-[#FFE234] text-2xl font-black">{item.value}</div>
              <div className="text-white/80 text-xs font-semibold mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-center animate-bounce">
        <div className="text-xs mb-1">scroll</div>
        <div>↓</div>
      </div>
    </section>
  )
}
