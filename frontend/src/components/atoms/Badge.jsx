
export const Badge = ({ count }) => {
  if (count === 0) return null;
  
  return (
    <span className="bg-highlight text-primary text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-5">
      {count}
    </span>
  );
};
