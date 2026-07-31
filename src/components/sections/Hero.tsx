export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Video de planta con Ken Burns lento; poster para conexiones lentas */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/placeholder-pailex.webp"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Duotono de marca: tinte verde institucional sobre la fotografía */}
        <div className="absolute inset-0 bg-primary/30 mix-blend-multiply" />
        {/* Legibilidad del texto: gradiente lateral hacia negro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Detalle geométrico de marca: esquinas a 45° */}
      <div className="absolute top-24 right-6 w-10 h-10 border-t-2 border-r-2 border-accent/40 z-20 hidden md:block" />
      <div className="absolute bottom-10 left-6 w-10 h-10 border-b-2 border-l-2 border-accent/40 z-20 hidden md:block" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-24">
        <div className="max-w-4xl">
          <p className="anim-fade-up anim-delay-1 inline-block border border-accent/60 text-accent font-title text-xs md:text-sm uppercase tracking-[0.25em] px-4 py-2 mb-8 backdrop-blur-sm bg-black/20">
            35 años garantizando la continuidad de tu planta
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-4xl md:text-6xl font-bold leading-tight md:leading-[1.05] mb-6 uppercase tracking-tight">
            Soluciones metalmecánicas industriales
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mb-6" />
          <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body mb-3 max-w-2xl">
            Pailería, maquinados, automatización y proyectos llave en mano.
          </p>
          <p className="anim-fade-up anim-delay-3 text-support text-base md:text-lg font-body mb-10 max-w-2xl">
            Desde Monterrey hasta donde tu planta lo necesite.
          </p>
          <button className="anim-fade-up anim-delay-4 bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest shadow-2xl clip-notch-br-sm">
            Solicitar cotización
          </button>
        </div>
      </div>
    </section>
  );
}
