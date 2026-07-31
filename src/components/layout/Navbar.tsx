"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import Logo from '@/components/brand/Logo';

// El menú es administrable desde el CMS (recurso "Menú de navegación")
export default function Navbar({ menu }: { menu: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" aria-label="Pailex — Inicio" onClick={() => setOpen(false)}>
          <Logo variant="onDark" markClassName="h-7 w-auto" textClassName="text-xl" />
        </Link>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center space-x-8">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider"
            >
              {item.label}
            </Link>
          ))}
          <button className="text-white hover:text-accent">
            <Search size={20} />
          </button>
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          type="button"
          className="md:hidden text-white hover:text-accent transition-colors"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <div className="md:hidden bg-primary border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider py-3 border-b border-white/5 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
