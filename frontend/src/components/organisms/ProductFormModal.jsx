import { useState, useEffect } from "react";
import { Modal } from "../molecules/Modal";
import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";
import { AlertError } from "../atoms/AlertError";

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [isOpen, editingProduct]);

  const handleFieldChange = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    onChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "El nombre del producto es obligatorio.";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Debes seleccionar una categoría.";
    }

    if (
      formData.price === "" ||
      formData.price === undefined ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "El precio debe ser un número mayor a 0.";
    }

    if (
      formData.stock !== "" &&
      formData.stock !== undefined &&
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "El stock no puede ser negativo.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      disabledClose={saving}
      title={editingProduct ? "Editar producto" : "Nuevo producto"}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-4">
        {formError && (
          <div className="mb-1">
            <AlertError message={formError} />
          </div>
        )}

        <FormField
          id="product-name"
          name="name"
          label="Nombre del producto"
          required
          value={formData.name}
          onChange={handleFieldChange}
          error={errors.name}
          placeholder="Ej: Teclado mecánico inalámbrico"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="product-categoryId"
              className="font-inter text-sm font-medium text-primary"
            >
              Categoría <span className="text-error">*</span>
            </label>
            <select
              id="product-categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleFieldChange}
              aria-invalid={Boolean(errors.categoryId)}
              aria-describedby={errors.categoryId ? "product-category-error" : undefined}
              className={`p-3 rounded-lg font-inter text-base sm:text-sm bg-white focus:outline-none transition-all ${
                errors.categoryId
                  ? "border-2 border-error bg-error-light focus:ring-1 focus:ring-error"
                  : "border border-gray-300 focus:border-secondary focus:ring-1 focus:ring-secondary"
              }`}
            >
              <option value="">Seleccionar...</option>
              {categories.map((cat) => {
                const catId = typeof cat === 'object' ? cat.id : cat;
                const catName = typeof cat === 'object' ? cat.name : cat;
                return (
                  <option key={catId} value={catId}>
                    {catName}
                  </option>
                );
              })}
            </select>
            {errors.categoryId && (
              <p id="product-category-error" role="alert" className="font-inter text-xs text-error">
                {errors.categoryId}
              </p>
            )}
          </div>

          <FormField
            id="product-price"
            name="price"
            type="number"
            step="0.01"
            min="0.01"
            required
            label="Precio (USD)"
            value={formData.price}
            onChange={handleFieldChange}
            error={errors.price}
            placeholder="49.90"
          />

          <FormField
            id="product-stock"
            name="stock"
            type="number"
            min="0"
            label="Stock"
            value={formData.stock}
            onChange={handleFieldChange}
            error={errors.stock}
            placeholder="10"
          />
        </div>

        <FormField
          id="product-image-url"
          name="imageUrl"
          type="url"
          label="URL de imagen"
          value={formData.imageUrl}
          onChange={handleFieldChange}
          error={errors.imageUrl}
          placeholder="https://ejemplo.com/producto.jpg"
        />

        <FormField
          id="product-description"
          name="description"
          as="textarea"
          rows={3}
          label="Descripción"
          value={formData.description}
          onChange={handleFieldChange}
          error={errors.description}
          placeholder="Ej: Switches red, retroiluminación RGB, layout en español"
        />

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