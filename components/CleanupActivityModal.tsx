import React, { useState } from 'react';
import { WasteHotspot } from '../types';
import {
  X,
  Calendar,
  MapPin,
  User,
  Phone,
  Trash2,
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink,
  Heart,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Share2,
  Navigation
} from 'lucide-react';

interface CleanupActivityModalProps {
  hotspot: WasteHotspot | null;
  onClose: () => void;
  onOpenVolunteer: (hotspot: WasteHotspot) => void;
  onToggleUpvote: (id: string) => void;
}

const CleanupActivityModal: React.FC<CleanupActivityModalProps> = ({
  hotspot,
  onClose,
  onOpenVolunteer,
  onToggleUpvote
}) => {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [activeTab, setActiveTab] = useState<'plan' | 'map_osm' | 'gear'>('plan');

  if (!hotspot) return null;

  const osmUrl = `https://www.openstreetmap.org/?mlat=${hotspot.lat}&mlon=${hotspot.lng}#map=16/${hotspot.lat}/${hotspot.lng}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${hotspot.lng - 0.015}%2C${hotspot.lat - 0.01}%2C${hotspot.lng + 0.015}%2C${hotspot.lat + 0.01}&layer=mapnik&marker=${hotspot.lat}%2C${hotspot.lng}`;

  // Default cleanup details if missing (e.g. from user reports)
  const defaultDetails = {
    eventDate: 'Dự kiến vào Thứ Bảy / Chủ Nhật gần nhất (07:30 - 11:30)',
    meetingPoint: hotspot.locationName,
    coordinatorName: 'Nguyễn Ngọc Như Ý (Field Coordinator GENGREEN)',
    coordinatorContact: '0934.567.890 / Zalo: GENGREEN Vietnam',
    targetWaste: 'Khảo sát thực địa, cắm biển cảnh báo và thu gom dự kiến 1.5 - 3.5 tấn rác thải nhựa',
    requiredGear: [
      'Găng tay vải tráng cao su chống vật sắc nhọn',
      'Ủng cao su hoặc giày thể thao kín mũi',
      'Kẹp gắp rác inox dài 1 mét',
      'Khẩu trang than hoạt tính và nón rộng vành'
    ],
    schedule: [
      '07:30 - 08:00: Tập trung tại điểm hẹn, phát trang bị và phổ biến quy định an toàn',
      '08:00 - 10:00: Ra quân thu gom, đóng bao tải dứa và phân loại rác tái chế tại chỗ',
      '10:00 - 11:00: Chuyển rác về xe ép chuyên dụng của công ty môi trường đô thị',
      '11:00 - 11:30: Tổng kết số lượng rác, cấp giấy chứng nhận tình nguyện viên và chụp ảnh lưu niệm'
    ],
    sponsorsOrPartners: 'GENGREEN, Đoàn Thanh niên địa phương & CLB Sài Gòn Xanh / Tình nguyện Xanh'
  };

  const details = hotspot.cleanupDetails || defaultDetails;

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(`${hotspot.lat}, ${hotspot.lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 max-w-2xl w-full bg-zinc-900 border border-zinc-700/80 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-bold border ${
                hotspot.severity === 'critical'
                  ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                  : hotspot.severity === 'moderate'
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                  : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              }`}
            >
              {hotspot.severity === 'critical' && '🔴 Điểm đen rác lớn'}
              {hotspot.severity === 'moderate' && '🟡 Ô nhiễm trung bình'}
              {hotspot.severity === 'cleaned' && '🟢 Đã hoàn thành dọn dẹp'}
            </span>
            <span className="text-xs text-zinc-400 font-mono">#{hotspot.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Banner Image & Info */}
          <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-xl overflow-hidden border border-zinc-800 shadow-md">
            <img
              src={hotspot.imageUrl}
              alt={hotspot.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {hotspot.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-zinc-300 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{hotspot.locationName}</span>
                </div>
              </div>

              {/* Maps Links */}
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hotspot.lat},${hotspot.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                  title="Chỉ đường Google Maps đến điểm này"
                >
                  <span>🧭 Chỉ đường Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${hotspot.lat},${hotspot.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-950/90 hover:bg-blue-600 text-white text-xs font-semibold border border-zinc-700 transition-all flex items-center gap-1.5 backdrop-blur-md shadow"
                  title="Mở trên Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-blue-300" />
                </a>

                <a
                  href={osmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-950/90 hover:bg-emerald-600 text-white text-xs font-semibold border border-zinc-700 hover:border-emerald-500 transition-all flex items-center gap-1.5 backdrop-blur-md shadow"
                  title="Mở tọa độ trực tiếp trên OpenStreetMap"
                >
                  <span>OpenStreetMap</span>
                  <ExternalLink className="w-3 h-3 text-emerald-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Location Quick Info Bar with OpenStreetMap Details */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-300 font-mono">
              <Navigation className="w-3.5 h-3.5 text-teal-400" />
              <span>Tọa độ GPS: {hotspot.lat}, {hotspot.lng}</span>
              <button
                type="button"
                onClick={handleCopyCoordinates}
                className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                title="Sao chép tọa độ"
              >
                {copiedCoords ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-zinc-400">Báo cáo: {hotspot.reportedAt} ({hotspot.reportedBy})</span>
              <a
                href={osmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Xem trên OSM</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Hiện trạng khảo sát thực địa</span>
            </h4>
            <p className="text-sm text-zinc-200 leading-relaxed">
              {hotspot.description}
            </p>
          </div>

          {/* Tabs for Detailed Information */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'plan'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kế hoạch &amp; Lịch trình</span>
            </button>
            <button
              onClick={() => setActiveTab('map_osm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'map_osm'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Bản đồ OpenStreetMap</span>
            </button>
            <button
              onClick={() => setActiveTab('gear')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'gear'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bảo hộ &amp; Đối tác</span>
            </button>
          </div>

          {/* Tab Content: Plan */}
          {activeTab === 'plan' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Kế hoạch &amp; Thông tin Chiến dịch Dọn dẹp</span>
                </h4>
                <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                  {hotspot.statusText}
                </span>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <div className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Thời gian ra quân</span>
                  </div>
                  <div className="text-white font-bold">{details.eventDate}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <div className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>Điểm tập kết</span>
                  </div>
                  <div className="text-white font-bold">{details.meetingPoint}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <div className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Điều phối viên chiến dịch</span>
                  </div>
                  <div className="text-white font-bold">{details.coordinatorName}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <div className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hotline / Zalo liên hệ</span>
                  </div>
                  <div className="text-white font-bold font-mono text-emerald-400">{details.coordinatorContact}</div>
                </div>
              </div>

              {/* Target Waste */}
              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
                <div className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Khối lượng rác mục tiêu</span>
                </div>
                <div className="text-zinc-200 font-semibold">{details.targetWaste}</div>
              </div>

              {/* Timeline / Schedule */}
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
                <div className="text-zinc-400 mb-2.5 flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lịch trình các hoạt động cụ thể</span>
                </div>
                <ul className="space-y-2.5">
                  {details.schedule.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {details.resultSummary && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300">
                  🎉 <strong>Kết quả thực tế:</strong> {details.resultSummary}
                </div>
              )}
            </div>
          )}

          {/* Tab Content: OpenStreetMap View */}
          {activeTab === 'map_osm' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">
                  Bản đồ vị trí chi tiết từ <strong>OpenStreetMap (OSM) &amp; Vệ Tinh</strong>
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${hotspot.lat},${hotspot.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-zinc-600">·</span>
                  <a
                    href={osmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <span>Mở toàn màn hình OSM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* High visibility interactive map container */}
              <div className="w-full h-80 rounded-2xl overflow-hidden border-2 border-emerald-500/50 relative bg-zinc-950 shadow-inner group">
                <iframe
                  title={`Bản đồ chi tiết điểm rác: ${hotspot.title}`}
                  className="w-full h-full border-0 filter contrast-105"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${hotspot.lng - 0.008}%2C${hotspot.lat - 0.006}%2C${hotspot.lng + 0.008}%2C${hotspot.lat + 0.006}&layer=mapnik&marker=${hotspot.lat}%2C${hotspot.lng}`}
                  loading="eager"
                />

                {/* Pin indicator overlay */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-zinc-950/90 border border-emerald-500/60 backdrop-blur-md text-[11px] text-white flex items-center gap-2 shadow-lg pointer-events-none">
                  <MapPin className="w-4 h-4 text-rose-500 animate-bounce" />
                  <span className="font-semibold">{hotspot.title}</span>
                  <span className="font-mono text-emerald-400">({hotspot.lat}, {hotspot.lng})</span>
                </div>

                {/* Map type & direct navigation bar overlay */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hotspot.lat},${hotspot.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Lộ trình tới đây</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-400 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Bản đồ vector định vị chính xác với độ phóng đại 16x</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Dữ liệu bản đồ &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">OpenStreetMap contributors</a></span>
                  <a
                    href={osmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:underline font-medium"
                  >
                    Xem lớp giao thông &amp; địa hình ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Gear & Partners */}
          {activeTab === 'gear' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Required Gear */}
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
                <div className="text-zinc-400 mb-2.5 flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Trang thiết bị bảo hộ &amp; Dụng cụ cần chuẩn bị</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {details.requiredGear.map((gear, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300 p-2 rounded-lg bg-zinc-900 border border-zinc-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{gear}</span>
                    </div>
                  ))}
                </div>
              </div>

              {details.sponsorsOrPartners && (
                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs text-zinc-300">
                  <div className="text-zinc-400 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    🤝 Đơn vị phối hợp &amp; Đồng hành
                  </div>
                  <div>{details.sponsorsOrPartners}</div>
                </div>
              )}
            </div>
          )}

          {/* Volunteer progress bar */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">Tình nguyện viên đã đăng ký tham gia:</span>
              <span className="font-bold text-emerald-400">
                {hotspot.volunteersJoined} / {hotspot.volunteersNeeded} người (
                {Math.round((hotspot.volunteersJoined / hotspot.volunteersNeeded) * 100)}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                style={{
                  width: `${Math.min(
                    100,
                    (hotspot.volunteersJoined / hotspot.volunteersNeeded) * 100
                  )}%`
                }}
                className={`h-full rounded-full transition-all ${
                  hotspot.severity === 'cleaned' ? 'bg-emerald-400' : 'bg-teal-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onToggleUpvote(hotspot.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              hotspot.hasUpvoted
                ? 'bg-rose-950/80 text-rose-400 border-rose-500/60'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                hotspot.hasUpvoted ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
            <span>{hotspot.upvotes} Lượt đồng tình</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${hotspot.lat},${hotspot.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5 shadow"
            >
              <span>Chỉ đường Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>

            <a
              href={osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5 border border-zinc-800"
            >
              <span>OpenStreetMap</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenVolunteer(hotspot);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Đăng ký tham gia dọn dẹp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanupActivityModal;
