import React, { useState } from 'react';
import { HCM_DAILY_PLASTIC_NEWS } from '../data/environmentalData';
import { DailyPlasticNewsItem } from '../types';
import {
  AlertTriangle,
  Newspaper,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Waves,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
  RefreshCw,
  Send,
  Droplet
} from 'lucide-react';

const HcmDailyPlasticAlertSection: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [newsList, setNewsList] = useState<DailyPlasticNewsItem[]>(HCM_DAILY_PLASTIC_NEWS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic current date in Vietnamese
  const todayDate = new Date();
  const dayName = new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(todayDate);
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(todayDate);

  const districts = [
    { id: 'all', label: 'Toàn bộ TP.HCM' },
    { id: 'Quận Tân Bình & Quận 12', label: 'Cầu Kênh Lương (Tham Lương)' },
    { id: 'Quận 3 & Bình Thạnh', label: 'Kênh Nhiêu Lộc - Thị Nghè' },
    { id: 'Quận 8', label: 'Kênh Đôi (Quận 8)' },
    { id: 'TP. Thủ Đức', label: 'TP. Thủ Đức' },
    { id: 'Bình Tân', label: 'Kênh Nước Đen (Bình Tân)' }
  ];

  const filteredNews =
    selectedDistrict === 'all'
      ? newsList
      : newsList.filter((item) => item.district.includes(selectedDistrict));

  const handleRefreshDaily = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const getStatusBadge = (status: DailyPlasticNewsItem['status']) => {
    switch (status) {
      case 'critical':
        return {
          bg: 'bg-rose-950/80 border-rose-500/50 text-rose-300',
          dot: 'bg-rose-500 animate-pulse',
          label: '🔴 Ô nhiễm khẩn cấp'
        };
      case 'warning':
        return {
          bg: 'bg-amber-950/80 border-amber-500/50 text-amber-300',
          dot: 'bg-amber-400',
          label: '🟡 Cảnh báo ứ đọng rác'
        };
      case 'improving':
        return {
          bg: 'bg-teal-950/80 border-teal-500/50 text-teal-300',
          dot: 'bg-teal-400',
          label: '🟢 Đang giải tỏa & vớt rác'
        };
      case 'normal':
      default:
        return {
          bg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300',
          dot: 'bg-emerald-400',
          label: '🌟 Mô hình hạn chế rác'
        };
    }
  };

  return (
    <section id="hcm-daily-news" className="py-20 bg-zinc-950 relative border-t border-zinc-900">
      {/* Glow highlight */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-96 h-96 bg-rose-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Newspaper className="w-4 h-4" />
              <span>BẢN TIN MÔI TRƯỜNG ĐÔ THỊ TP. HỒ CHÍ MINH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Tình Hình Rác Thải Nhựa TP.HCM</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold uppercase tracking-wider animate-pulse">
                Cập nhật hằng ngày
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">
              Giám sát diễn biến rác thải nhựa tại các tuyến kênh rạch trọng điểm TP.HCM: Kênh Tham Lương, Kênh Nhiêu Lộc - Thị Nghè, Kênh Đôi, Kênh Tẻ và các khu dân cư trong 24 giờ qua.
            </p>
          </div>

          {/* Today Date Badge & Refresh */}
          <div className="flex items-center gap-3 self-start lg:self-auto bg-zinc-900/90 border border-zinc-800 p-2.5 rounded-2xl">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Hôm nay: <strong className="text-white capitalize">{dayName}</strong>, {formattedDate}</span>
            </div>
            <button
              onClick={handleRefreshDaily}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all border border-zinc-700"
              title="Cập nhật tin tức ngày mới"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Daily Metrics Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm shadow-lg hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Rác nhựa phát sinh hôm nay</span>
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono">~1.920 <span className="text-sm font-normal text-zinc-400">tấn/ngày</span></div>
            <p className="text-[11px] text-zinc-400 mt-1">Chiếm ~18.5% tổng khối lượng chất thải rắn sinh hoạt TP.HCM.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm shadow-lg hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Rác nhựa vớt trên kênh rạch</span>
              <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                <Waves className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-teal-400 font-mono">52.4 <span className="text-sm font-normal text-zinc-400">tấn hôm nay</span></div>
            <p className="text-[11px] text-zinc-400 mt-1">Được trục vớt bằng tàu cơ giới và lực lượng tình nguyện viên.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm shadow-lg hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Cảnh báo đỉnh triều cường</span>
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Droplet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-cyan-300 font-mono">+1.65 <span className="text-sm font-normal text-zinc-400">mét (Trạm Phú An)</span></div>
            <p className="text-[11px] text-zinc-400 mt-1">Nước lớn kéo theo rác trôi dạt vào miệng cống ven Kênh Đôi, Kênh Tẻ.</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm shadow-lg hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Tỷ lệ chưa phân loại tại nguồn</span>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">63.6% <span className="text-sm font-normal text-zinc-400">gom chung</span></div>
            <p className="text-[11px] text-zinc-400 mt-1">Số liệu thực tế ghi nhận từ khảo sát dự án GENGREEN tại TP.HCM.</p>
          </div>
        </div>

        {/* Filter by district */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
          <span className="text-xs text-zinc-400 font-medium shrink-0">Lọc theo khu vực:</span>
          {districts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDistrict(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDistrict === d.id
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Daily News Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredNews.map((item) => {
            const badge = getStatusBadge(item.status);
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-zinc-800 text-zinc-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{item.district}</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border flex items-center gap-1.5 ${badge.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 mb-4 space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span>Khối lượng rác trong ngày:</span>
                      <strong className="text-amber-400 font-mono font-bold">~{item.wasteTonsToday} tấn</strong>
                    </div>
                    <div className="text-zinc-300">
                      <span className="text-zinc-400">Biện pháp xử lý: </span>
                      <span className="text-teal-300 font-medium">{item.actionRequired}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span>{item.timestamp}</span>
                  </span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-rose-400 hover:text-rose-300 inline-flex items-center gap-1 hover:underline"
                    title={`Xem nguồn tin xác thực từ ${item.source}`}
                  >
                    <span>Nguồn: {item.source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-rose-950/40 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0 mt-1">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Phát hiện điểm đen rác thải nhựa mới phát sinh hôm nay tại TP.HCM?
              </h4>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                Hãy gửi ảnh và vị trí GPS qua biểu mẫu báo cáo. Điểm rác sẽ lập tức được gửi về email ban điều phối <strong className="text-zinc-200">26162051@student.hcmute.edu.vn</strong> để xác nhận và chuyển sang trạng thái <strong>&quot;Trong quá trình xử lý&quot;</strong>.
              </p>
            </div>
          </div>

          <a
            href="#map"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white shadow-lg shadow-rose-500/20 flex items-center gap-2 whitespace-nowrap transition-all hover:scale-105 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Báo cáo điểm rác ngay</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HcmDailyPlasticAlertSection;
