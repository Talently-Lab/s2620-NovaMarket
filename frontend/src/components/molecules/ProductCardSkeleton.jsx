
export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-neutral-white border border-gray-200 rounded-2xl overflow-hidden flex-1 min-w-60 animate-pulse">
      <div className="bg-gray-200 aspect-4/3 w-full" />

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mt-1" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3 mt-1" />
        <div className="h-6 bg-gray-200 rounded w-2/5 mt-2" />
        <div className="h-9 bg-gray-200 rounded-lg w-full mt-auto pt-3" />
      </div>
    </div>
  );
};
