const BENEFITS = [
  { emoji: '👕', title: 'Running Jersey', desc: 'Kaos lari eksklusif Miles for Smiles 2026' },
  { emoji: '🥇', title: 'Finisher Medal', desc: 'Medali finisher untuk setiap peserta' },
  { emoji: '🔢', title: 'Nomor BIB', desc: 'Nomor peserta resmi' },
  { emoji: '🎟️', title: 'Akses Hiburan dan Booth Tenant', desc: 'Peserta dapat menikmati hiburan dan mengunjungi booth yang ada' },
]

export function BenefitsSection({ price }: { price: number }) {
  return (
    <section className="bg-[#1268A1] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-black text-white mb-8 tracking-wide">
          BENEFIT PESERTA
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {BENEFITS.map(item => (
            <div key={item.title} className="bg-white/10 rounded-2xl p-5 text-center">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <div className="font-black text-[#FFE234] text-sm mb-1">{item.title}</div>
              <div className="text-white/70 text-xs">{item.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-white/80 text-sm font-medium">
          Harga Pendaftaran:{' '}
          <span className="font-black text-[#FFE234] text-lg">
            Rp {price.toLocaleString('id-ID')}
          </span>
        </p>
      </div>
    </section>
  )
}
