import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import FooterQuoteForm from '@/components/forms/FooterQuoteForm';
import InstagramIcon from '@/components/icons/InstagramIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import YoutubeIcon from '@/components/icons/YoutubeIcon';

// Convierte "+52 828 289 7071" en "tel:+528282897071"
const telHref = (phone?: string) => `tel:${(phone ?? '').replace(/[^\d+]/g, '')}`;

// Convierte "+52 828 289 7071" en "https://wa.me/528282897071"
const whatsappHref = (phone?: string) => `https://wa.me/${(phone ?? '').replace(/[^\d]/g, '')}`;

export default function Footer({ settings }: { settings: Record<string, string> }) {
  const socials = [
    { url: settings.instagram_url, Icon: InstagramIcon, label: 'Instagram' },
    { url: settings.facebook_url, Icon: FacebookIcon, label: 'Facebook' },
    { url: settings.linkedin_url, Icon: LinkedinIcon, label: 'LinkedIn' },
    { url: settings.youtube_url, Icon: YoutubeIcon, label: 'YouTube' },
  ].filter((s) => s.url);

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Logo variant="onDark" markClassName="h-9 w-auto" textClassName="text-2xl" />
          <p className="text-white/60 text-sm leading-relaxed">
            {settings.footer_description}
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-4">
              {socials.map(({ url, Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-accent hover:text-primary transition-colors rounded-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
          <p className="text-support text-xs font-title font-bold uppercase tracking-wider">
            Para cotizar o contactar con un vendedor:
          </p>
          <div className="space-y-2 text-sm text-white/80">
            <p><a href={`mailto:${settings.email}`} className="hover:text-accent transition-colors">{settings.email}</a></p>
            <p><a href={telHref(settings.phone_1)} className="hover:text-accent transition-colors">Oficina: {settings.phone_1}</a></p>
            <p><a href={whatsappHref(settings.phone_2)} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp: {settings.phone_2}</a></p>
          </div>
          <div className="bg-support/15 border border-support/30 px-4 py-3 space-y-1 clip-notch-br-sm">
            <p className="text-support text-xs font-title font-bold uppercase tracking-wider">
              Para ofrecer tus servicios o productos:
            </p>
            <p><a href="mailto:compras@pailex.com.mx" className="text-white/80 text-sm hover:text-accent transition-colors">compras@pailex.com.mx</a></p>
          </div>
        </div>

        <div>
          <h3 className="font-title font-bold mb-6 text-support uppercase tracking-wider">Legal</h3>
          <ul className="space-y-4 text-sm text-white/70">
            <li><Link href="/aviso-privacidad" className="hover:text-white transition-colors">Aviso de privacidad</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div id="cotizar" className="lg:col-span-2 scroll-mt-24">
          <h3 className="font-title font-bold mb-6 text-support uppercase tracking-wider">{settings.footer_form_title}</h3>
          <FooterQuoteForm />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {settings.company_legal_name} Todos los derechos reservados.
      </div>
    </footer>
  );
}
