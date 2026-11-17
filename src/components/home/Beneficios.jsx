import { Truck, Smartphone, BookOpen, MessageCircle } from 'lucide-react'
import SectionTitle from '../ui/SectionTitle'

const beneficios = [
  { icono: Truck, titulo: 'Envío a todo el Perú', texto: 'Lima en 1 a 2 días hábiles y provincias en 3 a 5 días. Envío gratis desde S/ 150.' },
  { icono: Smartphone, titulo: 'Paga como prefieras', texto: 'Yape, Plin, tarjeta o transferencia. Pago seguro en cada compra.' },
  { icono: BookOpen, titulo: 'Libros 100% originales', texto: 'Trabajamos con editoriales y distribuidores oficiales.' },
  { icono: MessageCircle, titulo: 'Te recomendamos', texto: 'Escríbenos por WhatsApp y te ayudamos a elegir tu próximo libro.' },
]

export default function Beneficios() {
  return (
    <section id="beneficios" className="scroll-mt-20 bg-brand-green px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-11">
        <div className="max-w-2xl">
          <SectionTitle titulo="Comprar tu próximo libro debería ser así de fácil." claro />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map(({ icono: Icono, titulo, texto }) => (
            <div key={titulo} className="flex flex-col gap-3 rounded-2xl bg-brand-green-soft p-7">
              <Icono size={32} className="text-brand-sage" aria-hidden="true" />
              <h3 className="font-display text-xl font-bold text-white">{titulo}</h3>
              <p className="text-[15px] leading-relaxed text-[#D5DECF]">{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
