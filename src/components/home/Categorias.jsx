import { Link } from 'react-router-dom'
import SectionTitle from '../ui/SectionTitle'
import { Cargando, ErrorCarga } from '../ui/Estado'
import useFetch from '../../hooks/useFetch'
import { obtenerCategorias } from '../../services/api'

export default function Categorias() {
  const { datos: categorias, cargando, error, recargar } = useFetch(obtenerCategorias)

  return (
    <section id="categorias" className="scroll-mt-20 bg-white px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionTitle titulo="¿Qué quieres trabajar hoy?" subtitulo="Encuentra tu próxima lectura por tema." />

        {cargando && <Cargando texto="Cargando categorías..." />}
        {error && <ErrorCarga error={error} onReintentar={recargar} />}

        {categorias && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categorias.map((c) => (
              <Link key={c.id} to={`/catalogo?categoria=${c.id}`} className="flex flex-col gap-3.5 rounded-2xl bg-brand-bg p-7 transition-transform hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-xl font-extrabold text-brand-green" style={{ background: c.color }}>
                  {c.inicial}
                </span>
                <span className="font-display text-xl font-bold text-brand-green">{c.nombre}</span>
                <span className="text-[15px] leading-relaxed text-brand-muted">{c.descripcion}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
