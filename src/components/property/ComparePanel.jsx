import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiX, FiBarChart2 } from 'react-icons/fi';
import { properties } from '../../data/properties';
import { useCompare } from '../../context/CompareContext';
import { formatFullPrice } from '../../utils/format';
import Img from '../common/Img';

export default function ComparePanel() {
  const { compareIds, toggleCompare, clearCompare } = useCompare();
  const [open, setOpen] = useState(false);
  const selected = properties.filter((p) => compareIds.includes(p.id));

  if (selected.length === 0) return null;

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-primary dark:bg-gold px-5 py-3.5 text-sm font-semibold text-surface dark:text-primary shadow-glass"
      >
        <FiBarChart2 /> Compare ({selected.length})
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-primary/60 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-4xl bg-surface dark:bg-secondary p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold text-primary dark:text-surface">
                  Compare Properties
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearCompare}
                    className="text-sm text-primary/50 dark:text-surface/50 hover:text-primary dark:hover:text-surface"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-primary/5 dark:bg-surface/10 text-primary dark:text-surface"
                  >
                    <FiX />
                  </button>
                </div>
              </div>

              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))` }}>
                {selected.map((p) => (
                  <div key={p.id} className="rounded-3xl bg-white dark:bg-primary/40 p-4">
                    <div className="relative mb-3 aspect-video overflow-hidden rounded-2xl">
                      <Img src={p.images[0]} fallbackSeed={p.slug} alt={p.title} className="h-full w-full object-cover" />
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-primary/70 text-surface"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                    <h4 className="font-display font-semibold text-primary dark:text-surface line-clamp-1">{p.title}</h4>
                    <dl className="mt-3 space-y-2 text-sm">
                      {[
                        ['Price', formatFullPrice(p.price)],
                        ['Location', `${p.city}, ${p.country}`],
                        ['Bedrooms', p.bedrooms],
                        ['Bathrooms', p.bathrooms],
                        ['Area', `${p.area.toLocaleString()} sqft`],
                        ['Type', p.type],
                        ['Rating', `★ ${p.rating}`],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between border-b border-primary/5 dark:border-surface/10 pb-2">
                          <dt className="text-primary/50 dark:text-surface/50">{label}</dt>
                          <dd className="font-medium text-primary dark:text-surface">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
