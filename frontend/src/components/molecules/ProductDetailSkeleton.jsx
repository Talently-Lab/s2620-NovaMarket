
export const ProductDetailSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 animate-pulse">

      <div className="h-5 bg-gray-200 rounded w-36 mb-6" />

      <div className="bg-neutral-white border border-gray-200 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

        <div className="bg-gray-200 aspect-4/3 w-full rounded-xl" />

        <div className="flex flex-col gap-4 justify-center">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded w-40 my-2" />
          <div className="space-y-2 py-4 border-y border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-full mt-4" />
        </div>
      </div>
    </div>
  );
};