export function Footer() {
  return (
    <footer className="bg-[#0e5587] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-black text-[#FFE234] text-lg mb-1">MILES FOR SMILES</div>
            <div className="text-white/60 text-xs font-bold tracking-widest mb-3">RUN FOR CHARITY 2026</div>
            <p className="text-white/70 text-sm leading-relaxed">
              Berlari untuk senyum. Setiap langkah membawa harapan bagi anak-anak yang membutuhkan.
            </p>
          </div>
          <div>
            <div className="font-black text-white text-sm mb-3 uppercase tracking-wider">Informasi Event</div>
            <div className="space-y-2 text-sm text-white/70">
              <div>📅 7 Juni 2026</div>
              <div>📍 Universitas Andalas Padang, Sumatera Barat</div>
              <div>⏰ Flag off: 06:00 WIB</div>
              <div>🏃 5K Fun Run</div>
            </div>
          </div>
          <div>
            <div className="font-black text-white text-sm mb-3 uppercase tracking-wider">Hubungi Kami</div>
            <div className="space-y-2 text-sm text-white/70">
              <div>📧 funrunmankom23@gmail.com</div>
              <div>📱 WA: 0812-7089-3558</div>
              <div>📷 @milesforsmiles2026</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/50 text-xs">© 2026 Miles for Smiles. Semua hak cipta dilindungi.</div>
          <div className="flex items-center gap-4">
            <a href="/tnc" className="text-white/50 hover:text-white/80 text-xs transition-colors">Syarat &amp; Ketentuan</a>
            <a href="/privacy" className="text-white/50 hover:text-white/80 text-xs transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
