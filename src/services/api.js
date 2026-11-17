// Servicio para consumir la API REST (JSON Server).
// En local corre en http://localhost:3001 (npm run api).
// Al desplegar se puede cambiar con la variable de entorno VITE_API_URL.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function pedir(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  })
  if (respuesta.status === 404) {
    const error = new Error('No encontrado')
    error.status = 404
    throw error
  }
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar la API`)
  }
  return respuesta.json()
}

// GET
export const obtenerLibros = () => pedir('/libros')
export const obtenerLibro = (id) => pedir(`/libros/${id}`)
export const obtenerDestacados = () => pedir('/libros?destacado=true')
export const obtenerCategorias = () => pedir('/categorias')

// POST
export const enviarMensaje = (datos) =>
  pedir('/mensajes', { method: 'POST', body: JSON.stringify({ ...datos, fecha: new Date().toISOString() }) })

export const suscribir = (correo) =>
  pedir('/suscriptores', { method: 'POST', body: JSON.stringify({ correo, fecha: new Date().toISOString() }) })
