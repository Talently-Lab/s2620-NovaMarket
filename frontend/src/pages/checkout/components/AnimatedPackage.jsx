
export const AnimatedPackage = () => {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center overflow-hidden">
      <style>{`
        /* 1. Caída del objeto mágico */
        @keyframes seqDrop {
          0% { transform: translateY(-70px) scale(0.5); opacity: 0; }
          12% { transform: translateY(-30px) scale(1); opacity: 1; }
          28% { transform: translateY(15px) scale(0.8); opacity: 1; }
          31%, 100% { transform: translateY(35px) scale(0.4); opacity: 0; }
        }

        /* 2. Físicas de la caja (Impacto al cerrar + Salto alegre) */
        @keyframes seqBoxPhysics {
          0%, 28% { transform: scale(1) translateY(0); }
          /* El impacto de cierre */
          31% { transform: scale(1.08, 0.85) translateY(15px); } 
          35% { transform: scale(0.95, 1.05) translateY(-5px); }
          40%, 72% { transform: scale(1) translateY(0); }
          /* El salto final */
          76% { transform: scale(1.08, 0.85) translateY(12px); }
          82% { transform: scale(0.9, 1.15) translateY(-25px); }
          88% { transform: scale(1.05, 0.95) translateY(4px); }
          95%, 100% { transform: scale(1) translateY(0); }
        }

        /* 3. Intercambio instantáneo de estados durante el impacto */
        @keyframes seqHideOpen {
          0%, 31.9% { opacity: 1; }
          32%, 100% { opacity: 0; }
        }
        @keyframes seqShowClosed {
          0%, 31.9% { opacity: 0; }
          32%, 100% { opacity: 1; }
        }

        /* 4. Confeti y Check */
        @keyframes seqConfetti {
          0%, 78% { transform: scale(0.5); opacity: 0; }
          82% { transform: scale(1.1); opacity: 1; }
          95%, 100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes seqCheck {
          0%, 80% { transform: scale(0); opacity: 0; }
          88% { transform: scale(1.25); opacity: 1; }
          95%, 100% { transform: scale(1); opacity: 1; }
        }

        /* Asignaciones */
        .anim-drop { animation: seqDrop 3s forwards ease-in-out; }
        .anim-box-physics { animation: seqBoxPhysics 3s forwards ease-in-out; transform-origin: 100px 145px; }
        .anim-hide-open { animation: seqHideOpen 3s forwards; }
        .anim-show-closed { animation: seqShowClosed 3s forwards; }
        .anim-confetti { animation: seqConfetti 3s forwards ease-out; transform-origin: 100px 120px; }
        .anim-check { animation: seqCheck 3s forwards cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: 155px 70px; }
      `}</style>

      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        {/* Fondo Circular */}
        <circle cx="100" cy="120" r="75" fill="#F0F5FA" />

        {/* --- GRUPO FÍSICO DE LA CAJA (Maneja el impacto y el salto) --- */}
        <g className="anim-box-physics">
          
          {/* Confeti detrás de la caja */}
          <g className="anim-confetti" strokeLinecap="round" strokeWidth="4">
            <line x1="100" y1="30" x2="100" y2="10" stroke="#00cae3" />
            <line x1="30" y1="100" x2="10" y2="100" stroke="#00cae3" />
            <line x1="150" y1="50" x2="165" y2="35" stroke="#4ade80" />
            <line x1="50" y1="150" x2="35" y2="165" stroke="#4ade80" />
            <line x1="165" y1="110" x2="185" y2="115" stroke="#0d47a1" />
            <line x1="35" y1="50" x2="20" y2="40" stroke="#0d47a1" />
            <circle cx="65" cy="25" r="4" fill="#0d47a1" />
            <circle cx="170" cy="80" r="3.5" fill="#4ade80" />
            <circle cx="20" cy="130" r="4" fill="#00cae3" />
          </g>

          {/* --- ESTADO 1: CAJA ABIERTA --- */}
          <g className="anim-hide-open">
            {/* Solapas traseras abiertas */}
            <path d="M 100 80 L 50 105 L 30 75 L 80 50 Z" fill="#64748b" />
            <path d="M 100 80 L 150 105 L 170 75 L 120 50 Z" fill="#475569" />

            {/* Agujero interior oscuro */}
            <path d="M 100 80 L 50 105 L 100 130 L 150 105 Z" fill="#0f172a" />
            
            {/* El Objeto Mágico */}
            <g className="anim-drop">
              <defs>
                <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path d="M 90 70 C 90 50, 110 50, 110 70" fill="none" stroke="url(#bagGrad)" strokeWidth="3" />
              <path d="M 80 70 L 120 70 L 115 105 L 85 105 Z" fill="url(#bagGrad)" />
              <path d="M 70 50 L 73 57 L 80 60 L 73 63 L 70 70 L 67 63 L 60 60 L 67 57 Z" fill="#10b981" />
              <path d="M 125 45 L 127 50 L 132 52 L 127 54 L 125 59 L 123 54 L 118 52 L 123 50 Z" fill="#3b82f6" />
            </g>

            {/* Paredes frontales */}
            <path d="M 50 105 L 100 130 L 100 170 L 50 145 Z" fill="#2563eb" />
            <path d="M 100 130 L 150 105 L 150 145 L 100 170 Z" fill="#1d4ed8" />

            {/* Solapas frontales abiertas (caídas hacia afuera) */}
            <path d="M 50 105 L 100 130 L 80 145 L 30 120 Z" fill="#1e40af" />
            <path d="M 100 130 L 150 105 L 170 120 L 120 145 Z" fill="#1e3a8a" />
          </g>

          {/* --- ESTADO 2: CAJA CERRADA --- */}
          <g className="anim-show-closed">
            {/* Tapa superior cerrada y cinta */}
            <path d="M 100 80 L 50 105 L 100 130 L 150 105 Z" fill="#1e40af" />
            <path d="M 75 92 L 85 87 L 125 107 L 115 112 Z" fill="#9ca3af" />
            
            {/* Paredes frontales idénticas a las abiertas */}
            <path d="M 50 105 L 100 130 L 100 170 L 50 145 Z" fill="#2563eb" />
            <path d="M 100 130 L 150 105 L 150 145 L 100 170 Z" fill="#1d4ed8" />

            {/* Líneas estéticas de marca */}
            <line x1="60" y1="125" x2="85" y2="137" stroke="#00cae3" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="135" x2="75" y2="142" stroke="#00cae3" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* --- EL CHECK DE ÉXITO (Aparece al final del salto) --- */}
          <g className="anim-check">
            <circle cx="155" cy="70" r="22" fill="#4ade80" stroke="#1e3a8a" strokeWidth="3" />
            <path d="M 143 70 L 150 77 L 165 60" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

        </g>
      </svg>
    </div>
  );
};