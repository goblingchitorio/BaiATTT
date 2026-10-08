import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VolunteerRegistryPage from './pages/VolunteerRegistryPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'volunteer-registry'>('home');

  useEffect(() => {
    // Check URL hash or query for direct deep link
    const checkHash = () => {
      if (window.location.hash === '#/volunteers' || window.location.pathname === '/volunteers') {
        setCurrentPage('volunteer-registry');
      } else {
        setCurrentPage('home');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenReportModal = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById('map');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToRegistry = () => {
    setCurrentPage('volunteer-registry');
    window.location.hash = '#/volunteers';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950">
      <Navbar
        onOpenReportModal={handleOpenReportModal}
        onNavigateToRegistry={navigateToRegistry}
        onNavigateToHome={navigateToHome}
        currentPage={currentPage}
      />
      <main className="flex-1">
        {currentPage === 'volunteer-registry' ? (
          <VolunteerRegistryPage onBackToHome={navigateToHome} />
        ) : (
          <Home onNavigateToRegistry={navigateToRegistry} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
