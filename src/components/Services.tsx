import React, { useState } from 'react';
import { SERVICES } from '../data/portfolioData';
import { Service } from '../types';
import { MaskedHeading, Reveal, usePrefersReducedMotion } from '../motion';

interface ServicesProps {
  onSelectService: (service: Service) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="services" className="py-14 sm:py-16 bg-[#F8F9FA] border-y border-[#DDE2E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Masked H2 + intro */}
        <div className="max-w-3xl mb-10">
          <MaskedHeading
            as="h2"
            lines={['Services d\'ingénierie électrique et solaire à Kinshasa']}
            className="text-2xl sm:text-3xl font-display font-bold text-[#1E242B] tracking-tight mb-3"
          />
          <Reveal delay={100}>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Prestations techniques pour particuliers, commerces, immeubles de grande hauteur et installations industrielles.
            </p>
          </Reveal>
        </div>

        {/* 6 Services Grid: Cascading reveal (stagger 60ms, max 360ms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => {
            const isHovered = hoveredServiceId === srv.id;
            const isSolar = srv.id === 'solaire';

            return (
              <Reveal
                key={srv.id}
                delay={idx * 60}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setHoveredServiceId(srv.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  onFocus={() => setHoveredServiceId(srv.id)}
                  onBlur={() => setHoveredServiceId(null)}
                  tabIndex={0}
                  className="relative bg-white rounded-md border border-[#DDE2E5] p-6 h-full flex flex-col justify-between overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C6F]"
                >
                  {/* Bordure qui se redessine en cuivre (du coin haut-gauche vers le bas-droit en 400ms) */}
                  {!reducedMotion && (
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none rounded-md"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ overflow: 'visible' }}
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="calc(100% - 1px)"
                        height="calc(100% - 1px)"
                        rx="5"
                        fill="none"
                        stroke="#C87D55"
                        strokeWidth="1.5"
                        strokeDasharray="1200"
                        strokeDashoffset={isHovered ? 0 : 1200}
                        style={{
                          transition: 'stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      />
                    </svg>
                  )}

                  <div>
                    {/* Header: audience + animation pour service solaire */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-[#2B4C6F] font-medium block">
                        Pour : {srv.targetAudience}
                      </span>

                      {/* Pour le service solaire : petit arc de soleil en trait fin avec point qui se déplace */}
                      {isSolar && (
                        <div className="w-14 h-7 relative" aria-hidden="true">
                          <svg viewBox="0 0 56 28" fill="none" className="w-full h-full text-[#C87D55]">
                            <path
                              d="M 4 26 A 24 24 0 0 1 52 26"
                              stroke="#DDE2E5"
                              strokeWidth="1.5"
                              strokeDasharray="2 2"
                            />
                            {!reducedMotion ? (
                              <circle r="3" fill="#C87D55">
                                <animateMotion
                                  dur="4s"
                                  repeatCount="indefinite"
                                  path="M 4 26 A 24 24 0 0 1 52 26"
                                />
                              </circle>
                            ) : (
                              <circle cx="28" cy="4" r="3" fill="#C87D55" />
                            )}
                          </svg>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-display font-semibold text-[#1E242B] mb-2 group-hover:text-[#2B4C6F] transition-colors">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                      {srv.description}
                    </p>
                  </div>

                  {/* Action Button: Pure text, hover color transition */}
                  <button
                    onClick={() => onSelectService(srv)}
                    className="w-full pt-3 border-t border-[#E9ECEF] text-xs font-semibold text-[#2B4C6F] hover:text-[#3B7A57] text-left transition-colors cursor-pointer"
                  >
                    Demander cette prestation
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
