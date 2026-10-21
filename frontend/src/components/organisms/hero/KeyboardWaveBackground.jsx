import { useMemo } from "react";

export const KeyboardWaveBackground = () => {
  const totalCols = 12;

  const keysGrid = useMemo(() => {
    return Array.from({ length: 96 }, (_, i) => ({
      id: i,
      waveDelay: (i % totalCols) * 0.22,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 perspective-[1000px] select-none">
      
      {/* Halo de luz difusa de fondo */}
      <div 
        className="absolute -inset-y-1/2 -left-1/3 w-[180%] bg-linear-to-r from-transparent to-transparent blur-3xl animate-pulse" 
        style={{ animationDuration: "6s" }} 
      />

      <div className="absolute -top-[55%] -left-[35%] w-[170%] h-[170%] grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3.5 transform-[rotateX(50deg)_rotateZ(-12deg)_translateY(-5%)] origin-center">
        {keysGrid.map((key) => (
          <div
            key={key.id}
            style={{
              animationDelay: `${key.waveDelay}s`,
              animationDuration: "3.2s",
            }}
            className="w-full aspect-square rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300 animate-rgb-wave"
          >
            <div className="w-2.5 h-2.5 relative opacity-35">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-radial from-transparent via-primary/40 to-primary" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-36 bg-linear-to-t from-primary via-primary/85 to-transparent" />
    </div>
  );
};