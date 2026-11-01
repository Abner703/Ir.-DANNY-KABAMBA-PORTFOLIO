import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { MaskedHeading, Reveal, usePrefersReducedMotion, DURATION, EASING } from '../motion';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.2);
  const [activeNodes, setActiveNodes] = useState<boolean[]>([false, false, false]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height;
      const current = windowHeight * 0.7 - rect.top;
      const progress = Math.max(0, Math.min(1, current / total));
      setScrollProgress(progress);

      // Node contacts close at roughly 15%, 50%, 85% of timeline
      setActiveNodes([
        progress >= 0.15,
        progress >= 0.50,
        progress >= 0.85,
      ]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="py-14 sm:py-16 bg-[#F8F9FA] border-b border-[#DDE2E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Masked H2 + intro */}
        <div className="max-w-3xl mb-12">
          <MaskedHeading
            as="h2"
            lines={['Parcours professionnel et conduite de chantiers']}
            className="text-2xl sm:text-3xl font-display font-bold text-[#1E242B] tracking-tight mb-3"
          />
          <Reveal delay={100}>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Responsabilités techniques exercées à Kinshasa en entreprise et sur chantiers de grands bâtiments.
            </p>
          </Reveal>
        </div>

        {/* Timeline with vertical line scaling with scroll, and circuit nodes closing */}
        <div ref={containerRef} className="relative ml-3 md:ml-5 pl-8 md:pl-10 space-y-10">
          
          {/* Timeline background track line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px bg-[#DDE2E5]"
            aria-hidden="true"
          />

          {/* Dynamic line that traces with scroll (scaleY) in Steel Blue / Sage */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px bg-[#3B7A57] origin-top"
            style={{
              transform: reducedMotion ? 'scaleY(1)' : `scaleY(${scrollProgress})`,
              transition: 'transform 80ms linear',
            }}
            aria-hidden="true"
          />

          {EXPERIENCES.map((exp, idx) => {
            const isNodeClosed = activeNodes[idx];
            const slideDirection = idx % 2 === 0 ? 'left' : 'right';

            return (
              <div key={exp.id} className="relative">
                {/* Circuit node contact point: shifts from gray outline to solid Sage Green (150ms) */}
                <div
                  className="absolute -left-[37px] md:-left-[45px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-colors"
                  style={{
                    borderColor: isNodeClosed || reducedMotion ? '#3B7A57' : '#DDE2E5',
                    backgroundColor: isNodeClosed || reducedMotion ? '#3B7A57' : '#FFFFFF',
                    transitionDuration: `${DURATION.micro}ms`,
                    transitionTimingFunction: EASING.out,
                  }}
                  aria-hidden="true"
                />

                {/* Staggered lateral slide reveal */}
                <Reveal delay={idx * 80} direction={slideDirection}>
                  <div className="bg-white rounded-md border border-[#DDE2E5] p-6 space-y-3 hover:border-[#2B4C6F] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-[#E9ECEF]">
                      <div>
                        <h3 className="text-base font-display font-semibold text-[#1E242B]">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-medium text-[#2B4C6F]">
                          {exp.summary}
                        </p>
                      </div>
                      <div className="text-xs text-[#4B5563] shrink-0">
                        <span>{exp.period}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Details list */}
                    <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-[#4B5563]">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#3B7A57] font-bold select-none">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
