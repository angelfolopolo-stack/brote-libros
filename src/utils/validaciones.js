// Validaciones reutilizables para los formularios.
export const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const REGEX_TELEFONO = /^9\d{8}$/ // celular peruano: 9 dígitos, empieza con 9

export function validarCorreo(correo) {
  if (!correo.trim()) return 'Ingresa tu correo electrónico.'
  if (!REGEX_CORREO.test(correo.trim())) return 'El correo no tiene un formato válido (ej. nombre@correo.com).'
  return ''
}

export function validarContacto({ nombre, correo, telefono, asunto, mensaje }) {
  const errores = {}
  if (nombre.trim().length < 3) errores.nombre = 'El nombre debe tener al menos 3 letras.'
  else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) errores.nombre = 'El nombre solo puede tener letras.'

  const errorCorreo = validarCorreo(correo)
  if (errorCorreo) errores.correo = errorCorreo

  if (telefono.trim() && !REGEX_TELEFONO.test(telefono.trim())) errores.telefono = 'El celular debe tener 9 dígitos y empezar con 9.'
  if (!asunto) errores.asunto = 'Elige un asunto.'
  if (mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
  return errores
}
