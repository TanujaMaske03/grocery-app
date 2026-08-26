import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Fresh Groceries',
      subtitle: 'Delivered to Your Doorstep',
      description: 'Get the freshest fruits, vegetables, and daily essentials',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      icon: '🥬', // ✅ नवीन
      bgColor: 'from-blue-500 via-blue-600 to-indigo-700', // ✅ ग्रेडिएंट अपग्रेड
    },
    {
      id: 2,
      title: 'Organic Products',
      subtitle: '100% Natural & Healthy',
      description: 'Choose from our wide range of organic groceries',
      buttonText: 'Explore Organic',
      buttonLink: '/products?category=organic',
      icon: '🌱',
      bgColor: 'from-green-500 via-emerald-600 to-teal-700',
    },
    {
      id: 3,
      title: 'Daily Deals',
      subtitle: 'Up to 50% Off',
      description: 'Grab the best deals on your favorite products',
      buttonText: 'View Deals',
      buttonLink: '/products?deal=true',
      icon: '🏷️',
      bgColor: 'from-orange-500 via-amber-600 to-red-600',
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
      {/* Slides */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              index === currentSlide
                ? 'opacity-100 translate-x-0 scale-100'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full scale-95'
                : 'opacity-0 translate-x-full scale-95'
            }`}
            style={{ transition: 'transform 0.8s ease, opacity 0.8s ease' }}
          >
            <div 
              className={`h-full bg-gradient-to-r ${slide.bgColor} flex items-center relative overflow-hidden`}
            >
              {/* ✅ डेकोरेटिव्ह सर्कल्स */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

              {/* ✅ मोठा आयकॉन/इमोजी उजव्या बाजूला */}
              <div className="absolute right-8 bottom-8 md:right-12 md:bottom-12 text-8xl md:text-9xl opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-6">
                {slide.icon}
              </div>

              <div className="container-custom relative z-10">
                <div className="max-w-2xl text-white">
                  <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 animate-fade-in">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8 animate-slide-up">
                    {slide.description}
                  </p>
                  <Link 
                    to={slide.buttonLink}
                    className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-white/30"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSection