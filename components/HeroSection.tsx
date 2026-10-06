import React from 'react';
import { ArrowDown, AlertCircle, Globe, ShieldCheck, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { AUTHORITATIVE_SOURCES } from '../data/environmentalData';

interface HeroSectionProps {
  onExploreMap: () => void;
  onExploreSolutions: () => void;
  onExploreStatus: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMap,
  onExploreSolutions,
  onExploreStatus,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with subtle eco glow and dark aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      {/* Radial ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sáng kiến Thanh niên Vì Môi trường Xanh · GENGREEN.ECO</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
          Chung tay giảm thiểu{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            ô nhiễm rác thải nhựa
          </span>{' '}
          ngày hôm nay
        </h1>

        {/* Narrative Subtitle with links */}
        <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          Mỗi năm thế giới phát thải hơn{' '}
          <a
            href={AUTHORITATIVE_SOURCES.globalWaste.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 font-semibold underline decoration-emerald-500/50 hover:decoration-emerald-400 transition-colors inline-flex items-center gap-0.5"
            title="Xem báo cáo UNEP"
          >
            &gt; 400 triệu tấn nhựa
            <ExternalLink className="w-3 h-3 inline" />
          </a>{' '}
          và{' '}
          <a
            href={AUTHORITATIVE_SOURCES.oceanLeak.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 font-semibold underline decoration-cyan-500/50 hover:decoration-cyan-400 transition-colors inline-flex items-center gap-0.5"
            title="Xem báo cáo Ellen MacArthur Foundation"
          >
            8–12 triệu tấn xả ra đại dương
            <ExternalLink className="w-3 h-3 inline" />
          </a>. Tại Việt Nam,{' '}
          <a
            href={AUTHORITATIVE_SOURCES.vietnamWaste.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-semibold underline decoration-amber-500/50 hover:decoration-amber-400 transition-colors inline-flex items-center gap-0.5"
            title="Xem nghiên cứu World Bank"
          >
            1,8 triệu tấn phát thải/năm
            <ExternalLink className="w-3 h-3 inline" />
          </a>{' '}
          nhưng chỉ{' '}
          <a
            href={AUTHORITATIVE_SOURCES.vietnamRecycle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-400 font-semibold underline decoration-rose-500/50 hover:decoration-rose-400 transition-colors inline-flex items-center gap-0.5"
            title="Xem báo cáo Bộ TN&MT"
          >
            27% được tái chế
            <ExternalLink className="w-3 h-3 inline" />
          </a>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreMap}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>Bản đồ điểm đen rác thải</span>
          </button>

          <button
            onClick={onExploreStatus}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700/80 hover:border-emerald-500/50 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <AlertCircle className="w-4 h-4 text-emerald-400" />
            <span>Xem thực trạng &amp; dẫn chứng</span>
          </button>

          <button
            onClick={onExploreSolutions}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Giải pháp 3R toàn diện</span>
          </button>
        </div>

        {/* Key Real Metrics Row With Direct Source Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Stat 1 */}
          <a
            href={AUTHORITATIVE_SOURCES.globalWaste.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-left hover:border-emerald-500/50 hover:bg-zinc-900/90 transition-all backdrop-blur-sm group block relative"
            title="Nhấn để xem báo cáo gốc của UNEP"
          >
            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toàn cầu / Năm</span>
              </span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
              &gt; 400M <span className="text-sm font-normal text-zinc-400">tấn</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Sản lượng nhựa sản xuất trên toàn thế giới</p>
            <span className="text-[10px] text-emerald-400/80 mt-2 block font-medium group-hover:underline">
              Nguồn: UNEP Report ↗
            </span>
          </a>

          {/* Stat 2 */}
          <a
            href={AUTHORITATIVE_SOURCES.oceanLeak.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-left hover:border-cyan-500/50 hover:bg-zinc-900/90 transition-all backdrop-blur-sm group block relative"
            title="Nhấn để xem báo cáo Ellen MacArthur Foundation"
          >
            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Xả ra biển cả</span>
              </span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
              8 - 12M <span className="text-sm font-normal text-zinc-400">tấn</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Rác nhựa rò rỉ trực tiếp ra các đại dương</p>
            <span className="text-[10px] text-cyan-400/80 mt-2 block font-medium group-hover:underline">
              Nguồn: Ellen MacArthur ↗
            </span>
          </a>

          {/* Stat 3 */}
          <a
            href={AUTHORITATIVE_SOURCES.vietnamWaste.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-left hover:border-amber-500/50 hover:bg-zinc-900/90 transition-all backdrop-blur-sm group block relative"
            title="Nhấn để xem nghiên cứu World Bank tại Việt Nam"
          >
            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Việt Nam / Năm</span>
              </span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
              ~1.8M <span className="text-sm font-normal text-zinc-400">tấn</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">Lượng rác thải nhựa phát thải mỗi năm</p>
            <span className="text-[10px] text-amber-400/80 mt-2 block font-medium group-hover:underline">
              Nguồn: World Bank Vietnam ↗
            </span>
          </a>

          {/* Stat 4 */}
          <a
            href={AUTHORITATIVE_SOURCES.vietnamRecycle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-left hover:border-rose-500/50 hover:bg-zinc-900/90 transition-all backdrop-blur-sm group block relative"
            title="Nhấn để xem báo cáo Bộ TN&MT"
          >
            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Tỷ lệ tái chế VN</span>
              </span>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-rose-400 transition-colors" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 group-hover:text-amber-300 transition-colors">
              Chỉ 27%
            </div>
            <p className="text-xs text-zinc-400 mt-1">Còn lại 73% bị chôn lấp hoặc thải ra tự nhiên</p>
            <span className="text-[10px] text-rose-400/80 mt-2 block font-medium group-hover:underline">
              Nguồn: Bộ TN&amp;MT ↗
            </span>
          </a>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onExploreStatus}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            <span>Cuộn xuống để khám phá chi tiết</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
