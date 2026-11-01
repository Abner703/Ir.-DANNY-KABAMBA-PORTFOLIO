import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SolarPage } from './pages/SolarPage';
import { ElectricalPage } from './pages/ElectricalPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { ReadingProgressBar } from './motion';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    // Add js class to html element to verify JS execution for SEO progressive enhancement
    document.documentElement.classList.add('js');

    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToContact = () => {
    if (currentPath !== '/') {
      navigateTo('/contact');
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigateTo('/contact');
      }
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/installation-solaire-kinshasa':
        return <SolarPage onNavigateToContact={handleNavigateToContact} />;
      case '/services-electriques-kinshasa':
        return <ElectricalPage onNavigateToContact={handleNavigateToContact} />;
      case '/realisations':
        return <ProjectsPage onNavigateToContact={handleNavigateToContact} />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E242B] font-sans flex flex-col selection:bg-[#3B7A57]/20 selection:text-[#1E242B]">
      {/* 2px copper reading progress bar tracking scroll */}
      <ReadingProgressBar />

      {/* Header with desktop sliding rail and mobile burger to X transition */}
      <Header
        onNavigateToContact={handleNavigateToContact}
        activePath={currentPath}
        onNavigatePath={navigateTo}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer without decorative monograms or arrows */}
      <Footer onNavigatePath={navigateTo} />
    </div>
  );
};
