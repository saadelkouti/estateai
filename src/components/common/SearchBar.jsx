import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin } from 'react-icons/fi';

export default function SearchBar({ variant = 'hero' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full items-center gap-2 rounded-full p-2 ${
        variant === 'hero' ? 'glass shadow-glass' : 'glass-light shadow-sm'
      }`}
    >
      <div className="flex flex-1 items-center gap-3 px-4">
        <FiMapPin className={variant === 'hero' ? 'text-surface/50' : 'text-primary/40 dark:text-surface/40'} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, country, or property name…"
          className={`w-full bg-transparent py-3.5 text-sm sm:text-base focus:outline-none ${
            variant === 'hero'
              ? 'text-surface placeholder:text-surface/50'
              : 'text-primary dark:text-surface placeholder:text-primary/40 dark:placeholder:text-surface/40'
          }`}
        />
      </div>
      <button
        type="submit"
        className="flex shrink-0 items-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-105"
      >
        <FiSearch /> <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
