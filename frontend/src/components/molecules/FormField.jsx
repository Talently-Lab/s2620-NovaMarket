import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  required = false,
  as = "input",
  rows,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const Component = as;
  const message = typeof error === "string" ? error : null;
  const errorId = message ? `${id}-error` : undefined;

  const isPassword = type === "password" && as === "input";

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : as === "textarea"
      ? undefined
      : type;

  const typography = "font-inter text-base sm:text-sm";

  const normal =
    "border border-gray-300 focus:border-secondary focus:ring-1 focus:ring-secondary focus-visible:ring-2 focus-visible:ring-secondary/40";
  const withError =
    "border-2 border-error bg-error-light focus:ring-1 focus:ring-error focus-visible:ring-2 focus-visible:ring-error/40";
  const blocked =
    "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-inter text-sm font-medium text-primary flex items-center gap-1"
      >
        {label} {required && <span className="text-error">*</span>}
      </label>

      <div className="relative">
        <Component
          id={id}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={`w-full p-3 rounded-lg focus:outline-none transition-all ${typography} ${error ? withError : normal} ${blocked} ${as === "textarea" ? "resize-none" : ""} ${isPassword ? "pr-10" : ""}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded p-1 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {message && (
        <p id={errorId} role="alert" className="font-inter text-xs text-error">
          {message}
        </p>
      )}
    </div>
  );
};
