import React, { useEffect, useRef, useState } from 'react';

// Animation tokens centralisés selon les spécifications
export const DURATION = {
  micro: 180,     // 150-200ms (survols, focus, toggles)
  standard: 250,  // 250-400ms (modales, volets, liens)
  reveal: 600,    // 500-700ms (entrées de section, masques)
  circuit: 1600,  // 1.0-1.6s (dessin du schéma unifilaire)
  pulse: 7000,    // 6-8s (impulsion unique en boucle sur le circuit)
} as const;

export const EASING = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',     // Sortie douce mécanique
  in: 'cubic-bezier(0.4, 0, 1, 1)',          // Sortie rapide
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',   // Courbe de transition standard
  linear: 'linear',                          // Courant continu
} as const;

// Hook utilitaire pour vérifier si l'utilisateur préfère réduire les mouvements
export const usePrefersReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return reduced;
};

// Composant de révélation par IntersectionObserver (déclenchement une seule fois)
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'none' | 'left' | 'right';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  let transformInitial = 'translateY(16px)';
  if (direction === 'none') transformInitial = 'none';
  if (direction === 'left') transformInitial = 'translateX(-16px)';
  if (direction === 'right') transformInitial = 'translateX(16px)';

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transformInitial,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${DURATION.reveal}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: EASING.out,
      }}
    >
      {children}
    </div>
  );
};

// Composant pour titre masqué (glissement vertical derrière un masque)
interface MaskedHeadingProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (headingRef.current) {
            observer.unobserve(headingRef.current);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <Tag className={className}>
        {lines.join(' ')}
      </Tag>
    );
  }

  return (
    <Tag ref={headingRef} className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-0.5">
          <span
            className="block"
            style={{
              transform: isVisible ? 'translateY(0%)' : 'translateY(105%)',
              transition: `transform ${DURATION.reveal}ms ${EASING.out}`,
              transitionDelay: `${delay + idx * 80}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
};

// Séparateur horizontal stylisé : filet conducteur qui se met sous tension (scaleX 0 à 1)
export const SectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isDrawn, setIsDrawn] = useState(false);
  const dividerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          if (dividerRef.current) {
            observer.unobserve(dividerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={`w-full h-px bg-[#1E242B]/15 relative ${className}`} aria-hidden="true">
        <div className="absolute left-0 top-0 w-8 h-px bg-[#C87D55]" />
      </div>
    );
  }

  return (
    <div
      ref={dividerRef}
      className={`w-full h-px relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-px bg-[#1E242B]/15 origin-left"
        style={{
          transform: isDrawn ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 700ms ${EASING.out}`,
        }}
      />
      {/* Tronçon cuivre conducteur à l'extrémité gauche */}
      <div
        className="absolute left-0 top-0 w-8 h-px bg-[#C87D55] origin-left"
        style={{
          transform: isDrawn ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 500ms ${EASING.out} 150ms`,
        }}
      />
    </div>
  );
};

// Barre de progression de lecture (trait cuivre 2px en haut d'écran)
export const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setProgress(Math.min(1, Math.max(0, totalScroll / windowHeight)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none origin-left"
      style={{
        backgroundColor: '#C87D55',
        transform: `scaleX(${progress})`,
        transition: 'transform 80ms linear',
      }}
      aria-hidden="true"
    />
  );
};
