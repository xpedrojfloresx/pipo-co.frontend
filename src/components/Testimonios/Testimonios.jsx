import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default function Testimonios() {
  const [testimonios, setTestimonios] = useState([])
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonios.length

  useEffect(() => {
    axios.get(`${API_URL}/api/resenas`)
      .then(res => setTestimonios(res.data))
      .catch(() => setTestimonios([]))
  }, [])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 5000)
    return () => clearInterval(interval)
  }, [paused, total])

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  if (total === 0) return null

  return (
    <section id='reseñas' className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-[#8fbc6a] text-sm font-semibold tracking-widest uppercase">
            Lo que dicen nuestros clientes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#60804F] mt-3 tracking-tight">
            Mascotas felices, dueños contentos
          </h2>
        </div>

        {/* Carrusel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonios.map((t, idx) => (
                <div key={idx} className="w-full shrink-0 px-2 md:px-8">
                  <div className="bg-[#1A2E1A] border border-[#60804F]/50 rounded-2xl p-8 md:p-12 text-center relative">

                    {/* Comillas decorativas */}
                    <span className="absolute top-6 left-8 text-8xl text-white font-serif leading-none select-none pointer-events-none">
                      "
                    </span>

                    {/* Avatar */}
                    <img
                      src={t.avatar}
                      alt={t.nombre}
                      className="w-20 h-20 rounded-full mx-auto mb-5 ring-2 ring-[#60804F] object-cover"
                    />

                    {/* Estrellas */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, star) => (
                        <svg key={star} className="w-4 h-4 fill-[#8fbc6a]" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Cita */}
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed italic mb-8 relative z-10">
                      "{t.texto}"
                    </p>

                    {/* Nombre y mascota */}
                    <p className="text-white font-bold text-base">{t.nombre}</p>
                    <p className="text-slate-400 text-sm mb-5">{t.mascota}</p>

                    {/* Badge producto */}
                    <span className="inline-flex items-center gap-1.5 text-[#8fbc6a] text-xs font-semibold px-3 py-1 rounded-full border border-[#60804F]/40 bg-[#60804F]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8fbc6a]" />
                      {t.producto}
                    </span>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flecha izquierda */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 w-10 h-10 rounded-full bg-[#1A2E1A] border border-[#60804F]/50 text-[#8fbc6a] flex items-center justify-center hover:bg-[#60804F]/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Flecha derecha */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 w-10 h-10 rounded-full bg-[#1A2E1A] border border-[#60804F]/50 text-[#8fbc6a] flex items-center justify-center hover:bg-[#60804F]/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonios.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-6 h-2 bg-[#1A2E1A]'
                  : 'w-2 h-2 bg-[#60804F]/40 hover:bg-[#60804F]/70'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
