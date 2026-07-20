import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />

          <Route path="products" element={<Products />} />

          <Route
            path="products/:id"
            element={<ProductDetails />}
          />

          <Route path="cart" element={<Cart />} />

          <Route path="wishlist" element={<Wishlist />} />

          <Route
            path="checkout"
            element={<Checkout />}
          />

          <Route path="login" element={<Login />} />

          <Route
            path="register"
            element={<Register />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />

          <Route path="about" element={<About />} />

          <Route
            path="contact"
            element={<Contact />}
          />

        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;