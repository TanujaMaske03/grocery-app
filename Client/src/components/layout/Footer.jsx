import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🛒 GroceryStore</h3>
            <p className="text-gray-400">Fresh groceries delivered to your doorstep</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/" className="hover:text-white">Shipping</Link></li>
              <li><Link to="/" className="hover:text-white">Returns</Link></li>
              <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +1 234 567 890</li>
              <li>✉️ info@grocerystore.com</li>
              <li>📍 123 Grocery Lane, NY</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 GroceryStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer