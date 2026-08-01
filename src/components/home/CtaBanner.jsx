import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-5xl bg-primary px-8 py-16 text-center sm:px-16 sm:py-24"
      >
        <div className="absolute inset-0 bg-aurora opacity-60" />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold text-surface sm:text-5xl">
            Your next address is <span className="text-gradient-gold">waiting.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-surface/60">
            Speak with a specialist who knows the market, or start browsing the full collection
            yourself — no pressure, just possibility.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-105"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="rounded-full glass px-7 py-3.5 text-sm font-semibold text-surface transition-transform hover:scale-105"
            >
              Talk to an Agent
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
