import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { properties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';
import FilterPanel from '../components/property/FilterPanel';
import EmptyState from '../components/common/EmptyState';
import { PropertyGridSkeleton } from '../components/common/Skeletons';

const PAGE_SIZE = 9;
const emptyFilters = { minPrice: '', maxPrice: '', bedrooms: '', bathrooms: '', type: '', country: '', city: '' };

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    ...emptyFilters,
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
  });
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const onlyFeatured = searchParams.get('featured') === 'true';

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [query, filters, sort, page]);

  useEffect(() => setPage(1), [query, filters, sort]);

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (onlyFeatured && !p.featured) return false;
      if (query) {
        const q = query.toLowerCase();
        const match =
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.bedrooms && p.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && p.bathrooms < filters.bathrooms) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.country && p.country !== filters.country) return false;
      if (filters.city && p.city !== filters.city) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'oldest': list = [...list].sort((a, b) => b.listedDaysAgo - a.listedDaysAgo); break;
      default: list = [...list].sort((a, b) => a.listedDaysAgo - b.listedDaysAgo);
    }
    return list;
  }, [query, filters, sort, onlyFeatured]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query); else params.delete('q');
    setSearchParams(params);
  };

  const resetFilters = () => setFilters(emptyFilters);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          {onlyFeatured ? 'Featured collection' : 'Full collection'}
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-primary dark:text-surface">
          Explore Properties
        </h1>
        <p className="mt-2 text-primary/50 dark:text-surface/50">
          {filtered.length} homes match your search
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center gap-2 rounded-full glass-light px-5 py-3 shadow-sm">
          <FiSearch className="text-primary/40 dark:text-surface/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, country, or property name…"
            className="w-full bg-transparent text-sm text-primary dark:text-surface placeholder:text-primary/40 dark:placeholder:text-surface/40 focus:outline-none"
          />
        </form>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-primary/10 dark:border-surface/15 bg-transparent px-5 py-3 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-asc">Lowest Price</option>
          <option value="price-desc">Highest Price</option>
        </select>

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full bg-primary dark:bg-gold px-5 py-3 text-sm font-semibold text-surface dark:text-primary lg:hidden"
        >
          <FiFilter /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-4xl bg-white dark:bg-secondary p-6 shadow-sm">
            <FilterPanel filters={filters} setFilters={setFilters} onReset={resetFilters} />
          </div>
        </aside>

        <div>
          {loading ? (
            <PropertyGridSkeleton count={6} />
          ) : paginated.length === 0 ? (
            <EmptyState
              icon={FiSearch}
              title="No properties match"
              message="Try widening your price range or clearing a filter to see more listings."
              actionLabel="Reset filters"
              actionTo="#"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginated.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}

          {totalPages > 1 && !loading && paginated.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                    page === i + 1
                      ? 'bg-primary text-surface dark:bg-gold dark:text-primary'
                      : 'bg-primary/5 text-primary/60 dark:bg-surface/10 dark:text-surface/60'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[95] bg-primary/60 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-surface dark:bg-primary p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-primary dark:text-surface">Filters</h3>
                <button onClick={() => setDrawerOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-primary/5 dark:bg-surface/10">
                  <FiX />
                </button>
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} onReset={resetFilters} />
              <button
                onClick={() => setDrawerOpen(false)}
                className="mt-8 w-full rounded-full bg-primary dark:bg-gold py-3 text-sm font-semibold text-surface dark:text-primary"
              >
                Show {filtered.length} results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
