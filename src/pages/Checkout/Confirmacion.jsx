import { useNavigate, useLocation } from 'react-router-dom'

const WP_NUMBER = '5493517707999'
const parsearPrecio = (precio) => Number(precio.replace(/[$\.]/g, '').replace(',', '.'))

export default function Confirmacion() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const form = state?.form
  const carrito = state?.carrito ?? []
  const total = state?.total ?? 0

  const generarMensajeWP = () => {
    const productos = carrito
      .map(item => `  - ${item.name} x${item.cantidad} → $${(parsearPrecio(item.price) * item.cantidad).toLocaleString('es-AR')}`)
      .join('\n')

    const modalidadTexto = form?.modalidad === 'retiro' ? 'Retiro en local' : 'Envio a domicilio'

    const mensaje = `Hola Pipo & Co! Acabo de confirmar un pedido.

*Nombre:* ${form?.nombre}
*Email:* ${form?.email}
*Direccion:* ${form?.direccion}, ${form?.ciudad}, ${form?.provincia} (${form?.cp})

*Productos:*
${productos}

*Total:* $${total.toLocaleString('es-AR')}

*Modalidad:* ${modalidadTexto}

Gracias! Quedo a disposicion para coordinar el pedido.`

    return `https://wa.me/${WP_NUMBER}?text=${encodeURIComponent(mensaje)}`
  }

  return (
    <div className="min-h-[85vh] bg-white flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img src="/Logo-LetrasVerdes.png" alt="Logo" className="w-28 h-auto" />
        </div>

        {/* Ícono check */}
        <div className="w-16 h-16 rounded-full bg-[#8fbc6a]/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#60804F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#60804F] text-center mb-2">¡Pedido confirmado!</h2>
        <p className="text-[#8fbc6a] text-sm text-center mb-6">
          Guardamos tu pedido. Contactanos por WhatsApp para coordinar el pago y la entrega.
        </p>

        {/* Resumen */}
        {form && (
          <div className="rounded-lg border border-[#60804F]/30 shadow-sm overflow-hidden mb-6">
            <div className="divide-y divide-[#60804F]/15 text-sm">
              <div className="flex justify-between px-4 py-2.5 text-slate-600">
                <span className="text-[#8fbc6a] font-medium">Nombre</span>
                <span>{form.nombre}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 text-slate-600">
                <span className="text-[#8fbc6a] font-medium">Email</span>
                <span className="truncate ml-4">{form.email}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 text-slate-600">
                <span className="text-[#8fbc6a] font-medium">Dirección</span>
                <span className="text-right ml-4">{form.direccion}, {form.ciudad}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 text-slate-600">
                <span className="text-[#8fbc6a] font-medium">Modalidad</span>
                <span>{form.modalidad === 'retiro' ? '🏪 Retiro en local' : '🚚 Envío a domicilio'}</span>
              </div>
              <div className="flex justify-between px-4 py-2.5 bg-[#60804F]/5">
                <span className="font-bold text-[#60804F]">Total</span>
                <span className="font-bold text-[#60804F]">${total.toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <a
            href={generarMensajeWP()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full justify-center items-center gap-2 rounded-md bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1ebe5d] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contactar por WhatsApp
          </a>

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
