import { Link } from 'react-router-dom'
import BookGrid from '../books/BookGrid'
import SectionTitle from '../ui/SectionTitle'
import { Cargando, ErrorCarga } from '../ui/Estado'
import useFetch from '../../hooks/useFetch'
import { obtenerDestacados } from '../../services/api'

export default function Destacados() {
  const { datos: libros, cargando, error, recargar } = useFetch(obtenerDestacados)

  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle titulo="Los más vendidos" subtitulo="Los favoritos de nuestros lectores este mes." />
          <Link to="/catalogo" className="font-semibold text-brand-green hover:text-brand-green-dark">Ver todo el catálogo →</Link>
        </div>

        {cargando && <Cargando texto="Cargando libros..." />}
        {error && <ErrorCarga error={error} onReintentar={recargar} />}
        {libros && <BookGrid libros={libros} />}
      </div>
    </section>
  )
}
