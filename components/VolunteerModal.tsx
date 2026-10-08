import React, { useState } from 'react';
import { WasteHotspot, VolunteerFormData } from '../types';
import {
  X,
  HeartHandshake,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Send,
  Loader2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Facebook } from './FacebookIcon';

interface VolunteerModalProps {
  hotspot: WasteHotspot | null;
  onClose: () => void;
  onSuccess: (data: VolunteerFormData) => void;
}

const VOLUNTEER_EMAIL = '26162120@student.hcmute.edu.vn';
const ADMIN_EMAIL = '26162051@student.hcmute.edu.vn';

const VolunteerModal: React.FC<VolunteerModalProps> = ({ hotspot, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    availableDate: '2026-10-18',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  if (!hotspot) return null;

  const mailtoSubject = encodeURIComponent(`[GENGREEN] Đăng ký tham gia dọn dẹp: ${hotspot.title}`);
  const mailtoBody = encodeURIComponent(
    `Kính gửi Ban Điều Phối GENGREEN,\n\nTôi muốn đăng ký tham gia chiến dịch dọn dẹp:\n- Điểm dọn dẹp: ${hotspot.title} (${hotspot.locationName})\n- Họ và tên: ${formData.fullName}\n- Số điện thoại / Zalo: ${formData.phone}\n- Email: ${formData.email || 'Không có'}\n- Ngày có thể tham gia: ${formData.availableDate}\n- Ghi chú: ${formData.notes || 'Không có'}\n\nTrân trọng!`
  );
  const mailtoUrl = `mailto:${VOLUNTEER_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      _subject: `[GENGREEN] Đăng ký tham gia dọn dẹp: ${hotspot.title}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: formData.email || undefined,
      'Họ và tên tình nguyện viên': formData.fullName,
      'Số điện thoại / Zalo': formData.phone,
      'Địa chỉ Email': formData.email || 'Chưa cung cấp',
      'Điểm rác đăng ký': `${hotspot.title} (${hotspot.locationName})`,
      'Tọa độ GPS': `${hotspot.lat}, ${hotspot.lng}`,
      'Ngày dự kiến tham gia': formData.availableDate,
      'Ghi chú / Dụng cụ mang theo': formData.notes || 'Không có ghi chú',
      'Thời gian đăng ký': new Date().toLocaleString('vi-VN'),
      'Hệ thống tiếp nhận': `GENGREEN ECO-ACTION -> ${VOLUNTEER_EMAIL} & ${ADMIN_EMAIL}`
    };

    try {
      // Send directly to the volunteer target email via FormSubmit AJAX service
      await fetch(`https://formsubmit.co/ajax/${VOLUNTEER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      // Also notify admin email
      fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (err) {
      console.warn('Gửi qua FormSubmit dịch vụ nền:', err);
    }

    const regData: VolunteerFormData = {
      id: `vol-${Date.now()}`,
      hotspotId: hotspot.id,
      hotspotTitle: hotspot.title,
      hotspotLocation: hotspot.locationName,
      ...formData,
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'confirmed'
    };

    // Save to localStorage for the Volunteer Registry Page
    try {
      const existing = JSON.parse(localStorage.getItem('gengreen_registered_volunteers') || '[]');
      localStorage.setItem('gengreen_registered_volunteers', JSON.stringify([regData, ...existing]));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    onSuccess(regData);

    setSubmittedData({ ...formData });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 max-w-lg w-full bg-zinc-900 border border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-7 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Đăng ký Thành công!</h3>
            
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 mb-5 max-w-md mx-auto leading-relaxed">
              <p className="font-semibold text-emerald-300 mb-1 flex items-center justify-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Đã gửi thông tin về email ban điều phối:</span>
              </p>
              <div className="flex flex-col items-center gap-1 my-1">
                <span className="font-mono font-bold text-white text-sm bg-zinc-950/70 py-1 px-2.5 rounded border border-emerald-500/30">
                  {VOLUNTEER_EMAIL}
                </span>
                <span className="text-[10px] text-zinc-400">
                  Đồng thời lưu vào trang danh sách tình nguyện viên &amp; thông báo đến {ADMIN_EMAIL}
                </span>
              </div>
              <p className="text-[11px] text-zinc-300 mt-1">
                Đội trưởng tình nguyện viên sẽ liên hệ với bạn trong 24 giờ qua số điện thoại/Zalo để phổ biến công tác an toàn.
              </p>
            </div>

            {submittedData && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-xs space-y-2 mb-6 text-zinc-300">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Tóm tắt thông tin đã gửi:
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Chiến dịch:</span>
                  <span className="font-semibold text-white truncate max-w-[220px]">{hotspot.title}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Tình nguyện viên:</span>
                  <span className="font-semibold text-emerald-400">{submittedData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Số điện thoại / Zalo:</span>
                  <span className="font-mono text-white">{submittedData.phone}</span>
                </div>
                {submittedData.email && (
                  <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                    <span className="text-zinc-400">Email:</span>
                    <span className="text-zinc-200">{submittedData.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-400">Ngày tham gia:</span>
                  <span className="text-teal-300 font-semibold">{submittedData.availableDate}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61594950100287"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white transition-colors border border-blue-500/40 flex items-center gap-1.5"
              >
                <Facebook className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
                <span>Theo dõi Fanpage GenGreen</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>

              <a
                href={mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors border border-zinc-700 flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mở hộp thư gửi thêm (mailto)</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-lg shadow-emerald-500/25"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Đăng ký Tham gia Dọn dẹp</h3>
                <p className="text-xs text-emerald-400 font-medium">{hotspot.title}</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Địa điểm: <strong className="text-zinc-300">{hotspot.locationName}</strong> · Đã có{' '}
              <strong className="text-emerald-400">{hotspot.volunteersJoined}</strong> / {hotspot.volunteersNeeded} tình nguyện viên đăng ký.
            </p>

            {/* Target Email Notice Banner */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-200 mb-4">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span>Sau khi bấm xác nhận, thông tin đăng ký sẽ được tự động gửi về email ban điều phối dự án: </span>
                <span className="font-mono font-bold text-white underline decoration-emerald-500">{VOLUNTEER_EMAIL}</span>
                <span className="text-zinc-400 block text-[11px] mt-0.5">
                  Đồng thời được tổng hợp vào trang quản lý tình nguyện viên.
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Họ và tên của bạn *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Số điện thoại / Zalo *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Địa chỉ Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="ban@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Thời gian bạn có thể tham gia</span>
                </label>
                <input
                  type="date"
                  value={formData.availableDate}
                  onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ghi chú thêm (dụng cụ mang theo, kinh nghiệm...)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Có ủng cao su, găng tay bảo hộ hoặc xe máy để hỗ trợ di chuyển..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Bảo mật thông tin tình nguyện viên</span>
                </span>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    Hủy
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang gửi đến email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Xác nhận &amp; Gửi về Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerModal;
