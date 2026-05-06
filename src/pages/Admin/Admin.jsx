import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

const ESTADO_LABELS = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  enviado: 'Enviado',
  entregado: 'Entregado',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
}

const ESTADO_COLORS = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmado: 'bg-blue-100 text-blue-800',
  enviado: 'bg-purple-100 text-purple-800',
  entregado: 'bg-green-100 text-green-800',
  finalizado: 'bg-[#60804F]/20 text-[#60804F]',
  cancelado: 'bg-red-100 text-red-800',
}

// ── Modal genérico ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:px-4">
      <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl w-full sm:max-w-lg max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h3 className="text-base font-bold text-[#60804F]">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}

// ── Campo de formulario ────────────────────────────────────────────────────────
function Campo({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#8fbc6a] mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputClass = "block w-full rounded-lg border border-[#60804F]/30 bg-white py-2 px-3 text-slate-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#60804F] focus:border-transparent transition"

// ── Confirmación eliminar ──────────────────────────────────────────────────────
function ConfirmarEliminar({ nombre, onConfirmar, onCancelar }) {
  return (
    <Modal title="Confirmar eliminación" onClose={onCancelar}>
      <p className="text-slate-600 mb-6 text-sm">¿Estás seguro que querés eliminar <strong>{nombre}</strong>? Esta acción no se puede deshacer.</p>
      <div className="flex gap-3">
        <button onClick={onCancelar} className="flex-1 py-2.5 rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancelar</button>
        <button onClick={onConfirmar} className="flex-1 py-2.5 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">Eliminar</button>
      </div>
    </Modal>
  )
}

// ── Fila info en cards ─────────────────────────────────────────────────────────
function InfoRow({ label, children }) {
  return (
    <div className="flex justify-between items-start gap-2 text-sm">
      <span className="text-slate-400 shrink-0">{label}</span>
      <span className="text-slate-700 text-right">{children}</span>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB PRODUCTOS
// ══════════════════════════════════════════════════════════════════════════════
function TabProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [modal, setModal] = useState(null)
  const [seleccionado, setSeleccionado] = useState(null)
  const [form, setForm] = useState({ name: '', img: '', imgPosition: 'object-center', price: '', unit: 'por kg', badge: '', description: '', stock: 0 })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const { data } = await axios.get(`${API}/api/admin/productos`, authHeader())
      setProductos(data)
    } catch { setProductos([]) }
    finally { setCargando(false) }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const abrirCrear = () => {
    setForm({ name: '', img: '', imgPosition: 'object-center', price: '', unit: 'por kg', badge: '', description: '', stock: 0 })
    setError('')
    setModal('crear')
  }

  const abrirEditar = (p) => {
    setSeleccionado(p)
    setForm({
      name: p.name,
      img: p.img,
      imgPosition: p.imgPosition ?? 'object-center',
      price: p.price,
      unit: p.unit ?? 'por kg',
      badge: p.badge ?? '',
      description: Array.isArray(p.description) ? p.description.join('\n') : '',
      stock: p.stock ?? 0,
    })
    setError('')
    setModal('editar')
  }

  const abrirEliminar = (p) => { setSeleccionado(p); setModal('eliminar') }
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const payload = () => ({
    ...form,
    stock: Number(form.stock),
    description: form.description.split('\n').map(l => l.trim()).filter(Boolean),
  })

  const guardar = async () => {
    if (!form.name || !form.img || !form.price) { setError('Nombre, imagen y precio son obligatorios.'); return }
    setGuardando(true); setError('')
    try {
      if (modal === 'crear') {
        await axios.post(`${API}/api/admin/productos`, payload(), authHeader())
      } else {
        await axios.put(`${API}/api/admin/productos/${seleccionado._id}`, payload(), authHeader())
      }
      setModal(null); cargar()
    } catch (err) {
      setError(err.response?.data?.message ?? 'Error al guardar')
    } finally { setGuardando(false) }
  }

  const eliminar = async () => {
    try {
      await axios.delete(`${API}/api/admin/productos/${seleccionado._id}`, authHeader())
      setModal(null); cargar()
    } catch { alert('Error al eliminar') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#60804F]">Productos ({productos.length})</h2>
        <button onClick={abrirCrear} className="bg-[#8fbc6a] text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#60804F] transition-colors">+ Nuevo</button>
      </div>

      {cargando ? (
        <p className="text-slate-400 text-sm">Cargando...</p>
      ) : (
        <>
          {/* Tabla — solo desktop */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-[#60804F]/10 text-[#60804F]">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Imagen</th>
                  <th className="px-3 py-2 text-left font-semibold">Nombre</th>
                  <th className="px-3 py-2 text-left font-semibold">Precio</th>
                  <th className="px-3 py-2 text-left font-semibold">Unidad</th>
                  <th className="px-3 py-2 text-left font-semibold">Stock</th>
                  <th className="px-3 py-2 text-left font-semibold">Badge</th>
                  <th className="px-3 py-2 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productos.map(p => (
                  <tr key={p._id} className="hover:bg-slate-50">
                    <td className="px-3 py-2"><img src={p.img} alt={p.name} className="w-12 h-12 object-cover rounded-lg" /></td>
                    <td className="px-3 py-2 font-medium text-slate-700">{p.name}</td>
                    <td className="px-3 py-2 text-slate-600">{p.price}</td>
                    <td className="px-3 py-2 text-slate-500">{p.unit}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${(p.stock ?? 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {p.stock ?? 0}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-500">{p.badge ?? '-'}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button onClick={() => abrirEditar(p)} className="text-[#60804F] hover:underline text-xs font-semibold">Editar</button>
                        <button onClick={() => abrirEliminar(p)} className="text-red-500 hover:underline text-xs font-semibold">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — solo mobile */}
          <div className="md:hidden space-y-3">
            {productos.map(p => (
              <div key={p._id} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
                <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-semibold text-slate-700 truncate">{p.name}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-slate-500">{p.price} <span className="text-xs text-slate-400">{p.unit}</span></span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${(p.stock ?? 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      Stock: {p.stock ?? 0}
                    </span>
                    {p.badge && <span className="text-xs bg-[#60804F]/10 text-[#60804F] px-2 py-0.5 rounded-full">{p.badge}</span>}
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button onClick={() => abrirEditar(p)} className="text-[#60804F] text-xs font-semibold">Editar</button>
                    <button onClick={() => abrirEliminar(p)} className="text-red-500 text-xs font-semibold">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {(modal === 'crear' || modal === 'editar') && (
        <Modal title={modal === 'crear' ? 'Nuevo producto' : 'Editar producto'} onClose={() => setModal(null)}>
          <div className="space-y-3">
            <Campo label="Nombre *"><input name="name" value={form.name} onChange={handleChange} className={inputClass} /></Campo>
            <Campo label="URL de imagen *"><input name="img" value={form.img} onChange={handleChange} className={inputClass} /></Campo>
            <Campo label="Posición imagen">
              <select name="imgPosition" value={form.imgPosition} onChange={handleChange} className={inputClass}>
                <option value="object-center">Centro</option>
                <option value="object-top">Arriba</option>
                <option value="object-bottom">Abajo</option>
                <option value="object-left">Izquierda</option>
                <option value="object-right">Derecha</option>
              </select>
            </Campo>
            <div className="grid grid-cols-2 gap-3">
              <Campo label="Precio *"><input name="price" value={form.price} onChange={handleChange} className={inputClass} placeholder="$1.500" /></Campo>
              <Campo label="Unidad"><input name="unit" value={form.unit} onChange={handleChange} className={inputClass} /></Campo>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Campo label="Badge"><input name="badge" value={form.badge} onChange={handleChange} className={inputClass} placeholder="Nuevo..." /></Campo>
              <Campo label="Stock"><input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className={inputClass} /></Campo>
            </div>
            <Campo label="Descripción (una por línea)">
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={inputClass} />
            </Campo>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancelar</button>
              <button onClick={guardar} disabled={guardando} className="flex-1 py-2.5 rounded-md bg-[#8fbc6a] text-white text-sm font-semibold hover:bg-[#60804F] disabled:opacity-50 transition-colors">
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {modal === 'eliminar' && seleccionado && (
        <ConfirmarEliminar nombre={seleccionado.name} onConfirmar={eliminar} onCancelar={() => setModal(null)} />
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB USUARIOS
// ══════════════════════════════════════════════════════════════════════════════
function TabUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [modal, setModal] = useState(null)
  const [seleccionado, setSeleccionado] = useState(null)
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol: 'user' })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const { data } = await axios.get(`${API}/api/admin/usuarios`, authHeader())
      setUsuarios(data)
    } catch { setUsuarios([]) }
    finally { setCargando(false) }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const abrirCrear = () => { setForm({ nombre: '', email: '', password: '', rol: 'user' }); setError(''); setModal('crear') }
  const abrirEditar = (u) => { setSeleccionado(u); setForm({ nombre: u.nombre, email: u.email, password: '', rol: u.rol }); setError(''); setModal('editar') }
  const abrirEliminar = (u) => { setSeleccionado(u); setModal('eliminar') }
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const guardar = async () => {
    if (!form.nombre || !form.email) { setError('Nombre y email son obligatorios.'); return }
    if (modal === 'crear' && !form.password) { setError('La contraseña es obligatoria.'); return }
    setGuardando(true); setError('')
    try {
      const body = { nombre: form.nombre, email: form.email, rol: form.rol }
      if (form.password) body.password = form.password
      if (modal === 'crear') {
        await axios.post(`${API}/api/admin/usuarios`, body, authHeader())
      } else {
        await axios.put(`${API}/api/admin/usuarios/${seleccionado._id}`, body, authHeader())
      }
      setModal(null); cargar()
    } catch (err) {
      setError(err.response?.data?.message ?? 'Error al guardar')
    } finally { setGuardando(false) }
  }

  const eliminar = async () => {
    try {
      await axios.delete(`${API}/api/admin/usuarios/${seleccionado._id}`, authHeader())
      setModal(null); cargar()
    } catch { alert('Error al eliminar') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#60804F]">Usuarios ({usuarios.length})</h2>
        <button onClick={abrirCrear} className="bg-[#8fbc6a] text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#60804F] transition-colors">+ Nuevo</button>
      </div>

      {cargando ? (
        <p className="text-slate-400 text-sm">Cargando...</p>
      ) : (
        <>
          {/* Tabla — solo desktop */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-[#60804F]/10 text-[#60804F]">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Nombre</th>
                  <th className="px-3 py-2 text-left font-semibold">Email</th>
                  <th className="px-3 py-2 text-left font-semibold">Rol</th>
                  <th className="px-3 py-2 text-left font-semibold">Registro</th>
                  <th className="px-3 py-2 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usuarios.map(u => (
                  <tr key={u._id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium text-slate-700 capitalize">{u.nombre}</td>
                    <td className="px-3 py-2 text-slate-600">{u.email}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.rol === 'admin' ? 'bg-[#60804F]/20 text-[#60804F]' : 'bg-slate-100 text-slate-500'}`}>
                        {u.rol}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-500">{new Date(u.dataRegistro).toLocaleDateString('es-AR')}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button onClick={() => abrirEditar(u)} className="text-[#60804F] hover:underline text-xs font-semibold">Editar</button>
                        <button onClick={() => abrirEliminar(u)} className="text-red-500 hover:underline text-xs font-semibold">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — solo mobile */}
          <div className="md:hidden space-y-3">
            {usuarios.map(u => (
              <div key={u._id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-700 capitalize">{u.nombre}</p>
                    <p className="text-xs text-slate-400 break-all">{u.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${u.rol === 'admin' ? 'bg-[#60804F]/20 text-[#60804F]' : 'bg-slate-100 text-slate-500'}`}>
                    {u.rol}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Registro: {new Date(u.dataRegistro).toLocaleDateString('es-AR')}</p>
                <div className="flex gap-3 pt-1 border-t border-slate-100">
                  <button onClick={() => abrirEditar(u)} className="text-[#60804F] text-xs font-semibold">Editar</button>
                  <button onClick={() => abrirEliminar(u)} className="text-red-500 text-xs font-semibold">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {(modal === 'crear' || modal === 'editar') && (
        <Modal title={modal === 'crear' ? 'Nuevo usuario' : 'Editar usuario'} onClose={() => setModal(null)}>
          <div className="space-y-3">
            <Campo label="Nombre *"><input name="nombre" value={form.nombre} onChange={handleChange} className={inputClass} /></Campo>
            <Campo label="Email *"><input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} /></Campo>
            <Campo label={modal === 'crear' ? 'Contraseña *' : 'Nueva contraseña (opcional)'}>
              <input name="password" type="password" value={form.password} onChange={handleChange} className={inputClass} placeholder={modal === 'editar' ? 'Dejar vacío para no cambiar' : ''} />
            </Campo>
            <Campo label="Rol">
              <select name="rol" value={form.rol} onChange={handleChange} className={inputClass}>
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </Campo>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancelar</button>
              <button onClick={guardar} disabled={guardando} className="flex-1 py-2.5 rounded-md bg-[#8fbc6a] text-white text-sm font-semibold hover:bg-[#60804F] disabled:opacity-50 transition-colors">
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {modal === 'eliminar' && seleccionado && (
        <ConfirmarEliminar nombre={seleccionado.email} onConfirmar={eliminar} onCancelar={() => setModal(null)} />
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB PEDIDOS
// ══════════════════════════════════════════════════════════════════════════════
function TabPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [pedidoDetalle, setPedidoDetalle] = useState(null)
  const [actualizando, setActualizando] = useState(null)

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const { data } = await axios.get(`${API}/api/admin/pedidos`, authHeader())
      setPedidos(data)
    } catch { setPedidos([]) }
    finally { setCargando(false) }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const cambiarEstado = async (pedidoId, nuevoEstado) => {
    setActualizando(pedidoId)
    try {
      await axios.put(`${API}/api/admin/pedidos/${pedidoId}/estado`, { estado: nuevoEstado }, authHeader())
      setPedidos(prev => prev.map(p => p._id === pedidoId ? { ...p, estado: nuevoEstado } : p))
    } catch (err) {
      alert(err.response?.data?.message ?? 'Error al actualizar el estado')
    } finally { setActualizando(null) }
  }

  const SelectEstado = ({ p }) => (
    p.estado === 'cancelado' ? (
      <span className="text-xs text-red-400 italic">Inhabilitado</span>
    ) : (
      <select
        value={p.estado}
        disabled={actualizando === p._id}
        onChange={(e) => cambiarEstado(p._id, e.target.value)}
        className="text-xs border border-[#60804F]/30 rounded-md px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#60804F] disabled:opacity-50 w-full"
      >
        <option value="pendiente">Pendiente</option>
        <option value="confirmado">Confirmado</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
        <option value="finalizado">Finalizado</option>
        <option value="cancelado">Cancelado</option>
      </select>
    )
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#60804F]">Pedidos ({pedidos.length})</h2>
        <button onClick={cargar} className="text-sm text-[#60804F] hover:underline">Actualizar</button>
      </div>

      {cargando ? (
        <p className="text-slate-400 text-sm">Cargando...</p>
      ) : (
        <>
          {/* Tabla — solo desktop */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-[#60804F]/10 text-[#60804F]">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold"># Orden</th>
                  <th className="px-3 py-2 text-left font-semibold">Fecha</th>
                  <th className="px-3 py-2 text-left font-semibold">Cliente</th>
                  <th className="px-3 py-2 text-left font-semibold">Total</th>
                  <th className="px-3 py-2 text-left font-semibold">Estado</th>
                  <th className="px-3 py-2 text-left font-semibold">Cambiar estado</th>
                  <th className="px-3 py-2 text-left font-semibold">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pedidos.map(p => (
                  <tr key={p._id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-bold text-[#60804F]">#{p.nroOrden}</td>
                    <td className="px-3 py-2 text-slate-500">{new Date(p.fecha).toLocaleDateString('es-AR')}</td>
                    <td className="px-3 py-2">
                      <p className="font-medium text-slate-700 capitalize">{p.datosEnvio?.nombre}</p>
                      <p className="text-xs text-slate-400">{p.datosEnvio?.email}</p>
                    </td>
                    <td className="px-3 py-2 font-semibold text-slate-700">${p.total?.toLocaleString('es-AR')}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ESTADO_COLORS[p.estado] ?? 'bg-slate-100 text-slate-500'}`}>
                        {ESTADO_LABELS[p.estado] ?? p.estado}
                      </span>
                    </td>
                    <td className="px-3 py-2"><SelectEstado p={p} /></td>
                    <td className="px-3 py-2">
                      <button onClick={() => setPedidoDetalle(p)} className="text-[#60804F] hover:underline text-xs font-semibold">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — solo mobile */}
          <div className="md:hidden space-y-3">
            {pedidos.map(p => (
              <div key={p._id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[#60804F] font-bold text-base">#{p.nroOrden}</span>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(p.fecha).toLocaleDateString('es-AR')}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${ESTADO_COLORS[p.estado] ?? 'bg-slate-100 text-slate-500'}`}>
                    {ESTADO_LABELS[p.estado] ?? p.estado}
                  </span>
                </div>
                <div className="space-y-1">
                  <InfoRow label="Cliente">
                    <span className="capitalize">{p.datosEnvio?.nombre}</span>
                  </InfoRow>
                  <InfoRow label="Email">{p.datosEnvio?.email}</InfoRow>
                  <InfoRow label="Total"><span className="font-semibold">${p.total?.toLocaleString('es-AR')}</span></InfoRow>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs text-slate-400 font-medium">Cambiar estado</p>
                  <SelectEstado p={p} />
                </div>
                <button
                  onClick={() => setPedidoDetalle(p)}
                  className="w-full text-center text-xs text-[#60804F] font-semibold border border-[#60804F]/30 rounded-md py-1.5 hover:bg-[#60804F]/5 transition-colors"
                >
                  Ver detalle completo
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {pedidoDetalle && (
        <Modal title={`Pedido #${pedidoDetalle.nroOrden}`} onClose={() => setPedidoDetalle(null)}>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-[#8fbc6a] font-medium mb-2">Datos de envío</p>
              <div className="space-y-1">
                <InfoRow label="Nombre"><span className="capitalize">{pedidoDetalle.datosEnvio?.nombre}</span></InfoRow>
                <InfoRow label="Email">{pedidoDetalle.datosEnvio?.email}</InfoRow>
                <InfoRow label="Dirección">{pedidoDetalle.datosEnvio?.direccion}, {pedidoDetalle.datosEnvio?.ciudad}, {pedidoDetalle.datosEnvio?.provincia} ({pedidoDetalle.datosEnvio?.cp})</InfoRow>
                <InfoRow label="Modalidad">{pedidoDetalle.datosEnvio?.modalidad === 'retiro' ? 'Retiro en local' : 'Envío a domicilio'}</InfoRow>
              </div>
            </div>
            <div>
              <p className="text-[#8fbc6a] font-medium mb-2">Productos</p>
              <ul className="space-y-1">
                {pedidoDetalle.items?.map((item, i) => (
                  <li key={i} className="flex justify-between text-slate-700">
                    <span>{item.nombre} x{item.cantidad}</span>
                    <span className="font-semibold">${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between font-bold text-[#60804F] border-t border-slate-100 pt-2">
              <span>Total</span>
              <span>${pedidoDetalle.total?.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB RESEÑAS
// ══════════════════════════════════════════════════════════════════════════════
function TabResenas() {
  const [resenas, setResenas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [modal, setModal] = useState(null)
  const [seleccionado, setSeleccionado] = useState(null)
  const [form, setForm] = useState({ nombre: '', mascota: '', avatar: '', texto: '', producto: '' })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const { data } = await axios.get(`${API}/api/admin/resenas`, authHeader())
      setResenas(data)
    } catch { setResenas([]) }
    finally { setCargando(false) }
  }, [])

  useEffect(() => { cargar() }, [cargar])

  const abrirCrear = () => { setForm({ nombre: '', mascota: '', avatar: '', texto: '', producto: '' }); setError(''); setModal('crear') }
  const abrirEditar = (r) => { setSeleccionado(r); setForm({ nombre: r.nombre, mascota: r.mascota, avatar: r.avatar ?? '', texto: r.texto, producto: r.producto ?? '' }); setError(''); setModal('editar') }
  const abrirEliminar = (r) => { setSeleccionado(r); setModal('eliminar') }
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const guardar = async () => {
    if (!form.nombre || !form.mascota || !form.texto) { setError('Nombre, mascota y texto son obligatorios.'); return }
    setGuardando(true); setError('')
    try {
      if (modal === 'crear') {
        await axios.post(`${API}/api/admin/resenas`, form, authHeader())
      } else {
        await axios.put(`${API}/api/admin/resenas/${seleccionado._id}`, form, authHeader())
      }
      setModal(null); cargar()
    } catch (err) {
      setError(err.response?.data?.message ?? 'Error al guardar')
    } finally { setGuardando(false) }
  }

  const eliminar = async () => {
    try {
      await axios.delete(`${API}/api/admin/resenas/${seleccionado._id}`, authHeader())
      setModal(null); cargar()
    } catch { alert('Error al eliminar') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#60804F]">Reseñas ({resenas.length})</h2>
        <button onClick={abrirCrear} className="bg-[#8fbc6a] text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#60804F] transition-colors">+ Nueva</button>
      </div>

      {cargando ? (
        <p className="text-slate-400 text-sm">Cargando...</p>
      ) : resenas.length === 0 ? (
        <p className="text-slate-400 text-sm">No hay reseñas todavía.</p>
      ) : (
        <>
          {/* Tabla — solo desktop */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-[#60804F]/10 text-[#60804F]">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Avatar</th>
                  <th className="px-3 py-2 text-left font-semibold">Nombre</th>
                  <th className="px-3 py-2 text-left font-semibold">Mascota</th>
                  <th className="px-3 py-2 text-left font-semibold">Producto</th>
                  <th className="px-3 py-2 text-left font-semibold">Reseña</th>
                  <th className="px-3 py-2 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resenas.map(r => (
                  <tr key={r._id} className="hover:bg-slate-50">
                    <td className="px-3 py-2">
                      {r.avatar
                        ? <img src={r.avatar} alt={r.nombre} className="w-10 h-10 rounded-full object-cover" />
                        : <div className="w-10 h-10 rounded-full bg-[#60804F]/20 flex items-center justify-center text-[#60804F] font-bold text-sm">{r.nombre[0].toUpperCase()}</div>
                      }
                    </td>
                    <td className="px-3 py-2 font-medium text-slate-700">{r.nombre}</td>
                    <td className="px-3 py-2 text-slate-500">{r.mascota}</td>
                    <td className="px-3 py-2 text-slate-500">{r.producto || '-'}</td>
                    <td className="px-3 py-2 text-slate-500 max-w-xs truncate">{r.texto}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button onClick={() => abrirEditar(r)} className="text-[#60804F] hover:underline text-xs font-semibold">Editar</button>
                        <button onClick={() => abrirEliminar(r)} className="text-red-500 hover:underline text-xs font-semibold">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — solo mobile */}
          <div className="md:hidden space-y-3">
            {resenas.map(r => (
              <div key={r._id} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3">
                <div className="shrink-0">
                  {r.avatar
                    ? <img src={r.avatar} alt={r.nombre} className="w-12 h-12 rounded-full object-cover" />
                    : <div className="w-12 h-12 rounded-full bg-[#60804F]/20 flex items-center justify-center text-[#60804F] font-bold">{r.nombre[0].toUpperCase()}</div>
                  }
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-semibold text-slate-700">{r.nombre}</p>
                  <p className="text-xs text-slate-400">{r.mascota}{r.producto ? ` · ${r.producto}` : ''}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">{r.texto}</p>
                  <div className="flex gap-3 pt-1 border-t border-slate-100">
                    <button onClick={() => abrirEditar(r)} className="text-[#60804F] text-xs font-semibold">Editar</button>
                    <button onClick={() => abrirEliminar(r)} className="text-red-500 text-xs font-semibold">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {(modal === 'crear' || modal === 'editar') && (
        <Modal title={modal === 'crear' ? 'Nueva reseña' : 'Editar reseña'} onClose={() => setModal(null)}>
          <div className="space-y-3">
            <Campo label="Nombre del cliente *"><input name="nombre" value={form.nombre} onChange={handleChange} className={inputClass} placeholder="Valentina M." /></Campo>
            <Campo label="Mascota *"><input name="mascota" value={form.mascota} onChange={handleChange} className={inputClass} placeholder="Luna — Golden Retriever" /></Campo>
            <Campo label="URL del avatar"><input name="avatar" value={form.avatar} onChange={handleChange} className={inputClass} placeholder="https://..." /></Campo>
            <Campo label="Producto mencionado"><input name="producto" value={form.producto} onChange={handleChange} className={inputClass} placeholder="Pulmón Vacuno" /></Campo>
            <Campo label="Reseña *"><textarea name="texto" value={form.texto} onChange={handleChange} rows={4} className={inputClass} placeholder="Escribí la reseña del cliente..." /></Campo>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancelar</button>
              <button onClick={guardar} disabled={guardando} className="flex-1 py-2.5 rounded-md bg-[#8fbc6a] text-white text-sm font-semibold hover:bg-[#60804F] disabled:opacity-50 transition-colors">
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {modal === 'eliminar' && seleccionado && (
        <ConfirmarEliminar nombre={`reseña de ${seleccionado.nombre}`} onConfirmar={eliminar} onCancelar={() => setModal(null)} />
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL ADMIN
// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: 'productos', label: '📦 Productos' },
  { id: 'usuarios', label: '👤 Usuarios' },
  { id: 'pedidos', label: '🛒 Pedidos' },
  { id: 'resenas', label: '⭐ Reseñas' },
]

export default function Admin() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('productos')

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario || usuario.rol !== 'admin') {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className="min-h-[85vh] bg-[#f9fdf9] px-4 py-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-5">
          <h1 className="text-xl font-bold text-[#60804F]">Panel de Administración</h1>
          <p className="text-sm text-slate-400">Gestioná productos, usuarios, pedidos y reseñas</p>
        </div>

        {/* Tabs — scroll horizontal en mobile */}
        <div className="overflow-x-auto -mx-4 px-4 mb-5">
          <div className="flex gap-1 border-b border-slate-200 min-w-max">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? 'bg-[#60804F] text-white'
                    : 'text-[#60804F] hover:bg-[#60804F]/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido del tab activo */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6">
          {tab === 'productos' && <TabProductos />}
          {tab === 'usuarios' && <TabUsuarios />}
          {tab === 'pedidos' && <TabPedidos />}
          {tab === 'resenas' && <TabResenas />}
        </div>

      </div>
    </div>
  )
}
