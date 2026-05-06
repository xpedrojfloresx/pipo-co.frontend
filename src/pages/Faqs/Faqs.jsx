import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const faqs = [
  {
    id: 'envios',
    categoria: '🚚 Envíos',
    preguntas: [
      {
        pregunta: '¿Cómo son los envíos?',
        respuesta: 'Hacemos envíos a todo el país por correo o mensajería. En Córdoba Capital y Villa Allende también ofrecemos entrega a domicilio y retiro en punto de entrega. El tiempo de envío puede variar entre 3 y 7 días hábiles según la zona.'
      },
      {
        pregunta: '¿Cuánto tarda en llegar mi pedido?',
        respuesta: 'En Córdoba Capital y Gran Córdoba, generalmente entre 1 y 3 días hábiles. Para el resto del país, entre 3 y 7 días hábiles dependiendo de la empresa de correo y la localidad.'
      },
      {
        pregunta: '¿Tienen envío gratis?',
        respuesta: 'Sí, ofrecemos envío sin costo a partir de un monto mínimo de compra. Consultanos por WhatsApp para conocer las condiciones actuales según tu zona.'
      },
    ]
  },
  {
    id: 'ingredientes',
    categoria: '🌿 Ingredientes',
    preguntas: [
      {
        pregunta: '¿Qué ingredientes usan en sus productos?',
        respuesta: 'Todos nuestros snacks están elaborados con ingredientes naturales: harina de avena, harina integral, huevo, zanahoria, manzana, y otros ingredientes frescos según el sabor. No usamos conservantes, colorantes artificiales ni aditivos de ningún tipo.'
      },
      {
        pregunta: '¿Son seguros para perros con alergias?',
        respuesta: 'La mayoría de nuestros productos son libres de gluten, soja y lácteos. Si tu mascota tiene alguna alergia específica, escribinos por WhatsApp y te asesoramos sobre qué producto es más adecuado para ella.'
      },
      {
        pregunta: '¿Los snacks son aptos para gatos también?',
        respuesta: 'Por el momento nuestra línea está pensada principalmente para perros. Sin embargo tenemos algunos productos que también pueden consumir los gatos. Consultanos para más detalles.'
      },
    ]
  },
  {
    id: 'conservacion',
    categoria: '🧊 Conservación',
    preguntas: [
      {
        pregunta: '¿Cómo debo conservar los snacks?',
        respuesta: 'Al no contener conservantes, recomendamos guardar los snacks en un recipiente hermético en un lugar fresco y seco, alejado de la luz directa. De esta forma duran hasta 30 días. También pueden conservarse en heladera para extender su vida útil hasta 45 días.'
      },
      {
        pregunta: '¿Se pueden congelar?',
        respuesta: 'Sí, podés congelar los snacks sin problema. Al descongelarlos, dejá que tomen temperatura ambiente antes de dárselos a tu mascota. Congelados duran hasta 3 meses.'
      },
    ]
  },
  {
    id: 'pagos',
    categoria: '💳 Pagos',
    preguntas: [
      {
        pregunta: '¿Qué medios de pago aceptan?',
        respuesta: 'Aceptamos transferencia bancaria, Mercado Pago (tarjeta de débito, crédito y saldo en cuenta), y efectivo en los casos de entrega en mano. Próximamente habilitaremos más métodos de pago desde la tienda online.'
      },
      {
        pregunta: '¿Puedo pagar en cuotas?',
        respuesta: 'Sí, a través de Mercado Pago podés abonar en cuotas con tarjeta de crédito. Las promociones vigentes dependen de tu banco y tarjeta.'
      },
    ]
  },
  {
    id: 'pedidos',
    categoria: '📦 Pedidos',
    preguntas: [
      {
        pregunta: '¿Cómo sé si mi pedido fue recibido?',
        respuesta: 'Una vez confirmado el pedido, te llegará un correo electrónico con el resumen de tu compra y el número de orden. También podés consultar el estado de tu pedido desde la sección "Mi cuenta" si estás registrado.'
      },
      {
        pregunta: '¿Puedo cancelar o modificar mi pedido?',
        respuesta: 'Podés cancelar o modificar tu pedido siempre que no haya sido confirmado por nuestro equipo. Para hacerlo, escribinos por WhatsApp lo antes posible con tu número de orden.'
      },
      {
        pregunta: '¿Hacen pedidos personalizados o al por mayor?',
        respuesta: 'Sí, trabajamos con ventas al por mayor para pet shops, veterinarias y regalos corporativos. Contactanos por WhatsApp o mail para coordinar un pedido especial.'
      },
    ]
  },
]

function ItemFaq({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="border border-[#e0eadd] rounded-lg overflow-hidden">
      <button
        onClick={() => setAbierto(v => !v)}
        className="w-full flex justify-between items-center px-5 py-4 text-left bg-white hover:bg-[#f9fdf9] transition-colors"
      >
        <span className="text-sm font-semibold text-[#3a5c32] pr-4">{pregunta}</span>
        <span className={`text-[#8fbc6a] text-lg font-bold flex-shrink-0 transition-transform duration-200 ${abierto ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {abierto && (
        <div className="px-5 pb-5 pt-1 bg-[#f9fdf9] text-sm text-slate-500 leading-relaxed border-t border-[#e0eadd]">
          {respuesta}
        </div>
      )}
    </div>
  )
}

export default function Faqs() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [location.hash])

  return (
    <div className="min-h-[85vh] bg-[#f9fdf9]">

      {/* Hero */}
      <div className="bg-[#1a2e1a] py-14 px-6 text-center">
        <p className="text-[#8fbc6a] text-xs font-semibold tracking-widest uppercase mb-3">Ayuda</p>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Preguntas frecuentes</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Todo lo que necesitás saber sobre nuestros productos, envíos y pedidos.
        </p>
      </div>

      {/* Contenido */}
      <div className="max-w-2xl mx-auto px-6 py-14 space-y-12">
        {faqs.map(categoria => (
          <section key={categoria.id} id={categoria.id}>
            <h2 className="text-base font-bold text-[#60804F] mb-4">{categoria.categoria}</h2>
            <div className="space-y-3">
              {categoria.preguntas.map((item, i) => (
                <ItemFaq key={i} pregunta={item.pregunta} respuesta={item.respuesta} />
              ))}
            </div>
          </section>
        ))}

        {/* CTA contacto */}
        <div className="bg-white border border-[#e0eadd] rounded-xl p-6 text-center">
          <p className="text-sm text-slate-500 mb-1">¿No encontraste lo que buscabas?</p>
          <p className="font-semibold text-[#3a5c32] mb-4">Escribinos y te respondemos a la brevedad 🐾</p>
          <a
            href="https://wa.me/5493517707999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8fbc6a] hover:bg-[#60804F] text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
