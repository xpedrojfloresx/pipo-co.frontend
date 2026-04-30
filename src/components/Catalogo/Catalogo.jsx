import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const imgPositionMap = {
  'object-center': 'object-center',
  'object-bottom': 'object-bottom',
  'object-top': 'object-top',
  'object-left': 'object-left',
  'object-right': 'object-right',
}

export default function Catalogo({ onAgregarAlCarrito }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/productos`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);
  return (
    <section id='catalogo' className='bg-white'>
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#60804F] tracking-tight">Catálogo</h1>
          <p className="mt-4 max-w-xl text-[#8fbc6a] text-sm font-semibold tracking-widest uppercase">
            Vísceras frescas de primera calidad, seleccionadas para tu mascota.
          </p>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible snap-x  snap-mandatory sm:snap-none pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[80vw] sm:min-w-0 snap-center bg-[#1a2e1a] rounded-xl overflow-hidden shadow-lg flex flex-col hover:scale- [1.02] transition-transform duration-200"
            >
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className={`w-full h-70 sm:h-100 object-cover transition-transform duration-300 ${imgPositionMap[product.imgPosition] ?? 'object-center'}`}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#60804F] text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-white text-xl font-bold">{product.name}</h2>
                {Array.isArray(product.description) ? (
                  <ul className="text-[#60804F] text-sm mt-1 space-y-0.5">
                    {product.description.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#60804F] text-sm mt-1">{product.description}</p>
                )}
                <div className="flex items-baseline gap-1 mt-1 mb-4">
                  <span className="text-[#8fbc6a] text-2xl font-bold">{product.price}</span>
                  <span className="text-gray-400 text-sm">{product.unit}</span>
                </div>
                <button
                  onClick={() => onAgregarAlCarrito(product)}
                  className="mt-auto w-full bg-[#60804F] hover:bg-[#4e6b3f] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
