import Logo from '@/components/brand/Logo';

// Convierte "+52 828 289 7071" en "tel:+528282897071"
const telHref = (phone?: string) => `tel:${(phone ?? '').replace(/[^\d+]/g, '')}`;

export default function Footer({ settings }: { settings: Record<string, string> }) {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Logo variant="onDark" markClassName="h-9 w-auto" textClassName="text-2xl" />
          <p className="text-white/60 text-sm leading-relaxed">
            {settings.footer_description}
          </p>
          <div className="space-y-2 text-sm text-white/80">
            <p><a href={`mailto:${settings.email}`} className="hover:text-accent transition-colors">{settings.email}</a></p>
            <p><a href={telHref(settings.phone_1)} className="hover:text-accent transition-colors">{settings.phone_1}</a></p>
            <p><a href={telHref(settings.phone_2)} className="hover:text-accent transition-colors">{settings.phone_2}</a></p>
          </div>
        </div>

        <div>
          <h3 className="font-title font-bold mb-6 text-support uppercase tracking-wider">Legal</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Aviso de privacidad</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
          </ul>
        </div>

        <div id="cotizar" className="lg:col-span-2 scroll-mt-24">
          <h3 className="font-title font-bold mb-6 text-support uppercase tracking-wider">{settings.footer_form_title}</h3>
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
        © {new Date().getFullYear()} {settings.company_legal_name} Todos los derechos reservados.
      </div>
    </footer>
  );
}
