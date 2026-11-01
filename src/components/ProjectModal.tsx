import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Upload, HardHat } from 'lucide-react';
import { Project } from '../types';
import { DURATION, EASING, usePrefersReducedMotion } from '../motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onContactForProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactForProject,
}) => {
  const [modalPhotoUrl, setModalPhotoUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setModalPhotoUrl(project?.imageUrl || null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Focus modal on open
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModalPhotoUrl(url);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1E242B]/40"
      style={{
        animation: `fadeIn ${DURATION.standard}ms ${EASING.out} forwards`,
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-md border border-[#DDE2E5] shadow-md max-w-2xl w-full max-h-[90vh] overflow-y-auto focus:outline-none"
        style={{
          animation: reducedMotion ? 'none' : `slideUp16 ${DURATION.standard}ms ${EASING.out} forwards`,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp16 {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>

        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDE2E5] bg-[#F8F9FA] sticky top-0 z-10">
          <span className="text-xs font-medium text-[#4B5563]">
            Fiche technique : {project.categoryLabel}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#4B5563] hover:text-[#1E242B] hover:bg-[#E9ECEF] transition-colors"
            aria-label="Fermer la modale"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5">
          {/* Title & Location */}
          <div className="space-y-1.5">
            <h2 id="modal-project-title" className="text-xl sm:text-2xl font-display font-bold text-[#1E242B] tracking-tight">
              {project.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#2B4C6F]">
              <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Photo Slot: Mobile-first 4:3 on mobile, 16:10 on sm/desktop, covering the space */}
          <div className="rounded border border-[#DDE2E5] bg-[#F8F9FA] overflow-hidden">
            {modalPhotoUrl ? (
              <div className="relative group aspect-[4/3] sm:aspect-[16/10] w-full max-h-[420px] overflow-hidden">
                <img
                  src={modalPhotoUrl}
                  alt={project.title}
                  className="w-full h-full object-cover rounded"
                  style={{
                    objectPosition: project.imagePosition || 'center',
                  }}
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <label className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#1E242B] bg-white/90 backdrop-blur-xs rounded border border-[#DDE2E5] hover:bg-white cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-[#2B4C6F]" />
                    <span>Remplacer</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center space-y-2 border border-dashed border-[#DDE2E5]">
                <div className="py-2 space-y-2 max-w-sm mx-auto">
                  <HardHat className="w-8 h-8 text-[#2B4C6F] mx-auto stroke-[1.5]" />
                  <p className="text-xs font-semibold text-[#2B4C6F]">
                    {project.imagePlaceholderText}
                  </p>
                  <p className="text-xs text-[#4B5563]">
                    Emplacement réservé à la photographie du chantier ou de l'installation.
                  </p>
                  <div className="pt-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2B4C6F] bg-white rounded border border-[#DDE2E5] hover:bg-[#F8F9FA] cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Prévisualiser une photo locale</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contexte de l'ouvrage */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-[#1E242B]">
              Contexte de l'ouvrage
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed bg-[#F8F9FA] p-3 rounded border border-[#E9ECEF]">
              {project.context}
            </p>
          </div>

          {/* Missions réalisées */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-[#1E242B]">
              Missions techniques exécutées
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#1E242B]">
              {project.missions.map((mission) => (
                <li key={mission} className="flex items-start gap-2">
                  <span className="text-[#3B7A57] font-bold select-none">•</span>
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aspect technique */}
          <div className="flex items-center justify-between text-xs pt-3 border-t border-[#E9ECEF] text-[#4B5563]">
            <span>Caractéristique dominante :</span>
            <span className="font-semibold text-[#2B4C6F]">
              {project.keyTechnicalAspect}
            </span>
          </div>
        </div>

        {/* Footer Actions: NO arrows */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#DDE2E5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#4B5563] hover:text-[#1E242B]"
          >
            Fermer
          </button>
          <button
            onClick={() => {
              onClose();
              onContactForProject(project);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded text-xs font-semibold text-white bg-[#3B7A57] hover:bg-[#2F6246] transition-colors cursor-pointer"
          >
            Échanger sur un projet similaire
          </button>
        </div>
      </div>
    </div>
  );
};
