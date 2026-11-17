import { useState } from 'react'
import { suscribir } from '../../services/api'
import { validarCorreo } from '../../utils/validaciones'

// Llamada a la acción (CTA): suscripción al club de lectura (POST a la API).
export default function ClubCTA() {
  const [correo, setCorreo] = useState('')
  const [error, setError] = useState('')
  const [estado, setEstado] = useState('inicial') // inicial | enviando | listo

  const enviar = async (e) => {
    e.preventDefault()
    const mensajeError = validarCorreo(correo)
    setError(mensajeError)
    if (mensajeError) return

    setEstado('enviando')
    try {
      await suscribir(correo.trim())
      setEstado('listo')
    } catch {
      setError('No pudimos registrar tu correo. Inténtalo de nuevo.')
      setEstado('inicial')
    }
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-9 rounded-[32px] bg-brand-accent px-6 py-12 sm:px-10 sm:py-14">
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">Únete al Club Brote</h2>
          <p className="text-[17px] leading-relaxed">
            Recibe recomendaciones, novedades y un descuento de bienvenida en tu primera compra.
          </p>
        </div>

        {estado === 'listo' ? (
          <p className="flex-[1_1_320px] rounded-2xl bg-white p-5 text-[17px] font-semibold text-brand-green" role="status">
            ¡Listo! Ya eres parte del Club Brote.
          </p>
        ) : (
          <form onSubmit={enviar} noValidate className="flex min-w-0 flex-[1_1_320px] flex-col gap-2">
            <label htmlFor="correo-club" className="text-sm font-semibold">Tu correo electrónico</label>
            <div className="flex flex-wrap gap-2.5">
              <input
                id="correo-club"
                type="email"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value)
                  if (error) setError('')
                }}
                placeholder="nombre@correo.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'error-club' : undefined}
                className={`min-h-13 min-w-0 flex-[1_1_200px] rounded-full border-2 bg-white px-5 text-base outline-none focus:ring-4 focus:ring-brand-green/30 ${error ? 'border-[#B4471F]' : 'border-brand-ink'}`}
              />
              <button type="submit" disabled={estado === 'enviando'} className="min-h-13 rounded-full bg-brand-ink px-7 font-semibold text-white hover:bg-black disabled:opacity-60">
                {estado === 'enviando' ? 'Enviando...' : 'Suscribirme'}
              </button>
            </div>
            {error && <p id="error-club" className="text-sm font-semibold text-[#8A2E10]">{error}</p>}
          </form>
        )}
      </div>
    </section>
  )
}
