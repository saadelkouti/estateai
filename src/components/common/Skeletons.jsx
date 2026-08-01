export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-4xl bg-white dark:bg-secondary shadow-sm">
      <div className="aspect-[4/3] shimmer-bg animate-shimmer" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 rounded-full shimmer-bg animate-shimmer" />
        <div className="h-3 w-1/2 rounded-full shimmer-bg animate-shimmer" />
        <div className="h-3 w-full rounded-full shimmer-bg animate-shimmer" />
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
