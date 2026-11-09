import { AlertTriangle } from 'lucide-react';
import { Modal } from '../molecules/Modal';
import { Button } from '../atoms/Button';
import { AlertError } from '../atoms/AlertError';

export const DeleteProductModal = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  deleting,
  error,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      disabledClose={deleting}
      title="Eliminar producto"
      maxWidth="max-w-sm"
    >
      <div className="p-6 flex flex-col gap-4 font-inter">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pt-1">
            ¿Estás seguro de que deseás eliminar{' '}
            <strong className="text-primary font-semibold">
              {product?.name || 'este producto'}
            </strong>
            ? Esta acción es destructiva y no se puede deshacer.
          </p>
        </div>

        {error && (
          <div className="mt-1">
            <AlertError message={error} />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 mt-3">
          <Button
            type="button"
            variant="outline"
            data-initial-focus
            autoFocus
            onClick={onClose}
            disabled={deleting}
            className="text-sm px-4 min-h-10"
          >
            Volver
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            loading={deleting}
            disabled={deleting}
            className="text-sm px-4 min-h-10 bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-2 focus:ring-red-500 focus:ring-offset-1 font-medium transition-colors"
          >
            {deleting ? 'Eliminando...' : 'Sí, eliminar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};