import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroDetalle from './pages/LibroDetalle'
import Carrito from './pages/Carrito'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

// Rutas de la aplicación. Todas comparten el Layout (Header + Footer).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libro/:id" element={<LibroDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
