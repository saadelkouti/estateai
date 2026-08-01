import { propertyTypesList, citiesList, countriesList } from '../../data/properties';

const bedroomOptions = [1, 2, 3, 4, 5, 6];

export default function FilterPanel({ filters, setFilters, onReset }) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-primary dark:text-surface">Filters</h3>
        <button onClick={onReset} className="text-xs font-medium text-accent hover:underline">
          Reset all
        </button>
      </div>

      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary/40 dark:text-surface/40">
          Price Range
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
            className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-3 py-2 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
          />
          <span className="text-primary/30 dark:text-surface/30">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-3 py-2 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary/40 dark:text-surface/40">
          Bedrooms
        </label>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((n) => (
            <button
              key={n}
              onClick={() => update('bedrooms', filters.bedrooms === n ? '' : n)}
              className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                filters.bedrooms === n
                  ? 'bg-primary text-surface dark:bg-gold dark:text-primary'
                  : 'bg-primary/5 text-primary/70 dark:bg-surface/10 dark:text-surface/70'
              }`}
            >
              {n}+
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary/40 dark:text-surface/40">
          Bathrooms
        </label>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((n) => (
            <button
              key={n}
              onClick={() => update('bathrooms', filters.bathrooms === n ? '' : n)}
              className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                filters.bathrooms === n
                  ? 'bg-primary text-surface dark:bg-gold dark:text-primary'
                  : 'bg-primary/5 text-primary/70 dark:bg-surface/10 dark:text-surface/70'
              }`}
            >
              {n}+
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary/40 dark:text-surface/40">
          Property Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => update('type', e.target.value)}
          className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-3 py-2.5 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
        >
          <option value="">Any type</option>
          {propertyTypesList.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary/40 dark:text-surface/40">
          Country
        </label>
        <select
          value={filters.country}
          onChange={(e) => update('country', e.target.value)}
          className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-3 py-2.5 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
        >
          <option value="">Any country</option>
          {countriesList.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-primary/40 dark:text-surface/40">
          City
        </label>
        <select
          value={filters.city}
          onChange={(e) => update('city', e.target.value)}
          className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-3 py-2.5 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
        >
          <option value="">Any city</option>
          {citiesList.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
