import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Globe } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import SmartOverlay from './components/SmartOverlay';

const App: React.FC = () => {
  const [overlayState, setOverlayState] = useState<{ isOpen: boolean; type: string }>({
    isOpen: false,
    type: '',
  });

  const handleOpenOverlay = (type: string) => {
    setOverlayState({ isOpen: true, type });
  };

  const handleCloseOverlay = () => {
    setOverlayState({ ...overlayState, isOpen: false });
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <Hero />


      <SmartOverlay
        isOpen={overlayState.isOpen}
        onClose={handleCloseOverlay}
        type={overlayState.type}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 transition-colors duration-700">

        {/* Signature Section - Modern Architecture */}
        <section className="py-section bg-white" data-theme="light">
          <div className="section-container">
            <div className="flex flex-col xl:flex-row gap-20 xl:gap-32 items-start xl:items-center">
              <div className="flex-1" style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 'var(--content-gap)' }}>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-[var(--gold-dark)] font-bold tracking-[0.5em] uppercase block text-[11px] optimized-animate"
                  >
                    Architecture
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold leading-[0.9] text-black tracking-[-0.05em]"
                  >
                    THE ART OF <br />
                    ARCHITECTURAL <br />
                    <span className="text-black/10 font-extralight italic">MASTERY</span>
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-black/50 leading-relaxed text-xl md:text-2xl max-w-2xl font-light"
                >
                  Every project in our portfolio is selected for its unique contribution to the global skyline.
                  From the <span className="text-black font-semibold">Burj Khalifa's</span> shadow to the serenity of the <span className="text-black font-semibold">Palm</span>, we curate only the extraordinary.
                </motion.p>

                <div className="grid grid-cols-2 gap-12 sm:gap-20 pt-10 border-t border-black/5">
                  <div className="space-y-4">
                    <div className="text-5xl md:text-7xl font-bold text-black tracking-tighter">250+</div>
                    <div className="text-[10px] text-[var(--gold-dark)] uppercase tracking-[0.4em] font-black opacity-60">Global Awards</div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-5xl md:text-7xl font-bold text-black tracking-tighter">15y+</div>
                    <div className="text-[10px] text-[var(--gold-dark)] uppercase tracking-[0.4em] font-black opacity-60">Market Dominance</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative w-full group">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-[var(--gold)]/20 rounded-[4.5rem] md:rounded-[6.5rem] transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute -inset-8 border border-[var(--gold)]/10 rounded-[5rem] md:rounded-[7rem] transition-transform duration-1000 group-hover:scale-110 opacity-50" />

                <motion.div
                  whileHover={{ scale: 0.99 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-[4rem] md:rounded-[6rem] shadow-3xl bg-black aspect-[4/5] xl:aspect-square z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 z-10 p-12 md:p-16 flex flex-col justify-end">
                    <span className="text-[var(--gold-light)] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">Signature Series</span>
                    <h3 className="text-4xl md:text-5xl text-white font-bold tracking-tight">VILLA ORIGES</h3>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                    alt="Bespoke Luxury Architecture"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[6s] ease-out group-hover:scale-110"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* High-Resolution Gallery Showcase */}
        <section className="relative h-screen w-full overflow-hidden" data-theme="dark">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000"
              alt="Luxury Interior Masterpiece"
              className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
            />
            {/* Soft dark mask */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
          </div>

          <div className="section-container relative h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="max-w-4xl"
              style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}
            >
              <div>
                <span className="text-[var(--gold-light)] font-bold tracking-[0.6em] uppercase text-[10px] block opacity-90">Bespoke Design</span>
                <h2 className="text-8xl md:text-9xl font-bold text-white leading-[0.85] tracking-tighter uppercase">
                  UNRIVALED <br />
                  <span className="gold-gradient italic">ESTATES.</span>
                </h2>
              </div>

              <p className="text-white/70 text-2xl font-light leading-relaxed max-w-2xl">
                Where every line is intentional and every texture is curated.
                Discover a collection of <span className="text-white font-semibold">Dubai's most iconic</span> residences.
              </p>

              <div className="flex gap-10 items-center pt-10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 120 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-[1.5px] bg-[var(--gold)] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                />
                <span className="text-[11px] font-black tracking-[0.5em] text-white uppercase opacity-50">Discovery Collection</span>
              </div>
            </motion.div>
          </div>

          {/* Section Indicator */}
          <div className="absolute right-container top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-30">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-[2px] h-16 transition-colors duration-1000 ${i === 1 ? 'bg-[var(--gold)]' : 'bg-white/20'}`} />
            ))}
          </div>
        </section>

        {/* Intelligence Grid Section - Dark Break */}
        <section className="py-section bg-black overflow-hidden" data-theme="dark">
          <div className="section-container relative">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16" style={{ marginBottom: 'var(--header-mb)' }}>
              <div className="max-w-3xl" style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}>
                <span className="text-[var(--gold-light)] font-bold tracking-[0.6em] uppercase text-[11px] block opacity-60">Data Intelligence</span>
                <h2 className="text-7xl md:text-[9rem] font-bold uppercase text-white tracking-tighter leading-[0.8]">
                  THE MATRIX <br />
                  <span className="gold-gradient italic">GUIDE.</span>
                </h2>
              </div>
              <p className="text-white/40 max-w-2xl font-light text-2xl leading-relaxed">
                Real-time yield analysis for Dubai's most targeted corridors.
                Optimized through architectural <span className="text-[var(--gold-light)] font-semibold">ROI Intelligence</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-20">
              {[
                { name: 'JVC', roi: 'ROI 8.9%', lifestyle: 'High Yield', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', tag: 'INVESTOR' },
                { name: 'International City', roi: 'ROI 9.2%', lifestyle: 'Community', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&q=80&w=800', tag: 'VALUE' },
                { name: 'Dubai Residence', roi: 'ROI 8.1%', lifestyle: 'Growth', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', tag: 'EMERGING' },
              ].map((area, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative h-[750px] overflow-hidden rounded-[5rem] border border-white/5 bg-white/5 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                  <img
                    src={area.img}
                    alt={area.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s] ease-out opacity-60 grayscale-[0.2] group-hover:grayscale-0"
                  />

                  <div className="absolute top-12 right-12 z-20 px-8 py-4 rounded-full border border-white/10 backdrop-blur-3xl bg-white/5">
                    <span className="text-[10px] font-black tracking-[0.4em] text-[var(--gold-light)] uppercase">{area.tag}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-16 z-30 space-y-10">
                    <h3 className="text-6xl font-bold tracking-tighter text-white uppercase leading-none">{area.name}</h3>
                    <div className="flex items-center gap-8 text-sm font-medium text-white transition-all duration-700">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-[var(--gold)] shadow-[0_0_20px_var(--gold)]" />
                        <span className="text-[var(--gold-light)] font-bold text-lg">{area.roi}</span>
                      </div>
                      <span className="w-[1.5px] h-6 bg-white/10" />
                      <span className="uppercase tracking-[0.3em] text-[10px] font-black opacity-50">{area.lifestyle}</span>
                    </div>

                    <motion.button
                      onClick={() => handleOpenOverlay('trends')}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-8 text-white text-[12px] font-black tracking-[0.6em] uppercase hover:text-[var(--gold-light)] group/btn py-4"
                    >
                      ESTATE PROFILE
                      <div className="w-16 h-[1.5px] bg-[var(--gold)] group-hover/btn:w-32 transition-all duration-700" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Overhaul - Editorial Style */}
      <footer className="py-section bg-[var(--background)] border-t border-black/[0.04]" data-theme="light">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-40 items-start">

            {/* Brand Column */}
            <div className="lg:col-span-5" style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}>
                <div className="text-5xl md:text-6xl font-black gold-gradient tracking-tighter">MA ESTATE</div>
                <p className="text-black/50 text-2xl font-light leading-relaxed max-w-md">
                  Architecting the future of Dubai's vertical horizon. Where elite intelligence meets unconditional luxury.
                </p>
              </div>

              <div className="space-y-6">
                <span className="text-[11px] font-black tracking-[0.5em] uppercase opacity-30 block">Global Presence</span>
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm font-bold tracking-wider">
                  <span>DUBAI</span>
                  <span>LONDON</span>
                  <span>SINGAPORE</span>
                  <span>NEW YORK</span>
                </div>
              </div>

              <div className="flex gap-10">
                {[
                  { icon: <Search size={20} />, label: 'Search' },
                  { icon: <User size={20} />, label: 'Portal' },
                  { icon: <Globe size={20} />, label: 'Global' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center cursor-pointer hover:border-[var(--gold)] transition-colors"
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16 xl:gap-32 w-full">
              <div className="space-y-10">
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black">Curations</h4>
                <nav className="flex flex-col gap-6 text-sm font-medium text-black/40">
                  {['Sky Palaces', 'Private Islands', 'Golden Yields', 'Off-Plan Elite'].map(link => (
                    <a key={link} href="#" className="hover:text-black hover:translate-x-2 transition-all duration-500">{link}</a>
                  ))}
                </nav>
              </div>

              <div className="space-y-10">
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black">Intelligence</h4>
                <nav className="flex flex-col gap-6 text-sm font-medium text-black/40">
                  {['ROI Reports', 'Market Matrix', 'Valuation AI', 'Strategic Advisory'].map(link => (
                    <a key={link} href="#" className="hover:text-black hover:translate-x-2 transition-all duration-500">{link}</a>
                  ))}
                </nav>
              </div>

              <div className="space-y-10 col-span-2 md:col-span-1">
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black">Connect</h4>
                <div className="space-y-8">
                  <p className="text-sm font-medium text-black/40 leading-relaxed">
                    Level 84, Burj Khalifa District, <br />
                    Dubai, United Arab Emirates
                  </p>
                  <a href="mailto:elite@maestate.com" className="text-lg font-bold hover:text-[var(--gold)] transition-colors underline underline-offset-8 decoration-black/5 block">elite@maestate.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Subfooter */}
          <div className="mt-40 pt-16 border-t border-black/[0.04] flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-[11px] font-bold text-black/20 uppercase tracking-[0.5em]">
              © 2026 MA ESTATE GLOBAL LUXURY LLC. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-16 text-[11px] font-bold text-black/40 uppercase tracking-[0.5em]">
              <a href="#" className="hover:text-black transition-colors">Privacy Lexicon</a>
              <a href="#" className="hover:text-black transition-colors">Strategic Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
