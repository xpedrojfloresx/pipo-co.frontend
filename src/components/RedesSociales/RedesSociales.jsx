import { Heart, Play } from 'lucide-react'

const posts = [
  { id: 1, type: 'post', src: '/posts/post-orejadecerdo.jpg',  likes: '8', caption: 'VOLVIERON 🐶🔥', postSrc:'https://www.instagram.com/p/DWSEl9aj0l7/' },
  { id: 2, type: 'reel', src: '/posts/post-reel-bruno.mp4',    likes: '18', caption:'Bruno eligió el pulmón 🐶', postSrc:'https://www.instagram.com/p/DVd_c6vjkGi/' },
  { id: 3, type: 'reel', src: '/posts/post-reel-osito.mp4',  likes: '14', caption: 'Proceso artesanal, Córdoba ✨', postSrc:'https://www.instagram.com/p/DU4AkN7DwAW/' },
  { id: 4, type: 'reel', src: '/posts/post-reel-mate.mp4',  likes: '13', caption: 'Cero conservantes 🌿', postSrc:'https://www.instagram.com/p/DUtbgh3D3Q9/' },
  { id: 5, type: 'post', src: '/posts/post-beneficios.jpg', likes: '15', caption: 'Nuevo lote de orejas 🐷', postSrc:'https://www.instagram.com/p/DUgxilOj1ew/?img_index=1' },
  { id: 6, type: 'reel', src: '/posts/post-reel-pipoca.mp4',  likes: '24', caption: 'Cada ingrediente, seleccionado 🥩', postSrc:'https://www.instagram.com/p/DUWqAazD38a/' },
]

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function RedesSociales() {
  return (
    <section className="bg-white">
      <div className="relative bg-[url('/pipoca2.jpg')] bg-cover bg-center py-14 mx-4 md:mx-10 rounded-2xl">
        <div className="absolute inset-0 bg-black/60 rounded-2xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">

          {/* Encabezado */}
          <div className="text-center mb-8">
            <span className="text-[#8fbc6a] text-sm font-semibold tracking-widest uppercase">
              Seguinos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 tracking-tight">
              @pipoandco en Instagram
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
              Recetas, detrás de escena y las caras más lindas de Córdoba.
            </p>
          </div>

          {/* Grid de posts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.postSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl block"
              >
                {post.type === 'reel' ? (
                  <video
                    src={post.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={post.src}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Badge reel */}
                {post.type === 'reel' && (
                  <div className="absolute top-2 right-2 z-10 bg-black/50 rounded-full p-1">
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                )}

                {/* Overlay al hover */}
                <div className="absolute inset-0 bg-[#1A2E1A]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex   flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-1.5 text-white font-semibold">
                    <Heart className="w-5 h-5 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <p className="text-white/80 text-xs text-center px-4 leading-snug">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-6">
            <a
              href="https://instagram.com/pipoandco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#60804F] hover:bg-[#4e6b3f] text-white font-semibold   text-sm transition-colors"
            >
              <InstagramIcon />
              Seguir en Instagram
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
