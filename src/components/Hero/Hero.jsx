import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Hero() {
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
        <>
            <div className={`min-h-[650px] md:min-h-[800px] bg-[url('https://picsum.photos/id/237/1920/1080')] bg-cover bg-center bg-no-repeat relative`}>
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center">
                    <h1 className="text-white text-5xl font-bold tracking-tight z-10 my-2">Snacks saludables para mascotas</h1>
                    <p className="max-w-4xl text-gray-300 my-2 px-6 md:px-0">Sin conservantes, sin procesos industriales. Hechos a mano en Córdoba</p>
                    <button onClick={() => irA('catalogo')} className="px-8 py-3 font-semibold rounded-md bg-[#60804F] hover:bg-[#40603F] text-white transibuttonolors my-2">Ver Catálogo</button>
                </div>
            </div>
        </>
    )
}
