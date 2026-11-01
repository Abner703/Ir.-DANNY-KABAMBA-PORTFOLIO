import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonicalPath }) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update canonical link
    const baseUrl = import.meta.env.VITE_SITE_URL || 'https://daniel-kabamba.vercel.app';
    const fullCanonical = `${baseUrl.replace(/\/$/, '')}${canonicalPath}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonical);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', fullCanonical);

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, canonicalPath]);

  return null;
};
