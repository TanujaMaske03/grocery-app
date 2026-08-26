import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'  // ✅ Import SEO

const AboutPage = () => {
  const team = [
    { 
      name: 'Tanuja Maske', 
      role: 'Founder & CEO', 
      image: '/images/avatar.jpg',
      description: '15+ years in retail and supply chain management'
    },
    { 
      name: 'Rahul Sharma', 
      role: 'Co-Founder & COO', 
      image: '/images/avatar2.jpg',
      description: 'Expert in logistics and operations'
    },
    { 
      name: 'Priya Patel', 
      role: 'Head of Procurement', 
      image: '/images/avatar3.jpg',
      description: 'Specializes in sourcing quality products'
    },
    { 
      name: 'Amit Kumar', 
      role: 'Customer Experience Lead', 
      image: '/images/avatar4.jpg',
      description: 'Ensuring 100% customer satisfaction'
    }
  ]

  return (
    <>
      {/* ✅ Add SEO Tags */}
      <SEO
        title="About GroceryStore – Our Story, Mission & Values"
        description="Learn about GroceryStore – our mission to deliver fresh groceries, our values, and the team behind India's trusted online grocery store."
        keywords="about grocery, grocery store mission, fresh food delivery, organic groceries, online grocery store India"
        url="/about"
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">  {/* ✅ Added dark: */}
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <div className="text-sm breadcrumbs text-gray-500 dark:text-gray-400 mb-6">  {/* ✅ Added dark: */}
            <ul className="flex space-x-2">
              <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link></li>
              <li>/</li>
              <li className="text-gray-700 dark:text-gray-300 font-medium">About</li>
            </ul>
          </div>

          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About GroceryStore</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're on a mission to make grocery shopping easier, faster, and more delightful.
            </p>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 text-center card-hover">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Delivering fresh, quality groceries to every doorstep with speed and care.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 text-center card-hover">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">To become India's most trusted online grocery platform.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 text-center card-hover">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Our Values</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Quality, Trust, Speed, and Customer First always.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-primary-50 dark:bg-primary-900/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Happy Customers</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">1000+</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Products</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100+</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Brands</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4.8★</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Average Rating</p>
            </div>
          </div>

          {/* Team */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Meet Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 text-center card-hover">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage