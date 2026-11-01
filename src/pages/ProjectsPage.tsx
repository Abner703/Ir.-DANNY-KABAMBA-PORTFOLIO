import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Projects } from '../components/Projects';
import { ProjectModal } from '../components/ProjectModal';
import { Project } from '../types';
import { MaskedHeading, Reveal } from '../motion';

interface ProjectsPageProps {
  onNavigateToContact: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigateToContact }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleContactForProject = () => {
    onNavigateToContact();
  };

  return (
    <div>
      <SEOHead
        title="Réalisations et chantiers électriques | Daniel Kabamba"
        description="Découvrez les 7 réalisations techniques de Daniel Kabamba à Kinshasa : TGBT d'immeubles, système de secours bancaire, installation solaire et maintenance."
        canonicalPath="/realisations"
      />

      <div className="py-8 bg-[#F8F9FA] border-b border-[#DDE2E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MaskedHeading
            as="h1"
            lines={['Chantiers et réalisations d\'ingénierie électrique à Kinshasa']}
            className="text-3xl sm:text-4xl font-display font-bold text-[#1E242B] tracking-tight"
          />
          <Reveal delay={120}>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2">
              Inventaire des ouvrages électriques, solaires et industriels menés à terme en République Démocratique du Congo.
            </p>
          </Reveal>
        </div>
      </div>

      <Projects onOpenProjectModal={setSelectedProject} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactForProject={handleContactForProject}
      />
    </div>
  );
};
