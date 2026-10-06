
export const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyle = "cursor-pointer font-inter font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 w-fit";

  const variants = {
    primary: "bg-neutral-white text-primary hover:bg-gray-200",
    secondary: "bg-primary text-neutral-white hover:bg-opacity-90",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};