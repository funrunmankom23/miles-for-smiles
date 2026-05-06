"use client"

import Image from "next/image"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#1268A1] border-b-4 border-[#FFD700] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFE234] shadow-md group-hover:scale-110 transition-transform shrink-0">
            <Image src="/icon.png" alt="Miles for Smiles" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-black text-sm leading-none">MILES FOR SMILES</div>
            <div className="text-[#FFE234] text-[10px] font-bold tracking-widest">RUN FOR CHARITY 2026</div>
          </div>
        </button>

        <div className="text-right">
          <div className="text-[#FFE234] text-xs font-black tracking-wider">7 JUNI 2026</div>
          <div className="text-white/70 text-[10px]">Padang, Sumatera Barat</div>
        </div>
      </div>
    </nav>
  )
}
