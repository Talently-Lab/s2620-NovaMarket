import { Modal } from "../molecules/Modal";
import { Button } from "../atoms/Button";

export const ProductFormModal = ({
  isOpen,
  onClose,
  editingProduct,
  formData,
  formError,
  categories,
  saving,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      disabledClose={saving}
      title={editingProduct ? "Editar Producto" : "Nuevo Producto"}
      maxWidth="max-w-lg"
    >
      <form onSubmit={onSubmit} className="p-6 flex flex-col gap-4">
        {formError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg font-inter text-xs">
            {formError}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="font-inter text-xs font-semibold text-primary">
            Nombre del producto (`name`) *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={onChange}
            placeholder="Ej: Teclado mecánico"
            className="p-2.5 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-inter text-xs font-semibold text-primary">
              Categoría (`category`) *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="p-2.5 border border-gray-300 rounded-lg font-inter text-sm bg-white focus:outline-none focus:border-secondary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-inter text-xs font-semibold text-primary">
              Precio USD (`price`) *
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              min="0.01"
              required
              value={formData.price}
              onChange={onChange}
              placeholder="49.90"
              className="p-2.5 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:border-secondary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-inter text-xs font-semibold text-primary">
              Stock (`stock`)
            </label>
            <input
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={onChange}
              placeholder="10"
              className="p-2.5 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-inter text-xs font-semibold text-primary">
            URL de imagen (`imageUrl`)
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={onChange}
            placeholder="https://..."
            className="p-2.5 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-inter text-xs font-semibold text-primary">
            Descripción (`description`)
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={onChange}
            placeholder="Ej: Switches red, layout ES"
            className="p-2.5 border border-gray-300 rounded-lg font-inter text-sm focus:outline-none focus:border-secondary resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-lg font-inter text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <Button variant="secondary" type="submit" disabled={saving}>
            {saving
              ? "Guardando..."
              : editingProduct
              ? "Guardar cambios"
              : "Crear producto"}
          </Button>
        </div>
      </form>
    </Modal>
  );
  
};