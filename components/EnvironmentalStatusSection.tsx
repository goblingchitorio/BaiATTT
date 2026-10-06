import React, { useState } from 'react';
import {
  BEFORE_AFTER_CASES,
  GALLERY_ITEMS,
  SOLUTIONS_BY_LEVEL,
  AUTHORITATIVE_SOURCES
} from '../data/environmentalData';
import { SolutionLevel, GalleryItem } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';
import LightboxModal from './LightboxModal';
import {
  AlertTriangle,
  Globe2,
  TrendingDown,
  Fish,
  Layers,
  ShieldCheck,
  UserCheck,
  Building,
  Landmark,
  Maximize2,
  CheckCircle,
  ExternalLink,
  Info,
  Sparkles,
  Droplet
} from 'lucide-react';

const EnvironmentalStatusSection: React.FC = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState<SolutionLevel>('individual');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryCategory, setGalleryCategory] = useState<string>('Tất cả');

  const categories = ['Tất cả', 'Đại dương', 'Đô thị', 'Kênh rạch', 'Sinh thái'];

  const filteredGallery =
    galleryCategory === 'Tất cả'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryCategory);

  const solutionTabs = [
    {
      id: 'individual' as SolutionLevel,
      label: 'Cấp độ Cá nhân (3R)',
      sub: 'Reduce · Reuse · Recycle',
      icon: UserCheck,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-600',
    },
    {
      id: 'business' as SolutionLevel,
      label: 'Cấp độ Doanh nghiệp',
      sub: 'Kinh tế tuần hoàn & Bao bì sinh học',
      icon: Building,
      color: 'text-teal-400',
      activeBg: 'bg-teal-600',
    },
    {
      id: 'government' as SolutionLevel,
      label: 'Cấp độ Chính quyền & Dân cư',
      sub: 'Chính sách thuế & Phân loại tại nguồn',
      icon: Landmark,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-600',
    },
  ];

  return (
    <section id="status" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================== */}
        {/* PHẦN 2.1: THỰC TRẠNG Ô NHIỄM RÁC THẢI NHỰA */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>PHẦN 2 · THỰC TRẠNG &amp; GIẢI PHÁP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Thực trạng Ô nhiễm Rác thải Nhựa &amp; Nguy cơ Sinh thái
          </h2>
          <p className="text-zinc-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            Nhựa là một trong những phát minh vĩ đại của thế kỷ 20, nhưng tính bền vững và thời gian phân hủy kéo dài hàng thế kỷ đang biến chúng thành thảm họa sinh thái đe dọa trực tiếp sự sống trên Trái Đất.
          </p>
        </div>

        {/* Interactive Storytelling Layout: Longform + Callout Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Main Longform Narrative */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-emerald-400" />
                <span>Cuộc khủng hoảng rác thải nhựa toàn cầu</span>
              </h3>
              <p className="mb-4">
                Theo báo cáo mới nhất của{' '}
                <a
                  href={AUTHORITATIVE_SOURCES.globalWaste.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-400 underline decoration-emerald-500/50 hover:decoration-emerald-400 inline-flex items-center gap-0.5"
                >
                  Chương trình Môi trường Liên Hợp Quốc (UNEP)
                  <ExternalLink className="w-3 h-3 inline" />
                </a>, mỗi năm nhân loại sản xuất hơn <span className="text-white font-semibold underline decoration-emerald-500 decoration-2">400 triệu tấn nhựa</span>. Một nửa trong số đó chỉ được thiết kế để sử dụng một lần duy nhất — từ bao bì nilon, cốc trà sữa cho đến vỏ chai nước giải khát.
              </p>
              <p>
                Đáng báo động hơn, ước tính có từ{' '}
                <a
                  href={AUTHORITATIVE_SOURCES.oceanLeak.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cyan-400 underline decoration-cyan-500/50 hover:decoration-cyan-400 inline-flex items-center gap-0.5"
                >
                  8 đến 12 triệu tấn rác thải nhựa
                  <ExternalLink className="w-3 h-3 inline" />
                </a>{' '}
                trôi dạt ra đại dương mỗi năm. Khối lượng này tương đương với việc cứ mỗi một phút, một chiếc xe tải chở đầy rác nhựa lại đổ thẳng xuống biển, tạo nên những "đảo rác" khổng lồ trên Thái Bình Dương.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-amber-400" />
                <span>Gánh nặng phát thải tại Việt Nam</span>
              </h3>
              <p className="mb-4">
                Tại Việt Nam, theo số liệu từ{' '}
                <a
                  href={AUTHORITATIVE_SOURCES.vietnamRecycle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-400 underline decoration-amber-500/50 hover:decoration-amber-400 inline-flex items-center gap-0.5"
                >
                  Bộ Tài nguyên &amp; Môi trường (MONRE)
                  <ExternalLink className="w-3 h-3 inline" />
                </a>{' '}
                và{' '}
                <a
                  href={AUTHORITATIVE_SOURCES.vietnamWaste.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-400 underline decoration-emerald-500/50 hover:decoration-emerald-400 inline-flex items-center gap-0.5"
                >
                  Báo cáo Ngân hàng Thế giới (World Bank)
                  <ExternalLink className="w-3 h-3 inline" />
                </a>, lượng rác thải nhựa phát sinh hàng năm ước tính khoảng <strong className="text-amber-300">1,8 triệu tấn</strong>, chiếm khoảng 8% - 12% tổng lượng chất thải rắn sinh hoạt.
              </p>
              <p>
                Tuy nhiên, năng lực xử lý trong nước còn rất khiêm tốn: <span className="text-rose-400 font-semibold">chỉ có khoảng 27%</span> lượng rác thải nhựa được thu gom và tái chế (chủ yếu qua mạng lưới ve chai phi chính thức). Hơn 70% còn lại bị chôn lấp lẫn vào đất cát hoặc rò rỉ ra các dòng sông lớn như sông Hồng, sông Mekong và trôi ra bờ biển dài hơn 3.260 km của nước ta.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Fish className="w-5 h-5 text-cyan-400" />
                <span>Hiểm họa vô hình: Vi nhựa (Microplastics)</span>
              </h3>
              <p className="mb-4">
                Dưới tác động của tia cực tím mặt trời và ma sát sóng biển, rác nhựa không hề biến mất mà bị phân rã thành vô số <strong>hạt vi nhựa (kích thước &lt; 5mm)</strong> và nano nhựa siêu nhỏ.
              </p>
              <p>
                Các hạt vi nhựa này hấp thụ các chất độc hại trong nước biển, bị sinh vật phù du và cá ăn nhầm, từ đó đi ngược vào <strong>chuỗi thức ăn của con người</strong>. Nghiên cứu của{' '}
                <a
                  href={AUTHORITATIVE_SOURCES.microplastics.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cyan-400 underline decoration-cyan-500/50 hover:decoration-cyan-400 inline-flex items-center gap-0.5"
                >
                  WWF &amp; Đại học Newcastle
                  <ExternalLink className="w-3 h-3 inline" />
                </a>{' '}
                đã tìm thấy vi nhựa trong nước máy đóng chai, muối ăn, hải sản, và thậm chí trong máu, mô phổi cũng như nhau thai người.
              </p>
            </div>
          </div>

          {/* Interactive Highlight Callout Boxes (Sidebar with Clickable Links) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Callout 1: Global */}
            <a
              href={AUTHORITATIVE_SOURCES.globalWaste.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-lg block relative overflow-hidden group"
              title="Xem báo cáo tương tác UNEP Beat Plastic Pollution"
            >
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Dẫn chứng số liệu 01 · Toàn cầu</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                &gt; 400 Triệu Tấn
              </div>
              <div className="text-xs text-emerald-300 font-medium mb-3">
                Sản lượng nhựa sản xuất toàn cầu mỗi năm
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Khoảng <strong>8 - 12 triệu tấn rác nhựa</strong> bị xả ra biển mỗi năm. Nếu không hành động, đến năm 2050, khối lượng rác nhựa trong đại dương sẽ nhiều hơn tổng khối lượng của tất cả loài cá.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-900/50 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Nguồn báo cáo gốc</span>
                <span className="text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                  UNEP &amp; Ellen MacArthur ↗
                </span>
              </div>
            </a>

            {/* Callout 2: Vietnam */}
            <a
              href={AUTHORITATIVE_SOURCES.vietnamWaste.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-lg block relative overflow-hidden group"
              title="Xem nghiên cứu World Bank về kinh tế tuần hoàn nhựa tại VN"
            >
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Dẫn chứng số liệu 02 · Việt Nam</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1 group-hover:text-amber-300 transition-colors">
                1,8 Triệu Tấn / Năm
              </div>
              <div className="text-xs text-amber-300 font-medium mb-3">
                Chỉ 27% được tái chế thành công
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Việt Nam đứng trong top 5 quốc gia phát sinh rác thải nhựa đại dương nhiều nhất. Trung bình mỗi người Việt tiêu thụ khoảng <strong>41.3 kg nhựa/năm</strong>, tăng gấp 10 lần so với 30 năm trước.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-900/50 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Nguồn báo cáo gốc</span>
                <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                  Bộ TN&amp;MT &amp; World Bank ↗
                </span>
              </div>
            </a>

            {/* Callout 3: Microplastics */}
            <a
              href={AUTHORITATIVE_SOURCES.microplastics.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-900 border border-cyan-500/30 hover:border-cyan-500/60 transition-all shadow-lg block relative overflow-hidden group"
              title="Xem báo cáo của WWF và Đại học Newcastle về lượng vi nhựa nuốt phải"
            >
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>Dẫn chứng số liệu 03 · Vi nhựa</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                5 Gram / Tuần
              </div>
              <div className="text-xs text-cyan-300 font-medium mb-3">
                Lượng vi nhựa mỗi người có thể nuốt phải
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Nghiên cứu của Đại học Newcastle (Úc) chỉ ra rằng trung bình mỗi người hấp thụ khoảng <strong>5 gram vi nhựa mỗi tuần</strong> qua không khí, muối ăn và nước uống — tương đương với trọng lượng một chiếc thẻ tín dụng!
              </p>
              <div className="mt-4 pt-3 border-t border-cyan-900/50 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Nguồn báo cáo gốc</span>
                <span className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                  WWF Diet Plastic Report ↗
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BỘ SƯU TẬP HÌNH ẢNH: BEFORE/AFTER & LIGHTBOX GALLERY */}
        {/* ============================================================== */}
        <div className="mb-24">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Bộ sưu tập Hình ảnh Thực tế &amp; So sánh Trước / Sau</span>
            </h3>
            <p className="text-zinc-400 text-sm">
              Khung xem ảnh Trước/Sau minh chứng cho sức mạnh của hành động cộng đồng, cùng bộ sưu tập tư liệu môi trường chính thống từ WWF, UNEP, Bộ TN&amp;MT.
            </p>
          </div>

          {/* Before / After Interactive Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {BEFORE_AFTER_CASES.map((item) => (
              <BeforeAfterSlider key={item.id} item={item} />
            ))}
          </div>

          {/* Lightbox Image Gallery with Category Filter */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="text-lg font-bold text-white">Thư viện Ảnh Tư liệu Thực trạng</h4>
                <p className="text-xs text-zinc-400">Bấm vào bất kỳ hình ảnh nào để phóng to chuẩn HD kèm nguồn trích dẫn</p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      galleryCategory === cat
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Source tag with link */}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-950/80 border border-zinc-700/80 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors backdrop-blur-md flex items-center gap-1 z-10"
                      title="Mở bài viết tư liệu gốc"
                    >
                      <span>Nguồn: {item.source}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>

                    <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-950/70 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">
                        {item.location}
                      </span>
                      <h5 className="text-sm font-bold text-white line-clamp-2 mt-0.5">
                        {item.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHẦN 2.2: HỆ THỐNG GIẢI PHÁP KHẮC PHỤC (TAB SWITCHING) */}
        {/* ============================================================== */}
        <div id="solutions" className="pt-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>HỆ THỐNG GIẢI PHÁP ĐỒNG BỘ</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Giải pháp Khắc phục Toàn diện theo Cấp độ Thực thi
            </h3>
            <p className="text-zinc-400 text-sm mt-2">
              Chuyển đổi lối sống cá nhân, đổi mới công nghệ doanh nghiệp và hoàn thiện hành lang pháp lý của nhà nước để ngăn chặn rác thải nhựa tại nguồn.
            </p>
          </div>

          {/* Tab Switching Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10 max-w-4xl mx-auto">
            {solutionTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSolutionTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSolutionTab(tab.id)}
                  className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'bg-zinc-900 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-900/70'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                      {tab.label}
                    </div>
                    <div className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                      {tab.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {SOLUTIONS_BY_LEVEL[activeSolutionTab]?.map((sol) => (
              <div
                key={sol.id}
                className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400">
                      {sol.metrics}
                    </span>
                    <Sparkles className="w-4 h-4 text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {sol.title}
                  </h4>

                  <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Hành động cốt lõi:
                    </div>
                    {sol.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span>Cam kết hành động ngay</span>
                  <span className="text-zinc-500 group-hover:text-emerald-400 transition-colors">✓ Sẵn sàng</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />
    </section>
  );
};

export default EnvironmentalStatusSection;
