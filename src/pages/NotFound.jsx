import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-6">
      <div className="absolute inset-0 bg-aurora" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center"
      >
        <span className="font-display text-[8rem] font-bold leading-none text-gradient-gold sm:text-[10rem]">
          404
        </span>
        <h1 className="mt-2 font-display text-2xl font-semibold text-surface sm:text-3xl">
          This address doesn't exist.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-surface/50">
          The page you're looking for may have been sold, renamed, or never listed at all.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-105"
        >
          <FiHome /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
