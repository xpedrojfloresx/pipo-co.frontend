import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.526 5.853L.057 23.571a.75.75 0 00.921.921l5.718-1.469A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 01-4.951-1.355l-.355-.211-3.681.945.963-3.597-.231-.371A9.725 9.725 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  )
}

export default function Footer() {
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

  return (
    <footer className="bg-[#1a2e1a] text-white">

      {/* Cuerpo */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Marca */}
        <div>
          <img src="/Logo-LetrasVerdes.png" alt="Pipo&Co" className="h-10 mb-4" />
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Snacks naturales, hechos a mano en Córdoba. Sin conservantes, sin aditivos. Solo lo mejor para tu mascota.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://instagram.com/pipoandco" target="_blank" rel="noopener noreferrer"
              className="text-[#8fbc6a] hover:text-white transition-colors">
              <InstagramIcon />
            </a>
            <a href="https://wa.me/5493512345678" target="_blank" rel="noopener noreferrer"
              className="text-[#8fbc6a] hover:text-white transition-colors">
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-[#8fbc6a] text-xs font-semibold tracking-widest uppercase mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a onClick={() => irA('inicio')} id="inicio" className="hover:text-white transition-colors">Inicio</a></li>
            <li><a onClick={() => irA('catalogo')} id="catalogo" className="hover:text-white transition-colors">Catálogo</a></li>
            <li><a onClick={() => irA('ingredientes')} id="ingredientes" className="hover:text-white transition-colors">Ingredientes</a></li>
            <li><a onClick={() => irA('reseñas')} id="reseñas" className="hover:text-white transition-colors">Reseñas</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-[#8fbc6a] text-xs font-semibold tracking-widest uppercase mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📍</span>
              <span>Córdoba Capital, Argentina</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📱</span>
              <a href="https://wa.me/5493517707999" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                +54 9 351 7707-9999
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">📸</span>
              <a href="https://instagram.com/pipoandco" target="_blank" rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                @pipoandco
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Barra inferior */}
      <div className="border-t border-[#60804F]/30 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Pipo&Co — Todos los derechos reservados
      </div>

    </footer>
  )
}
