const Brands = () => {
  const brands = [
    { id: 1, name: 'Organic Valley', logo: '/images/brands/organic-valley.png' },
    { id: 2, name: 'Nestlé', logo: '/images/brands/nestle.png' },
    { id: 3, name: 'PepsiCo', logo: '/images/brands/pepsico.png' },
    { id: 4, name: 'Danone', logo: '/images/brands/danone.png' },
    { id: 5, name: 'Kellogg\'s', logo: '/images/brands/kelloggs.png' },
    { id: 6, name: 'Unilever', logo: '/images/brands/unilever.png' }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Trusted by Leading Brands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands