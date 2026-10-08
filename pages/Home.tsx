import React from 'react';
import HeroSection from '../components/HeroSection';
import TeamSection from '../components/TeamSection';
import HcmDailyPlasticAlertSection from '../components/HcmDailyPlasticAlertSection';
import EnvironmentalStatusSection from '../components/EnvironmentalStatusSection';
import DataDashboardSection from '../components/DataDashboardSection';
import CrowdsourcedMapSection from '../components/CrowdsourcedMapSection';
import FanpageSection from '../components/FanpageSection';

interface HomeProps {
  onNavigateToRegistry?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToRegistry }) => {
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

      {/* BẢN TIN THỜI SỰ & CẢNH BÁO RÁC THẢI NHỰA TP.HCM (CẬP NHẬT HẰNG NGÀY) */}
      <HcmDailyPlasticAlertSection />

      {/* PHẦN 2: THỰC TRẠNG MÔI TRƯỜNG & GIẢI PHÁP KHẮC PHỤC */}
      <EnvironmentalStatusSection />

      {/* PHẦN 3: HỆ THỐNG BIỂU ĐỒ TRỰC QUAN HÓA DỮ LIỆU TỪ GOOGLE FORM (DATA DASHBOARD) */}
      <DataDashboardSection />

      {/* PHẦN 4: BẢN ĐỒ TƯƠNG TÁC, DUYỆT ĐIỂM RÁC CHỜ XÁC NHẬN & ĐANG XỬ LÝ (CROWDSOURCED MAP) */}
      <CrowdsourcedMapSection onNavigateToRegistry={onNavigateToRegistry} />

      {/* PHẦN 5: KÊNH TRUYỀN THÔNG FANPAGE FACEBOOK CHÍNH THỨC */}
      <FanpageSection />
    </div>
  );
};

export default Home;
