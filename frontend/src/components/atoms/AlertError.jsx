import { TriangleAlert } from "lucide-react";

// Aviso de error general de un formulario. Va arriba de los campos.
export const AlertError = ({ children, className = "mb-4" }) => {
  if (!children) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-2.5 rounded-[10px] border border-error bg-error-light px-3.5 py-3 text-[13px] font-semibold text-error-dark ${className}`}
    >
      <TriangleAlert size={18} className="mt-0.5 shrink-0 text-error" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
};
