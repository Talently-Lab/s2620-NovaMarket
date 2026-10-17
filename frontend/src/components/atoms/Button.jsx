import { Spinner } from "./Spinner";

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const baseStyle = "cursor-pointer font-inter font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2";
  const width = fullWidth ? "w-full" : "w-fit";

  const variants = {
    primary: "bg-neutral-white text-primary hover:bg-gray-200",
    secondary: "bg-primary text-neutral-white hover:bg-opacity-90",
  };

  // Mientras carga o está deshabilitado no responde a clics
  const inactive = disabled || loading;
  const inactiveStyle = inactive ? "cursor-not-allowed" : "";
  const disabledStyle = disabled && !loading ? "opacity-60" : "";

  return (
    <button
      type={type}
      className={`${baseStyle} ${width} ${variants[variant]} ${inactiveStyle} ${disabledStyle}`}
      onClick={onClick}
      disabled={inactive}
      aria-busy={loading || undefined}
    >
      {loading && <Spinner size={18} />}
      {children}
    </button>
  );
};
