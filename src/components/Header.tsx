import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePrefersReducedMotion, DURATION, EASING } from '../motion';

interface HeaderProps {
  onNavigateToContact: () => void;
  activePath?: string;
  onNavigatePath?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToContact,
  activePath = '/',
  onNavigatePath,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const navLinks = [
    { label: 'Accueil', path: '/', anchor: '#accueil' },
    { label: 'Services', path: '/services-electriques-kinshasa', anchor: '#services' },
    { label: 'Solaire', path: '/installation-solaire-kinshasa', anchor: '#services' },
    { label: 'Réalisations', path: '/realisations', anchor: '#realisations' },
    { label: 'Expérience', path: '/', anchor: '#experience' },
    { label: 'Contact', path: '/contact', anchor: '#contact' },
  ];

  // Scroll detection for navbar background switch (> 24px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      // Simple active section detection when on homepage
      if (activePath === '/') {
        const sections = ['#accueil', '#services', '#realisations', '#experience', '#contact'];
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.querySelector(sections[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120) {
              const matchedIndex = navLinks.findIndex(l => l.anchor === sections[i]);
              if (matchedIndex !== -1) {
                setActiveNavIndex(matchedIndex);
                break;
              }
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePath]);

  // Update sliding indicator position for desktop rail
  useEffect(() => {
    if (!navRef.current) return;
    const links = navRef.current.querySelectorAll<HTMLAnchorElement>('a');
    const targetLink = links[activeNavIndex];
    if (targetLink) {
      setIndicatorStyle({
        left: targetLink.offsetLeft,
        width: targetLink.offsetWidth,
      });
    }
  }, [activeNavIndex, activePath]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, anchor: string, index: number) => {
    e.preventDefault();
    setActiveNavIndex(index);
    setMobileMenuOpen(false);

    if (onNavigatePath && path !== '/') {
      onNavigatePath(path);
      return;
    }

    if (onNavigatePath && activePath !== '/') {
      onNavigatePath('/');
      setTimeout(() => {
        const target = document.querySelector(anchor);
        if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }, 100);
      return;
    }

    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    } else if (onNavigatePath) {
      onNavigatePath('/');
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveNavIndex(0);
    if (onNavigatePath && activePath !== '/') {
      onNavigatePath('/');
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#F8F9FA] border-b border-[#DDE2E5]'
          : 'bg-[#F8F9FA]/90 md:bg-transparent border-b border-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E242B] focus:text-white focus:rounded focus:outline-none"
      >
        Aller au contenu principal
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP NAVBAR (>= 768px): 3-zone contract with rail sliding indicator */}
        <div className="hidden md:flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Pure text wordmark */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex flex-col text-left group"
          >
            <span className="font-display font-semibold text-lg text-[#1E242B] tracking-tight group-hover:text-[#2B4C6F] transition-colors leading-none">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs text-[#4B5563] font-normal tracking-normal mt-1">
              Ingénieur Électricien &amp; Énergétique
            </span>
          </a>

          {/* Zone 2: Navigation text links with sliding rail indicator */}
          <nav
            ref={navRef}
            className="relative flex items-center gap-7 text-sm font-medium text-[#1E242B]/85 py-2"
            aria-label="Navigation principale"
          >
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.anchor, idx)}
                className={`whitespace-nowrap transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C6F] ${
                  activeNavIndex === idx ? 'text-[#1E242B] font-semibold' : 'hover:text-[#2B4C6F]'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Trait de 2px couleur Cuivre qui glisse comme un curseur sur un rail (250ms) */}
            <span
              className="absolute bottom-0 h-[2px] bg-[#C87D55] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                transition: reducedMotion ? 'none' : `left ${DURATION.standard}ms ${EASING.out}, width ${DURATION.standard}ms ${EASING.out}`,
                opacity: indicatorStyle.width > 0 ? 1 : 0,
              }}
              aria-hidden="true"
            />
          </nav>

          {/* Zone 3: 1 Primary CTA Button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                if (onNavigatePath && activePath !== '/contact') {
                  onNavigatePath('/contact');
                } else {
                  onNavigateToContact();
                }
              }}
              className="px-4 py-2.5 rounded-md text-xs font-semibold text-white bg-[#3B7A57] hover:bg-[#2F6246] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B7A57] cursor-pointer"
            >
              Me contacter
            </button>
          </div>
        </div>

        {/* MOBILE NAVBAR (< 768px): Burger button transforming into X */}
        <div className="flex md:hidden items-center justify-end h-14">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
            className="w-11 h-11 flex flex-col items-center justify-center rounded text-[#1E242B] hover:bg-[#E9ECEF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C6F]"
          >
            {/* 2-bar animated burger to X */}
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className="w-full h-0.5 bg-[#1E242B] rounded-xs origin-center"
                style={{
                  transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                  transition: `transform 250ms ${EASING.out}`,
                }}
              />
              <span
                className="w-full h-0.5 bg-[#1E242B] rounded-xs origin-center"
                style={{
                  transform: mobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                  transition: `transform 250ms ${EASING.out}`,
                }}
              />
            </div>
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER: Opens with fade & slide (250ms), links staggered by 40ms */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        className={`fixed inset-0 z-50 md:hidden bg-[#F8F9FA] flex flex-col justify-between p-6 overflow-y-auto ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          transform: mobileMenuOpen ? 'translateY(0%)' : 'translateY(-6px)',
          transition: `opacity ${mobileMenuOpen ? 250 : 180}ms ${EASING.out}, transform ${mobileMenuOpen ? 250 : 180}ms ${EASING.out}`,
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
        }}
      >
        {/* Top bar inside mobile menu */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE2E5]">
          <div className="text-left">
            <span className="font-display font-semibold text-base text-[#1E242B] block">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs text-[#4B5563]">
              Kinshasa, RDC
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer le menu"
            className="w-11 h-11 flex items-center justify-center rounded text-[#1E242B] hover:bg-[#E9ECEF]"
          >
            <div className="w-5 h-5 relative flex items-center justify-center">
              <span className="w-5 h-0.5 bg-[#1E242B] absolute rotate-45" />
              <span className="w-5 h-0.5 bg-[#1E242B] absolute -rotate-45" />
            </div>
          </button>
        </div>

        {/* Links list with 40ms stagger */}
        <nav className="flex flex-col py-8 space-y-4" aria-label="Liens mobiles">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.path}
              onClick={(e) => handleLinkClick(e, link.path, link.anchor, idx)}
              className="text-xl font-display font-medium text-[#1E242B] hover:text-[#2B4C6F] transition-colors py-2 border-b border-[#E9ECEF]"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-12px)',
                transition: `opacity 250ms ${EASING.out} ${mobileMenuOpen ? idx * 40 : 0}ms, transform 250ms ${EASING.out} ${mobileMenuOpen ? idx * 40 : 0}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom CTA in mobile drawer */}
        <div className="pt-4 border-t border-[#DDE2E5] space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigatePath && activePath !== '/contact') {
                onNavigatePath('/contact');
              } else {
                onNavigateToContact();
              }
            }}
            className="w-full py-3 px-4 rounded text-sm font-semibold text-white bg-[#3B7A57] hover:bg-[#2F6246] transition-colors text-center cursor-pointer"
          >
            Me contacter
          </button>
          <p className="text-xs text-[#4B5563] text-center">
            +243 858 661 574 · Kinshasa, RDC
          </p>
        </div>
      </div>
    </header>
  );
};
