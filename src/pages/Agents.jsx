import { useState } from 'react';
import { agents } from '../data/agents';
import AgentCard from '../components/agents/AgentCard';

export default function Agents() {
  const [query, setQuery] = useState('');
  const filtered = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.speciality.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">Our people</span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-primary dark:text-surface">Meet the Agents</h1>
          <p className="mt-2 max-w-xl text-primary/50 dark:text-surface/50">
            A small team of specialists, each focused on a distinct corner of the luxury market.
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or speciality…"
          className="w-full max-w-xs rounded-full border border-primary/10 dark:border-surface/15 bg-transparent px-5 py-3 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((agent, i) => (
          <AgentCard key={agent.id} agent={agent} index={i} />
        ))}
      </div>
    </div>
  );
}
