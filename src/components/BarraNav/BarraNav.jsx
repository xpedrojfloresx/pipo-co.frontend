import { useState, useEffect, useRef } from 'react';
import logo2 from '/Logo-LetrasVerdes.png'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const BarraNav = ({ onAbrirCarrito, carrito }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [confirmarLogout, setConfirmarLogout] = useState(false);
  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem('usuario')
    return stored ? JSON.parse(stored) : null
  })

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
    setUserOpen(false)
    setConfirmarLogout(false)
    navigate('/')
  }
  const userRef = useRef(null);
  const navigate = useNavigate()
  const location = useLocation()

  const irA = (seccion) => {
    if (location.pathname === '/') {
      document.getElementById(seccion)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(seccion)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  useEffect(() => {
    const syncUsuario = () => {
      const stored = localStorage.getItem('usuario')
      setUsuario(stored ? JSON.parse(stored) : null)
    }
    window.addEventListener('usuarioActualizado', syncUsuario)
    return () => window.removeEventListener('usuarioActualizado', syncUsuario)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <>
    <nav className="bg-white text-[#60804F] px-6 py-8">
      <div className="max-w-full mx-auto md:mx-40 flex items-center justify-between">

        {/* Lado Izquierdo: Logo */}
        <div className="flex-1 flex items-center">
          <button onClick={() => irA('inicio')} className="w-35 h-auto rounded-lg flex items-center justify-center">
            <img src={logo2} alt="Pipo & Co" />
          </button>
        </div>

        {/* Centro: Menú de Navegación (desktop) */}
        <div className="hidden md:flex items-center space-x-1">
          <button onClick={() => irA('inicio')} className="bg-[#60804F] text-white px-4 py-2 rounded-md text-sm font-medium">Inicio</button>
          <button onClick={() => irA('catalogo')} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors">Catálogo</button>
          <button onClick={() => irA('ingredientes')} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors">Ingredientes</button>
          <button onClick={() => irA('reseñas')} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors">Reseñas</button>
        </div>

        {/* Lado Derecho: Acciones */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Carrito */}
          <button onClick={onAbrirCarrito} className="relative text-[#60804F] hover:text-slate-400 focus:outline-none transition-colors">
            <span className="sr-only">Carrito</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {cantidadItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#60804F] text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cantidadItems}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div className="shrink-0 relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#60804F] focus:ring-[#60804F]"
            >
              <img className="h-12 w-12 rounded-full object-cover border border-[#60804F]" src="https://place.dog/300/300" alt="Usuario" />
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 hidden md:block">
                {usuario ? (
                  <>
                    <p className="px-4 py-3 text-sm text-slate-400 border-b border-slate-100 truncate">Hola, {usuario.nombre}</p>
                    <button className="w-full text-left px-4 py-3 text-sm text-[#60804F] font-semibold hover:bg-slate-50 transition-colors" onClick={() => { setUserOpen(false); navigate('/mi-cuenta') }}>
                      Mi cuenta
                    </button>
                    <div className="border-t border-slate-100" />
                    <button className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-slate-50 transition-colors" onClick={() => { setUserOpen(false); setConfirmarLogout(true) }}>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full text-left px-4 py-3 text-sm text-[#60804F] font-semibold hover:bg-slate-50 transition-colors" onClick={() => { setUserOpen(false); navigate('/login') }}>
                      Iniciar sesión
                    </button>
                    <div className="border-t border-slate-100" />
                    <button className="w-full text-left px-4 py-3 text-sm text-[#60804F] hover:bg-slate-50 transition-colors" onClick={() => { setUserOpen(false); navigate('/register') }}>
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Hamburguesa (mobile) */}
          <div className="md:hidden">
            <button
              className="text-[#60804F] hover:text-slate-300 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Menú mobile desplegable */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-1 px-2 pb-3 pt-2">
          <button onClick={() => { irA('inicio'); setMenuOpen(false) }} className="bg-[#60804F] text-white px-4 py-2 rounded-md text-sm font-medium text-left">Inicio</button>
          <button onClick={() => { irA('catalogo'); setMenuOpen(false) }} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors text-left">Catálogo</button>
          <button onClick={() => { irA('ingredientes'); setMenuOpen(false) }} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors text-left">Ingredientes</button>
          <button onClick={() => { irA('reseñas'); setMenuOpen(false) }} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors text-left">Reseñas</button>

          <div className="border-t border-slate-100 my-1" />

          {usuario ? (
            <>
              <p className="px-2 py-1 text-xs text-slate-400">Hola, {usuario.nombre}</p>
              <button onClick={() => { setMenuOpen(false); navigate('/mi-cuenta') }} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors text-left">Mi cuenta</button>
              <button onClick={() => { setMenuOpen(false); setConfirmarLogout(true) }} className="text-red-500 hover:text-red-400 px-4 py-2 rounded-md text-sm font-medium transition-colors text-left">Cerrar sesión</button>
            </>
          ) : (
            <>
              <button onClick={() => { setMenuOpen(false); navigate('/login') }} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-semibold transition-colors text-left">Iniciar sesión</button>
              <button onClick={() => { setMenuOpen(false); navigate('/register') }} className="text-[#60804F] hover:text-slate-300 px-4 py-2 rounded-md text-sm font-medium transition-colors text-left">Registrarse</button>
            </>
          )}
        </div>
      )}
    </nav>

    {confirmarLogout && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
          <h3 className="text-lg font-bold text-[#60804F] mb-2">Cerrar sesión</h3>
          <p className="text-sm text-slate-500 mb-6">¿Estás seguro que querés cerrar sesión?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmarLogout(false)}
              className="flex-1 py-2 rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default BarraNav;
