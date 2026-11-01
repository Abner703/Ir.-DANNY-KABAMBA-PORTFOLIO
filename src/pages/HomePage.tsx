import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Projects } from '../components/Projects';
import { ProjectModal } from '../components/ProjectModal';
import { Experience } from '../components/Experience';
import { Contact } from '../components/Contact';
import { Project, Service, DemandeurType } from '../types';
import { SectionDivider } from '../motion';

export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [prefilledDemandeur, setPrefilledDemandeur] = useState<DemandeurType>('particulier');
  const [prefilledBesoin, setPrefilledBesoin] = useState<string>('Installation solaire');
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTrack = (track: 'client' | 'pro') => {
    if (track === 'client') {
      setPrefilledDemandeur('particulier');
      setPrefilledBesoin('Installation solaire');
      setPrefilledMessage('');
    } else {
      setPrefilledDemandeur('architecte');
      setPrefilledBesoin('Étude / conception');
      setPrefilledMessage('');
    }
    scrollToContact();
  };

  const handleSelectService = (service: Service) => {
    setPrefilledBesoin(service.defaultBesoinValue);
    setPrefilledMessage(`Je souhaite vous solliciter pour la prestation : ${service.title}.`);
    scrollToContact();
  };

  const handleContactForProject = (project: Project) => {
    setPrefilledBesoin(
      project.category === 'solaire' ? 'Installation solaire' : 'Étude / conception'
    );
    setPrefilledMessage(`Je souhaite échanger au sujet d'un projet similaire à : « ${project.title} » (${project.location}).`);
    scrollToContact();
  };

  return (
    <div>
      <SEOHead
        title="Daniel Kabamba | Ingénieur électricien et solaire à Kinshasa"
        description="Daniel Kabamba, ingénieur électricien et énergétique à Kinshasa : conception TGBT, installations solaires, maintenance et électricité industrielle en RDC."
        canonicalPath="/"
      />

      <Hero onSelectTrack={handleSelectTrack} />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Services onSelectService={handleSelectService} />
      <SectionDivider />
      <Projects onOpenProjectModal={setSelectedProject} />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Contact
        prefilledDemandeur={prefilledDemandeur}
        prefilledBesoin={prefilledBesoin}
        prefilledMessage={prefilledMessage}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactForProject={handleContactForProject}
      />
    </div>
  );
};
