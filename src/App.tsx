import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Globe } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logo from './components/Logo';
import SmartOverlay from './components/SmartOverlay';
import { useLanguage } from './context/LanguageContext';

// Lazy load components to improve initial load performance (FCP/TBT)
const Properties = lazy(() => import('./components/Properties'));
const FullCollection = lazy(() => import('./components/FullCollection'));
const PropertyDetail = lazy(() => import('./components/PropertyDetail'));
const Communities = lazy(() => import('./components/Communities'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const Contact = lazy(() => import('./components/Contact'));
const ServicesSales = lazy(() => import('./components/ServicesSales'));
const ServicesRentals = lazy(() => import('./components/ServicesRentals'));
const ServicesValuation = lazy(() => import('./components/ServicesValuation'));
const ServicesManagement = lazy(() => import('./components/ServicesManagement'));
const Login = lazy(() => import('./components/Login'));
import Admin from './components/Admin';
import { useData } from './context/DataContext';

const App: React.FC = () => {
  const { t } = useLanguage();
  const { properties } = useData();
  const [overlayState, setOverlayState] = useState<{ isOpen: boolean; type: string }>({
    isOpen: false,
    type: '',
  });
  const [view, setView] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  const handleViewProperty = (id: number, fromView: string) => {
    setSelectedPropertyId(id);
    setView('property-detail');
    window.scrollTo(0, 0);
    // Store where we came from so back button works
    sessionStorage.setItem('propertyDetailFrom', fromView);
  };

  const handleBackFromDetail = () => {
    const from = sessionStorage.getItem('propertyDetailFrom') || 'properties';
    setView(from);
    window.scrollTo(0, 0);
  };


  const handleCloseOverlay = () => {
    setOverlayState({ ...overlayState, isOpen: false });
  };

  const handleExploreHero = () => {
    setView('properties');
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* New modern navbar */}
      {view !== 'admin' && (
        <Navbar
          currentView={view}
          onNavigate={(page) => setView(page)}
        />
      )}

      {view === 'home' ? (
        <>
          <Hero onExplore={handleExploreHero} />


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
                  <div className="flex-1 flex flex-col items-center text-center" style={{ gap: 'var(--content-gap)' }}>
                    <div style={{ marginBottom: 'calc(var(--content-gap) * 1.5)' }}>
                      <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[var(--gold)] font-bold tracking-[0.6em] md:tracking-[0.8em] uppercase text-[10px] md:text-xs block mb-6"
                      >
                        {t('theFutureOfRealEstate')}
                      </motion.span>
                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-black tracking-[-0.05em]"
                      >
                        {t('artOfMastery').split(' ').slice(0, -1).join(' ')} <br />
                        <span className="text-black/10 font-extralight italic">{t('artOfMastery').split(' ').slice(-1)}</span>
                      </motion.h2>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-black/50 leading-relaxed text-xl md:text-2xl max-w-2xl font-light mx-auto"
                    >
                      Every project in our portfolio is selected for its unique contribution to the global skyline.
                      From the <span className="text-black font-semibold">Burj Khalifa's</span> shadow to the serenity of the <span className="text-black font-semibold">Palm</span>, we curate only the extraordinary.
                    </motion.p>

                    <div className="grid grid-cols-2 gap-12 sm:gap-20 pt-20 border-t border-black/5 w-full max-w-2xl">
                      <div className="flex flex-col gap-8 items-center">
                        <div className="text-5xl md:text-7xl font-bold text-black tracking-tight leading-tight">250+</div>
                        <div className="text-[10px] text-[var(--gold-dark)] uppercase tracking-[0.4em] font-black opacity-60 text-center">{t('globalAwards')}</div>
                      </div>
                      <div className="flex flex-col gap-8 items-center">
                        <div className="text-5xl md:text-7xl font-bold text-black tracking-tight leading-tight">15y+</div>
                        <div className="text-[10px] text-[var(--gold-dark)] uppercase tracking-[0.4em] font-black opacity-60 text-center">{t('marketDominance')}</div>
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
                        <span className="text-[var(--gold-light)] text-[10px] font-bold uppercase tracking-[0.5em] mb-4">{t('signatureSeries')}</span>
                        <h3 className="text-4xl md:text-5xl text-white font-bold tracking-tight">VILLA ORIGES</h3>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=70&w=1200"
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
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=70&w=1400"
                  alt="Luxury Interior Masterpiece"
                  className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
                />
                {/* Soft dark mask */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
              </div>

              <div className="section-container relative h-full flex items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="max-w-4xl flex flex-col items-center"
                  style={{ gap: 'var(--content-gap)' }}
                >
                  <div>
                    <span className="text-[var(--gold-light)] font-bold tracking-[0.6em] uppercase text-[10px] block opacity-90">{t('bespokeDesign')}</span>
                    <h2 className="text-6xl md:text-8xl font-bold text-white leading-[1.1] tracking-tighter uppercase">
                      {t('unrivaledEstates').split(' ').slice(0, -1).join(' ')} <br />
                      <span className="gold-gradient italic">{t('unrivaledEstates').split(' ').slice(-1)}</span>
                    </h2>
                  </div>

                  <p className="text-white/70 text-2xl font-light leading-relaxed max-w-2xl">
                    Where every line is intentional and every texture is curated.
                    Discover a collection of <span className="text-white font-semibold">Dubai's most iconic</span> residences.
                  </p>

                  <div className="flex gap-10 items-center justify-center pt-10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 120 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-[1.5px] bg-[var(--gold)] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    />
                    <span className="text-[11px] font-black tracking-[0.5em] text-white uppercase opacity-50">{t('discoveryCollection')}</span>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 120 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-[1.5px] bg-[var(--gold)] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    />
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
            <section className="relative py-section bg-black overflow-hidden" data-theme="dark">
              <img
                src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=70&w=1400"
                className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
                alt="Dubai Matrix Background"
              />
              <div className="section-container relative z-10">
                <div className="flex flex-col items-center text-center gap-12" style={{ marginBottom: 'var(--header-mb)' }}>
                  <div className="max-w-4xl flex flex-col items-center" style={{ gap: 'var(--content-gap)' }}>
                    <span className="text-[var(--gold-light)] font-bold tracking-[0.6em] uppercase text-[11px] block opacity-60">Prime Locations</span>
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-white tracking-tighter leading-[1.1]">
                      Dubai <br />
                      <span className="gold-gradient italic">Residences</span>
                    </h2>
                  </div>
                  <p className="text-white/40 max-w-2xl font-light text-2xl leading-relaxed mx-auto">
                    Explore the most sought-after communities.
                    Optimized through architectural <span className="text-[var(--gold-light)] font-semibold">Excellence</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-20">
                  {[
                    { name: 'JVC', roi: '', lifestyle: 'Investment', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800', tag: 'INVESTOR' },
                    { name: 'International City', roi: '', lifestyle: 'Community', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?auto=format&fit=crop&q=80&w=800', tag: 'VALUE' },
                    { name: 'Dubai Residence', roi: '', lifestyle: 'Growth', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', tag: 'EMERGING' },
                  ].map((area, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="group relative h-[650px] overflow-hidden rounded-[3.5rem] border border-white/10 bg-black cursor-pointer shadow-2xl transition-all duration-700 hover:shadow-[0_45px_100px_rgba(0,0,0,0.9)]"
                      onClick={() => { setView('full-collection'); window.scrollTo(0, 0); }}
                    >
                      {/* Premium Shine Effect on Hover */}
                      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out" />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-60" />
                      <img
                        src={area.img}
                        alt={area.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s] ease-out opacity-70 grayscale-[0.3] group-hover:grayscale-0"
                      />

                      {/* Glassmorphic Tag */}
                      <div className="absolute top-8 right-8 z-30 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-2xl bg-white/5 shadow-xl">
                        <span className="text-[8px] font-black tracking-[0.5em] text-[var(--gold-light)] uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse shadow-[0_0_10px_var(--gold)]" />
                          {area.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-10 z-30 flex flex-col items-center text-center gap-5">
                        <div className="space-y-1.5 flex flex-col items-center">
                          <div className="flex items-center gap-2.5">
                            <span className="h-[1px] w-6 bg-[var(--gold)] group-hover:w-12 transition-all duration-700" />
                            <span className="text-[9px] font-black tracking-[0.4em] text-white/40 uppercase">
                              {area.lifestyle}
                            </span>
                            <span className="h-[1px] w-6 bg-[var(--gold)] group-hover:w-12 transition-all duration-700" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase leading-none drop-shadow-2xl">
                            {area.name}
                          </h3>
                        </div>

                        {/* Interactive Discover Button */}
                        <div className="flex items-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                          <span className="text-[9px] font-bold tracking-[0.3em] text-[var(--gold-light)] uppercase">Discover Estate Portfolio</span>
                          <div className="w-6 h-6 rounded-full border border-[var(--gold)]/30 flex items-center justify-center group-hover:bg-[var(--gold)]/10 transition-colors">
                            <svg className="w-2.5 h-2.5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-black text-white">
            <div className="animate-pulse text-[var(--gold)] tracking-[0.5em] text-xs font-bold uppercase">Loading...</div>
          </div>
        }>
          {view === 'properties' && (
            <Properties
              onOpenCollection={() => { setView('full-collection'); window.scrollTo(0, 0); }}
              onViewProperty={(id) => handleViewProperty(id, 'properties')}
            />
          )}
          {view === 'full-collection' && (
            <FullCollection onViewProperty={(id) => handleViewProperty(id, 'full-collection')} />
          )}
          {view === 'property-detail' && selectedPropertyId !== null && (() => {
            const prop = properties.find(p => p.id === selectedPropertyId);
            return prop ? <PropertyDetail property={prop} onBack={handleBackFromDetail} /> : null;
          })()}
          {view === 'communities' && <Communities />}
          {view === 'about' && <AboutUs />}
          {view === 'contact' && <Contact />}
          {view === 'service-sales' && <ServicesSales />}
          {view === 'service-rentals' && <ServicesRentals />}
          {view === 'service-valuation' && <ServicesValuation />}
          {view === 'service-management' && <ServicesManagement />}

          {view === 'admin' && <Admin />}
          {view === 'login' && (
            <Login
              onBack={() => setView('home')}
              onAdminLogin={() => setView('admin')}
            />
          )}
        </Suspense>
      )}

      {/* Footer Overhaul - Editorial Style */}
      <footer className="relative py-section bg-white border-t border-black/[0.04] overflow-hidden" data-theme="light">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none"
          alt="Footer Background"
        />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 xl:gap-40 items-start">

            {/* Brand Column */}
            <div className="lg:col-span-5" style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ gap: 'var(--content-gap)', display: 'flex', flexDirection: 'column' }}>
                <Logo isDark={false} className="scale-125 origin-left mb-4" />
                <p className="text-black/50 text-2xl font-light leading-relaxed max-w-md">
                  Architecting the future of Dubai's vertical horizon. Where elite service meets unconditional luxury.
                </p>
              </div>

              <div className="space-y-6">
                <span className="text-[11px] font-black tracking-[0.5em] uppercase opacity-30 block">{t('globalPresence')}</span>
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm font-bold tracking-wider">
                  <span>DUBAI</span>
                  <span>LONDON</span>
                  <span>SINGAPORE</span>
                  <span>NEW YORK</span>
                </div>
              </div>

              <div className="flex gap-10">
                {[
                  { icon: <Search size={20} />, label: t('search') },
                  { icon: <User size={20} />, label: 'Portal' },
                  { icon: <Globe size={20} />, label: t('globalPresence').split(' ')[0] }
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
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black">{t('curations')}</h4>
                <nav className="flex flex-col gap-6 text-sm font-medium text-black/40">
                  {[t('skyPalaces'), t('privateIslands'), t('goldenYields'), t('offPlanElite')].map(link => (
                    <a key={link} href="#" className="hover:text-black hover:translate-x-2 transition-all duration-500">{link}</a>
                  ))}
                </nav>
              </div>

              <div className="space-y-10">
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-black">Services</h4>
                <nav className="flex flex-col gap-6 text-sm font-medium text-black/40">
                  <a href="#" className="hover:text-black hover:translate-x-2 transition-all duration-500" onClick={(e) => { e.preventDefault(); setView('service-sales'); window.scrollTo(0, 0); }}>Sales</a>
                  <a href="#" className="hover:text-black hover:translate-x-2 transition-all duration-500" onClick={(e) => { e.preventDefault(); setView('service-rentals'); window.scrollTo(0, 0); }}>Rentals</a>
                  <a href="#" className="hover:text-black hover:translate-x-2 transition-all duration-500" onClick={(e) => { e.preventDefault(); setView('service-valuation'); window.scrollTo(0, 0); }}>Valuation</a>
                  <a href="#" className="hover:text-black hover:translate-x-2 transition-all duration-500" onClick={(e) => { e.preventDefault(); setView('service-management'); window.scrollTo(0, 0); }}>Management</a>
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
              <button onClick={() => { setView('admin'); window.scrollTo(0, 0); }} className="hover:text-black transition-colors uppercase tracking-[0.5em]">Admin Login</button>
              <a href="#" className="hover:text-black transition-colors">{t('privacyLexicon')}</a>
              <a href="#" className="hover:text-black transition-colors">{t('strategicTerms')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
