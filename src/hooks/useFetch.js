import { useEffect, useState } from 'react'

// Hook personalizado: ejecuta una petición y maneja los estados de carga y error.
// Uso: const { datos, cargando, error, recargar } = useFetch(() => obtenerLibros(), [])
export default function useFetch(peticion, dependencias = []) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya se desmontó
    setCargando(true)
    setError(null)

    peticion()
      .then((resultado) => {
        if (activo) setDatos(resultado)
      })
      .catch((err) => {
        if (activo) setError(err)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, intento])

  const recargar = () => setIntento((n) => n + 1)

  return { datos, cargando, error, recargar }
}
