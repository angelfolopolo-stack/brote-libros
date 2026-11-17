import { createContext, useContext, useEffect, useState } from 'react'

const CarritoContext = createContext(null)

const CLAVE = 'brote-carrito'

function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

// Proveedor del carrito: cualquier componente puede leerlo con useCarrito()
export function CarritoProvider({ children }) {
  const [items, setItems] = useState(cargarCarrito)

  // Guarda el carrito en el navegador cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      // si el navegador no permite guardar, el carrito solo vive en memoria
    }
  }, [items])

  const agregar = (libro) => {
    setItems((actual) => {
      const existe = actual.find((i) => i.id === libro.id)
      if (existe) {
        return actual.map((i) => (i.id === libro.id ? { ...i, cantidad: Math.min(i.cantidad + 1, libro.stock) } : i))
      }
      return [...actual, { id: libro.id, titulo: libro.titulo, autor: libro.autor, precio: libro.precio, portada: libro.portada, tinta: libro.tinta, stock: libro.stock, cantidad: 1 }]
    })
  }

  const cambiarCantidad = (id, cantidad) => {
    setItems((actual) =>
      actual
        .map((i) => (i.id === id ? { ...i, cantidad: Math.max(0, Math.min(cantidad, i.stock)) } : i))
        .filter((i) => i.cantidad > 0),
    )
  }

  const quitar = (id) => setItems((actual) => actual.filter((i) => i.id !== id))
  const vaciar = () => setItems([])
  const estaEnCarrito = (id) => items.some((i) => i.id === id)

  const totalItems = items.reduce((suma, i) => suma + i.cantidad, 0)
  const totalPrecio = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ items, agregar, cambiarCantidad, quitar, vaciar, estaEnCarrito, totalItems, totalPrecio }}>
      {children}
    </CarritoContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return contexto
}
