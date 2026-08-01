import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-4xl border border-dashed border-primary/10 dark:border-surface/15 px-6 py-20 text-center">
      {Icon && (
        <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-primary/5 dark:bg-surface/10 text-2xl text-primary/40 dark:text-surface/40">
          <Icon />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-primary dark:text-surface">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-primary/50 dark:text-surface/50">{message}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-6 inline-flex items-center rounded-full bg-primary dark:bg-gold px-6 py-3 text-sm font-semibold text-surface dark:text-primary transition-transform hover:scale-105"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
