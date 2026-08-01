import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiHeart } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/agents', label: 'Agents' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 sm:px-8 transition-all duration-300 ${
          scrolled ? 'glass-light shadow-glass py-2.5' : 'py-3'
        }`}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-gold font-display font-bold">
            E
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-primary dark:text-surface">
            Estate<span className="text-gradient-gold">AI</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? 'text-primary dark:text-surface'
                    : 'text-primary/60 dark:text-surface/60 hover:text-primary dark:hover:text-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/5 dark:bg-surface/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full text-primary/70 dark:text-surface/70 hover:bg-primary/5 dark:hover:bg-surface/10 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link
            to="/favorites"
            className="relative hidden sm:grid h-10 w-10 place-items-center rounded-full text-primary/70 dark:text-surface/70 hover:bg-primary/5 dark:hover:bg-surface/10 transition-colors"
            aria-label="Favorites"
          >
            <FiHeart />
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-primary">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/explore"
            className="hidden sm:inline-flex items-center rounded-full bg-primary dark:bg-surface px-5 py-2.5 text-sm font-semibold text-surface dark:text-primary transition-transform hover:scale-105"
          >
            Explore Homes
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full text-primary dark:text-surface"
            aria-label="Toggle menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 overflow-hidden rounded-3xl glass-light shadow-glass lg:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-primary/5 dark:bg-surface/10 text-primary dark:text-surface'
                        : 'text-primary/70 dark:text-surface/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/favorites"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-primary/70 dark:text-surface/70"
              >
                Favorites ({favorites.length})
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
