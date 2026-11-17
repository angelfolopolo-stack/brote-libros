import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCarrito } from '../../context/CarritoContext'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/catalogo', texto: 'Catálogo' },
  { to: '/contacto', texto: 'Contacto' },
]

// NavLink agrega estilos al enlace de la página actual
const estiloEnlace = ({ isActive }) =>
  `rounded-full px-4 py-2 transition-colors ${isActive ? 'bg-brand-green text-white' : 'text-brand-green hover:bg-[#E3EBDF]'}`

// Menú de navegación responsive: horizontal en escritorio, hamburguesa en celular.
export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { totalItems } = useCarrito()
  return (
    <nav aria-label="Navegación principal" className="flex items-center gap-3">
      <ul className="hidden items-center gap-1 text-[15px] font-medium md:flex">
        {enlaces.map((e) => (
          <li key={e.to}>
            <NavLink to={e.to} end={e.to === '/'} className={estiloEnlace}>{e.texto}</NavLink>
          </li>
        ))}
      </ul>

      <Link
        to="/carrito"
        onClick={() => setAbierto(false)}
        aria-label={`Carrito, ${totalItems} libros`}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-green px-4 sm:px-5 font-semibold text-white hover:bg-brand-green-dark"
      >
        <ShoppingCart size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Carrito</span>
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-accent px-1.5 text-sm text-brand-ink">{totalItems}</span>
      </Link>

      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-green text-brand-green md:hidden"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? <X size={20} /> : <Menu size={20} />}
      </button>

      {abierto && (
        <ul className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-brand-line bg-brand-bg px-6 py-4 md:hidden">
          {enlaces.map((e) => (
            <li key={e.to}>
              <NavLink to={e.to} end={e.to === '/'} onClick={() => setAbierto(false)} className={({ isActive }) => `block rounded-xl px-4 py-3 text-lg font-medium ${isActive ? 'bg-brand-green text-white' : 'text-brand-green'}`}>
                {e.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
