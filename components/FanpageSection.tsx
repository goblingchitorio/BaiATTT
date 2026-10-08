import React, { useState } from 'react';
import {
  ExternalLink,
  MessageCircle,
  Share2,
  ThumbsUp,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Copy,
  Check,
  Heart,
  MessageSquare,
  QrCode,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Camera
} from 'lucide-react';
import { Facebook } from './FacebookIcon';

export const FANPAGE_URL = 'https://www.facebook.com/profile.php?id=61594950100287';
export const MESSENGER_URL = 'https://m.me/61594950100287';

const FanpageSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(FANPAGE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const samplePosts = [
    {
      id: 1,
      date: 'Hôm nay · 08:30',
      title: 'Ra quân tổng vệ sinh Kênh Tham Lương - Cầu Kênh Lương đợt 3',
      content:
        'Hơn 45 bạn tình nguyện viên sinh viên HCMUTE và thanh niên địa phương đã cùng thu gom hơn 850kg rác thải nhựa, túi nilon và lục bình ứ đọng. Cảm ơn sự đồng hành tuyệt vời của mọi người!',
      image:
        'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
      tag: 'Nhật ký ra quân',
      likes: 342,
      comments: 58,
      shares: 41
    },
    {
      id: 2,
      date: '3 ngày trước',
      title: 'Kêu gọi 30 bạn trẻ tham gia làm sạch Bãi bồi Kênh Đôi (Quận 8)',
      content:
        'Chủ nhật tuần này lúc 07:30, GenGreen tiếp tục hành trình trả lại màu xanh cho dòng kênh. Tình nguyện viên được hỗ trợ đầy đủ ủng, găng tay cao su y tế, kẹp gắp rác và nước giải khát.',
      image:
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      tag: 'Kêu gọi tình nguyện',
      likes: 512,
      comments: 89,
      shares: 76
    },
    {
      id: 3,
      date: '1 tuần trước',
      title: 'Infographic: 5 cách đơn giản giảm rác nhựa dùng 1 lần trong trường học',
      content:
        'Mỗi ngày một sinh viên có thể thải ra từ 3-5 món đồ nhựa dùng một lần. Cùng xem bí kíp nhỏ giúp bạn tiết kiệm và bảo vệ môi trường ngay tại giảng đường nhé!',
      image:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      tag: 'Kiến thức sống xanh',
      likes: 278,
      comments: 34,
      shares: 63
    }
  ];

  return (
    <section id="fanpage" className="py-20 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-emerald-500/15 to-teal-400/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Facebook className="w-4 h-4 fill-blue-500 text-blue-500" />
            <span>Kênh Truyền Thông Chính Thức</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Theo Dõi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-300">Fanpage Facebook</span> Dự Án GenGreen
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Kết nối với hơn 2.400+ bạn trẻ, tình nguyện viên và người dân cùng chung lý tưởng vì một môi trường xanh sạch đẹp. Cập nhật nhật ký ra quân, lịch dọn rác mới nhất và thông điệp sống xanh mỗi ngày!
          </p>
        </div>

        {/* Main Fanpage Showcase Card */}
        <div className="max-w-4xl mx-auto mb-14 bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm transition-all hover:border-zinc-700">
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-64 w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-blue-950 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80"
              alt="GenGreen Fanpage Cover"
              className="w-full h-full object-cover opacity-45 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

            {/* Slogan Banner on Cover */}
            <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-emerald-500/30 text-xs text-emerald-300 font-semibold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dự Án Môi Trường · HCMUTE 2026</span>
            </div>

            <div className="absolute bottom-4 left-6 sm:left-40 hidden sm:block">
              <span className="text-xs text-emerald-300/90 font-mono tracking-wider uppercase font-semibold">
                Vì Một Tương Lai Không Rác Nhựa · Hành Động Nhỏ, Thay Đổi Lớn
              </span>
            </div>
          </div>

          {/* Profile Header Bar */}
          <div className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              {/* Avatar & Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                {/* Avatar with Ring */}
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-emerald-600 to-blue-600 p-1 shadow-2xl shadow-emerald-500/20">
                    <div className="w-full h-full rounded-[22px] bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden border border-zinc-800">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-1">
                        <Facebook className="w-8 h-8 fill-blue-500 text-blue-500" />
                      </div>
                      <span className="text-[10px] font-black tracking-widest text-white uppercase">GENGREEN</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-blue-500 text-white shadow-md border-2 border-zinc-900" title="Trang cộng đồng chính thức">
                    <CheckCircle2 className="w-4 h-4 fill-white text-blue-500" />
                  </div>
                </div>

                {/* Identity Info */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      GenGreen - Hành Động Vì Môi Trường Xanh
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-bold">
                      Trang Cộng Đồng
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-mono flex items-center justify-center sm:justify-start gap-2">
                    <span>@gengreen.environment</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-semibold">HCMUTE Project</span>
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-zinc-300">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <strong>2.4K+</strong> người theo dõi
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <ThumbsUp className="w-4 h-4 text-blue-400" />
                      <strong>1.8K+</strong> lượt thích
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <span>⭐ 5.0</span> (Hơn 120 đánh giá tích cực)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto">
                <a
                  href={FANPAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Facebook className="w-4 h-4 fill-white" />
                  <span>Truy Cập Fanpage</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700 transition-all flex items-center justify-center gap-2"
                  title="Nhắn tin trực tiếp qua Messenger"
                >
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span>Nhắn Tin</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-all relative"
                  title="Sao chép link Fanpage"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-emerald-500 text-zinc-950 font-bold text-[10px] whitespace-nowrap shadow-lg">
                      Đã sao chép link!
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setShowQrModal(true)}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-all"
                  title="Mở mã QR quét trên điện thoại"
                >
                  <QrCode className="w-4 h-4 text-teal-400" />
                </button>
              </div>
            </div>

            {/* Direct Fanpage Link Badge */}
            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-300 overflow-hidden">
                <span className="text-zinc-500 shrink-0">Đường dẫn chính thức:</span>
                <a
                  href={FANPAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:underline truncate hover:text-emerald-300"
                >
                  {FANPAGE_URL}
                </a>
              </div>
              <span className="text-[11px] text-zinc-400 shrink-0">
                Phản hồi tin nhắn nhanh trong vòng <strong className="text-emerald-300">2-4 giờ</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              Hình Ảnh &amp; Video Thực Tế
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cập nhật trọn vẹn nhật ký những đợt ra quân dọn rác, thành quả thu gom rác nhựa và các khoảnh khắc nhiệt huyết của tình nguyện viên.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-blue-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              Lịch Ra Quân Hằng Tuần
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Nhận thông báo sớm nhất về thời gian, địa điểm tập kết, trang phục bảo hộ và số lượng thành viên cần cho từng điểm nóng rác thải.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-teal-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
              Lan Tỏa Lối Sống 3R
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Chia sẻ các mẹo giảm thiểu rác nhựa dùng một lần, hướng dẫn phân loại rác tại gia đình &amp; trường học dễ nhớ và thực tế.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-sky-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 border border-sky-500/20 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
              Tương Tác &amp; Góp Ý Trực Tiếp
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Bạn có thể nhắn tin báo điểm rác mới, gửi tọa độ hoặc đề xuất cùng nhóm GenGreen tổ chức chiến dịch dọn rác tại địa phương bạn.
            </p>
          </div>
        </div>

        {/* Highlighted Posts from Fanpage */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Bản Tin Nổi Bật Trên Fanpage</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">
                  Cập nhật liên tục
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Các bài viết truyền thông thu hút lượng tương tác lớn từ cộng đồng thanh niên yêu môi trường
              </p>
            </div>

            <a
              href={FANPAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Xem tất cả bài viết trên Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800 overflow-hidden flex flex-col hover:border-zinc-700 transition-all group"
              >
                {/* Post Image */}
                <div className="relative h-44 overflow-hidden bg-zinc-950">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                      {post.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-950/80 text-[10px] text-zinc-300 backdrop-blur-sm">
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {post.title}
                    </h5>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                      {post.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-rose-400">
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                        <span className="font-semibold">{post.likes}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.comments}</span>
                      </span>
                    </div>

                    <a
                      href={FANPAGE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <span>Xem bài viết</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big Call-to-action Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/80 via-emerald-950/70 to-zinc-900 border border-blue-500/30 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
              Chung tay vì thành phố xanh
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Bạn Đã Sẵn Sàng Trở Thành Một Phần Của GenGreen?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Hãy nhấn nút <strong>Like &amp; Follow</strong> Fanpage ngay bây giờ để nhận thông báo về chiến dịch ra quân cuối tuần này!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={FANPAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2 hover:scale-105"
            >
              <Facebook className="w-4 h-4 fill-white" />
              <span>Theo Dõi Fanpage Ngay</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span>Gửi Tin Nhắn</span>
            </a>
          </div>
        </div>
      </div>

      {/* QR Code Modal for Mobile Scan */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">Mã QR Fanpage GenGreen</h4>
            <p className="text-xs text-zinc-400 mb-4">
              Mở camera hoặc ứng dụng Zalo/Facebook trên điện thoại để quét mã và truy cập nhanh:
            </p>

            <div className="bg-white p-4 rounded-2xl inline-block mb-4 shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  FANPAGE_URL
                )}`}
                alt="Fanpage QR Code"
                className="w-44 h-44 mx-auto"
              />
            </div>

            <div className="text-[11px] text-zinc-400 font-mono break-all mb-4 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              {FANPAGE_URL}
            </div>

            <a
              href={FANPAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Mở Trực Tiếp Trên Trình Duyệt</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default FanpageSection;
