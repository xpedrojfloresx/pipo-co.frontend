import { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    title: 'Hecho en Córdoba',
    desc: 'Producción artesanal de pequeña escala en Córdoba Capital. Conocés de dónde viene cada ingrediente y quién lo preparó.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: 'Sin Procesados',
    desc: 'Deshidratación lenta a baja temperatura. Sin conservantes artificiales, colorantes ni aditivos químicos de ningún tipo.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Aprobado por Expertos',
    desc: 'Formulaciones revisadas por médicos veterinarios especializados en nutrición canina para garantizar una dieta equilibrada.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function Features() {
  const sliderRef = useRef(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (current + 1) % pillars.length
      const slider = sliderRef.current
      if (!slider) return
      const cardWidth = slider.scrollWidth / pillars.length
      slider.scrollTo({ left: cardWidth * next, behavior: 'smooth' })
      setCurrent(next)
    }, 3000)
    return () => clearInterval(interval)
  }, [current])

  return (
    <section className='bg-white'>
      <div className="relative bg-[url('/pipoca.jpg')] bg-cover bg-top py-20 md:py-50 mx-4 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-black/50 rounded-2xl" />
        <div className="relative max-w-6xl mx-auto px-6">

          {/* Encabezado */}
          <div className="text-center mb-16">
            <span className="text-[#8fbc6a] text-sm font-semibold tracking-widest uppercase">Por qué elegirnos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 tracking-tight">
              La diferencia Pipo&Co
            </h2>
          </div>

          {/* Pilares */}
          <div ref={sliderRef} className="flex md:grid md:grid-cols-3 gap-8 md:gap-12 overflow-x-auto md:overflow-x-visible snap-x  snap-mandatory md:snap-none pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="min-w-[80vw] md:min-w-0 snap-center flex flex-col gap-4 p-8 rounded-2xl border border-[#60804F]/50 bg-[#1A2E1A]/ 40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#60804F]/25 flex items-center justify-center text-[#8fbc6a] group-hover:bg-  [#60804F]/25 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-white text-xl font-bold">{pillar.title}</h3>
                <p className="text-[#8fbc6a] text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
