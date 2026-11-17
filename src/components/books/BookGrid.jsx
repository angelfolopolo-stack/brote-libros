import BookCard from './BookCard'

// Cuadrícula responsive de libros: 1 columna en celular, 2 en tablet, 4 en escritorio.
export default function BookGrid({ libros, categorias = [] }) {
  const nombreDe = (id) => categorias.find((c) => c.id === id)?.nombre

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {libros.map((libro) => (
        <BookCard key={libro.id} libro={libro} nombreCategoria={nombreDe(libro.categoria)} />
      ))}
    </div>
  )
}
