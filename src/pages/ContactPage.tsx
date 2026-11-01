import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Contact } from '../components/Contact';
import { MaskedHeading, Reveal } from '../motion';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Contact | Daniel Kabamba, ingénieur électricien à Kinshasa"
        description="Contactez Daniel Kabamba pour vos projets d'électricité et d'installation solaire à Kinshasa. Ligne directe et envoi rapide par WhatsApp au +243 858 661 574."
        canonicalPath="/contact"
      />

      <div className="py-8 bg-[#F8F9FA] border-b border-[#DDE2E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MaskedHeading
            as="h1"
            lines={['Prendre contact avec Daniel Kabamba à Kinshasa']}
            className="text-3xl sm:text-4xl font-display font-bold text-[#1E242B] tracking-tight"
          />
          <Reveal delay={120}>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2">
              Discutez de votre projet technique, demandez une étude de dimensionnement ou planifiez une intervention sur site.
            </p>
          </Reveal>
        </div>
      </div>

      <Contact />
    </div>
  );
};
