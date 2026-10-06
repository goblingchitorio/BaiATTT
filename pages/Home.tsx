import React from 'react';
import HeroSection from '../components/HeroSection';
import TeamSection from '../components/TeamSection';
import EnvironmentalStatusSection from '../components/EnvironmentalStatusSection';
import DataDashboardSection from '../components/DataDashboardSection';
import CrowdsourcedMapSection from '../components/CrowdsourcedMapSection';

const Home: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen selection:bg-emerald-500 selection:text-zinc-950">
      {/* Hero Section */}
      <HeroSection
        onExploreMap={() => scrollTo('map')}
        onExploreSolutions={() => scrollTo('solutions')}
        onExploreStatus={() => scrollTo('status')}
      />

      {/* PHẦN 1: GIỚI THIỆU THÀNH VIÊN DỰ ÁN (TEAM MEMBERS) */}
      <TeamSection />

      {/* PHẦN 2: THỰC TRẠNG MÔI TRƯỜNG & GIẢI PHÁP KHẮC PHỤC */}
      <EnvironmentalStatusSection />

      {/* PHẦN 3: HỆ THỐNG BIỂU ĐỒ TRỰC QUAN HÓA DỮ LIỆU (DATA DASHBOARD) */}
      <DataDashboardSection />

      {/* PHẦN 4: BẢN ĐỒ TƯƠNG TÁC & CUNG CẤP ĐỊA ĐIỂM RÁC THẢI CỘNG ĐỒNG (CROWDSOURCED MAP) */}
      <CrowdsourcedMapSection />
    </div>
  );
};

export default Home;
