import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'

const ProductReviews = ({ reviews = [] }) => {
  const [showAll, setShowAll] = useState(false)

  const displayReviews = showAll ? reviews : reviews.slice(0, 3)

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  return (
    <div>
      {/* Rating Summary */}
      <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200">
        <div className="text-4xl font-bold text-gray-800">{averageRating}</div>
        <div>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5" />
            ))}
          </div>
          <p className="text-sm text-gray-500">{reviews.length} reviews</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayReviews.map((review, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.userName?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{review.userName || 'Anonymous'}</p>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      i < review.rating 
                        ? <StarIcon key={i} className="w-4 h-4" />
                        : <StarOutline key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400">{review.date || 'Recent'}</span>
            </div>
            <p className="text-gray-600 text-sm ml-0">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
        >
          {showAll ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  )
}

export default ProductReviews