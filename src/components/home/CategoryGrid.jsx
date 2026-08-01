import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { properties } from '../../data/properties';
import Img from '../common/Img';

const categories = [
  { type: 'Villa', label: 'Villas', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=1000&fit=crop' },
  { type: 'Penthouse', label: 'Penthouses', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop' },
  { type: 'Mansion', label: 'Mansions', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop' },
  { type: 'Chalet', label: 'Chalets', img: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&h=1000&fit=crop' },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Browse by category</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-primary dark:text-surface sm:text-4xl">
            A home for every way of living
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {categories.map((cat, i) => {
          const count = properties.filter((p) => p.type === cat.type).length;
          return (
            <motion.div
              key={cat.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/explore?type=${encodeURIComponent(cat.type)}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-4xl"
              >
                <Img
                  src={cat.img}
                  fallbackSeed={cat.type}
                  alt={cat.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-display text-xl font-semibold text-surface">{cat.label}</h3>
                  <p className="text-sm text-surface/60">{count} homes</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
