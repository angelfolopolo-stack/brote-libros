# Brote Libros

Tienda online de libros de autoayuda hecha con **React + Vite + Tailwind CSS + React Router**, que consume una API simulada con **JSON Server**.

## Cómo ejecutarlo en tu computadora

```bash
npm install
npm start
```

`npm start` levanta dos cosas a la vez:

- La **API** (JSON Server) en http://localhost:3001 → `npm run api`
- La **página** (Vite) en http://localhost:5173 → `npm run dev`

Si prefieres, ábrelos por separado en dos terminales: `npm run api` en una y `npm run dev` en otra.

> No uses Live Server: la página solo funciona con `npm run dev`.

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio (Hero, categorías, destacados, beneficios, club) |
| `/catalogo` | Catálogo con buscador, filtro por categoría y orden |
| `/libro/:id` | Detalle de un libro |
| `/carrito` | Carrito de compras |
| `/contacto` | Formulario de contacto con validaciones |
| `*` | Página 404 |

## API (JSON Server)

Los datos están en `db.json`:

| Método | Endpoint | Uso |
| --- | --- | --- |
| GET | `/libros` | Los 12 libros del catálogo |
| GET | `/libros/:id` | Un libro |
| GET | `/libros?destacado=true` | Libros destacados del Home |
| GET | `/categorias` | Las 4 categorías |
| POST | `/mensajes` | Guarda un mensaje del formulario de contacto |
| POST | `/suscriptores` | Guarda un correo del Club Brote |

## Estructura

```
src/
├── main.jsx                 # BrowserRouter + CarritoProvider
├── App.jsx                  # Rutas
├── index.css                # Tailwind + guía de estilos (@theme)
├── components/
│   ├── layout/              # Header, Navbar, Footer, Layout
│   ├── ui/                  # Button, SectionTitle, Estado (carga/error)
│   ├── books/               # BookCard, BookGrid, Portada, SearchBar, CategoryFilter
│   └── home/                # Hero, Categorias, Destacados, Beneficios, ClubCTA
├── pages/                   # Home, Catalogo, LibroDetalle, Carrito, Contacto, NotFound
├── context/CarritoContext.jsx  # Estado global del carrito (useContext)
├── hooks/useFetch.js        # useState + useEffect para cargar datos
├── services/api.js          # Peticiones con fetch
└── utils/                   # Formato de soles y validaciones
```

## Publicar en GitHub

```bash
git init
git add .
git commit -m "Brote Libros: proyecto inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/brote-libros.git
git push -u origin main
```

(Primero crea el repositorio vacío `brote-libros` en github.com, **público**.)

## Desplegar en Vercel

JSON Server solo corre en tu computadora, así que en internet se usa **My JSON Server**, que lee el `db.json` directamente de tu repositorio público de GitHub:

```
https://my-json-server.typicode.com/TU_USUARIO/brote-libros
```

1. Entra a vercel.com e inicia sesión con GitHub.
2. **Add New → Project** y elige el repositorio `brote-libros`. Vercel detecta Vite solo.
3. En **Environment Variables** agrega:
   - Nombre: `VITE_API_URL`
   - Valor: `https://my-json-server.typicode.com/TU_USUARIO/brote-libros`
4. Clic en **Deploy**.

El archivo `vercel.json` hace que las rutas (`/catalogo`, `/carrito`, etc.) funcionen al recargar la página. Para Netlify, lo mismo lo hace `public/_redirects`.

> En My JSON Server los POST responden bien pero no se guardan (es una API de prueba).
