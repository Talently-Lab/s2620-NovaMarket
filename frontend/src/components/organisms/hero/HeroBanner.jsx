import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronDown,
} from "lucide-react";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { Tag } from "../../atoms/Tag";
import { Button } from "../../atoms/Button";
import { useProducts } from "../../../hooks/useProducts";
import { KeyboardWaveBackground } from "../hero/KeyboardWaveBackground";
import { HeroProductCard } from "../hero/HeroProductCard";

export const HeroBanner = () => {
  const navigate = useNavigate();
  const { products: rawProducts } = useProducts();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const products = useMemo(() => {
    return (rawProducts || []).filter((p) => p.imageUrl && p.price).slice(0, 5);
  }, [rawProducts]);

  useEffect(() => {
    if (products.length <= 1 || isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length, isPaused, prefersReducedMotion]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 70,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full min-h-[calc(100svh-4rem)] flex flex-col justify-between overflow-hidden bg-primary px-6 md:px-12 lg:px-20 py-10 select-none">
      {/* 1. Fondo modular de switches con onda RGB */}
      <KeyboardWaveBackground />

      {/* 2. Contenido principal */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full py-auto">
        {/* Lado izquierdo: Textos y CTAs */}
        <div className="flex-1 flex flex-col items-start gap-6 text-left max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <Tag text="Catálogo 2026" />
            <span className="flex items-center gap-1.5 text-xs font-semibold text-highlight bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
              <Sparkles size={13} className="text-highlight" />
              Equipamiento Profesional
            </span>
          </div>

          <h1 className="font-spartan font-bold text-4xl sm:text-6xl lg:text-7xl text-neutral-white leading-[1.05] tracking-tight">
            Tecnología que <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-white via-gray-200 to-highlight">
              se siente fácil.
            </span>
          </h1>

          <p className="font-inter text-gray-300 text-base sm:text-lg max-w-lg leading-relaxed">
            Mejorá tu setup sin dudar: periféricos calibrados al detalle,
            switches mecánicos de respuesta rápida y garantía oficial de 12
            meses.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate("/categorias")}
              className="sm:w-auto py-3 px-8 text-sm sm:text-base shadow-lg shadow-black/20 group"
            >
              <span>Explorar catálogo</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1 shrink-0"
              />
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate("/ofertas")}
              className="sm:w-auto py-3 px-8 text-sm sm:text-base"
            >
              Ver ofertas
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4 border-t border-white/10 w-full text-xs font-inter text-gray-400">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-highlight" />
              <span>Despacho prioritario 24hs</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-highlight" />
              <span>Garantía Oficial Nova</span>
            </div>
          </div>
        </div>

        {/* Lado derecho: Vitrina del producto */}
        <HeroProductCard
          product={products[currentIndex]}
          totalItems={products.length}
          currentIndex={currentIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelectIndex={setCurrentIndex}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />
      </div>

      {/* 3. Indicador inferior de scroll */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-4">
        <button
          type="button"
          onClick={scrollToContent}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-neutral-white transition-colors cursor-pointer group"
          aria-label="Deslizar hacia abajo"
        >
          <span className="text-[11px] font-inter font-medium tracking-widest uppercase opacity-75 group-hover:opacity-100">
            Descubrí más
          </span>
          <ChevronDown size={18} className="animate-bounce motion-reduce:animate-none" />
        </button>
      </div>
    </section>
  );
};
