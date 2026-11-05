import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  disabledClose = false,
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableSelectors =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const currentFocus = document.activeElement;
    const isFocusInsideModal = modalElement.contains(currentFocus);

    if (!isFocusInsideModal) {
      const focusableElements =
        modalElement.querySelectorAll(focusableSelectors);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !disabledClose && onClose) {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const currentFocusables =
          modalElement.querySelectorAll(focusableSelectors);
        if (currentFocusables.length === 0) return;

        const first = currentFocusables[0];
        const last = currentFocusables[currentFocusables.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement.current && !isOpen) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, disabledClose]);

  if (!isOpen || !mounted) return null;


  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in"
      onClick={() => {
        if (!disabledClose && onClose) onClose();
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`bg-neutral-white w-full ${maxWidth} rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          {title && (
            <h3
              id="modal-title"
              className="font-spartan font-bold text-lg text-primary"
            >
              {title}
            </h3>
          )}
          <button
            type="button"
            onClick={onClose}
            disabled={disabledClose}
            aria-label="Cerrar ventana"
            className="text-gray-400 hover:text-primary transition-colors p-1.5 rounded-lg cursor-pointer ml-auto min-h-10 min-w-10 flex items-center justify-center"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>,
    document.body,
  );

};