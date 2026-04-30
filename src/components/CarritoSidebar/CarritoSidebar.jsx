import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CarritoSidebar = ({ isOpen, onClose, carrito, setCarrito }) => {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const irAlCheckout = () => {
    onClose()
    navigate('/checkout', { state: { carrito } })
    setCarrito([])
  }

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev =>
      prev
        .map(item => item._id === id ? { ...item, cantidad: item.cantidad + delta } : item)
        .filter(item => item.cantidad > 0)
    )
  }

  const parsearPrecio = (precio) => Number(precio.replace(/[$\.]/g, '').replace(',', '.'))

  const total = carrito.reduce((acc, item) => acc + parsearPrecio(item.price) * item.cantidad, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Panel lateral */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-[#60804F]">Mi carrito</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-[#60804F] transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {carrito.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="h-16 w-16 text-slate-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p className="text-slate-400 text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {carrito.map(item => (
                <li key={item._id} className="flex items-center gap-3">
                  <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{item.name}</p>
                    <p className="text-xs text-[#8fbc6a] font-bold">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => cambiarCantidad(item._id, -1)}
                      className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold flex items-center justify-center transition-colors"
                    >−</button>
                    <span className="w-5 text-center text-sm font-semibold text-slate-700">{item.cantidad}</span>
                    <button
                      onClick={() => cambiarCantidad(item._id, 1)}
                      className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold flex items-center justify-center transition-colors"
                    >+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100">
          <div className="flex justify-between text-sm font-semibold text-[#60804F] mb-4">
            <span>Total</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>

          <button
            onClick={irAlCheckout}
            disabled={carrito.length === 0}
            className="w-full bg-[#8fbc6a] text-white py-2.5 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#60804F]"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  )
}

export default CarritoSidebar
