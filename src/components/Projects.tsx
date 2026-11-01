import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { MaskedHeading, Reveal, usePrefersReducedMotion, DURATION, EASING } from '../motion';

interface ProjectsProps {
  onOpenProjectModal: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProjectModal }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'solaire', label: 'Solaire' },
    { id: 'batiment', label: 'Bâtiment et TGBT' },
    { id: 'industriel', label: 'Industriel et secours' },
    { id: 'reseaux', label: 'Réseaux' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="realisations" className="py-14 sm:py-16 bg-white border-b border-[#DDE2E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Masked H2 + intro */}
        <div className="max-w-3xl mb-8">
          <MaskedHeading
            as="h2"
            lines={['Réalisations et chantiers électriques à Kinshasa']}
            className="text-2xl sm:text-3xl font-display font-bold text-[#1E242B] tracking-tight mb-3"
          />
          <Reveal delay={100}>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Exemples d'études, conceptions et installations menées à Kinshasa : TGBT d'immeubles, alimentations de secours, systèmes photovoltaïques et commandes industrielles.
            </p>
          </Reveal>
        </div>

        {/* Filter Buttons: Clean functional controls without pill badge style */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#E9ECEF] rounded-md max-w-fit mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#2B4C6F] shadow-xs font-semibold'
                    : 'text-[#4B5563] hover:text-[#1E242B]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: Staggered reveal, clip-path mask on image, copper line under title on hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => onOpenProjectModal(project)}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                tabIndex={0}
                onFocus={() => setHoveredProjectId(project.id)}
                onBlur={() => setHoveredProjectId(null)}
                className="bg-[#F8F9FA] rounded-md border border-[#DDE2E5] overflow-hidden hover:border-[#2B4C6F] transition-all flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B4C6F]"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: `opacity 250ms ${EASING.out} ${idx * 40}ms, transform 250ms ${EASING.out} ${idx * 40}ms`,
                }}
              >
                <div>
                  {/* Visual Container: Mobile-first 4:3 on mobile, 16:10 on sm/desktop, covering 100% of space */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-[#E9ECEF] border-b border-[#DDE2E5] overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                          objectPosition: project.imagePosition || 'center',
                          transform: isHovered && !reducedMotion ? 'scale(1.03)' : 'none',
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center p-4 text-center transition-transform"
                        style={{
                          transform: isHovered && !reducedMotion ? 'translateY(-3px)' : 'none',
                          transition: `transform ${DURATION.micro}ms ${EASING.out}`,
                          clipPath: reducedMotion ? 'none' : 'inset(0 0 0 0)',
                        }}
                      >
                        <span className="text-xs font-medium text-[#2B4C6F]">
                          {project.imagePlaceholderText}
                        </span>
                        <span className="text-[11px] text-[#4B5563] mt-1">
                          Cliquer pour afficher la fiche
                        </span>
                      </div>
                    )}

                    {/* Category Label */}
                    <div className="absolute top-2.5 right-2.5 text-[11px] font-medium px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[#1E242B] border border-[#DDE2E5]">
                      {project.categoryLabel}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#2B4C6F]">
                      <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
                      <span>{project.location}</span>
                    </div>

                    {/* Title with 2px copper underline appearing on hover (200ms) */}
                    <div className="relative inline-block w-full">
                      <h3 className="text-base font-display font-semibold text-[#1E242B] leading-snug">
                        {project.title}
                      </h3>
                      <span
                        className="block h-[2px] bg-[#C87D55] origin-left mt-1"
                        style={{
                          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                          transition: reducedMotion ? 'none' : `transform ${DURATION.micro}ms ${EASING.out}`,
                        }}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                      {project.context}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action: Pure text without arrows */}
                <div className="px-5 py-3 border-t border-[#E9ECEF] bg-white flex items-center justify-between text-xs font-semibold text-[#2B4C6F]">
                  <span>Consulter la fiche technique</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
