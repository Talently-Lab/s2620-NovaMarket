import { HelpCircle, CreditCard, Truck, ShieldCheck } from "lucide-react";

export const FAQ_DATA = [
  {
    category: "¿Cómo comprar?",
    Icon: HelpCircle,
    questions: [
      {
        q: "¿Cómo realizo una compra en la tienda?",
        a: "Navegá por nuestro catálogo, seleccioná los productos que desees y hacé clic en 'Agregar al carrito'. Luego, andá al ícono del carrito en la barra de navegación, presioná 'Finalizar compra' y seguí los pasos para ingresar tus datos de envío y pago.",
      },
      {
        q: "¿Necesito crear una cuenta para comprar?",
        a: "Te recomendamos registrarte para que puedas hacer el seguimiento de tus pedidos, guardar tus direcciones y acelerar tus futuras compras.",
      },
    ],
  },
  {
    category: "Pagos y Facturación",
    Icon: CreditCard,
    questions: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), saldo o dinero en cuenta a través de MercadoPago y transferencias bancarias.",
      },
      {
        q: "¿Es seguro ingresar los datos de mi tarjeta?",
        a: "Totalmente. No almacenamos los datos de tus tarjetas en nuestros servidores; todas las transacciones se procesan mediante pasarelas de pago cifradas con certificación SSL.",
      },
      {
        q: "¿Emiten factura A o B?",
        a: "Sí, emitimos facturas A y B. Durante el proceso de checkout podés indicar si requerís factura con CUIT/Razón Social o a consumidor final.",
      },
    ],
  },
  {
    category: "Envíos y Seguimiento",
    Icon: Truck,
    questions: [
      {
        q: "¿Cuáles son los tiempos y costos de envío?",
        a: "El costo y plazo de entrega varían según tu código postal. Los envíos suelen demorar entre 3 y 7 días hábiles tras confirmarse el pago.",
      },
      {
        q: "¿Cómo realizo el seguimiento de mi pedido?",
        a: "Una vez despachado el paquete, podés consultar el estado y el historial de compras directamente desde la sección 'Mi Cuenta' en el menú principal.",
      },
    ],
  },
  {
    category: "Garantía y Devoluciones",
    Icon: ShieldCheck,
    questions: [
      {
        q: "¿Tienen política de cambios o devoluciones?",
        a: "Tenés hasta 30 días corridos a partir de la recepción del producto para gestionar un cambio o devolución, conservando el empaque y los accesorios originales.",
      },
      {
        q: "¿Qué ocurre si un producto presenta fallas?",
        a: "Si el artículo presenta defectos de fábrica o daños derivados del traslado, comunicate con nuestro soporte técnico para tramitar el reemplazo de la unidad sin costo adicional.",
      },
    ],
  },
];