// Filtro por categoría con botones tipo píldora.
export default function CategoryFilter({ categorias, seleccionada, onSeleccionar }) {
  const opciones = [{ id: '', nombre: 'Todas' }, ...categorias]

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      {opciones.map((c) => {
        const activa = seleccionada === c.id
        return (
          <button
            key={c.id || 'todas'}
            type="button"
            onClick={() => onSeleccionar(c.id)}
            aria-pressed={activa}
            className={`min-h-11 rounded-full px-5 text-[15px] font-semibold transition-colors ${
              activa ? 'bg-brand-green text-white' : 'border-2 border-brand-line bg-white text-brand-green hover:border-brand-green'
            }`}
          >
            {c.nombre}
          </button>
        )
      })}
    </div>
  )
}
