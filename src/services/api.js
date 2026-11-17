import dbLocal from '../../db.json'

// Servicio para consumir la API REST.
// - En tu computadora (npm start) usa JSON Server en http://localhost:3001.
// - Publicado (Vercel) usa los mismos datos de db.json incluidos en la página.
// - Si defines VITE_API_URL, usa esa API (por ejemplo, un JSON Server en internet).
const API_EXTERNA = import.meta.env.VITE_API_URL
export const API_URL = API_EXTERNA || (import.meta.env.DEV ? 'http://localhost:3001' : '')
const MODO_ESTATICO = !API_URL

async function pedir(ruta, opciones = {}) {
  if (MODO_ESTATICO) return pedirEstatico(ruta, opciones)

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

// Simula la API con los datos de db.json (para la versión publicada).
function pedirEstatico(ruta, opciones) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const [camino, consulta] = ruta.split('?')
      const [, recurso, id] = camino.split('/')
      const lista = dbLocal[recurso]

      if (!lista) return reject(Object.assign(new Error('No encontrado'), { status: 404 }))

      if (opciones.method === 'POST') {
        return resolve({ ...JSON.parse(opciones.body), id: Date.now() })
      }

      if (id) {
        const item = lista.find((x) => String(x.id) === id)
        return item ? resolve(item) : reject(Object.assign(new Error('No encontrado'), { status: 404 }))
      }

      const filtros = new URLSearchParams(consulta)
      resolve(lista.filter((x) => [...filtros].every(([k, v]) => String(x[k]) === v)))
    }, 300)
  })
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