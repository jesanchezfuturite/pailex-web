"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import type { MenuLink } from '@/lib/api';

// El menú es administrable desde el CMS (recurso "Menú de navegación").
// El ítem "Soluciones" muestra además un dropdown con los interiores
// publicados (solutions_menu): sigue siendo enlace a la página general.
export default function Navbar({
  menu,
  solutionsMenu = [],
}: {
  menu: MenuLink[];
  solutionsMenu?: MenuLink[];
}) {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);

  // Cierre con Escape y con clic fuera (accesibilidad táctil/teclado)
  useEffect(() => {
    if (!solutionsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSolutionsOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) setSolutionsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [solutionsOpen]);

  const isSolutions = (item: MenuLink) => item.href === '/soluciones' && solutionsMenu.length > 0;

  return (
    <nav className="fixed w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" aria-label="Pailex — Inicio" onClick={() => setOpen(false)}>
          <Logo variant="onDark" markClassName="h-7 w-auto" textClassName="text-xl" />
        </Link>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center space-x-8">
          {menu.map((item) =>
            isSolutions(item) ? (
              <div
                key={item.href}
                ref={solutionsRef}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <div className="flex items-center gap-1">
                  {/* El enlace principal sigue llevando a la página general */}
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider"
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-label="Abrir menú de soluciones"
                    aria-expanded={solutionsOpen}
                    aria-haspopup="true"
                    onClick={() => setSolutionsOpen(!solutionsOpen)}
                    className="text-white/80 hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {solutionsOpen && (
                  <div className="absolute left-0 top-full pt-3 w-72">
                    <div className="bg-primary border border-white/10 shadow-2xl clip-notch-br-sm py-2">
                      {solutionsMenu.map((solution) => (
                        <Link
                          key={solution.href}
                          href={solution.href}
                          onClick={() => setSolutionsOpen(false)}
                          className="block px-5 py-3 text-white/80 hover:text-accent hover:bg-white/5 transition-colors text-sm font-medium uppercase tracking-wider focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
                        >
                          {solution.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ),
          )}
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
              <div key={item.href} className="border-b border-white/5 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-white/80 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider py-3"
                >
                  {item.label}
                </Link>
                {/* Interiores publicados, indentados bajo Soluciones */}
                {isSolutions(item) && (
                  <div className="pb-3">
                    {solutionsMenu.map((solution) => (
                      <Link
                        key={solution.href}
                        href={solution.href}
                        onClick={() => setOpen(false)}
                        className="block pl-4 py-2 text-white/60 hover:text-accent transition-colors text-sm uppercase tracking-wider"
                      >
                        {solution.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
