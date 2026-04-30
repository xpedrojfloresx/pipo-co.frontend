import Catalogo from '../../components/Catalogo/Catalogo.jsx'
import Hero from '../../components/Hero/Hero.jsx'
import Ingredientes from '../../components/Ingredientes/Ingredientes.jsx'
import Features from '../../components/Features/Features.jsx'
import Testimonios from '../../components/Testimonios/Testimonios.jsx'
import RedesSociales from '../../components/RedesSociales/RedesSociales.jsx'

export default function Home({ onAgregarAlCarrito }) {
  return (
    <>
      <div id="inicio"><Hero /></div>
      <div id="catalogo"><Catalogo onAgregarAlCarrito={onAgregarAlCarrito} /></div>
      <div id="features"><Features /></div>
      <div id="ingredientes"><Ingredientes /></div>
      <div id="redes"><RedesSociales /></div>
      <div id="reseñas"><Testimonios /></div>
    </>
  )
}
