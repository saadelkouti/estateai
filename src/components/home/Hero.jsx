import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import SearchBar from '../common/SearchBar';
import { properties } from '../../data/properties';

export default function Hero() {
  const total = properties.length;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-primary pt-28 pb-20">
      <div className="absolute inset-0 bg-aurora" />
      <motion.div
        className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl animate-drift"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0F172A_85%)]" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-surface/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          {total}+ exceptional homes, curated daily
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-semibold leading-[1.05] text-surface sm:text-6xl lg:text-7xl"
        >
          Find Your <span className="text-gradient-gold">Dream Home.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-surface/60 sm:text-lg"
        >
          A private collection of the world's most considered residences — from cliffside
          villas to sculpted penthouses, matched to how you actually want to live.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 w-full max-w-2xl"
        >
          <SearchBar variant="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-surface/40"
        >
          <span>Malibu</span>
          <span>Lake Como</span>
          <span>Dubai</span>
          <span>Aspen</span>
          <span>Santorini</span>
          <span>Singapore</span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-surface/40"
      >
        <FiArrowDown />
      </motion.div>
    </section>
  );
}
