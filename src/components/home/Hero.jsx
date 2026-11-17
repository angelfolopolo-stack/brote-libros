import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:py-20">
      <div className="flex flex-col gap-6">
        <span className="self-start rounded-full bg-[#E3EBDF] px-4 py-2 text-sm font-semibold text-brand-green">
          Envíos a todo el Perú
        </span>
        <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-green md:text-7xl">
          Libros que te ayudan a crecer, un capítulo a la vez.
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-brand-muted">
          Hábitos, finanzas personales, bienestar emocional y liderazgo. Elegimos cada título para que
          encuentres el libro justo para tu momento.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button as={Link} to="/catalogo" className="min-h-13 px-7">Ver catálogo</Button>
          <Button as="a" href="#categorias" variante="secundario" className="min-h-13 px-7">Explorar categorías</Button>
        </div>
      </div>

      {/* Ilustración de libros (reemplazable por una foto) */}
      <div className="relative mx-auto h-[360px] w-full max-w-md overflow-hidden rounded-[32px] bg-brand-green sm:h-[420px]" aria-hidden="true">
        <p className="absolute left-10 top-10 max-w-[260px] font-display text-2xl font-bold text-[#E3EBDF]">
          Nuevos títulos cada semana
        </p>
        <div className="absolute bottom-14 left-[12%] h-[200px] w-[130px] -rotate-6 rounded-r-xl bg-[#E8743B] shadow-2xl" />
        <div className="absolute bottom-[70px] left-[35%] flex h-[230px] w-[140px] items-end rounded-r-xl bg-brand-bg p-4 shadow-2xl">
          <span className="font-display text-xl font-extrabold leading-tight text-brand-green">Tu mejor versión</span>
        </div>
        <div className="absolute bottom-12 left-[62%] h-[190px] w-[120px] rotate-6 rounded-r-xl bg-brand-sage shadow-2xl" />
      </div>
    </section>
  )
}
