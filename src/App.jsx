import './App.css'
import BarraNav from './components/BarraNav/BarraNav.jsx'
import BannerPromo from './components/BannerPromo/BannerPromo.jsx'
import Footer from './components/Footer/Footer.jsx'
import CarritoSidebar from './components/CarritoSidebar/CarritoSidebar.jsx'
import Toast from './components/Toast/Toast.jsx'
import Home from './pages/Home/Home.jsx'
import LoginScreen from './pages/Login/Login.jsx'
import RegisterScreen from './pages/Register/Register.jsx'
import RegisterConfirmacionScreen from './pages/Register/RegisterConfirmacion.jsx'
import CheckoutScreen from './pages/Checkout/Checkout.jsx'
import ConfirmacionScreen from './pages/Checkout/Confirmacion.jsx'
import AdminScreen from './pages/Admin/Admin.jsx'
import MiCuentaScreen from './pages/MiCuenta/MiCuenta.jsx'
import FaqsScreen from './pages/Faqs/Faqs.jsx'
import NotFoundScreen from './pages/NotFound/NotFound.jsx'
import ErrorScreen from './pages/Error/Error.jsx'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [carrito, setCarrito] = useState([])
  const [carritoOpen, setCarritoOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const navigate = useNavigate()

  // Interceptor global de axios — redirige a /error en errores 500
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      res => res,
      err => {
        if (err.response?.status === 500) {
          navigate('/error')
        }
        return Promise.reject(err)
      }
    )
    return () => axios.interceptors.response.eject(interceptor)
  }, [navigate])

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item._id === producto._id)
      if (existe) {
        return prev.map(item =>
          item._id === producto._id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  return (
    <>
      <ScrollToTop />
      <div className="sticky top-0 z-50">
        <BarraNav onAbrirCarrito={() => setCarritoOpen(true)} carrito={carrito} />
        <BannerPromo />
      </div>
      <Routes>
        <Route path="/" element={<Home onAgregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/registro/confirmacion" element={<RegisterConfirmacionScreen />} />
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/checkout/confirmacion" element={<ConfirmacionScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/mi-cuenta" element={<MiCuentaScreen />} />
        <Route path="/faqs" element={<FaqsScreen />} />
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
      <Footer />
      <CarritoSidebar
        isOpen={carritoOpen}
        onClose={() => setCarritoOpen(false)}
        carrito={carrito}
        setCarrito={setCarrito}
      />
      <Toast visible={toastVisible} />
    </>
  )
}


