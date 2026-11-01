import React, { useEffect, useRef, useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Contact } from '../components/Contact';
import { PROJECTS } from '../data/portfolioData';
import { MapPin, CheckCircle } from 'lucide-react';
import { MaskedHeading, Reveal, usePrefersReducedMotion } from '../motion';

interface SolarPageProps {
  onNavigateToContact: () => void;
}

export const SolarPage: React.FC<SolarPageProps> = () => {
  const solarProject = PROJECTS.find(p => p.id === 'solaire-kitambo');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0.5);
  const [cellsCharged, setCellsCharged] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Scroll ratio for the solar arc trajectory
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height + windowHeight;
      const current = windowHeight - rect.top;
      const ratio = Math.max(0, Math.min(1, current / total));
      setScrollRatio(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for charging the solar panel cells (1.2s total)
  useEffect(() => {
    if (reducedMotion) {
      setCellsCharged(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCellsCharged(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  // Calculate sun position on arc (x, y)
  const angle = Math.PI * (1 - scrollRatio);
  const sunX = 140 - 110 * Math.cos(angle);
  const sunY = 95 - 75 * Math.sin(angle);

  return (
    <div ref={sectionRef}>
      <SEOHead
        title="Installation solaire à Kinshasa | Daniel Kabamba"
        description="Étude et installation de systèmes solaires photovoltaïques autonomes et hybrides à Kinshasa pour maisons, bureaux et entreprises par Daniel Kabamba."
        canonicalPath="/installation-solaire-kinshasa"
      />

      <section className="py-14 sm:py-16 bg-[#F8F9FA] border-b border-[#DDE2E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-4 mb-10">
            <MaskedHeading
              as="h1"
              lines={['Installation solaire photovoltaïque à Kinshasa']}
              className="text-3xl sm:text-4xl font-display font-bold text-[#1E242B] tracking-tight"
            />
            <Reveal delay={120}>
              <p className="text-base text-[#1E242B]/90 leading-relaxed font-sans">
                Face aux délestages fréquents du réseau électrique à Kinshasa, l'installation d'un système solaire autonome ou hybride apporte une continuité d'énergie indispensable pour les résidences privées, commerces et espaces de bureaux.
              </p>
            </Reveal>
          </div>

          {/* ANIMATION TECHNIQUE SOLAIRE : TRAJECTOIRE DU SOLEIL + CELLULES PV CHARGÉES */}
          <div className="bg-white rounded-md border border-[#DDE2E5] p-6 mb-12 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* 1. Trajectoire du soleil en arc liée au scroll */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#2B4C6F]">
                  Cycle d'ensoleillement et captage journalier
                </span>
                <p className="text-xs text-[#4B5563]">
                  Orientation et inclinaison adaptées à la latitude de Kinshasa (4°S) pour un rendement régulier toute l'année.
                </p>

                <div className="w-full h-36 flex items-center justify-center pt-2" aria-hidden="true">
                  <svg viewBox="0 0 280 110" fill="none" className="w-full max-w-[280px] h-full">
                    {/* Ligne horizon */}
                    <line x1="10" y1="95" x2="270" y2="95" stroke="#DDE2E5" strokeWidth="1.5" />
                    <text x="14" y="105" fill="#4B5563" fontSize="8" fontFamily="sans-serif">EST (Matin)</text>
                    <text x="220" y="105" fill="#4B5563" fontSize="8" fontFamily="sans-serif">OUEST (Soir)</text>

                    {/* Arc trajectoire */}
                    <path
                      d="M 30 95 A 110 75 0 0 1 250 95"
                      stroke="#2B4C6F"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />

                    {/* Point Soleil mobile selon le défilement (transform uniquement) */}
                    <circle
                      cx={reducedMotion ? 140 : sunX}
                      cy={reducedMotion ? 20 : sunY}
                      r="6"
                      fill="#C87D55"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>

              {/* 2. Grille de cellules de panneau solaire qui passent en Vert Sauge une par une */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#3B7A57]">
                  Cellules photovoltaïques sous tension
                </span>
                <p className="text-xs text-[#4B5563]">
                  Régulation de charge et conversion CC/CA sans micro-coupures pour vos récepteurs.
                </p>

                {/* Grille 6x3 de cellules de panneau solaire */}
                <div className="grid grid-cols-6 gap-1.5 p-3 bg-[#F8F9FA] rounded border border-[#DDE2E5]">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xs border border-[#2B4C6F]/30 transition-colors"
                      style={{
                        backgroundColor: cellsCharged ? 'rgba(59, 122, 87, 0.18)' : 'transparent',
                        borderColor: cellsCharged ? '#3B7A57' : '#DDE2E5',
                        transitionProperty: 'background-color, border-color',
                        transitionDuration: '300ms',
                        transitionDelay: reducedMotion ? '0ms' : `${(i * 65)}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Reveal delay={0} className="bg-white p-6 rounded-md border border-[#DDE2E5] space-y-2">
              <h2 className="text-base font-display font-semibold text-[#1E242B]">
                Bilan énergétique préalable
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Inventaire précis de vos appareils prioritaires (éclairage, réfrigération, bureautique) pour dimensionner la puissance requise sans surcoût.
              </p>
            </Reveal>

            <Reveal delay={80} className="bg-white p-6 rounded-md border border-[#DDE2E5] space-y-2">
              <h2 className="text-base font-display font-semibold text-[#1E242B]">
                Onduleurs et stockage batterie
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Sélection de convertisseurs hybrides robustes et bancs de batteries adaptés aux températures élevées pour maximiser la durée de vie.
              </p>
            </Reveal>

            <Reveal delay={160} className="bg-white p-6 rounded-md border border-[#DDE2E5] space-y-2">
              <h2 className="text-base font-display font-semibold text-[#1E242B]">
                Protections et conformité
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Pose de coffrets de protection DC (courant continu) et AC (courant alternatif), parafoudres, disjoncteurs et mise à la terre sécurisée.
              </p>
            </Reveal>
          </div>

          {/* Real case study reference */}
          {solarProject && (
            <Reveal delay={200} className="bg-white rounded-md border border-[#DDE2E5] p-6 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {solarProject.imageUrl && (
                  <div className="lg:col-span-5">
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full bg-[#E9ECEF] rounded overflow-hidden">
                      <img
                        src={solarProject.imageUrl}
                        alt={solarProject.title}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: solarProject.imagePosition || 'center',
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                <div className={solarProject.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12'}>
                  <div className="flex items-center gap-2 text-xs text-[#2B4C6F] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
                    <span>{solarProject.location}</span>
                  </div>
                  <h2 className="text-xl font-display font-semibold text-[#1E242B] mb-2">
                    Référence chantier : {solarProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                    {solarProject.context}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1E242B]">
                    {solarProject.missions.map((m) => (
                      <div key={m} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#3B7A57] shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          )}

        </div>
      </section>

      {/* Integrated Contact Section with solar prefilled */}
      <Contact
        prefilledDemandeur="particulier"
        prefilledBesoin="Installation solaire"
        prefilledMessage="Bonjour Daniel, je souhaite obtenir des informations et une estimation pour une installation solaire."
      />
    </div>
  );
};
