const ingredients = [
  {
    emoji: '🥩',
    name: 'Carne de primera',
    desc: 'Vísceras y cortes frescos seleccionados de frigoríficos locales. Sin subproductos ni harinas de carne.',
  },
  {
    emoji: '🌿',
    name: 'Sin aditivos',
    desc: 'Cero conservantes artificiales, cero colorantes, cero saborizantes. La etiqueta más corta del mercado.',
  },
  {
    emoji: '🌾',
    name: 'Origen local',
    desc: 'Proveedores cordobeses comprometidos con el bienestar animal y la producción responsable.',
  },
  {
    emoji: '💧',
    name: 'Deshidratación lenta',
    desc: 'Proceso a baja temperatura que preserva nutrientes, sabor y aroma natural sin destruir enzimas.',
  },
];

export default function Ingredientes() {
  return (
    <section id='ingredientes' className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texto */}
          <div>
            <span className="text-[#8fbc6a] text-sm font-semibold tracking-widest uppercase">Materia prima</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#60804F] mt-3 mb-4 tracking-tight leading-tight">
              Sabés exactamente<br />lo que le das.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              En Pipo&Co creemos que la transparencia es parte del producto.
              Cada snack tiene un origen claro, un proceso limpio y un propósito nutritivo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ingredients.map((item) => (
                <div key={item.name} className="flex gap-4 items-start">
                  <span className="text-3xl shrink-0 leading-none">{item.emoji}</span>
                  <div>
                    <p className="text-[#8fbc6a] font-semibold text-sm mb-1">{item.name}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen */}
          <div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-square shadow-2xl ring-1 ring-slate-800">
            <img
              src="/pipoca3.jpeg"
              alt="Ingredientes naturales"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-2 bg-slate-950/80 backdrop-blur text-[#8fbc6a] text-xs font-semibold px-4 py-2 rounded-full border border-[#60804F]/30">
                <span className="w-2 h-2 rounded-full bg-[#8fbc6a] animate-pulse" />
                100% ingredientes naturales
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
