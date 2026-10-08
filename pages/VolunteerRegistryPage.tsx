import React, { useState, useEffect } from 'react';
import { VolunteerFormData } from '../types';
import {
  Users,
  Search,
  Filter,
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  Trash2,
  FileSpreadsheet,
  ArrowLeft,
  RefreshCw,
  UserCheck,
  Send,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Facebook } from '../components/FacebookIcon';

interface VolunteerRegistryPageProps {
  onBackToHome: () => void;
}

const VOLUNTEER_EMAIL = '26162120@student.hcmute.edu.vn';
const ADMIN_EMAIL = '26162051@student.hcmute.edu.vn';

// Initial sample data if none in localStorage to ensure the page looks rich and immediately functional
const DEFAULT_VOLUNTEERS: VolunteerFormData[] = [
  {
    id: 'vol-101',
    fullName: 'Lê Hoàng Minh',
    phone: '0903 812 456',
    email: 'minh.lehoang@gmail.com',
    hotspotId: 'hs-1',
    hotspotTitle: 'Cầu Kênh Lương (Kênh Tham Lương - Bến Cát)',
    hotspotLocation: 'Chân Cầu Tham Lương (Kênh Lương), Q. Tân Bình - Q. 12, TP.HCM',
    availableDate: '2026-10-18',
    notes: 'Có kinh nghiệm tham gia Sài Gòn Xanh, mang theo 2 kẹp gắp rác inox và ủng bảo hộ.',
    createdAt: '08/10/2026 08:30:15',
    status: 'confirmed'
  },
  {
    id: 'vol-102',
    fullName: 'Trần Thị Mỹ Duyên',
    phone: '0918 765 234',
    email: 'myduyen.tran@student.hcmute.edu.vn',
    hotspotId: 'hs-1',
    hotspotTitle: 'Cầu Kênh Lương (Kênh Tham Lương - Bến Cát)',
    hotspotLocation: 'Chân Cầu Tham Lương (Kênh Lương), Q. Tân Bình - Q. 12, TP.HCM',
    availableDate: '2026-10-18',
    notes: 'Sinh viên HCMUTE, đăng ký tham gia hỗ trợ phân loại rác tái chế và truyền thông chụp ảnh.',
    createdAt: '08/10/2026 09:12:40',
    status: 'confirmed'
  },
  {
    id: 'vol-103',
    fullName: 'Nguyễn Văn Quốc Bảo',
    phone: '0932 445 678',
    email: 'quocbao.nguyen@gmail.com',
    hotspotId: 'hs-2',
    hotspotTitle: 'Bãi bồi Kênh Đôi (Dọc đường Bến Bình Đông)',
    hotspotLocation: 'Phường 14, Quận 8, TP. Hồ Chí Minh',
    availableDate: '2026-10-25',
    notes: 'Có xe bán tải hỗ trợ chở dụng cụ dọn dẹp và bao tải rác tới điểm tập kết xe ép rác.',
    createdAt: '08/10/2026 10:05:22',
    status: 'confirmed'
  },
  {
    id: 'vol-104',
    fullName: 'Phạm Hồng Nhung',
    phone: '0987 112 334',
    email: 'hongnhung.p@gmail.com',
    hotspotId: 'hs-3',
    hotspotTitle: 'Rạch Xuyên Tâm (Khu vực Cầu Bùi Đình Túy)',
    hotspotLocation: 'Phường 12, Quận Bình Thạnh, TP. Hồ Chí Minh',
    availableDate: '2026-10-25',
    notes: 'Nhóm 3 bạn sinh viên đăng ký chung, có sẵn găng tay vải cao su bảo hộ.',
    createdAt: '08/10/2026 11:20:00',
    status: 'pending'
  },
  {
    id: 'vol-105',
    fullName: 'Võ Minh Trí',
    phone: '0977 889 900',
    email: 'minhtri.vo@gmail.com',
    hotspotId: 'hs-4',
    hotspotTitle: 'Chân Cầu Chữ Y (Kênh Tàu Hủ - Bến Nghé)',
    hotspotLocation: 'Quận 5 & Quận 8, TP. Hồ Chí Minh',
    availableDate: '2026-10-18',
    notes: 'Có xuồng máy mini hỗ trợ trục vớt rác nổi trên sông.',
    createdAt: '08/10/2026 13:45:10',
    status: 'confirmed'
  }
];

