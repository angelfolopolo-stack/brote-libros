import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

// Buscador reutilizable. Usa useRef para poner el cursor en el campo y presionar "/" para buscar.
export default function SearchBar({ valor, onCambiar, placeholder = 'Buscar por título o autor' }) {
  const inputRef = useRef(null)

  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [])

  const limpiar = () => {
    onCambiar('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      <label htmlFor="buscador" className="sr-only">Buscar libros</label>
      <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
      <input
        id="buscador"
        ref={inputRef}
        type="search"
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder={placeholder}
        className="min-h-13 w-full rounded-full border-2 border-brand-line bg-white pl-12 pr-12 text-base outline-none focus:border-brand-green"
      />
      {valor && (
        <button type="button" onClick={limpiar} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-brand-muted hover:bg-brand-bg">
          <X size={18} />
        </button>
      )}
    </div>
  )
}
