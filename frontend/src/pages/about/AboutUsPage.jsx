import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Tag } from "../../components/atoms/Tag";
import { AboutSectionItem } from "../../components/organisms/AboutSectionItem";
import { ABOUT_SECTIONS } from "../../const/aboutData";

export const AboutUsPage = () => {
  const stageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 45,
    restDelta: 0.001,
  });

  return (
    <main className="w-full bg-primary min-h-screen text-neutral-white selection:bg-highlight selection:text-primary">

      <section className="relative w-full pt-24 pb-12 px-6 text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
        <Tag text="Sobre NovaMarket" />
        <h1 className="font-spartan font-bold text-4xl sm:text-6xl text-neutral-white tracking-tight">
          Diseñado para quienes{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-white via-gray-200 to-highlight">
            exigen lo mejor.
          </span>
        </h1>
        <p className="font-inter text-gray-400 text-base sm:text-lg max-w-xl">
          Conocé la filosofía, el equipo y la ingeniería detrás de cada uno de los productos de nuestro catálogo.
        </p>
      </section>

      <section ref={stageRef} className="relative w-full h-[320svh]">
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          {ABOUT_SECTIONS.map((section, idx) => (
            <AboutSectionItem
              key={section.id}
              data={section}
              index={idx}
              total={ABOUT_SECTIONS.length}
              scrollYProgress={smoothProgress}
            />
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-20 py-24 px-6 text-center bg-primary border-t border-white/10">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h3 className="font-spartan font-bold text-3xl sm:text-4xl text-neutral-white">
            ¿Listo para llevar tu setup al siguiente nivel?
          </h3>
          <p className="font-inter text-gray-400 text-base">
            Explorá todo nuestro equipamiento disponible con despacho prioritario y garantía oficial.
          </p>
          <Link
            to="/categorias"
            className="inline-flex items-center justify-center font-inter font-semibold py-3 px-8 rounded-lg bg-highlight text-primary hover:bg-opacity-90 transition-all cursor-pointer shadow-lg shadow-highlight/10"
          >
            Ver catálogo completo
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;