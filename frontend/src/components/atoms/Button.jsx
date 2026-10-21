export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'cursor-pointer font-inter font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-neutral-white text-primary hover:bg-gray-200',
    secondary: 'bg-secondary text-neutral-white hover:bg-secondary/90',
    outline: 'border border-white/20 bg-white/5 hover:bg-white/10 text-neutral-white backdrop-blur-sm',
    ghost: 'text-neutral-white/90 hover:text-neutral-white hover:bg-white/5',
  };

  // Si fullWidth es true, toma w-full; si no, mantiene w-fit por defecto
  const widthStyle = fullWidth ? 'w-full' : 'w-fit';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};