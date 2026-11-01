import React, { useState } from 'react';
import { Upload, User } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MaskedHeading } from '../motion';
import { HeroCircuitSchematic } from './HeroCircuitSchematic';

interface HeroProps {
  onSelectTrack: (track: 'client' | 'pro') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectTrack }) => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>(
    PERSONAL_INFO.photoUrl || '/assets/aistudio/1792950575182_00290754.jpg'
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
    }
  };

  const competencies = [
    'Conception',
    'Installation',
    'Maintenance',
    'Énergie solaire',
    'Électricité industrielle',
    'Gestion énergétique',
  ];

  return (
    <section id="accueil" className="relative bg-[#F8F9FA] py-12 lg:py-16 border-b border-[#DDE2E5] overflow-hidden">
      
      {/* Background Stylized Single-Line Schematic with moving copper pulse */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-25 lg:opacity-35 pointer-events-none hidden md:block w-[420px] h-[320px]">
        <HeroCircuitSchematic />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Typographic Content + Right Photo Slot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column (Content, 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Single H1 with line-by-line masked slide */}
            <MaskedHeading
              as="h1"
              lines={[
                'Daniel Kabamba,',
                'ingénieur électricien',
                'et énergétique à Kinshasa',
              ]}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#1E242B] tracking-tight leading-tight"
            />

            {/* Presentation Quote verbatim */}
            <p className="text-base sm:text-lg text-[#1E242B]/90 leading-relaxed font-sans max-w-2xl">
              « {PERSONAL_INFO.bio} »
            </p>

            {/* Competencies list - Clean unboxed text with typographic separators */}
            <div className="pt-2 border-t border-[#DDE2E5]">
              <p className="text-xs font-medium text-[#4B5563] mb-2">
                Compétences clés :
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-[#1E242B]">
                {competencies.map((comp, idx) => (
                  <React.Fragment key={comp}>
                    <span>{comp}</span>
                    {idx < competencies.length - 1 && (
                      <span className="text-[#C87D55]" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Double parcours visible dès l'arrivée (CTA buttons animated after title) */}
            <div
              className="pt-4 space-y-3"
              style={{
                animation: 'fadeUp 400ms cubic-bezier(0.22, 1, 0.36, 1) 240ms both',
              }}
            >
              <h2 className="text-sm font-semibold text-[#1E242B]">
                Prise de contact selon votre besoin :
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Track 1: Particuliers, bureaux et entreprises */}
                <div className="p-4 rounded-md bg-white border border-[#DDE2E5] flex flex-col justify-between hover:border-[#3B7A57] transition-colors">
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-semibold text-[#3B7A57]">
                      Particuliers et entreprises
                    </p>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Installation solaire autonome, dépannage ou rénovation électrique.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTrack('client')}
                    className="w-full py-2.5 px-3.5 text-xs font-semibold rounded text-white bg-[#3B7A57] hover:bg-[#2F6246] transition-colors cursor-pointer text-center"
                  >
                    Demander une étude solaire
                  </button>
                </div>

                {/* Track 2: Architectes, ingénieurs et entreprises de construction */}
                <div className="p-4 rounded-md bg-white border border-[#DDE2E5] flex flex-col justify-between hover:border-[#2B4C6F] transition-colors">
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-semibold text-[#2B4C6F]">
                      Architectes et constructeurs
                    </p>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Études TGBT, plans unifilaires, bilans de puissance et direction de travaux.
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTrack('pro')}
                    className="w-full py-2.5 px-3.5 text-xs font-semibold rounded text-[#2B4C6F] bg-[#E9ECEF] hover:bg-[#2B4C6F] hover:text-white transition-colors cursor-pointer text-center"
                  >
                    Collaborer sur un projet technique
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Photo Slot (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-md border border-[#DDE2E5] p-3 shadow-xs">
              <div className="relative aspect-4/5 w-full bg-[#E9ECEF] rounded overflow-hidden">
                {customPhotoUrl ? (
                  <>
                    <img
                      src={customPhotoUrl}
                      alt="Daniel Kabamba, ingénieur électricien et énergétique à Kinshasa"
                      className="w-full h-full object-cover object-[center_12%] rounded"
                      fetchPriority="high"
                    />
                    {/* Discrète option pour changer/tester une autre photo */}
                    <div className="absolute bottom-2 right-2 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <label className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#1E242B] bg-white/90 backdrop-blur-xs rounded border border-[#DDE2E5] hover:bg-white cursor-pointer shadow-xs">
                        <Upload className="w-3 h-3 text-[#2B4C6F]" />
                        <span>Changer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3 max-w-xs flex flex-col items-center justify-center p-6 text-center h-full">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center text-[#2B4C6F] border border-[#DDE2E5]">
                      <User className="w-6 h-6 stroke-[1.5]" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-[#2B4C6F]">
                        Photo professionnelle
                      </p>
                      <p className="text-xs text-[#4B5563] leading-relaxed">
                        Portrait de Daniel Kabamba, ingénieur à Kinshasa.
                      </p>
                    </div>

                    <div className="pt-2">
                      <label className="inline-block px-3 py-1.5 text-xs font-medium text-[#2B4C6F] bg-white rounded border border-[#DDE2E5] hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                        <span className="flex items-center gap-1.5 justify-center">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Sélectionner une photo</span>
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 px-1 flex items-center justify-between text-xs text-[#4B5563]">
                <div className="flex flex-col">
                  <span className="font-semibold text-[#1E242B]">Daniel Kabamba</span>
                  <span className="text-[11px] text-[#4B5563]">Ingénieur Électricien &amp; Énergétique</span>
                </div>
                <span className="text-[11px] bg-[#E9ECEF] text-[#2B4C6F] font-medium px-2 py-0.5 rounded">
                  Kinshasa, RDC
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
