import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const ESTADO_LABELS = {
  pendiente:  'Pendiente',
  confirmado: 'Confirmado',
  enviado:    'Enviado',
  entregado:  'Entregado',
  finalizado: 'Finalizado',
  cancelado:  'Cancelado',
}

const ESTADO_COLORS = {
  pendiente:  'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-blue-100 text-blue-800',
  enviado:    'bg-purple-100 text-purple-800',
  entregado:  'bg-green-100 text-green-800',
  finalizado: 'bg-[#60804F]/20 text-[#60804F]',
  cancelado:  'bg-red-100 text-red-700',
}

export default function MiCuenta() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [pedidoAbierto, setPedidoAbierto] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('usuario')
    if (!stored) { navigate('/login'); return }
    const u = JSON.parse(stored)
    setUsuario(u)

    axios.get(`${API_URL}/api/pedidos/usuario/${u.id}`)
      .then(res => setPedidos(res.data))
      .catch(() => setPedidos([]))
      .finally(() => setCargando(false))
  }, [navigate])

  if (!usuario) return null

  return (
    <div className="min-h-[85vh] bg-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#60804F]">Mi cuenta</h1>
            <p className="text-sm text-slate-400">Hola, <span className="capitalize font-medium text-slate-500">{usuario.nombre}</span></p>
          </div>
        </div>

        {/* Datos del usuario */}
        <div className="rounded-xl border border-[#60804F]/20 overflow-hidden">
          <div className="bg-[#60804F]/10 px-5 py-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#60804F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-sm font-semibold text-[#60804F] uppercase tracking-wide">Mis datos</h2>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="flex justify-between px-5 py-3 text-sm">
              <span className="text-[#8fbc6a] font-medium">Nombre</span>
              <span className="text-slate-700 capitalize">{usuario.nombre}</span>
            </div>
            <div className="flex justify-between px-5 py-3 text-sm">
              <span className="text-[#8fbc6a] font-medium">Email</span>
              <span className="text-slate-700">{usuario.email}</span>
            </div>
            <div className="flex justify-between px-5 py-3 text-sm">
              <span className="text-[#8fbc6a] font-medium">Tipo de cuenta</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${usuario.rol === 'admin' ? 'bg-[#60804F]/20 text-[#60804F]' : 'bg-slate-100 text-slate-500'}`}>
                {usuario.rol === 'admin' ? 'Administrador' : 'Cliente'}
              </span>
            </div>
          </div>
        </div>

        {/* Pedidos */}
        <div className="rounded-xl border border-[#60804F]/20 overflow-hidden">
          <div className="bg-[#60804F]/10 px-5 py-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#60804F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-sm font-semibold text-[#60804F] uppercase tracking-wide">Mis pedidos</h2>
            {!cargando && <span className="ml-auto text-xs text-slate-400">{pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}</span>}
          </div>

          {cargando ? (
            <p className="px-5 py-6 text-sm text-slate-400">Cargando pedidos...</p>
          ) : pedidos.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-slate-400 text-sm">Todavía no realizaste ningún pedido.</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 text-sm font-semibold text-[#8fbc6a] hover:text-[#60804F] transition-colors"
              >
                Ver catálogo →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pedidos.map(p => (
                <div key={p._id}>
                  {/* Fila resumen */}
                  <button
                    onClick={() => setPedidoAbierto(pedidoAbierto === p._id ? null : p._id)}
                    className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[#60804F] text-sm">#{p.nroOrden}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ESTADO_COLORS[p.estado] ?? 'bg-slate-100 text-slate-500'}`}>
                          {ESTADO_LABELS[p.estado] ?? p.estado}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {new Date(p.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        {' · '}
                        {p.items?.length} producto{p.items?.length !== 1 ? 's' : ''}
                        {' · '}
                        {p.datosEnvio?.modalidad === 'retiro' ? 'Retiro en local' : 'Envío a domicilio'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-[#60804F] text-sm">${p.total?.toLocaleString('es-AR')}</p>
                      <svg
                        className={`w-4 h-4 text-slate-400 ml-auto mt-1 transition-transform duration-200 ${pedidoAbierto === p._id ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Detalle expandible */}
                  {pedidoAbierto === p._id && (
                    <div className="px-5 pb-4 bg-slate-50 border-t border-slate-100">
                      <ul className="divide-y divide-slate-200 mb-3 mt-3">
                        {p.items?.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 py-2.5">
                            {item.productoId?.img && (
                              <img src={item.productoId.img} alt={item.nombre} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-700 truncate">{item.nombre}</p>
                              <p className="text-xs text-slate-400">x{item.cantidad}</p>
                            </div>
                            <p className="text-sm font-semibold text-[#60804F] shrink-0">
                              ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between text-sm font-bold text-[#60804F] border-t border-slate-200 pt-3">
                        <span>Total</span>
                        <span>${p.total?.toLocaleString('es-AR')}</span>
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        <span>📍 {p.datosEnvio?.direccion}, {p.datosEnvio?.ciudad}, {p.datosEnvio?.provincia}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volver */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 rounded-md border border-[#60804F]/30 text-sm font-semibold text-[#60804F] hover:bg-[#60804F]/5 transition-colors"
        >
          Volver al inicio
        </button>

      </div>
    </div>
  )
}
