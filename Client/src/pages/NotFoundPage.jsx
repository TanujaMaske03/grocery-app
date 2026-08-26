import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center">
      <div className="container-custom text-center py-16">
        <div className="text-9xl font-bold text-primary-500 mb-4">404</div>
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary px-8 py-3 text-lg inline-block">
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage