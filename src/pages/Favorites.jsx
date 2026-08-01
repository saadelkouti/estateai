import { FiHeart } from 'react-icons/fi';
import { properties } from '../data/properties';
import { useFavorites } from '../context/FavoritesContext';
import PropertyCard from '../components/property/PropertyCard';
import EmptyState from '../components/common/EmptyState';

export default function Favorites() {
  const { favorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
      <span className="text-xs font-semibold uppercase tracking-wider text-accent">Your list</span>
      <h1 className="mt-2 font-display text-4xl font-semibold text-primary dark:text-surface">Favorites</h1>
      <p className="mt-2 text-primary/50 dark:text-surface/50">
        {saved.length} {saved.length === 1 ? 'property' : 'properties'} saved on this device
      </p>

      <div className="mt-10">
        {saved.length === 0 ? (
          <EmptyState
            icon={FiHeart}
            title="No favorites yet"
            message="Tap the heart icon on any property to save it here for later comparison."
            actionLabel="Explore properties"
            actionTo="/explore"
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
