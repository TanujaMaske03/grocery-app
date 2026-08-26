import { useState, useEffect, useRef } from 'react';

// Brand data (you can replace with real logos)
const brands = [
  { name: 'Organic Valley', icon: '🌿' },
  { name: 'Nestlé', icon: '🍫' },
  { name: 'PepsiCo', icon: '🥤' },
  { name: 'Danone', icon: '🥛' },
  { name: "Kellogg's", icon: '🌾' },
  { name: 'Unilever', icon: '🧴' },
  // Add more if desired
];

const TrustedBrands = () => {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  // Double the array to make seamless loop
  const doubledBrands = [...brands, ...brands];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading with gradient text */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block">
            Trusted by Leading Brands
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg max-w-2xl mx-auto">
            Partnering with world-class brands to bring you the freshest groceries.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Marquee container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={marqueeRef}
            className="flex gap-8 md:gap-12 py-6 animate-marquee"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              width: 'max-content',
            }}
          >
            {doubledBrands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 p-6 md:p-8 flex items-center justify-center gap-3 min-w-[160px] md:min-w-[200px] border border-gray-100 dark:border-gray-700"
              >
                <span className="text-4xl md:text-5xl">{brand.icon}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200 text-lg md:text-xl whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>

          {/* Fade edges for smoothness */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50/90 dark:from-gray-900/90 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50/90 dark:from-gray-900/90 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Optional extra: "Why Trust Us" mini section */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-bold text-gray-800 dark:text-white">100% Authentic</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Direct from trusted suppliers</p>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
          <div className="text-3xl mb-2">🛡️</div>
          <h3 className="font-bold text-gray-800 dark:text-white">Quality Guaranteed</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Freshness and safety assured</p>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
          <div className="text-3xl mb-2">🌱</div>
          <h3 className="font-bold text-gray-800 dark:text-white">Sustainable Sourcing</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Eco-friendly and ethical</p>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;