export default function Loader() {
  return (
    <div 
        aria-busy="true" 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden">
          <div className="h-64 bg-gray-300 animate-pulse rounded-lg" />
          <div className="p-2 space-y-2">
            <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4" />
            <div className="h-3 bg-gray-300 animate-pulse rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}