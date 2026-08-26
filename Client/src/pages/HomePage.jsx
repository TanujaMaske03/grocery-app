import { useProduct } from '../hooks/useProduct'
import SEO from '../components/common/SEO'
import HeroSection from '../components/home/HeroSection'
import CategoriesSection from '../components/home/CategoriesSection'
import FlashSale from '../components/home/FlashSale'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BestSellers from '../components/home/BestSellers'
import TrendingProducts from '../components/home/TrendingProducts'
import NewArrivals from '../components/home/NewArrivals'
import OfferBanner from '../components/home/OfferBanner'
import Testimonials from '../components/home/Testimonials'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Newsletter from '../components/home/Newsletter'
import ProductSkeleton from '../components/ui/ProductSkeleton'
import CategorySkeleton from '../components/ui/CategorySkeleton'
import TrustedBrands from '../components/Home/TrustedBrands';

const HomePage = () => {
  const { loading } = useProduct()

  return (
    <>
      <SEO
        title="GroceryStore – Fresh Groceries Delivered to Your Doorstep"
        description="Shop fresh fruits, vegetables, dairy, and more. Get groceries delivered to your doorstep with GroceryStore. Quality products at best prices."
        keywords="grocery, fresh food, online grocery, grocery delivery, organic food, fruits, vegetables"
        url="/"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container-custom">
          <HeroSection />
        </div>

        {loading ? (
          <div className="container-custom py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <CategorySkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <CategoriesSection />
        )}

        <OfferBanner />

        {loading ? (
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <FlashSale />
        )}

        {loading ? (
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <FeaturedProducts />
        )}

        {loading ? (
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <BestSellers />
        )}

        {loading ? (
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <TrendingProducts />
        )}

        {loading ? (
          <div className="container-custom py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <NewArrivals />
        )}

        <Testimonials />
        <WhyChooseUs />
        <Newsletter />
        <TrustedBrands />
      </div>
    </>
  )
}

export default HomePage