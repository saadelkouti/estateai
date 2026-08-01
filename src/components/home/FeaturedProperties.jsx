import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { properties } from '../../data/properties';
import PropertyCard from '../property/PropertyCard';
import { PropertyGridSkeleton } from '../common/Skeletons';

export default function FeaturedProperties() {
  const [loading, setLoading] = useState(true);
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Handpicked</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-primary dark:text-surface sm:text-4xl">
            Featured properties
          </h2>
        </div>
        <Link
          to="/explore"
          className="flex items-center gap-2 text-sm font-semibold text-primary dark:text-surface hover:text-accent transition-colors"
        >
          View all listings <FiArrowRight />
        </Link>
      </div>

      {loading ? (
        <PropertyGridSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
