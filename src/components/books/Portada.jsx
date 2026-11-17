// Portada ilustrada del libro (bloque de color con título y autor).
const tamanos = {
  sm: 'h-24 w-16 p-1.5 text-[8px]',
  md: 'h-56 w-36 p-4 text-[11px]',
  lg: 'h-80 w-52 p-5 text-xs',
}

const titulos = { sm: 'text-[9px]', md: 'text-lg', lg: 'text-2xl' }

export default function Portada({ libro, tamano = 'md' }) {
  return (
    <div
      className={`flex shrink-0 flex-col justify-between rounded-r-lg shadow-xl ${tamanos[tamano]}`}
      style={{ background: libro.portada, color: libro.tinta }}
      aria-hidden="true"
    >
      <span className="font-semibold uppercase tracking-wider">{libro.autor}</span>
      <span className={`font-display font-extrabold leading-tight ${titulos[tamano]}`}>{libro.titulo}</span>
    </div>
  )
}
