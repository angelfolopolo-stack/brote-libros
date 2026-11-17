import { Link } from 'react-router-dom'

const columnas = [
  { titulo: 'Tienda', enlaces: [['Inicio', '/'], ['Catálogo', '/catalogo'], ['Carrito', '/carrito']] },
  { titulo: 'Ayuda', enlaces: [['Contacto', '/contacto'], ['Libro de reclamaciones', '/contacto']] },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-line px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-8">
        <div className="flex max-w-xs flex-col gap-2.5">
          <span className="font-display text-2xl font-extrabold text-brand-green">Brote Libros</span>
          <p className="text-[15px] leading-relaxed text-brand-muted">
            Tu librería online de autoayuda y desarrollo personal. Lima, Perú.
          </p>
        </div>
        <div className="flex flex-wrap gap-14 text-[15px]">
          {columnas.map((col) => (
            <div key={col.titulo} className="flex flex-col gap-2.5">
              <span className="font-semibold">{col.titulo}</span>
              {col.enlaces.map(([texto, ruta]) => (
                <Link key={texto} to={ruta} className="text-brand-green hover:text-brand-green-dark">{texto}</Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold">Contacto</span>
            <span className="text-brand-muted">WhatsApp: 940300242</span>
            <span className="text-brand-muted">angelfolopolo@gmail.com</span>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-[13px] text-brand-muted">© 2026 Brote Libros. Todos los derechos reservados.</p>
    </footer>
  )
}
