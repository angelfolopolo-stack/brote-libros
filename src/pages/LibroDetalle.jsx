import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import Button from '../components/ui/Button'
import Portada from '../components/books/Portada'
import { Cargando, ErrorCarga } from '../components/ui/Estado'
import useFetch from '../hooks/useFetch'
import { obtenerLibro } from '../services/api'
import { useCarrito } from '../context/CarritoContext'
import { soles } from '../utils/formato'
import NotFound from './NotFound'

export default function LibroDetalle() {
  const { id } = useParams() // lee el :id de la ruta /libro/:id
  const { datos: libro, cargando, error, recargar } = useFetch(() => obtenerLibro(id), [id])
  const { agregar, items } = useCarrito()

  if (cargando) return <Cargando texto="Cargando libro..." />
  if (error?.status === 404) return <NotFound mensaje="Este libro no existe o ya no está disponible." />
  if (error) return <div className="px-6 py-16"><ErrorCarga error={error} onReintentar={recargar} /></div>

  const enCarrito = items.find((i) => i.id === libro.id)
  const agotado = libro.stock === 0
  const sinMasStock = enCarrito && enCarrito.cantidad >= libro.stock

  return (
    <section className="px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <Link to="/catalogo" className="inline-flex items-center gap-2 self-start font-semibold text-brand-green hover:text-brand-green-dark">
          <ArrowLeft size={18} aria-hidden="true" /> Volver al catálogo
        </Link>

        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex h-[420px] items-center justify-center rounded-[28px] bg-[#E9E4D8]">
            <Portada libro={libro} tamano="lg" />
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-brand-green md:text-5xl">{libro.titulo}</h1>
            <p className="text-lg text-brand-muted">{libro.autor}</p>
            <p className="text-lg leading-relaxed">{libro.descripcion}</p>
            <p className="text-3xl font-semibold">{soles(libro.precio)}</p>
            <p className={`text-[15px] font-semibold ${agotado ? 'text-[#8A2E10]' : 'text-brand-green'}`}>
              {agotado ? 'Agotado por ahora' : `${libro.stock} unidades disponibles`}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => agregar(libro)} disabled={agotado || sinMasStock} className="min-h-13 px-8 disabled:cursor-not-allowed disabled:opacity-50">
                {sinMasStock ? 'Sin más stock' : 'Agregar al carrito'}
              </Button>
              {enCarrito && (
                <Link to="/carrito" className="inline-flex items-center gap-2 font-semibold text-brand-green">
                  <Check size={18} aria-hidden="true" /> {enCarrito.cantidad} en tu carrito · Ver carrito
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
