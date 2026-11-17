import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, CircleCheck } from 'lucide-react'
import Button from '../components/ui/Button'
import SectionTitle from '../components/ui/SectionTitle'
import Portada from '../components/books/Portada'
import { useCarrito } from '../context/CarritoContext'
import { soles } from '../utils/formato'

const ENVIO_GRATIS_DESDE = 150
const COSTO_ENVIO = 12

export default function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, totalItems, totalPrecio } = useCarrito()
  const [pedidoListo, setPedidoListo] = useState(false)

  const envio = totalPrecio >= ENVIO_GRATIS_DESDE || totalPrecio === 0 ? 0 : COSTO_ENVIO
  const total = totalPrecio + envio

  const finalizar = () => {
    vaciar()
    setPedidoListo(true)
  }

  if (pedidoListo) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-24 text-center">
        <CircleCheck size={56} className="text-brand-green" aria-hidden="true" />
        <h1 className="font-display text-4xl font-extrabold text-brand-green">¡Gracias por tu compra!</h1>
        <p className="text-lg text-brand-muted">Este es un pedido de prueba: el pago real se conectará en una siguiente etapa.</p>
        <Button as={Link} to="/catalogo">Seguir comprando</Button>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-24 text-center">
        <ShoppingBag size={56} className="text-brand-sage" aria-hidden="true" />
        <h1 className="font-display text-4xl font-extrabold text-brand-green">Tu carrito está vacío</h1>
        <p className="text-lg text-brand-muted">Explora el catálogo y agrega tu próximo libro.</p>
        <Button as={Link} to="/catalogo">Ir al catálogo</Button>
      </section>
    )
  }

  return (
    <section className="px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <SectionTitle titulo="Tu carrito" subtitulo={`${totalItems} ${totalItems === 1 ? 'libro' : 'libros'}`} />

        <div className="flex flex-wrap items-start gap-8">
          <ul className="flex min-w-0 flex-[999_1_520px] flex-col gap-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center gap-5 rounded-2xl bg-white p-5">
                <Portada libro={item} tamano="sm" />
                <div className="flex min-w-0 flex-[1_1_180px] flex-col gap-1">
                  <Link to={`/libro/${item.id}`} className="font-display text-lg font-bold leading-tight hover:text-brand-green">{item.titulo}</Link>
                  <span className="text-[15px] text-brand-muted">{item.autor}</span>
                  <span className="text-[15px] font-semibold">{soles(item.precio)} c/u</span>
                </div>
                <div className="flex items-center gap-2" role="group" aria-label={`Cantidad de ${item.titulo}`}>
                  <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} aria-label="Quitar uno" className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-line hover:border-brand-green">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center text-lg font-semibold" aria-live="polite">{item.cantidad}</span>
                  <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} disabled={item.cantidad >= item.stock} aria-label="Agregar uno" className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-line hover:border-brand-green disabled:opacity-40">
                    <Plus size={16} />
                  </button>
                </div>
                <span className="w-24 text-right text-lg font-semibold">{soles(item.precio * item.cantidad)}</span>
                <button type="button" onClick={() => quitar(item.id)} aria-label={`Eliminar ${item.titulo}`} className="flex h-11 w-11 items-center justify-center rounded-full text-[#8A2E10] hover:bg-[#FBEDE7]">
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          <aside className="flex flex-[1_1_280px] flex-col gap-4 rounded-2xl bg-white p-6">
            <h2 className="font-display text-2xl font-bold">Resumen</h2>
            <dl className="flex flex-col gap-2 text-[15px]">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{soles(totalPrecio)}</dd></div>
              <div className="flex justify-between"><dt>Envío</dt><dd>{envio === 0 ? 'Gratis' : soles(envio)}</dd></div>
              <div className="flex justify-between border-t border-brand-line pt-3 text-lg font-semibold"><dt>Total</dt><dd>{soles(total)}</dd></div>
            </dl>
            {envio > 0 && (
              <p className="rounded-xl bg-brand-bg p-3 text-sm text-brand-muted">
                Te faltan {soles(ENVIO_GRATIS_DESDE - totalPrecio)} para el envío gratis.
              </p>
            )}
            <Button onClick={finalizar} className="min-h-13">Finalizar compra</Button>
            <Button variante="secundario" onClick={vaciar}>Vaciar carrito</Button>
          </aside>
        </div>
      </div>
    </section>
  )
}