const VolunteerRegistryPage: React.FC<VolunteerRegistryPageProps> = ({ onBackToHome }) => {
  const [volunteers, setVolunteers] = useState<VolunteerFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHotspot, setFilterHotspot] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedVol, setSelectedVol] = useState<VolunteerFormData | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gengreen_registered_volunteers');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge default with stored avoiding duplicate IDs
          const storedIds = new Set(parsed.map((item: VolunteerFormData) => item.id || item.phone));
          const missingDefaults = DEFAULT_VOLUNTEERS.filter(
            (d) => !storedIds.has(d.id) && !storedIds.has(d.phone)
          );
          setVolunteers([...parsed, ...missingDefaults]);
          return;
        }
      }
      setVolunteers(DEFAULT_VOLUNTEERS);
      localStorage.setItem('gengreen_registered_volunteers', JSON.stringify(DEFAULT_VOLUNTEERS));
    } catch (e) {
      setVolunteers(DEFAULT_VOLUNTEERS);
    }
  }, []);

  const handleStatusChange = (id: string, newStatus: 'confirmed' | 'pending' | 'completed') => {
    const updated = volunteers.map((v) => (v.id === id ? { ...v, status: newStatus } : v));
    setVolunteers(updated);
    try {
      localStorage.setItem('gengreen_registered_volunteers', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa bản ghi đăng ký này?')) {
      const updated = volunteers.filter((v) => v.id !== id);
      setVolunteers(updated);
      try {
        localStorage.setItem('gengreen_registered_volunteers', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Mã đăng ký',
      'Họ và tên',
      'Số điện thoại',
      'Email',
      'Chiến dịch / Điểm rác',
      'Địa điểm',
      'Ngày tham gia',
      'Ghi chú',
      'Thời gian gửi',
      'Trạng thái'
    ];

    const rows = filteredVolunteers.map((v) => [
      v.id || 'N/A',
      `"${v.fullName.replace(/"/g, '""')}"`,
      `"${v.phone}"`,
      `"${v.email || ''}"`,
      `"${v.hotspotTitle.replace(/"/g, '""')}"`,
      `"${(v.hotspotLocation || '').replace(/"/g, '""')}"`,
      `"${v.availableDate}"`,
      `"${(v.notes || '').replace(/"/g, '""')}"`,
      `"${v.createdAt || ''}"`,
      `"${v.status === 'confirmed' ? 'Đã xác nhận' : v.status === 'completed' ? 'Đã hoàn thành' : 'Chờ gọi điện'}"`
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh_sach_tinh_nguyen_vien_gengreen_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Unique campaign titles for filtering
  const campaignOptions = Array.from(new Set(volunteers.map((v) => v.hotspotTitle)));

  // Filtered volunteers
  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.hotspotTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.notes && v.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCampaign = filterHotspot === 'all' || v.hotspotTitle === filterHotspot;
    const matchesStatus = filterStatus === 'all' || (v.status || 'confirmed') === filterStatus;

    return matchesSearch && matchesCampaign && matchesStatus;
  });

  const confirmedCount = volunteers.filter((v) => v.status === 'confirmed').length;
  const pendingCount = volunteers.filter((v) => v.status === 'pending').length;
  const completedCount = volunteers.filter((v) => v.status === 'completed').length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500 selection:text-zinc-950 pb-20">
      {/* Top Banner / Navbar Header */}
      <div className="bg-zinc-900/90 border-b border-emerald-900/40 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold border border-zinc-700"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Quay lại Trang chủ</span>
            </button>

            <div className="h-6 w-px bg-zinc-800" />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white">Hệ Thống Tổng Hợp Tình Nguyện Viên</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                  Registry Hub
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Tất cả đăng ký đều gửi trực tiếp về email <strong className="text-white font-mono">{VOLUNTEER_EMAIL}</strong> &amp; lưu trữ tự động tại đây
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://www.facebook.com/profile.php?id=61594950100287"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              title="Xem Fanpage dự án trên Facebook"
            >
              <Facebook className="w-3.5 h-3.5 fill-white" />
              <span>Fanpage Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              title="Tải bảng danh sách Excel/CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất file Excel/CSV</span>
            </button>

            <a
              href={`mailto:${VOLUNTEER_EMAIL}`}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-all border border-zinc-700 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mở Hộp Thư {VOLUNTEER_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Tổng đăng ký</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-white">{volunteers.length}</div>
            <p className="text-[11px] text-zinc-500 mt-1">Tình nguyện viên đã ghi danh trên toàn hệ thống</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Đã xác nhận liên hệ</span>
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-sky-400">{confirmedCount}</div>
            <p className="text-[11px] text-zinc-500 mt-1">Đã chốt danh sách &amp; chuẩn bị quân số ra quân</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Cần liên hệ / Chờ xử lý</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-400">{pendingCount}</div>
            <p className="text-[11px] text-zinc-500 mt-1">Đang chờ đội trưởng gọi điện xác nhận lịch</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Điểm rác tiếp nhận</span>
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-teal-400">{campaignOptions.length}</div>
            <p className="text-[11px] text-zinc-500 mt-1">Bao gồm Cầu Kênh Lương, Kênh Đôi, Rạch Xuyên Tâm...</p>
          </div>
        </div>

        {/* Email Notification & Integration Status Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-teal-950/60 border border-emerald-500/30 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Luồng xử lý tự động đến Email Ban Điều Phối</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Online &amp; FormSubmit API Active
                </span>
              </h4>
              <p className="text-xs text-zinc-300 mt-0.5">
                Khi bất kỳ ai đăng ký dọn rác ở các điểm trên web, biểu mẫu tự động gửi bản sao về:
                <span className="font-mono font-bold text-emerald-300 ml-1 underline decoration-emerald-500">{VOLUNTEER_EMAIL}</span>
                <span className="text-zinc-400 ml-1">và</span>
                <span className="font-mono text-zinc-300 ml-1">{ADMIN_EMAIL}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const refreshed = JSON.parse(localStorage.getItem('gengreen_registered_volunteers') || '[]');
                setVolunteers(refreshed.length ? refreshed : DEFAULT_VOLUNTEERS);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 flex items-center gap-1.5 transition-colors border border-zinc-700"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Làm mới dữ liệu</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên tình nguyện viên, số điện thoại, email, chiến dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
              <Filter className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-400">Điểm rác:</span>
              <select
                value={filterHotspot}
                onChange={(e) => setFilterHotspot(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none max-w-[160px] truncate"
              >
                <option value="all" className="bg-zinc-900 text-white">Tất cả chiến dịch</option>
                {campaignOptions.map((title) => (
                  <option key={title} value={title} className="bg-zinc-900 text-white">
                    {title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
              <span className="text-zinc-400">Trạng thái:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none"
              >
                <option value="all" className="bg-zinc-900 text-white">Tất cả</option>
                <option value="confirmed" className="bg-zinc-900 text-white">Đã xác nhận</option>
                <option value="pending" className="bg-zinc-900 text-white">Chờ liên hệ</option>
                <option value="completed" className="bg-zinc-900 text-white">Đã hoàn thành</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl mb-12">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Danh sách tình nguyện viên ({filteredVolunteers.length} người)</span>
            </h3>

            <span className="text-[11px] text-zinc-400 font-mono">
              Hiển thị {filteredVolunteers.length} / {volunteers.length} bản ghi
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950 text-zinc-400 font-semibold uppercase tracking-wider text-[11px] border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4">Tình nguyện viên</th>
                  <th className="py-3.5 px-4">Liên hệ (SĐT / Email)</th>
                  <th className="py-3.5 px-4">Chiến dịch đăng ký</th>
                  <th className="py-3.5 px-4">Ngày tham gia</th>
                  <th className="py-3.5 px-4">Ghi chú / Dụng cụ</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                {filteredVolunteers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-zinc-500">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p>Không tìm thấy tình nguyện viên nào phù hợp với bộ lọc.</p>
                    </td>
                  </tr>
                ) : (
                  filteredVolunteers.map((vol) => (
                    <tr
                      key={vol.id || vol.phone}
                      className="hover:bg-zinc-800/50 transition-colors"
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{vol.fullName}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {vol.createdAt || 'Mới đăng ký'}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-medium">
                          <Phone className="w-3.5 h-3.5 shrink-0" />
                          <a href={`tel:${vol.phone}`} className="hover:underline">
                            {vol.phone}
                          </a>
                        </div>
                        {vol.email && (
                          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] mt-0.5">
                            <Mail className="w-3 h-3 shrink-0" />
                            <a href={`mailto:${vol.email}`} className="hover:underline truncate max-w-[150px]">
                              {vol.email}
                            </a>
                          </div>
                        )}
                      </td>

                      {/* Hotspot */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white max-w-[200px] truncate" title={vol.hotspotTitle}>
                          {vol.hotspotTitle}
                        </div>
                        {vol.hotspotLocation && (
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5 max-w-[200px] truncate">
                            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span title={vol.hotspotLocation}>{vol.hotspotLocation}</span>
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-teal-300 font-medium">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{vol.availableDate}</span>
                        </div>
                      </td>

                      {/* Notes */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <p className="line-clamp-2 text-zinc-300 text-[11px] italic">
                          {vol.notes ? `"${vol.notes}"` : '—'}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <select
                          value={vol.status || 'confirmed'}
                          onChange={(e) =>
                            handleStatusChange(
                              vol.id || '',
                              e.target.value as 'confirmed' | 'pending' | 'completed'
                            )
                          }
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none transition-colors ${
                            vol.status === 'confirmed'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : vol.status === 'completed'
                              ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                              : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          <option value="confirmed" className="bg-zinc-900 text-emerald-300">✓ Đã xác nhận</option>
                          <option value="pending" className="bg-zinc-900 text-amber-300">⏳ Chờ liên hệ</option>
                          <option value="completed" className="bg-zinc-900 text-blue-300">★ Hoàn thành dọn</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedVol(vol)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                            title="Xem chi tiết"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          {vol.id && (
                            <button
                              onClick={() => handleDelete(vol.id!)}
                              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition-colors"
                              title="Xóa bản ghi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick FAQ / Guide Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Tiếp nhận qua Email</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Mỗi đơn đăng ký được tự động đẩy về hộp thư <strong className="text-zinc-200">{VOLUNTEER_EMAIL}</strong> bao gồm đầy đủ SĐT, ngày tham gia và dụng cụ mang theo.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Điều phối &amp; Phổ biến An toàn</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Trước ngày dọn rác 24 giờ, đội trưởng phụ trách sẽ gọi điện hoặc nhắn tin Zalo để tập hợp nhóm, phân công mang bao tải, ủng cao su và kẹp gắp.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>Xuất Báo Cáo Định Kỳ</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sử dụng nút &quot;Xuất file Excel/CSV&quot; ở trên cùng để lưu trữ danh sách tình nguyện viên phục vụ báo cáo với Đoàn trường hoặc Sở Tài nguyên và Môi trường.
            </p>
          </div>
        </div>
      </div>

      {/* Volunteer Detail Modal */}
      {selectedVol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full bg-zinc-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>Chi tiết Tình nguyện viên</span>
            </h3>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Họ và tên</span>
                <span className="text-sm font-bold text-white">{selectedVol.fullName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Số điện thoại</span>
                  <a href={`tel:${selectedVol.phone}`} className="font-mono text-emerald-400 font-bold hover:underline">
                    {selectedVol.phone}
                  </a>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Email</span>
                  <span className="text-zinc-300 truncate block">{selectedVol.email || 'Không có'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Chiến dịch đăng ký</span>
                <span className="font-bold text-white">{selectedVol.hotspotTitle}</span>
                {selectedVol.hotspotLocation && (
                  <span className="text-zinc-400 text-[11px] block mt-0.5">{selectedVol.hotspotLocation}</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Ngày tham gia</span>
                <span className="font-semibold text-teal-300">{selectedVol.availableDate}</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Ghi chú &amp; Dụng cụ</span>
                <p className="text-zinc-300 italic">{selectedVol.notes || 'Không có ghi chú thêm.'}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedVol(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerRegistryPage;
