import Link from 'next/link';
import { Search } from 'lucide-react';
import Logo from '@/components/brand/Logo';

export default function Navbar() {
  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '#' },
    { name: 'Soluciones', href: '#' },
    { name: 'Industrias', href: '#' },
    { name: 'Portafolio', href: '#' },
    { name: 'Contacto', href: '#' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" aria-label="Pailex — Inicio">
          <Logo variant="onDark" markClassName="h-7 w-7" textClassName="text-xl" />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-white/80 hover:text-accent transition-colors text-sm font-medium uppercase tracking-wider"
            >
              {item.name}
            </Link>
          ))}
          <button className="text-white hover:text-accent">
            <Search size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
