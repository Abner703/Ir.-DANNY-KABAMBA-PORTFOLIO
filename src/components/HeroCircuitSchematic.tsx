import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../motion';

export const HeroCircuitSchematic: React.FC = () => {
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 420 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[420px] max-h-[320px] text-[#2B4C6F]"
      >
        <defs>
          {/* Main electrical path that the copper pulse will follow */}
          <path
            id="circuit-main-flow"
            d="M 30 60 L 100 60 L 100 130 L 170 130 L 170 80 L 250 80 L 250 190 L 330 190 L 330 260 L 390 260"
          />

          <style>
            {`
              @keyframes drawMain {
                0% { stroke-dashoffset: 800; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes drawBranches {
                0% { stroke-dashoffset: 400; }
                100% { stroke-dashoffset: 0; }
              }
              .draw-main-trace {
                stroke-dasharray: 800;
                stroke-dashoffset: 0;
                animation: drawMain 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              }
              .draw-branch-trace {
                stroke-dasharray: 400;
                stroke-dashoffset: 0;
                animation: drawBranches 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
              }
              @media (prefers-reduced-motion: reduce) {
                .draw-main-trace, .draw-branch-trace {
                  animation: none !important;
                  stroke-dashoffset: 0 !important;
                }
              }
            `}
          </style>
        </defs>

        {/* 1. Source (Générateur / Réseau MT/BT) */}
        <g stroke="#2B4C6F" strokeWidth="1.25">
          {/* Symbole Source Cercle */}
          <circle cx="30" cy="60" r="14" />
          <path d="M 23 60 C 26 55, 34 65, 37 60" />

          {/* Ligne principale source vers disjoncteur général */}
          <path
            d="M 44 60 L 88 60"
            className="draw-main-trace"
          />

          {/* Disjoncteur Général / Sectionneur */}
          <rect x="88" y="52" width="24" height="16" fill="#F8F9FA" />
          <path d="M 88 60 L 102 54" stroke="#C87D55" strokeWidth="1.5" />
          <path d="M 104 60 L 112 60" />
        </g>

        {/* 2. Barre omnibus / TGBT & Colonne montante */}
        <g stroke="#2B4C6F" strokeWidth="1.25">
          {/* Ligne vers le jeu de barres */}
          <path
            d="M 112 60 L 170 60 L 170 130"
            className="draw-main-trace"
          />

          {/* Jeu de barres TGBT (ligne renforcée) */}
          <line x1="150" y1="130" x2="310" y2="130" stroke="#1E242B" strokeWidth="2.5" />
          <text x="150" y="122" fill="#2B4C6F" fontSize="8" fontFamily="monospace" fontWeight="600" stroke="none">
            BUS TGBT 400V
          </text>
        </g>

        {/* 3. Départs protégés (Départ Solaire, Départ Immeuble, Départ Secours) */}
        <g stroke="#2B4C6F" strokeWidth="1.25">
          {/* Départ 1 : Solaire & Stockage */}
          <path
            d="M 180 130 L 180 80 L 250 80"
            className="draw-branch-trace"
          />
          {/* Disjoncteur départ 1 */}
          <rect x="200" y="74" width="16" height="12" fill="#F8F9FA" />
          <line x1="200" y1="80" x2="216" y2="80" stroke="#3B7A57" strokeWidth="1.5" />
          {/* Symbole PV / Onduleur */}
          <rect x="250" y="70" width="30" height="20" rx="2" stroke="#3B7A57" />
          <line x1="250" y1="90" x2="280" y2="70" stroke="#3B7A57" strokeWidth="1" />
          <text x="254" y="82" fill="#3B7A57" fontSize="7" fontFamily="sans-serif" fontWeight="600" stroke="none">
            = PV
          </text>
          <text x="267" y="87" fill="#3B7A57" fontSize="7" fontFamily="sans-serif" fontWeight="600" stroke="none">
            ~ AC
          </text>

          {/* Départ 2 : Colonne Montante Bâtiment */}
          <path
            d="M 240 130 L 240 190 L 330 190"
            className="draw-main-trace"
          />
          {/* Disjoncteur départ 2 */}
          <rect x="260" y="184" width="16" height="12" fill="#F8F9FA" />
          <line x1="260" y1="190" x2="276" y2="190" stroke="#C87D55" strokeWidth="1.5" />
          {/* Coffret divisionnaire */}
          <rect x="330" y="178" width="28" height="24" rx="2" stroke="#2B4C6F" />
          <circle cx="338" cy="190" r="2" fill="#3B7A57" stroke="none" />
          <circle cx="346" cy="190" r="2" fill="#3B7A57" stroke="none" />
          <circle cx="352" cy="190" r="2" fill="#3B7A57" stroke="none" />

          {/* Départ 3 : Secours / Automatisme */}
          <path
            d="M 300 130 L 300 260 L 390 260"
            className="draw-branch-trace"
          />
          {/* Inverseur de source automatique */}
          <rect x="320" y="254" width="22" height="14" fill="#F8F9FA" />
          <line x1="320" y1="260" x2="333" y2="256" stroke="#2B4C6F" strokeWidth="1.5" />
          <circle cx="337" cy="260" r="1.5" fill="#C87D55" stroke="none" />
          {/* Récepteur terminal */}
          <rect x="390" y="250" width="22" height="20" rx="2" stroke="#2B4C6F" />
          <text x="394" y="263" fill="#2B4C6F" fontSize="8" fontFamily="monospace" fontWeight="600" stroke="none">
            UPS
          </text>
        </g>

        {/* Nœuds de circuit (points d'interconnexion mécanique) */}
        <circle cx="100" cy="60" r="2.5" fill="#1E242B" />
        <circle cx="170" cy="130" r="2.5" fill="#1E242B" />
        <circle cx="180" cy="130" r="2.5" fill="#3B7A57" />
        <circle cx="240" cy="130" r="2.5" fill="#1E242B" />
        <circle cx="300" cy="130" r="2.5" fill="#1E242B" />

        {/* 4. LA SEULE IMPULSION CUIVRE EN BOUCLE DU SITE */}
        {/* Point cuivre de 5px parcourant le circuit en 7s (linéaire, paused si hors écran) */}
        {!reducedMotion && (
          <circle
            r="3"
            fill="#C87D55"
            style={{
              display: inView ? 'block' : 'none',
            }}
          >
            <animateMotion
              dur="7s"
              repeatCount="indefinite"
              rotate="auto"
              path="M 30 60 L 100 60 L 100 130 L 170 130 L 180 130 L 180 80 L 250 80 L 280 80 L 240 130 L 240 190 L 330 190 L 300 130 L 300 260 L 390 260"
            />
          </circle>
        )}
      </svg>
    </div>
  );
};
