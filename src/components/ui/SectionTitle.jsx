export default function SectionTitle({ titulo, subtitulo, claro = false }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className={`font-display text-4xl font-extrabold tracking-tight ${claro ? 'text-white' : 'text-brand-green'}`}>
        {titulo}
      </h2>
      {subtitulo && <p className={`text-[17px] ${claro ? 'text-[#D5DECF]' : 'text-brand-muted'}`}>{subtitulo}</p>}
    </div>
  )
}
