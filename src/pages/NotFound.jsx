import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

// Página de error 404 (rutas que no existen).
export default function NotFound({ mensaje = 'La página que buscas no existe o fue movida.' }) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-24 text-center">
      <p className="font-display text-8xl font-extrabold text-brand-sage">404</p>
      <h1 className="font-display text-4xl font-extrabold text-brand-green">Página no encontrada</h1>
      <p className="text-lg text-brand-muted">{mensaje}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button as={Link} to="/">Volver al inicio</Button>
        <Button as={Link} to="/catalogo" variante="secundario">Ver catálogo</Button>
      </div>
    </section>
  )
}
