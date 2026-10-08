import React from 'react';
import { Leaf, Heart, Globe, Shield, ExternalLink } from 'lucide-react';
import { Facebook } from './FacebookIcon';
import { TEAM_MEMBERS } from '../data/environmentalData';

const FANPAGE_URL = 'https://www.facebook.com/profile.php?id=61594950100287';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12 relative overflow-hidden text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-wider">GENGREEN.ECO</span>
                <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                  Hành động vì môi trường xanh
                </p>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs">
              Dự án nghiên cứu thực trạng và số hóa dữ liệu địa điểm ô nhiễm rác thải nhựa tại Việt Nam. Khuyến khích lối sống 3R, nâng cao nhận thức cộng đồng và kết nối các chiến dịch tình nguyện dọn sạch đại dương.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>Sáng kiến Thanh niên Vì Môi trường</span>
              </div>
              <a
                href={FANPAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600/30 hover:text-white transition-all w-fit"
              >
                <Facebook className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
                <span>Fanpage Facebook GenGreen</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Danh mục Nội dung
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Trang chủ &amp; Thông điệp
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('team')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Phần 1: Thành viên Dự án (7 thành viên)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('status')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Phần 2: Thực trạng &amp; Thư viện Ảnh HD
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('solutions')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Phần 2.2: Hệ thống Giải pháp 3R
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Phần 3: Biểu đồ Trực quan hóa Dữ liệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('map')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Phần 4: Bản đồ Điểm đen Rác thải Cộng đồng
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('fanpage')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400 fill-blue-500" />
                  <span>Phần 5: Fanpage Facebook GenGreen</span>
                </button>
              </li>
              <li>
                <a
                  href="#/volunteers"
                  className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold flex items-center gap-1"
                >
                  <span>📋 Trang tổng hợp tình nguyện viên</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Mới</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Team Credits */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Đội ngũ Phát triển Dự án
            </h4>
            <ul className="space-y-2">
              {TEAM_MEMBERS.map((m) => (
                <li key={m.id} className="flex items-baseline justify-between text-[11px]">
                  <span className="text-white font-medium">{m.name}</span>
                  <span className="text-zinc-400 truncate max-w-[130px] ml-2 text-right">
                    {m.role.split('/')[0]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Data Sources & Citations */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Nguồn Trích dẫn &amp; Đối tác
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Dữ liệu và tư liệu hình ảnh được tổng hợp từ các báo cáo thường niên chính thống:
            </p>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                🌱 <strong>UNEP</strong> · Chương trình Môi trường Liên Hợp Quốc
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                🐼 <strong>WWF Vietnam</strong> · Quỹ Quốc tế Bảo tồn Thiên nhiên
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                🇻🇳 <strong>Bộ TN&amp;MT</strong> · Báo cáo Hiện trạng Môi trường Quốc gia
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                <a
                  href="https://www.openstreetmap.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5"
                >
                  <span>🗺️ <strong>OpenStreetMap</strong> · Dữ liệu địa lý bản đồ mở</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © 2026 GENGREEN · Sáng kiến Giảm thiểu Rác thải Nhựa. Vì một Việt Nam không rác thải nhựa đại dương.
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Thiết kế &amp; Lập trình với tinh thần vì Môi trường</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1" />
            <span>bởi Nhóm 7 thành viên</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
