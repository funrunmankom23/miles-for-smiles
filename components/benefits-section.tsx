export function BenefitsSection() {
  const items = [
    {
      emoji: '🥇',
      title: 'Finisher Medal',
      desc: 'Setiap peserta mendapatkan finisher medal eksklusif',
    },
    {
      emoji: '👕',
      title: 'Event T-Shirt',
      desc: 'Kaos resmi Miles for Smiles 2026 untuk semua peserta',
    },
    {
      emoji: '❤️',
      title: '100% untuk Charity',
      desc: 'Seluruh donasi disalurkan ke yayasan pendidikan anak',
    },
  ]

  return (
    <section className="bg-[#1e3a5f] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mb-3 text-4xl">{item.emoji}</div>
              <h3 className="mb-2 font-bold text-[#FFE234]">{item.title}</h3>
              <p className="text-sm text-sky-200">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
