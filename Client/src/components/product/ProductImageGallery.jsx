import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const ProductImageGallery = ({ images = [], productName }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // If no images, use placeholder
  const productImages = images.length > 0 
    ? images 
    : ['/images/placeholder.jpg']

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={productImages[activeImage]}
          alt={`${productName} - Image ${activeImage + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
        
        {/* Navigation Arrows */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
          {activeImage + 1} / {productImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {productImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                activeImage === index
                  ? 'border-primary-500 shadow-md'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg'
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery