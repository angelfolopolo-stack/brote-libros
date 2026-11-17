import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Portada from './Portada'
import { useCarrito } from '../../context/CarritoContext'
import { soles } from '../../utils/formato'

// Tarjeta de libro reutilizable (se usa en el Home y en el Catálogo).
export default function BookCard({ libro, nombreCategoria }) {
  const { agregar, estaEnCarrito } = useCarrito()
  const enCarrito = estaEnCarrito(libro.id)
  const agotado = libro.stock === 0

  return (
    <article className="flex flex-col gap-3">
      <Link to={`/libro/${libro.id}`} className="flex h-72 items-center justify-center rounded-2xl bg-[#E9E4D8] transition-transform hover:-translate-y-1" aria-label={`Ver detalle de ${libro.titulo}`}>
        <Portada libro={libro} />
      </Link>
      {nombreCategoria && (
        <span className="text-[13px] font-semibold uppercase tracking-wide text-brand-green">{nombreCategoria}</span>
      )}
      <h3 className="font-display text-xl font-bold leading-tight">
        <Link to={`/libro/${libro.id}`} className="hover:text-brand-green">{libro.titulo}</Link>
      </h3>
      <p className="text-[15px] text-brand-muted">{libro.autor}</p>
      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="text-lg font-semibold">{soles(libro.precio)}</span>
        <Button
          variante={enCarrito ? 'oscuro' : 'secundario'}
          onClick={() => agregar(libro)}
          disabled={agotado}
          className="disabled:cursor-not-allowed disabled:border-brand-line disabled:text-brand-muted disabled:hover:bg-transparent"
        >
          {agotado ? 'Agotado' : enCarrito ? 'Agregar otro' : 'Agregar'}
        </Button>
      </div>
    </article>
  )
}
