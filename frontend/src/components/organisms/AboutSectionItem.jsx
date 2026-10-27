import { motion, useTransform } from "framer-motion";
import { Tag } from "../atoms/Tag";

export const AboutSectionItem = ({ data, index, scrollYProgress }) => {
  const isFirst = index === 0;
  const isLast = index === 2;
  const isLeft = data.align === "left";
  const Icon = data.icon;

  let input = [];
  let opacityOutput = [];
  let blurOutput = [];
  let scaleOutput = [];
  let textYOutput = [];

  if (isFirst) {
    // SECCIÓN 1: Nítida de inicio, se difumina y sale entre 0.20 y 0.40
    input = [0, 0.2, 0.4, 1.0];
    opacityOutput = [1, 1, 0, 0];
    blurOutput = [0, 0, 16, 16];
    scaleOutput = [1, 1, 1.04, 1.04];
    textYOutput = [0, 0, -30, -30];
  } else if (isLast) {
    // SECCIÓN 3: Entra difuminada entre 0.60 y 0.80, queda nítida hasta el final
    input = [0, 0.6, 0.8, 1.0];
    opacityOutput = [0, 0, 1, 1];
    blurOutput = [16, 16, 0, 0];
    scaleOutput = [0.96, 0.96, 1, 1];
    textYOutput = [30, 30, 0, 0];
  } else {
    // SECCIÓN 2 (MEDIO): Cruce perfecto de entrada (0.20 - 0.40) y salida (0.60 - 0.80)
    input = [0.2, 0.4, 0.6, 0.8];
    opacityOutput = [0, 1, 1, 0];
    blurOutput = [16, 0, 0, 16];
    scaleOutput = [0.96, 1, 1, 1.04];
    textYOutput = [30, 0, 0, -30];
  }

  const opacity = useTransform(scrollYProgress, input, opacityOutput);
  const blurValue = useTransform(scrollYProgress, input, blurOutput);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  const scale = useTransform(scrollYProgress, input, scaleOutput);
  const textY = useTransform(scrollYProgress, input, textYOutput);

  const pointerEvents = useTransform(opacity, (val) =>
    val > 0.4 ? "auto" : "none"
  );

  // Máscaras de transparencia para fundir bordes con el fondo (#0B1220)
  const horizontalMask = isLeft
    ? "linear-gradient(to right, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)"
    : "linear-gradient(to left, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)";

  const verticalMask =
    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)";

  return (
    <motion.div
      style={{
        opacity,
        filter,
        scale,
        pointerEvents,
        zIndex: index + 10,
      }}
      className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform will-change-opacity will-change-filter"
    >

      <div
        style={{
          maskImage: verticalMask,
          WebkitMaskImage: verticalMask,
        }}
        className={`absolute inset-0 lg:inset-y-0 lg:w-4/5 z-0 ${
          isLeft ? "lg:left-0 lg:right-auto" : "lg:right-0 lg:left-auto"
        }`}
      >
        <img
          src={data.image}
          alt={data.title}
          style={{
            maskImage: horizontalMask,
            WebkitMaskImage: horizontalMask,
          }}
          className="w-full h-full object-cover object-center"
        />

        <div
          style={{
            background: isLeft
              ? "linear-gradient(to right, transparent, rgba(11, 18, 32, 0.4) 50%, #0B1220 100%)"
              : "linear-gradient(to left, transparent, rgba(11, 18, 32, 0.4) 50%, #0B1220 100%)",
          }}
          className="hidden lg:block absolute inset-0 pointer-events-none"
        />

        <div className="lg:hidden absolute inset-0 bg-primary/80 pointer-events-none" />
      </div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16"
      >
        <div
          className={`w-full max-w-xl flex flex-col gap-4 sm:gap-6 ${
            isLeft ? "lg:ml-auto text-left" : "lg:mr-auto text-left"
          }`}
        >
          <div className="flex items-center gap-3">
            <Tag text={data.tag} />
            <div className="p-1.5 rounded-full bg-white/5 border border-white/10 text-highlight">
              <Icon size={16} aria-hidden="true" />
            </div>
          </div>

          <h2 className="font-spartan font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-white leading-tight tracking-tight">
            {data.title}{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-highlight to-accent block sm:inline">
              {data.highlightText}
            </span>
          </h2>

          <p className="font-inter text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {data.description}
          </p>

        </div>
      </motion.div>
    </motion.div>
  );
};