import { Sparkles, Cpu, ShieldCheck } from "lucide-react";

export const ABOUT_SECTIONS = [
  {
    id: 1,
    tag: "Origen & Pasión",
    title: "Nacidos para elevar tu rendimiento",
    highlightText: "cada milisegundo cuenta.",
    description:
      "NovaMarket nació de la necesidad de encontrar periféricos y hardware que no solo se vean bien en el setup, sino que respondan con precisión milimétrica bajo máxima exigencia competitiva y jornadas de trabajo intensas.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    align: "left",
    icon: Sparkles,
  },
  {
    id: 2,
    tag: "Ingeniería & Calidad",
    title: "Calibración al detalle en cada switch",
    highlightText: "sin margen de error.",
    description:
      "Cada producto de nuestro catálogo pasa por un riguroso control de calidad: switches mecánicos testeados, componentes termodisipadores de alto rendimiento y firmware actualizado listo para conectar y jugar.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1600&q=80",
    align: "right",
    icon: Cpu,
  },
  {
    id: 3,
    tag: "Comunidad & Respaldo",
    title: "Garantía oficial y soporte real",
    highlightText: "de gamers para gamers.",
    description:
      "No somos un marketplace genérico. Te ofrecemos 12 meses de garantía directa, despacho prioritario en 24 horas y un equipo técnico listo para asesorarte en la compatibilidad de cada componente de tu próxima estación de batalla.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    align: "left",
    icon: ShieldCheck,
  },
];