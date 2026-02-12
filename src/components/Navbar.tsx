import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, User, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 !== isScrolled) {
        setIsScrolled(window.scrollY > 20);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-5% 0px -90% 0px',
      threshold: [0, 0.1]
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newTheme = entry.target.getAttribute('data-theme') as 'light' | 'dark';
          if (newTheme && newTheme !== theme) setTheme(newTheme);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('section[data-theme], footer[data-theme]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isScrolled, theme]);

  const isDark = theme === 'dark';

  return (
    <motion.nav
      ref={navRef}
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? (isDark ? 'rgba(10, 10, 10, 0.6)' : 'rgba(252, 252, 252, 0.6)')
          : 'rgba(0, 0, 0, 0)',
        paddingTop: isScrolled ? '1.25rem' : '2.5rem',
        paddingBottom: isScrolled ? '1.25rem' : '2.5rem',
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-[150] transition-all duration-700 ${isScrolled ? 'backdrop-blur-2xl border-b border-black/[0.03]' : ''}`}
    >
      <div className="section-container relative flex items-center justify-between">
        {/* LOGO area with Anti-Gravity float */}
        <motion.div
          layout
          className="flex items-center gap-16 optimized-animate"
        >
          <motion.div
            initial={false}
            animate={{
              y: isScrolled ? 0 : -2,
              filter: isDark ? 'brightness(1.1) drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))' : 'brightness(0.9)'
            }}
            className="text-2xl font-black tracking-tighter gold-gradient cursor-pointer"
          >
            MA ESTATE
          </motion.div>

          {/* NAV LINKS with Staggered Transition */}
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold tracking-[0.3em] uppercase">
            {['Secondary', 'Off-plan', 'Rentals', 'Sell'].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                animate={{
                  color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(10,10,10,0.8)',
                  y: isScrolled ? 0 : [0, -3, 0]
                }}
                transition={{
                  y: { repeat: Infinity, duration: 3.5, delay: i * 0.4, ease: "easeInOut" },
                  color: { duration: 0.6 }
                }}
                className="hover:text-[var(--gold)] transition-colors duration-300 relative group"
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--gold)]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ICONS AREA */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(10, 10, 10, 0.03)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 10, 10, 0.08)',
              color: isDark ? '#ffffff' : '#0a0a0a'
            }}
            className="w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-500 optimized-animate"
          >
            <Search size={18} strokeWidth={1.2} />
          </motion.button>

          {/* Language */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(10, 10, 10, 0.03)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 10, 10, 0.08)',
              color: isDark ? '#ffffff' : '#0a0a0a'
            }}
            className="hidden sm:flex items-center gap-2 h-11 px-6 rounded-full border transition-all duration-500 text-[10px] font-black tracking-widest uppercase optimized-animate"
          >
            <Globe size={14} strokeWidth={1.2} />
            <span>EN</span>
          </motion.button>

          {/* Menu */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(10, 10, 10, 0.03)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 10, 10, 0.08)',
              color: isDark ? '#ffffff' : '#0a0a0a'
            }}
            className="w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-500 group optimized-animate"
          >
            <Menu size={20} strokeWidth={1.2} className="group-hover:rotate-180 transition-transform duration-700" />
          </motion.button>

          {/* User */}
          <motion.button
            whileHover={{ y: -4, scale: 1.05, rotate: 8 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 flex items-center justify-center rounded-full gold-bg shadow-2xl shadow-[var(--gold-muted)] group optimized-animate"
          >
            <User size={18} className="text-white" strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Dynamic Bottom Line */}
        <motion.div
          initial={false}
          animate={{
            width: isScrolled ? '100%' : '0%',
            opacity: isScrolled ? 0.05 : 0,
            background: isDark ? 'white' : 'black'
          }}
          className="absolute bottom-0 left-0 h-[1px]"
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
