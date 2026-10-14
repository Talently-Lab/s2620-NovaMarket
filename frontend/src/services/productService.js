const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Usamos "let" para poder agregar, editar y eliminar productos en memoria durante las pruebas
let mockProducts = [
  { 
    id: 1, 
    title: 'Auriculares inalámbricos Pro', 
    category: 'Accesorios', 
    specs: 'Bluetooth 5.3 · ANC', 
    rating: '4.6', 
    reviews: '128', 
    price: 89990, 
    stock: 15,
    description: 'Auriculares con cancelación activa de ruido y batería de larga duración para jornadas intensas de trabajo o estudio.',
    image: 'https://url-rota-para-probar-fallback.com/img.jpg' 
  },
  { 
    id: 2, 
    title: 'Teclado mecánico 75%', 
    category: 'Periféricos', 
    specs: 'Switch red · RGB', 
    rating: '4.8', 
    reviews: '95', 
    price: 74500, 
    stock: 8,
    description: 'Formato compacto 75% con switches mecánicos lineales silenciosos y retroiluminación RGB personalizable.',
    image: 'https://picsum.photos/seed/teclado/400/300' 
  },
  { 
    id: 3, 
    title: 'Mouse gamer 16K DPI', 
    category: 'Periféricos', 
    specs: 'Inalámbrico · 60 g', 
    rating: '4.7', 
    reviews: '210', 
    price: 42990, 
    stock: 22,
    description: 'Diseño ultraligero de 60 gramos con sensor óptico de alta precisión y conectividad inalámbrica sin latencia.',
    image: 'https://picsum.photos/seed/mouse/400/300' 
  },
  { 
    id: 4, 
    title: 'Soporte Aluminio Laptop', 
    category: 'Accesorios', 
    specs: 'Plegable · Antideslizante', 
    rating: '4.5', 
    reviews: '64', 
    price: 24900, 
    stock: 30,
    description: ' Mejora tu postura y la refrigeración de tu equipo con este soporte regulable de aleación de aluminio.',
    image: 'https://picsum.photos/seed/soporte/400/300' 
  },
  { 
    id: 5, 
    title: 'Reloj Inteligente Fit', 
    category: 'Gadgets', 
    specs: 'AMOLED · GPS integrado', 
    rating: '4.6', 
    reviews: '150', 
    price: 115000, 
    stock: 5,
    description: 'Monitoreo continuo de salud, notificaciones inteligentes y pantalla AMOLED de alto brillo.',
    image: 'https://picsum.photos/seed/reloj/400/300' 
  },
  { 
    id: 6, 
    title: 'Lámpara LED de Monitor', 
    category: 'Gadgets', 
    specs: 'Control táctil · Luz cálida/fría', 
    rating: '4.9', 
    reviews: '82', 
    price: 38500, 
    stock: 12,
    description: 'Ilumina tu escritorio sin reflejos en la pantalla. Temperatura de color regulable para cuidar tu vista.',
    image: '' 
  }
];

export const productService = {
  getProducts: async (category = 'Todos') => {
    await delay(600);
    if (!category || category === 'Todos') {
      return [...mockProducts];
    }
    return mockProducts.filter(
      (product) => product.category?.toLowerCase() === category.toLowerCase()
    );
  },

  getProductById: async (id) => {
    await delay(500);
    const product = mockProducts.find((p) => p.id === Number(id));
    if (!product) throw new Error('Producto no encontrado');
    return { ...product };
  },

  // CREAR PRODUCTO (Alta)
  createProduct: async (productData) => {
    await delay(600);
    const newProduct = {
      ...productData,
      id: Date.now(),
      price: Number(productData.price),
      stock: Number(productData.stock || 10),
      rating: '5.0',
      reviews: '1'
    };
    mockProducts = [newProduct, ...mockProducts];
    return newProduct;
  },

  // EDITAR PRODUCTO (Modificación)
  updateProduct: async (id, productData) => {
    await delay(600);
    const index = mockProducts.findIndex((p) => p.id === Number(id));
    if (index === -1) throw new Error('Producto no encontrado');

    const updatedProduct = {
      ...mockProducts[index],
      ...productData,
      id: Number(id),
      price: Number(productData.price),
      stock: Number(productData.stock || 0)
    };

    mockProducts[index] = updatedProduct;
    return updatedProduct;
  },

  // ELIMINAR PRODUCTO (Baja)
  deleteProduct: async (id) => {
    await delay(400);
    mockProducts = mockProducts.filter((p) => p.id !== Number(id));
    return true;
  }
};