import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Contact } from '../components/Contact';
import { PROJECTS } from '../data/portfolioData';
import { MapPin } from 'lucide-react';
import { MaskedHeading, Reveal } from '../motion';

interface ElectricalPageProps {
  onNavigateToContact: () => void;
}

export const ElectricalPage: React.FC<ElectricalPageProps> = () => {
  const buildingProjects = PROJECTS.filter(p => p.category === 'batiment' || p.category === 'industriel');

  return (
    <div>
      <SEOHead
        title="Services électriques et TGBT à Kinshasa | Daniel Kabamba"
        description="Conception de tableaux TGBT, réhabilitation d'immeubles, automatismes industriels et maintenance électrique à Kinshasa par Daniel Kabamba."
        canonicalPath="/services-electriques-kinshasa"
      />

      <section className="py-14 sm:py-16 bg-[#F8F9FA] border-b border-[#DDE2E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-4 mb-10">
            <MaskedHeading
              as="h1"
              lines={['Conception, installation et maintenance électrique à Kinshasa']}
              className="text-3xl sm:text-4xl font-display font-bold text-[#1E242B] tracking-tight"
            />
            <Reveal delay={120}>
              <p className="text-base text-[#1E242B]/90 leading-relaxed font-sans">
                Interventions d'ingénierie électrique pour le secteur tertiaire, les immeubles résidentiels à étages et les installations techniques sensibles. De l'étude de faisabilité à la mise en service des tableaux généraux basse tension (TGBT).
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Reveal delay={0} className="bg-white p-6 rounded-md border border-[#DDE2E5] space-y-2">
              <h2 className="text-base font-display font-semibold text-[#1E242B]">
                Conception de TGBT et distribution
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Calculs des bilans de puissance, schémas de distribution multi-niveaux, dimensionnement des colonnes montantes et sélectivité des protections.
              </p>
            </Reveal>

            <Reveal delay={80} className="bg-white p-6 rounded-md border border-[#DDE2E5] space-y-2">
              <h2 className="text-base font-display font-semibold text-[#1E242B]">
                Alimentations de secours et backup
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Intégration d'inverseurs de source automatiques et sécurisation de l'alimentation électrique pour serveurs informatiques et infrastructures critiques.
              </p>
            </Reveal>

            <Reveal delay={160} className="bg-white p-6 rounded-md border border-[#DDE2E5] space-y-2">
              <h2 className="text-base font-display font-semibold text-[#1E242B]">
                Dépannage et commandes moteur
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Diagnostic de pannes, réfection de circuits de commande, remise en conformité de boîtiers de surpresseurs et groupes de pompage.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4 mb-10">
            <h2 className="text-xl font-display font-semibold text-[#1E242B]">
              Exemples de chantiers réalisés à Kinshasa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buildingProjects.map((p, idx) => (
                <Reveal key={p.id} delay={idx * 60} className="bg-white p-5 rounded-md border border-[#DDE2E5] space-y-3">
                  {p.imageUrl && (
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full bg-[#E9ECEF] rounded overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: p.imagePosition || 'center',
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#2B4C6F]">
                      <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
                      <span>{p.location}</span>
                    </div>
                    <h3 className="text-base font-display font-semibold text-[#1E242B]">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {p.context}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Integrated Contact Section with electrical prefilled */}
      <Contact
        prefilledDemandeur="entreprise"
        prefilledBesoin="Service électrique"
        prefilledMessage="Bonjour Daniel, nous souhaitons échanger au sujet d'un projet d'installation ou d'étude électrique."
      />
    </div>
  );
};
