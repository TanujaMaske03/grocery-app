import { Link } from 'react-router-dom'

const OfferBanner = () => {
  const offers = [
    {
      id: 1,
      title: 'Summer Sale!',
      subtitle: 'Up to 50% off on fresh seasonal favorites',
      bgColor: 'from-orange-500 to-red-500',
      buttonText: 'Shop Now',
      link: '/products?promotion=summer-sale'
    },
    {
      id: 2,
      title: 'Organic Week',
      subtitle: 'Special curated offers on selected organic goods',
      bgColor: 'from-green-500 to-emerald-600',
      buttonText: 'Explore Organic',
      link: '/products?promotion=organic-week'
    },
    {
      id: 3,
      title: 'Free Delivery',
      subtitle: 'Available on eligible orders & selected items',
      bgColor: 'from-blue-500 to-indigo-600',
      buttonText: 'Order Now',
      link: '/products?promotion=free-delivery'
    }
  ]

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              to={offer.link}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${offer.bgColor} p-8 text-white shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 block`}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="text-white/90 mb-4">{offer.subtitle}</p>
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors">
                  {offer.buttonText} →
                </span>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OfferBanner