import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { DemandeurType, ContactFormData } from '../types';
import { MaskedHeading, Reveal, DURATION, EASING, usePrefersReducedMotion } from '../motion';

interface ContactProps {
  prefilledDemandeur?: DemandeurType;
  prefilledBesoin?: string;
  prefilledMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({
  prefilledDemandeur = 'particulier',
  prefilledBesoin = 'Installation solaire',
  prefilledMessage = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '',
    demandeurType: prefilledDemandeur,
    entrepriseNom: '',
    besoinType: prefilledBesoin,
    ville: '',
    message: prefilledMessage,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      demandeurType: prefilledDemandeur,
      besoinType: prefilledBesoin,
      message: prefilledMessage || prev.message,
    }));
  }, [prefilledDemandeur, prefilledBesoin, prefilledMessage]);

  const demandeurOptions: { value: DemandeurType; label: string }[] = [
    { value: 'particulier', label: 'Particulier' },
    { value: 'entreprise', label: 'Entreprise' },
    { value: 'architecte', label: 'Architecte / cabinet d\'architecture' },
    { value: 'ingenieur', label: 'Ingénieur / entreprise de construction' },
  ];

  const besoinOptions = [
    'Installation solaire',
    'Service électrique',
    'Étude / conception',
    'Maintenance',
    'Autre',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const constructWhatsAppMessage = (): string => {
    const nom = formData.nom.trim();
    const ville = formData.ville.trim();
    const entreprise = formData.entrepriseNom.trim();
    const besoin = formData.besoinType;
    const msg = formData.message.trim();

    let text = '';

    switch (formData.demandeurType) {
      case 'particulier':
        text = `Bonjour Daniel, je suis ${nom}, particulier à ${ville}. J'ai besoin de : ${besoin}.`;
        break;
      case 'entreprise':
        text = `Bonjour Daniel, je suis ${nom} de l'entreprise ${entreprise}, à ${ville}. Nous avons besoin de : ${besoin}.`;
        break;
      case 'architecte':
        text = `Bonjour Daniel, je suis ${nom}, du cabinet ${entreprise}. Je souhaite collaborer sur : ${besoin}.`;
        break;
      case 'ingenieur':
        text = `Bonjour Daniel, je suis ${nom} de ${entreprise}. Nous recherchons un partenaire technique pour : ${besoin}.`;
        break;
    }

    if (msg) {
      text += ` ${msg}`;
    }

    return text;
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Veuillez renseigner votre nom complet.';
    }

    if (formData.demandeurType !== 'particulier' && !formData.entrepriseNom.trim()) {
      newErrors.entrepriseNom = 'Veuillez renseigner le nom de l\'entreprise ou du cabinet.';
    }

    if (!formData.ville.trim()) {
      newErrors.ville = 'Veuillez indiquer votre ville ou commune à Kinshasa.';
    }

    if (!formData.besoinType) {
      newErrors.besoinType = 'Veuillez choisir un type de besoin.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Effet d'interrupteur mécanique (switch) : pression scale 0.98, changement de couleur vers vert foncé
    setIsSubmitting(true);

    setTimeout(() => {
      const messageToSend = constructWhatsAppMessage();
      const encodedMessage = encodeURIComponent(messageToSend);
      const whatsappUrl = `https://wa.me/${PERSONAL_INFO.phoneClean}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => setIsSubmitting(false), 800);
    }, 200);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phoneDisplay);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const currentPreviewMessage = constructWhatsAppMessage();

  return (
    <section id="contact" className="py-14 sm:py-16 bg-white border-b border-[#DDE2E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Masked H2 + intro */}
        <div className="max-w-3xl mb-10">
          <MaskedHeading
            as="h2"
            lines={['Contacter Daniel Kabamba à Kinshasa']}
            className="text-2xl sm:text-3xl font-display font-bold text-[#1E242B] tracking-tight mb-3"
          />
          <Reveal delay={100}>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Pour une étude solaire, un dimensionnement TGBT, une intervention ou un échange technique, remplissez ce formulaire pour transmettre directement votre message via WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F9FA] rounded-md border border-[#DDE2E5] p-6 sm:p-8">
            
            <div className="mb-6 pb-4 border-b border-[#DDE2E5]">
              <h3 className="text-base font-display font-semibold text-[#1E242B]">
                Formulaire de demande par WhatsApp
              </h3>
              <p className="text-xs text-[#4B5563] mt-1">
                Ligne directe : {PERSONAL_INFO.phoneDisplay}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type de demandeur */}
              <div>
                <label className="block text-xs font-semibold text-[#1E242B] mb-1.5">
                  Profil du demandeur :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {demandeurOptions.map((opt) => {
                    const isSelected = formData.demandeurType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, demandeurType: opt.value }));
                          if (errors.entrepriseNom && opt.value === 'particulier') {
                            setErrors(prev => {
                              const n = { ...prev };
                              delete n.entrepriseNom;
                              return n;
                            });
                          }
                        }}
                        className={`px-3 py-2 text-xs font-medium rounded border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#2B4C6F] text-[#2B4C6F] font-semibold'
                            : 'bg-white/80 border-[#DDE2E5] text-[#4B5563] hover:border-[#CBD5E1]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nom complet */}
              <div className="relative">
                <label htmlFor="nom" className="block text-xs font-semibold text-[#1E242B] mb-1">
                  Nom complet
                </label>
                <div className="relative">
                  <input
                    id="nom"
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onFocus={() => setFocusedField('nom')}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleInputChange}
                    placeholder="Ex. Joseph Malonda"
                    className={`w-full px-3.5 py-2 text-sm bg-white rounded border ${
                      errors.nom ? 'border-red-500' : 'border-[#DDE2E5]'
                    } focus:outline-none`}
                  />
                  {/* Trait de 2px Vert Sauge qui se dessine sous le champ au focus (200ms) */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B7A57] origin-left pointer-events-none"
                    style={{
                      transform: focusedField === 'nom' ? 'scaleX(1)' : 'scaleX(0)',
                      transition: reducedMotion ? 'none' : `transform ${DURATION.micro}ms ${EASING.out}`,
                    }}
                    aria-hidden="true"
                  />
                </div>
                {errors.nom && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.nom}
                  </p>
                )}
              </div>

              {/* Nom entreprise ou cabinet : Hauteur fluide 250ms quand != particulier */}
              <div
                style={{
                  maxHeight: formData.demandeurType !== 'particulier' ? '120px' : '0px',
                  opacity: formData.demandeurType !== 'particulier' ? 1 : 0,
                  overflow: 'hidden',
                  transition: `max-height ${DURATION.standard}ms ${EASING.out}, opacity ${DURATION.standard}ms ${EASING.out}`,
                }}
              >
                <div className="pt-1">
                  <label htmlFor="entrepriseNom" className="block text-xs font-semibold text-[#1E242B] mb-1">
                    Nom de l'entreprise ou du cabinet
                  </label>
                  <div className="relative">
                    <input
                      id="entrepriseNom"
                      type="text"
                      name="entrepriseNom"
                      value={formData.entrepriseNom}
                      onFocus={() => setFocusedField('entrepriseNom')}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleInputChange}
                      placeholder="Ex. Cabinet ArchiDesign / Entreprise BTP"
                      className={`w-full px-3.5 py-2 text-sm bg-white rounded border ${
                        errors.entrepriseNom ? 'border-red-500' : 'border-[#DDE2E5]'
                      } focus:outline-none`}
                    />
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B7A57] origin-left pointer-events-none"
                      style={{
                        transform: focusedField === 'entrepriseNom' ? 'scaleX(1)' : 'scaleX(0)',
                        transition: reducedMotion ? 'none' : `transform ${DURATION.micro}ms ${EASING.out}`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  {errors.entrepriseNom && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.entrepriseNom}
                    </p>
                  )}
                </div>
              </div>

              {/* Ville et Type de besoin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="ville" className="block text-xs font-semibold text-[#1E242B] mb-1">
                    Ville ou commune
                  </label>
                  <div className="relative">
                    <input
                      id="ville"
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onFocus={() => setFocusedField('ville')}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleInputChange}
                      placeholder="Ex. Gombe, Kitambo, Limete"
                      className={`w-full px-3.5 py-2 text-sm bg-white rounded border ${
                        errors.ville ? 'border-red-500' : 'border-[#DDE2E5]'
                      } focus:outline-none`}
                    />
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B7A57] origin-left pointer-events-none"
                      style={{
                        transform: focusedField === 'ville' ? 'scaleX(1)' : 'scaleX(0)',
                        transition: reducedMotion ? 'none' : `transform ${DURATION.micro}ms ${EASING.out}`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  {errors.ville && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.ville}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="besoinType" className="block text-xs font-semibold text-[#1E242B] mb-1">
                    Type de besoin
                  </label>
                  <select
                    id="besoinType"
                    name="besoinType"
                    value={formData.besoinType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm bg-white rounded border border-[#DDE2E5] focus:outline-none focus:border-[#2B4C6F]"
                  >
                    {besoinOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message libre (facultatif) */}
              <div className="relative">
                <label htmlFor="message" className="block text-xs font-semibold text-[#1E242B] mb-1">
                  Message complémentaire <span className="text-[#4B5563] font-normal">(facultatif)</span>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleInputChange}
                    placeholder="Détails du projet, surface, puissance ou contraintes particulières..."
                    className="w-full px-3.5 py-2 text-sm bg-white rounded border border-[#DDE2E5] focus:outline-none"
                  />
                  <span
                    className="absolute bottom-1 left-0 right-0 h-[2px] bg-[#3B7A57] origin-left pointer-events-none"
                    style={{
                      transform: focusedField === 'message' ? 'scaleX(1)' : 'scaleX(0)',
                      transition: reducedMotion ? 'none' : `transform ${DURATION.micro}ms ${EASING.out}`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="bg-white p-3 rounded border border-[#DDE2E5] space-y-1">
                <p className="text-[11px] font-semibold text-[#4B5563]">
                  Aperçu du message WhatsApp généré :
                </p>
                <p className="text-xs text-[#1E242B] leading-relaxed">
                  {currentPreviewMessage || 'Veuillez saisir votre nom et votre commune pour afficher le message.'}
                </p>
              </div>

              {/* Submit CTA Button: Mechanical switch effect */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded text-sm font-semibold text-white transition-all cursor-pointer text-center"
                  style={{
                    backgroundColor: isSubmitting ? '#1E3752' : '#3B7A57',
                    transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
                    transition: 'all 120ms ease-out',
                  }}
                >
                  {isSubmitting ? 'Redirection vers WhatsApp…' : 'Envoyer ma demande via WhatsApp'}
                </button>

                <p className="text-xs text-center text-[#4B5563]">
                  Vous allez être redirigé vers WhatsApp pour envoyer votre demande.
                </p>
              </div>

            </form>
          </div>

          {/* Direct channels column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#F8F9FA] rounded-md border border-[#DDE2E5] p-6 space-y-5">
              <h3 className="text-sm font-semibold text-[#1E242B]">
                Coordonnées professionnelles directes
              </h3>

              {/* Phone / WhatsApp */}
              <div className="pb-4 border-b border-[#E9ECEF] space-y-1">
                <span className="text-xs text-[#4B5563] block">Téléphone et WhatsApp</span>
                <a
                  href={`tel:${PERSONAL_INFO.phoneClean}`}
                  className="text-sm font-semibold text-[#1E242B] hover:text-[#2B4C6F] transition-colors block"
                >
                  {PERSONAL_INFO.phoneDisplay}
                </a>
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <button
                    type="button"
                    onClick={copyPhoneNumber}
                    className="text-[#2B4C6F] hover:underline cursor-pointer"
                  >
                    {copiedPhone ? 'Copié' : 'Copier le numéro'}
                  </button>
                  <span className="text-[#CBD5E1]">·</span>
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B7A57] font-medium hover:underline"
                  >
                    Lien direct WhatsApp
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="pb-4 border-b border-[#E9ECEF] space-y-1">
                <span className="text-xs text-[#4B5563] block">E-mail professionnel</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-semibold text-[#1E242B] hover:text-[#2B4C6F] transition-colors break-all block"
                >
                  {PERSONAL_INFO.email}
                </a>
                <p className="text-xs text-[#4B5563]">
                  Pour transmission de plans d'architecte, dossiers techniques ou devis.
                </p>
              </div>

              {/* Facebook */}
              <div className="space-y-1">
                <span className="text-xs text-[#4B5563] block">Réseau social</span>
                <a
                  href={PERSONAL_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#1E242B] hover:text-[#2B4C6F] transition-colors block"
                >
                  Facebook : {PERSONAL_INFO.facebookName}
                </a>
              </div>

            </div>

            {/* Factual commitments */}
            <div className="bg-white rounded-md border border-[#DDE2E5] p-5 space-y-2">
              <h4 className="text-xs font-semibold text-[#1E242B]">
                Méthode de prise en charge
              </h4>
              <ul className="text-xs text-[#4B5563] space-y-1.5 leading-relaxed">
                <li>• Analyse préalable des caractéristiques techniques du site.</li>
                <li>• Prise en compte des contraintes réelles du réseau électrique de Kinshasa.</li>
                <li>• Respect des normes d'installation et de protection des usagers.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
