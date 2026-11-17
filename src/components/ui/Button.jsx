// Botón reutilizable con las 3 variantes de la guía de estilos.
// Con as={Link} y to="/ruta" funciona como enlace de React Router.
const variantes = {
  primario: 'bg-brand-accent text-brand-ink hover:bg-brand-accent-dark',
  secundario: 'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white',
  oscuro: 'bg-brand-green text-white hover:bg-brand-green-dark',
}

export default function Button({ as: Tag = 'button', variante = 'primario', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-colors ${variantes[variante]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
