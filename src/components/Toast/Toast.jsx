export default function Toast({ visible, mensaje, tipo = 'exito' }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } ${tipo === 'exito' ? 'bg-[#1a2e1a] text-white' : 'bg-amber-50 text-amber-900 border border-amber-200'}`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${tipo === 'exito' ? 'bg-[#8fbc6a]' : 'bg-amber-400'}`}>
        {tipo === 'exito' ? (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v4m0 4h.01" />
          </svg>
        )}
      </div>
      <p className="text-sm font-medium">{mensaje ?? 'Producto agregado al carrito'}</p>
    </div>
  )
}
