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
              <div>📅 20 Juni 2026</div>
              <div>📍 Padang, Sumatera Barat</div>
              <div>⏰ Flag off: 05:30 WIB</div>
              <div>🏃 5K · 10K · 21K</div>
            </div>
          </div>
          <div>
            <div className="font-black text-white text-sm mb-3 uppercase tracking-wider">Hubungi Kami</div>
            <div className="space-y-2 text-sm text-white/70">
              <div>📧 info@milesforsmiles.id</div>
              <div>📱 WA: 0812-3456-7890</div>
              <div>📷 @milesforsmiles2026</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-white/50 text-xs">© 2026 Miles for Smiles. Semua hak cipta dilindungi.</div>
          <div className="text-white/50 text-xs">❤️ 100% donasi disalurkan ke yayasan pendidikan anak</div>
        </div>
      </div>
    </footer>
  )
}
