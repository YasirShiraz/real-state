import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onNavigate?: (page: string) => void;
  currentView?: string;
}

const links = [
  { id: 'home', key: 'home' },
  { id: 'properties', key: 'properties' },
  { id: 'communities', key: 'communities' },
  { id: 'about', key: 'aboutUs' },
  { id: 'contact', key: 'contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    if (!onNavigate) return;
    setOpen(false);
    onNavigate(id);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[150] pointer-events-none"
      >
        <motion.nav
          className="section-container mt-4"
          animate={{
            paddingTop: isScrolled ? 10 : 18,
            paddingBottom: isScrolled ? 10 : 18,
          }}
        >
          <div className="pointer-events-auto flex items-center justify-between rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 lg:px-8 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
            {/* Left: Logo */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 py-2"
            >
              <Logo isDark={true} />
            </button>

            {/* Center: desktop links */}
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.32em]">
              {links.map((link) => {
                const isActive =
                  (link.id === 'home' && currentView === 'home') ||
                  (link.id === 'about' && currentView === 'about') ||
                  currentView === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className="relative py-3"
                  >
                    <span
                      className={`transition-colors ${
                        isActive ? 'text-[var(--gold)]' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {t(link.key as any)}
                    </span>
                    <span
                      className={`absolute left-0 right-0 -bottom-1 mx-auto h-[2px] rounded-full bg-[var(--gold)] transition-transform origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                <Globe size={14} />
                <span>{language}</span>
              </div>

              <button
                onClick={() => handleNav('login')}
                className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full gold-bg text-white shadow-lg"
              >
                <User size={16} />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/70 backdrop-blur-md md:hidden"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-[#050505] border-t border-white/10 px-6 pt-6 pb-10 space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/80"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {links.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="flex items-center justify-between py-3 border-b border-white/5 text-left"
                  >
                    <span className="text-white text-sm font-semibold tracking-[0.12em] uppercase">
                      {t(link.key as any)}
                    </span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => handleNav('login')}
                className="mt-4 w-full rounded-full gold-bg text-black font-bold text-xs uppercase tracking-[0.25em] py-3"
              >
                Client Portal
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
