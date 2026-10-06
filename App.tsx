import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

const App: React.FC = () => {
  const handleOpenReportModal = () => {
    const el = document.getElementById('map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-emerald-500 selection:text-zinc-950">
      <Navbar onOpenReportModal={handleOpenReportModal} />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
