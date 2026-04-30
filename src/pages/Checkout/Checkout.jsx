import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const parsearPrecio = (precio) => Number(precio.replace(/[$\.]/g, '').replace(',', '.'))

export default function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const carrito = state?.carrito ?? []
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const [form, setForm] = useState({
    nombre: usuario?.nombre ?? '',
    email: usuario?.email ?? '',
    direccion: '',
    ciudad: '',
    provincia: 'Córdoba',
    cp: '',
  })
  const [modalidad, setModalidad] = useState('envio')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const total = carrito.reduce(
    (acc, item) => acc + parsearPrecio(item.price) * item.cantidad, 0
  )

  const handleConfirmar = async (e) => {
    e.preventDefault()
    setError('')

    const { nombre, email, direccion, ciudad, provincia, cp } = form
    if (!nombre || !email || !direccion || !ciudad || !provincia || !cp) {
      setError('Por favor completá todos los campos.')
      return
    }

    const items = carrito.map(item => ({
      productoId: item._id,
      nombre: item.name,
      precio: parsearPrecio(item.price),
      cantidad: item.cantidad,
    }))

    setCargando(true)
    try {
      await axios.post(`${API_URL}/api/pedidos`, {
        ...(usuario ? { usuarioId: usuario.id } : {}),
        items,
        total,
        datosEnvio: { ...form, modalidad },
      }, { timeout: 15000 })
      navigate('/checkout/confirmacion', {
        replace: true,
        state: { form: { ...form, modalidad }, carrito, total }
      })
    } catch (err) {
      console.error(err)
      setError('Hubo un error al procesar el pedido. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  if (carrito.length === 0) {
    return (
      <div className="min-h-[85vh] bg-white flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-slate-400">No hay productos en el carrito.</p>
        <button
          onClick={() => navigate('/')}
          className="flex w-full max-w-xs justify-center rounded-md bg-[#8fbc6a] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#60804F] transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[85vh] bg-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/Logo-LetrasVerdes.png" alt="Logo" className="w-28 h-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* ── Columna izquierda: Formulario ── */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold tracking-tight text-[#60804F] mb-1">
              Finalizar compra
            </h2>
            <p className="text-[#8fbc6a] text-sm mb-6">
              Completá tus datos para coordinar el pedido.
            </p>

            <form className="space-y-4" onSubmit={handleConfirmar}>
              <div>
                <label className="block text-sm font-medium text-[#8fbc6a] mb-1">Nombre completo</label>
                <input
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8fbc6a] mb-1">Correo electrónico</label>
                <input
                  name="email"
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8fbc6a] mb-1">Dirección</label>
                <input
                  name="direccion"
                  type="text"
                  placeholder="Calle y número"
                  value={form.direccion}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition text-base sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#8fbc6a] mb-1">Ciudad</label>
                  <input
                    name="ciudad"
                    type="text"
                    placeholder="Ciudad"
                    value={form.ciudad}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8fbc6a] mb-1">Código postal</label>
                  <input
                    name="cp"
                    type="text"
                    placeholder="X0000"
                    value={form.cp}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition text-base sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8fbc6a] mb-1">Provincia</label>
                <input
                  name="provincia"
                  type="text"
                  value={form.provincia}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-[#60804F]/30 bg-white py-2.5 px-4 text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition text-base sm:text-sm"
                />
              </div>

              {/* Envío o retiro */}
              <div>
                <label className="block text-sm font-medium text-[#8fbc6a] mb-2">Modalidad de entrega</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'envio', label: '🚚 Envío a domicilio' },
                    { value: 'retiro', label: '🏪 Retiro en local' },
                  ].map(op => (
                    <button
                      key={op.value}
                      type="button"
                      onClick={() => setModalidad(op.value)}
                      className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors ${
                        modalidad === op.value
                          ? 'border-[#60804F] bg-[#60804F]/10 text-[#60804F]'
                          : 'border-[#60804F]/30 text-slate-500 hover:bg-[#60804F]/5'
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={cargando}
                className="flex w-full justify-center rounded-md bg-[#8fbc6a] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#60804F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
              >
                {cargando ? 'Procesando...' : 'Confirmar pedido'}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex w-full justify-center rounded-md border border-[#60804F]/30 px-3 py-2.5 text-sm font-semibold text-[#60804F] hover:bg-[#60804F]/5 transition-colors"
              >
                Volver al carrito
              </button>
            </form>
          </div>

          {/* ── Columna derecha: Resumen ── */}
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#60804F] mb-1">
              Tu pedido
            </h2>
            <p className="text-[#8fbc6a] text-sm mb-6">
              {carrito.reduce((acc, i) => acc + i.cantidad, 0)} producto{carrito.reduce((acc, i) => acc + i.cantidad, 0) !== 1 ? 's' : ''}
            </p>

            <div className="rounded-lg border border-[#60804F]/30 shadow-sm overflow-hidden mb-4">
              <ul className="divide-y divide-[#60804F]/15">
                {carrito.map(item => (
                  <li key={item._id} className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-700 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.unit}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-slate-400 mb-0.5">x{item.cantidad}</p>
                      <p className="text-sm font-bold text-[#60804F]">
                        ${(parsearPrecio(item.price) * item.cantidad).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[#60804F]/30 shadow-sm overflow-hidden">
              <div className="flex justify-between px-4 py-3 bg-[#60804F]/5">
                <span className="font-bold text-[#60804F]">Total</span>
                <span className="font-bold text-[#60804F] text-lg">${total.toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
