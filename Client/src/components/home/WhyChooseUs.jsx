import { 
  TruckIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline'

const WhyChooseUs = () => {
  const features = [
    {
      icon: TruckIcon,
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹4000'
    },
    {
      icon: ShieldCheckIcon,
      title: '100% Organic',
      description: 'Certified organic products'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Best Prices',
      description: 'Price match guarantee'
    },
    {
      icon: ClockIcon,
      title: '30-Min Delivery',
      description: 'Express delivery service'
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
          Why Choose GroceryStore?
        </h2>
        <p className="text-center text-gray-500 mb-8">We make grocery shopping easy and convenient</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="inline-block p-4 bg-primary-50 rounded-full text-primary-600 mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs