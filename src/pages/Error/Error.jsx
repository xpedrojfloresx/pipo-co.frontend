import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[85vh] bg-white flex flex-col items-center justify-center px-4 text-center">

      {/* Número */}
      <div className="relative mb-6 select-none">
        <span className="text-[160px] md:text-[220px] font-black text-[#60804F]/10 leading-none">500</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">😿</span>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[#60804F] mb-3">
        ¡Algo salió mal!
      </h1>
      <p className="text-slate-400 text-sm md:text-base max-w-sm mb-8">
        Nuestro servidor tuvo un problema inesperado. Estamos trabajando para resolverlo. Intentá de nuevo en unos minutos.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={() => window.location.reload()}
          className="flex-1 py-2.5 rounded-md border border-[#60804F]/30 text-sm font-semibold text-[#60804F] hover:bg-[#60804F]/5 transition-colors"
        >
          Reintentar
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-2.5 rounded-md bg-[#8fbc6a] text-white text-sm font-semibold hover:bg-[#60804F] transition-colors"
        >
          Ir al inicio
        </button>
      </div>

      <img src="/Logo-LetrasVerdes.png" alt="Pipo & Co" className="w-20 h-auto mt-12 opacity-40" />
    </div>
  )
}
