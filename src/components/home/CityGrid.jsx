import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { properties } from '../../data/properties';
import Img from '../common/Img';

const featuredCities = [
  { city: 'Malibu', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&h=500&fit=crop' },
  { city: 'Lake Como', img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=700&h=500&fit=crop' },
  { city: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&h=500&fit=crop' },
  { city: 'Santorini', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&h=500&fit=crop' },
  { city: 'Aspen', img: 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=700&h=500&fit=crop' },
  { city: 'Singapore', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&h=500&fit=crop' },
];

export default function CityGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Where to look</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-primary dark:text-surface sm:text-4xl">
          Popular destinations
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCities.map((c, i) => {
          const count = properties.filter((p) => p.city === c.city).length;
          return (
            <motion.div
              key={c.city}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/explore?city=${encodeURIComponent(c.city)}`}
                className="group relative flex h-52 items-end overflow-hidden rounded-3xl"
              >
                <Img src={c.img} fallbackSeed={c.city} alt={c.city} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />
                <div className="relative p-5">
                  <h3 className="font-display text-xl font-semibold text-surface">{c.city}</h3>
                  <p className="text-sm text-surface/60">{count} listings</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
