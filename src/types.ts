export type DemandeurType = 
  | 'particulier'
  | 'entreprise'
  | 'architecte'
  | 'ingenieur';

export type ProjectCategory = 
  | 'all'
  | 'solaire'
  | 'batiment'
  | 'industriel'
  | 'reseaux';

export interface Project {
  id: string;
  number: string;
  title: string;
  category: 'solaire' | 'batiment' | 'industriel' | 'reseaux';
  categoryLabel: string;
  location: string;
  context: string;
  missions: string[];
  imagePlaceholderText: string;
  imageUrl?: string;
  imagePosition?: string;
  keyTechnicalAspect: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'design' | 'install' | 'maintenance' | 'solar' | 'industry' | 'energy';
  targetAudience: string;
  defaultBesoinValue: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  details: string[];
}

export interface ContactFormData {
  nom: string;
  demandeurType: DemandeurType;
  entrepriseNom: string;
  besoinType: string;
  ville: string;
  message: string;
}
