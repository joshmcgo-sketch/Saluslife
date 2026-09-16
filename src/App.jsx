import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ScrollProgress from './components/ScrollProgress'
import PromoModal from './components/PromoModal'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Mission from './pages/Mission'
import StandardsPage from './pages/StandardsPage'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Submit from './pages/Submit'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <CartProvider>
      <div className="page-grain relative min-h-screen">
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/standards/equipment" element={<StandardsPage trackId="equipment" />} />
            <Route path="/standards/nutrition" element={<StandardsPage trackId="nutrition" />} />
            <Route path="/standards/household" element={<StandardsPage trackId="household" />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
        <PromoModal />
      </div>
    </CartProvider>
  )
}
