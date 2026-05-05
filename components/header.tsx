"use client"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0284c7] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#0284c7]">
            <span className="font-display text-sm font-bold">MFS</span>
          </div>
          <div>
            <div className="font-display text-lg font-bold tracking-wide">MILES FOR SMILES</div>
            <div className="text-xs text-[#FACC15]">RUN FOR CHARITY 2026</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-lg font-bold text-[#FACC15]">7 JUNI 2026</div>
          <div className="text-xs text-sky-200">Universitas Andalas Padang, Sumatera Barat</div>
        </div>
      </div>
    </header>
  )
}
