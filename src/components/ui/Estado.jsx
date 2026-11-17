import { LoaderCircle, TriangleAlert, SearchX } from 'lucide-react'
import Button from './Button'

// Componentes reutilizables para los estados de carga, error y "sin resultados".

export function Cargando({ texto = 'Cargando...' }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-brand-muted">
      <LoaderCircle size={36} className="animate-spin text-brand-green" aria-hidden="true" />
      <p>{texto}</p>
    </div>
  )
}

export function ErrorCarga({ error, onReintentar }) {
  return (
    <div role="alert" className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-2xl border-2 border-[#E9B7A6] bg-[#FBEDE7] p-8 text-center">
      <TriangleAlert size={36} className="text-[#B4471F]" aria-hidden="true" />
      <p className="font-display text-xl font-bold">No pudimos cargar la información</p>
      <p className="text-[15px] text-brand-muted">
        {error?.message || 'Ocurrió un error.'} Verifica que la API esté funcionando (<code>npm run api</code>).
      </p>
      {onReintentar && (
        <Button variante="oscuro" onClick={onReintentar}>Reintentar</Button>
      )}
    </div>
  )
}

export function SinResultados({ texto = 'No encontramos libros con esos filtros.', children }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center text-brand-muted">
      <SearchX size={36} aria-hidden="true" />
      <p>{texto}</p>
      {children}
    </div>
  )
}
