import Logo from '@/components/brand/Logo';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Logo variant="onDark" markClassName="h-9 w-9" textClassName="text-2xl" />
          <p className="text-white/60 text-sm leading-relaxed">
            Especialistas en proyectos de pailería, soldadura calificada y maquinados CNC
            con los más altos estándares de calidad y precisión.
          </p>
          <div className="space-y-2 text-sm text-white/80">
            <p><a href="mailto:admon.pmpi2@gmail.com" className="hover:text-accent transition-colors">admon.pmpi2@gmail.com</a></p>
            <p><a href="tel:+528282897071" className="hover:text-accent transition-colors">+52 828 289 7071</a></p>
            <p><a href="tel:+5218180243684" className="hover:text-accent transition-colors">+52 1 81 8024 3684</a></p>
          </div>
        </div>

        <div>
          <h3 className="font-title font-bold mb-6 text-support uppercase tracking-wider">Legal</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Aviso de privacidad</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-title font-bold mb-6 text-support uppercase tracking-wider">¡Contáctanos para cotizar tu proyecto!</h3>
          <form className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre" className="bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
            <input type="email" placeholder="Correo" className="bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
            <input type="tel" placeholder="Teléfono" className="bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
            <div className="col-span-2">
              <textarea placeholder="Mensaje" rows={3} className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
            </div>
            <button className="col-span-2 bg-accent text-primary font-title font-bold py-3 hover:brightness-110 transition-all uppercase tracking-widest clip-notch-br-sm">
              Enviar
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Pailex S.A. de C.V. Todos los derechos reservados.
      </div>
    </footer>
  );
}
