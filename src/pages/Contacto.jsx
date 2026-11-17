import { useRef, useState } from 'react'
import { CircleCheck } from 'lucide-react'
import Button from '../components/ui/Button'
import SectionTitle from '../components/ui/SectionTitle'
import { enviarMensaje } from '../services/api'
import { validarContacto } from '../utils/validaciones'

const inicial = { nombre: '', correo: '', telefono: '', asunto: '', mensaje: '' }
const MAX_MENSAJE = 500

// Campo de formulario reutilizable con etiqueta y mensaje de error.
function Campo({ id, etiqueta, error, opcional, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {etiqueta} {opcional && <span className="font-normal text-brand-muted">(opcional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm font-semibold text-[#8A2E10]">{error}</p>}
    </div>
  )
}

export default function Contacto() {
  const [form, setForm] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('inicial') // inicial | enviando | enviado | error
  const formRef = useRef(null) // referencia al formulario para mover el cursor

  const cambiar = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (errores[name]) setErrores({ ...errores, [name]: '' })
  }

  const enviar = async (e) => {
    e.preventDefault()
    const nuevos = validarContacto(form)
    setErrores(nuevos)

    const primero = Object.keys(nuevos)[0]
    if (primero) {
      formRef.current?.elements[primero]?.focus() // useRef: lleva el cursor al primer campo con error
      return
    }

    setEstado('enviando')
    try {
      await enviarMensaje(form)
      setEstado('enviado')
      setForm(inicial)
    } catch {
      setEstado('error')
    }
  }

  const clases = (campo) =>
    `min-h-12 w-full rounded-xl border-2 bg-white px-4 text-base outline-none focus:border-brand-green ${errores[campo] ? 'border-[#B4471F]' : 'border-brand-line'}`

  const aria = (campo) => ({ 'aria-invalid': Boolean(errores[campo]), 'aria-describedby': errores[campo] ? `${campo}-error` : undefined })

  return (
    <section className="px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="flex flex-col gap-4">
          <SectionTitle titulo="Contáctanos" subtitulo="¿Buscas un libro o tienes una consulta sobre tu pedido? Escríbenos." />
          <div className="rounded-2xl bg-brand-green p-6 text-[#D5DECF]">
            <p className="font-display text-xl font-bold text-white">Atención</p>
            <p className="mt-2">Lunes a sábado, 9:00 a. m. a 6:00 p. m.</p>
            <p>WhatsApp: 940300242</p>
            <p>angelfolopolo@gmail.com</p>
          </div>
        </div>

        {estado === 'enviado' ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-10 text-center" role="status">
            <CircleCheck size={48} className="text-brand-green" aria-hidden="true" />
            <p className="font-display text-2xl font-bold">¡Mensaje enviado!</p>
            <p className="text-brand-muted">Te responderemos en menos de 24 horas.</p>
            <Button variante="secundario" onClick={() => setEstado('inicial')}>Enviar otro mensaje</Button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={enviar} noValidate className="flex flex-col gap-5 rounded-2xl bg-white p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Campo id="nombre" etiqueta="Nombre" error={errores.nombre}>
                <input id="nombre" name="nombre" value={form.nombre} onChange={cambiar} autoComplete="name" className={clases('nombre')} {...aria('nombre')} />
              </Campo>
              <Campo id="correo" etiqueta="Correo electrónico" error={errores.correo}>
                <input id="correo" name="correo" type="email" value={form.correo} onChange={cambiar} autoComplete="email" className={clases('correo')} {...aria('correo')} />
              </Campo>
              <Campo id="telefono" etiqueta="Celular" error={errores.telefono} opcional>
                <input id="telefono" name="telefono" type="tel" inputMode="numeric" maxLength={9} value={form.telefono} onChange={cambiar} placeholder="9XXXXXXXX" className={clases('telefono')} {...aria('telefono')} />
              </Campo>
              <Campo id="asunto" etiqueta="Asunto" error={errores.asunto}>
                <select id="asunto" name="asunto" value={form.asunto} onChange={cambiar} className={clases('asunto')} {...aria('asunto')}>
                  <option value="">Selecciona una opción</option>
                  <option value="recomendacion">Quiero una recomendación</option>
                  <option value="pedido">Consulta sobre mi pedido</option>
                  <option value="libro">Busco un libro que no está</option>
                  <option value="otro">Otro</option>
                </select>
              </Campo>
            </div>
            <Campo id="mensaje" etiqueta="Mensaje" error={errores.mensaje}>
              <textarea id="mensaje" name="mensaje" rows={5} maxLength={MAX_MENSAJE} value={form.mensaje} onChange={cambiar} className={`${clases('mensaje')} py-3`} {...aria('mensaje')} />
              <span className="self-end text-sm text-brand-muted">{form.mensaje.length}/{MAX_MENSAJE}</span>
            </Campo>
            {estado === 'error' && (
              <p role="alert" className="rounded-xl bg-[#FBEDE7] p-3 font-semibold text-[#8A2E10]">No pudimos enviar tu mensaje. Verifica tu conexión e inténtalo de nuevo.</p>
            )}
            <Button type="submit" disabled={estado === 'enviando'} className="min-h-13 self-start px-8 disabled:opacity-60">
              {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
