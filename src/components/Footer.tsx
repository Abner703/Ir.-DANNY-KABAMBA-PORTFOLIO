import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigatePath?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePath }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Accueil', path: '/', anchor: '#accueil' },
    { label: 'Services électriques', path: '/services-electriques-kinshasa', anchor: '#services' },
    { label: 'Installation solaire', path: '/installation-solaire-kinshasa', anchor: '#services' },
    { label: 'Réalisations', path: '/realisations', anchor: '#realisations' },
    { label: 'Parcours', path: '/', anchor: '#experience' },
    { label: 'Contact', path: '/contact', anchor: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, anchor: string) => {
    e.preventDefault();
    if (onNavigatePath && path !== '/') {
      onNavigatePath(path);
      return;
    }
    const elem = document.querySelector(anchor);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigatePath) {
      onNavigatePath('/');
    }
  };

  return (
    <footer className="bg-[#1E242B] text-[#F8F9FA] pt-12 pb-10 border-t border-[#2B4C6F]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Col 1: Identity & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div>
              <span className="font-display font-semibold text-lg text-white block">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-xs text-[#E9ECEF]/80">
                {PERSONAL_INFO.title}
              </span>
            </div>

            <p className="text-xs text-[#E9ECEF]/75 leading-relaxed max-w-sm">
              Études techniques, TGBT, installations solaires, maintenance et électricité industrielle à Kinshasa, République Démocratique du Congo.
            </p>

            <p className="text-xs text-[#E9ECEF]/70 pt-1">
              {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-1.5 text-xs text-[#E9ECEF]/80">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path, link.anchor)}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct contact (4 cols) */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Coordonnées directes
            </h3>
            <ul className="space-y-2 text-xs text-[#E9ECEF]/80">
              <li>
                <a
                  href={`https://wa.me/${PERSONAL_INFO.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Téléphone et WhatsApp : {PERSONAL_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  E-mail : {PERSONAL_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook : {PERSONAL_INFO.facebookName}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar: Clean without em-dashes or arrows */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E9ECEF]/60">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Ingénieur Électricien &amp; Énergétique à Kinshasa.
          </p>
          <button
            onClick={scrollToTop}
            className="text-xs text-[#E9ECEF]/80 hover:text-white transition-colors cursor-pointer"
          >
            Haut de page
          </button>
        </div>

      </div>
    </footer>
  );
};
