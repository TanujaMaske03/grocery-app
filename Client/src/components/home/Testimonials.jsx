import { StarIcon } from '@heroicons/react/24/solid'

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '/images/avatars/sarah.jpg',
      rating: 5,
      comment: 'Amazing quality! The fruits are always fresh and delivery is super fast.',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/images/avatars/michael.jpg',
      rating: 5,
      comment: 'Best grocery delivery service I have used. Organic products are top-notch!',
      date: '5 days ago'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: '/images/avatars/emma.jpg',
      rating: 4,
      comment: 'Great selection and prices. Customer service is very responsive.',
      date: '1 week ago'
    }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
          ⭐ What Our Customers Say
        </h2>
        <p className="text-center text-gray-500 mb-8">Real reviews from real shoppers</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-soft p-6 card-hover">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <div className="flex text-amber-400">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-3">"{review.comment}"</p>
              <p className="text-sm text-gray-400">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials