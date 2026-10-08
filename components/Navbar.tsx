import React, { useState, useEffect } from 'react';
import { Leaf, Users, AlertTriangle, Lightbulb, BarChart3, MapPin, Menu, X, PlusCircle, Newspaper, UserCheck } from 'lucide-react';
import { Facebook } from './FacebookIcon';

interface NavbarProps {
  onOpenReportModal?: () => void;
  onNavigateToRegistry?: () => void;
  onNavigateToHome?: () => void;
  currentPage?: 'home' | 'volunteer-registry';
}

const Navbar: React.FC<NavbarProps> = ({
  onOpenReportModal,
  onNavigateToRegistry,
  onNavigateToHome,
  currentPage = 'home'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'team', 'hcm-daily-news', 'status', 'solutions', 'dashboard', 'map', 'fanpage'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage === 'volunteer-registry' && onNavigateToHome) {
      onNavigateToHome();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'team', label: 'Thành viên', icon: Users },
    { id: 'hcm-daily-news', label: 'Bản tin TP.HCM', icon: Newspaper },
    { id: 'status', label: 'Thực trạng', icon: AlertTriangle },
    { id: 'solutions', label: 'Giải pháp 3R', icon: Lightbulb },
    { id: 'dashboard', label: 'Biểu đồ khảo sát', icon: BarChart3 },
    { id: 'map', label: 'Bản đồ rác thải', icon: MapPin },
    { id: 'fanpage', label: 'Fanpage', icon: Facebook },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-emerald-900/40 shadow-lg shadow-black/40 py-3'
          : 'bg-gradient-to-b from-zinc-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-white text-lg">GENGREEN</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ECO-ACTION
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 tracking-wide uppercase">Giảm thiểu rác thải nhựa</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-2.5">
            {currentPage === 'volunteer-registry' ? (
              <button
                onClick={onNavigateToHome}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 transition-all"
              >
                <span>← Về Trang Chủ</span>
              </button>
            ) : (
              <button
                onClick={onNavigateToRegistry}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Xem trang web tổng hợp những người đã đăng ký dọn rác"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>DS Đăng Ký Dọn Rác</span>
              </button>
            )}

            <button
              onClick={() => {
                if (currentPage === 'volunteer-registry' && onNavigateToHome) {
                  onNavigateToHome();
                  setTimeout(() => {
                    const el = document.getElementById('map');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                  return;
                }
                if (onOpenReportModal) {
                  onOpenReportModal();
                } else {
                  scrollToSection('map');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Báo cáo điểm rác</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 border border-zinc-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 mt-3 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            {currentPage === 'volunteer-registry' ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToHome) onNavigateToHome();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-zinc-800 text-white"
              >
                <span>← Về Trang Chủ</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToRegistry) onNavigateToRegistry();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Trang Tổng Hợp Đăng Ký Dọn Rác</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage === 'volunteer-registry' && onNavigateToHome) {
                  onNavigateToHome();
                  setTimeout(() => {
                    const el = document.getElementById('map');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                  return;
                }
                if (onOpenReportModal) {
                  onOpenReportModal();
                } else {
                  scrollToSection('map');
                }
              }}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Báo cáo điểm rác ô nhiễm</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
