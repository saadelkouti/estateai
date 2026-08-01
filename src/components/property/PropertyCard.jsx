import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiMapPin } from 'react-icons/fi';
import { LuBedDouble, LuBath, LuScale } from 'react-icons/lu';
import Img from '../common/Img';
import { formatPrice } from '../../utils/format';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';

export default function PropertyCard({ property, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { compareIds, toggleCompare } = useCompare();
  const fav = isFavorite(property.id);
  const inCompare = compareIds.includes(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-4xl bg-white dark:bg-secondary shadow-[0_4px_24px_rgba(15,23,42,0.06)] hover:shadow-glass transition-shadow duration-300"
    >
      <Link to={`/property/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Img
          src={property.images[0]}
          fallbackSeed={property.slug}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full glass-light px-3 py-1 text-xs font-semibold text-primary dark:text-surface">
            {property.status}
          </span>
          {property.featured && (
            <span className="rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-primary">
              Featured
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(property.id, property.title);
          }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass-light text-primary transition-transform hover:scale-110"
        >
          <FiHeart className={fav ? 'fill-gold text-gold' : 'text-primary'} />
        </button>

        <div className="absolute bottom-4 left-4 rounded-2xl bg-primary/80 backdrop-blur px-4 py-2">
          <span className="font-display text-lg font-semibold text-surface">
            {formatPrice(property.price)}
          </span>
          {property.status === 'For Rent' && <span className="text-xs text-surface/60"> /mo</span>}
        </div>
      </Link>

      {/* Perforated ticket divider — the "viewing pass" signature */}
      <div className="relative flex items-center px-1">
        <span className="absolute -left-3 h-6 w-6 rounded-full bg-surface dark:bg-primary" />
        <div className="w-full border-t border-dashed border-primary/15 dark:border-surface/15" />
        <span className="absolute -right-3 h-6 w-6 rounded-full bg-surface dark:bg-primary" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link to={`/property/${property.slug}`}>
          <h3 className="font-display text-lg font-semibold text-primary dark:text-surface line-clamp-1">
            {property.title}
          </h3>
        </Link>
        <p className="flex items-center gap-1.5 text-sm text-primary/50 dark:text-surface/50">
          <FiMapPin className="shrink-0" /> {property.location}, {property.country}
        </p>

        <div className="mt-1 flex items-center justify-between text-sm text-primary/70 dark:text-surface/70">
          <span className="flex items-center gap-1.5">
            <LuBedDouble /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <LuBath /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <LuScale className="rotate-90" /> {property.area.toLocaleString()} sqft
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-primary/5 dark:border-surface/10 pt-3">
          <label className="flex items-center gap-2 text-xs text-primary/50 dark:text-surface/50 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inCompare}
              onChange={() => toggleCompare(property.id)}
              className="h-3.5 w-3.5 accent-accent"
            />
            Compare
          </label>
          <Link
            to={`/property/${property.slug}`}
            className="text-sm font-semibold text-accent hover:text-primary dark:hover:text-surface transition-colors"
          >
            View details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
