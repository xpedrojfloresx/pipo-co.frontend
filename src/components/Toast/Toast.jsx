export default function Toast({ visible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1a2e1a] text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="w-6 h-6 rounded-full bg-[#8fbc6a] flex items-center justify-center shrink-0">
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-sm font-medium">Producto agregado al carrito</p>
    </div>
  )
}
