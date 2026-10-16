import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { ProductFormModal } from '../components/organisms/ProductFormModal';
import { Button } from '../components/atoms/Button';

export const AdminPage = () => {
  const {
    products,
    categories,
    loading,
    saving,
    error,
    isModalOpen,
    editingProduct,
    formData,
    formError,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleChange,
    handleSubmit,
    handleDelete,
    handleImageError,
    formatPrice
  } = useAdminProducts();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="font-inter text-xs font-semibold text-secondary uppercase tracking-wider">
            Gestión de Inventario
          </span>
          <h1 className="font-spartan font-bold text-3xl text-primary mt-1">
            Panel de Administración
          </h1>
          <p className="font-inter text-sm text-gray-500">
            Administrá el catálogo de productos de NovaMarket (Alta, Baja y Modificación)
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus size={18} />
          Nuevo Producto
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl font-inter text-sm">
          {error}
        </div>
      )}

      <div className="bg-neutral-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-gray-200 font-inter text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Producto</th>
                <th className="py-3.5 px-4">Categoría</th>
                <th className="py-3.5 px-4">Precio</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 font-inter text-sm">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0" />
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-40" />
                          <div className="h-3 bg-gray-200 rounded w-24" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4"><div className="h-5 bg-gray-200 rounded w-20" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-16" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-12" /></td>
                    <td className="py-4 px-4"><div className="h-8 bg-gray-200 rounded w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Package size={32} className="text-gray-400" />
                      <p className="font-medium text-primary">No hay productos registrados</p>
                      <p className="text-xs text-gray-400">Hacé clic en "Nuevo Producto" para cargar el primero.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const fallback = `https://picsum.photos/seed/novamarket-${product.id}/100/100`;

                  return (
                    <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl || fallback}
                            alt={product.name}
                            onError={(e) => handleImageError(e, product.id)}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200 shrink-0"
                          />
                          <div>
                            <p className="font-spartan font-bold text-primary text-base leading-tight">
                              {product.name}
                            </p>
                            {product.description && (
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-md">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block bg-[#F0F4F8] text-secondary text-xs font-semibold px-2.5 py-1 rounded-full">
                          {product.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-spartan font-bold text-primary text-base">
                        {formatPrice(product.price)}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-xs font-medium text-gray-600">
                          {product.stock ?? 0} u.
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(product)}
                            title="Editar producto"
                            className="p-2 rounded-lg text-gray-600 hover:text-secondary hover:bg-[#F0F4F8] transition-colors cursor-pointer"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            title="Eliminar producto"
                            className="p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingProduct={editingProduct}
        formData={formData}
        formError={formError}
        categories={categories}
        saving={saving}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
