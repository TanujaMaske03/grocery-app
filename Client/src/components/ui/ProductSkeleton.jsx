import Skeleton from './Skeleton'

const ProductSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-4">
      {/* Image */}
      <Skeleton className="w-full aspect-square rounded-xl" />
      
      {/* Category */}
      <Skeleton className="w-20 h-3 mt-3" />
      
      {/* Title */}
      <Skeleton className="w-3/4 h-5 mt-2" />
      
      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-8 h-3 ml-1" />
      </div>
      
      {/* Price */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-12 h-4" />
        </div>
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    </div>
  )
}

export default ProductSkeleton