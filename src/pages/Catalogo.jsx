import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import { Cargando, ErrorCarga, SinResultados } from '../components/ui/Estado'
import BookGrid from '../components/books/BookGrid'
import SearchBar from '../components/books/SearchBar'
import CategoryFilter from '../components/books/CategoryFilter'
import useFetch from '../hooks/useFetch'
import { obtenerLibros, obtenerCategorias } from '../services/api'

// Quita tildes y pasa a minúsculas para buscar "habitos" y encontrar "Hábitos"
const normalizar = (texto) => texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const ordenes = {
  relevancia: () => 0,
  'precio-asc': (a, b) => a.precio - b.precio,
  'precio-desc': (a, b) => b.precio - a.precio,
  titulo: (a, b) => a.titulo.localeCompare(b.titulo),
}

export default function Catalogo() {
  const libros = useFetch(obtenerLibros)
  const categorias = useFetch(obtenerCategorias)

  // Los filtros se guardan en la URL: /catalogo?categoria=finanzas&q=rico
  const [params, setParams] = useSearchParams()
  const busqueda = params.get('q') ?? ''
  const categoria = params.get('categoria') ?? ''
  const orden = params.get('orden') ?? 'relevancia'

  const actualizar = (clave, valor) => {
    const nuevos = new URLSearchParams(params)
    if (valor) nuevos.set(clave, valor)
    else nuevos.delete(clave)
    setParams(nuevos, { replace: true })
  }

  const filtrados = useMemo(() => {
    if (!libros.datos) return []
    const texto = normalizar(busqueda.trim())
    return libros.datos
      .filter((l) => !categoria || l.categoria === categoria)
      .filter((l) => !texto || normalizar(`${l.titulo} ${l.autor}`).includes(texto))
      .sort(ordenes[orden] ?? ordenes.relevancia)
  }, [libros.datos, busqueda, categoria, orden])

  const cargando = libros.cargando || categorias.cargando
  const error = libros.error || categorias.error

  return (
    <section className="px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <SectionTitle titulo="Catálogo" subtitulo="Busca por título o autor y filtra por tema." />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar valor={busqueda} onCambiar={(v) => actualizar('q', v)} />
            <label className="flex shrink-0 items-center gap-2 text-[15px] font-medium">
              <span className="whitespace-nowrap">Ordenar por</span>
              <select
                value={orden}
                onChange={(e) => actualizar('orden', e.target.value === 'relevancia' ? '' : e.target.value)}
                className="min-h-13 rounded-full border-2 border-brand-line bg-white px-4 outline-none focus:border-brand-green"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
                <option value="titulo">Título (A–Z)</option>
              </select>
            </label>
          </div>
          {categorias.datos && (
            <CategoryFilter categorias={categorias.datos} seleccionada={categoria} onSeleccionar={(id) => actualizar('categoria', id)} />
          )}
        </div>

        {cargando && <Cargando texto="Cargando catálogo..." />}
        {error && (
          <ErrorCarga
            error={error}
            onReintentar={() => {
              libros.recargar()
              categorias.recargar()
            }}
          />
        )}

        {!cargando && !error && (
          <>
            <p className="text-[15px] text-brand-muted" aria-live="polite">
              {filtrados.length} {filtrados.length === 1 ? 'libro encontrado' : 'libros encontrados'}
            </p>
            {filtrados.length > 0 ? (
              <BookGrid libros={filtrados} categorias={categorias.datos ?? []} />
            ) : (
              <SinResultados>
                <Button variante="secundario" onClick={() => setParams({}, { replace: true })}>Limpiar filtros</Button>
              </SinResultados>
            )}
          </>
        )}
      </div>
    </section>
  )
}
