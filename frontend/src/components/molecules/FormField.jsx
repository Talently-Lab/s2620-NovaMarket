// Campo de formulario: etiqueta conectada, borde rojo y mensaje de ayuda cuando hay error.
// error = texto (muestra borde rojo + mensaje) | true (solo borde rojo) | falsy (sin error)
export const FormField = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  disabled = false,
}) => {
  const message = typeof error === "string" ? error : null;
  const errorId = message ? `${id}-error` : undefined;

  const normal = "border border-gray-300 focus:border-secondary focus:ring-1 focus:ring-secondary";
  const withError = "border-2 border-error bg-error-light focus:ring-1 focus:ring-error";
  const blocked = "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-inter text-sm font-medium text-primary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`p-3 rounded-lg focus:outline-none transition-all ${error ? withError : normal} ${blocked}`}
      />
      {message && (
        <p id={errorId} className="font-inter text-xs text-error">
          {message}
        </p>
      )}
    </div>
  );
};
