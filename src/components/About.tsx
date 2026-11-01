import React from 'react';
import { PERSONAL_INFO, CORE_VALUES, LANGUAGES } from '../data/portfolioData';
import { MaskedHeading, Reveal, SectionDivider } from '../motion';

export const About: React.FC = () => {
  return (
    <section id="a-propos" className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Masked H2 heading + fade intro */}
        <div className="max-w-3xl mb-10">
          <MaskedHeading
            as="h2"
            lines={['Présentation et méthode d\'ingénierie']}
            className="text-2xl sm:text-3xl font-display font-bold text-[#1E242B] tracking-tight mb-4"
          />
          <Reveal delay={120}>
            <p className="text-base text-[#1E242B]/90 leading-relaxed font-sans">
              « {PERSONAL_INFO.bio} »
            </p>
          </Reveal>
        </div>

        {/* 3 Core Values - Editorial cards with staggered reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {CORE_VALUES.map((val, idx) => (
            <Reveal
              key={val.title}
              delay={idx * 60}
              className="p-5 rounded-md bg-[#F8F9FA] border border-[#DDE2E5] hover:border-[#2B4C6F] transition-colors"
            >
              <h3 className="text-base font-display font-semibold text-[#1E242B] mb-2">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {val.description}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Powered-up Conductor Divider */}
        <SectionDivider className="my-8" />

        {/* Technical Rigor & Languages: Clean two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          
          <div className="lg:col-span-7 space-y-3">
            <Reveal delay={100}>
              <h3 className="text-sm font-semibold text-[#1E242B]">
                Adaptation aux contraintes électriques de Kinshasa
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-2">
                La continuité de service à Kinshasa exige une analyse rigoureuse des variations de tension du réseau SNEL, un dimensionnement sélectif des protections différentielles et une ventilation appropriée des armoires électriques. Chaque étude vise à préserver les équipements sensibles et à assurer un basculement automatique sans à-coup.
              </p>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-2">
                Pour les projets solaires, les bilans de consommation et les calculs de décharge des batteries sont établis au plus juste pour garantir une autonomie pérenne sans surcoût inutile.
              </p>
            </Reveal>
          </div>

          {/* Languages Section: Clean unboxed list without pill badges */}
          <div className="lg:col-span-5 bg-[#F8F9FA] p-5 rounded-md border border-[#DDE2E5] space-y-3">
            <Reveal delay={160}>
              <h3 className="text-sm font-semibold text-[#1E242B]">
                Langues de travail
              </h3>

              <div className="space-y-2.5 mt-3">
                {LANGUAGES.map((lang) => (
                  <div key={lang.name} className="flex items-baseline justify-between text-xs pb-2 border-b border-[#E9ECEF] last:border-0 last:pb-0">
                    <div>
                      <span className="font-semibold text-[#1E242B] block">{lang.name}</span>
                      <span className="text-[#4B5563] text-[11px]">{lang.description}</span>
                    </div>
                    <span className="text-xs font-medium text-[#2B4C6F]">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
};
