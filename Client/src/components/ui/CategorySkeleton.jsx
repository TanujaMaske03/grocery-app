import Skeleton from './Skeleton'

const CategorySkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-4 text-center">
      <Skeleton className="w-full aspect-square rounded-xl" />
      <Skeleton className="w-3/4 h-4 mx-auto mt-3" />
      <Skeleton className="w-1/2 h-3 mx-auto mt-1" />
    </div>
  )
}

export default CategorySkeleton