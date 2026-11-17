import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 text-brand-green ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 28V14" />
        <path d="M16 16c0-5 3-8 9-8 0 6-3 9-9 9" />
        <path d="M16 20c0-4-2.5-7-8-7 0 5 2.5 8 8 8" />
      </svg>
      <span className="whitespace-nowrap font-display text-xl font-extrabold tracking-tight sm:text-2xl">Brote Libros</span>
    </Link>
  )
}

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-brand-line bg-brand-bg/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Logo />
        <Navbar />
      </div>
    </header>
  )
}
