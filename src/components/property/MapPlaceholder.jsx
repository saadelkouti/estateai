import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';

// Fixed pseudo-coordinates mapped to a percentage grid, purely decorative
const fakeMarkers = [
  { x: 22, y: 34, price: '$4.2M' },
  { x: 46, y: 20, price: '$8.9M' },
  { x: 65, y: 48, price: '$2.6M' },
  { x: 34, y: 62, price: '$12.1M' },
  { x: 78, y: 30, price: '$5.4M' },
  { x: 55, y: 70, price: '$3.1M' },
  { x: 15, y: 55, price: '$6.8M' },
];

export default function MapPlaceholder({ center, height = 'h-[420px]' }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-4xl bg-secondary ${height}`}>
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-aurora" />

      {fakeMarkers.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, type: 'spring' }}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <div className="group relative flex flex-col items-center">
            <div className="mb-1 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-primary opacity-0 shadow-glass transition-opacity group-hover:opacity-100">
              {m.price}
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-primary shadow-glow animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
              <FiMapPin size={16} />
            </span>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-5 left-5 glass rounded-2xl px-4 py-2.5 text-xs text-surface/70">
        {center || 'Illustrative map view'} — exact locations shared after inquiry
      </div>
    </div>
  );
}
