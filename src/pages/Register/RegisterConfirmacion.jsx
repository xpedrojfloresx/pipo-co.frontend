import { useNavigate } from 'react-router-dom'

export default function RegisterConfirmacion() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[85vh] bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        <div className="flex justify-center mb-6">
          <img src="/Logo-LetrasVerdes.png" alt="Logo" className="w-28 h-auto" />
        </div>

        <div className="w-16 h-16 rounded-full bg-[#8fbc6a]/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#60804F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#60804F] mb-2">¡Registro exitoso!</h2>
        <p className="text-[#8fbc6a] text-sm mb-8">
          Tu cuenta fue creada con éxito. Ya podés iniciar sesión.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/login')}
            className="flex w-full justify-center rounded-md bg-[#8fbc6a] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#60804F] transition-colors"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex w-full justify-center rounded-md border border-[#60804F]/30 px-3 py-2.5 text-sm font-semibold text-[#60804F] hover:bg-[#60804F]/5 transition-colors"
          >
            Volver al inicio
          </button>
        </div>

      </div>
    </div>
  )
}
