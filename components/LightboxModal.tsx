import React from 'react';
import { GalleryItem } from '../types';
import { X, ExternalLink, Calendar, MapPin, Award } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 max-w-4xl w-full bg-zinc-900 border border-zinc-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              {item.category}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {item.year}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-res Image preview */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden max-h-[60vh]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[58vh]"
          />
        </div>

        {/* Details & Official Citation */}
        <div className="p-5 sm:p-6 bg-zinc-900/90 overflow-y-auto">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>

          <div className="flex items-center gap-2 text-xs text-emerald-400 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{item.location}</span>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            {item.caption}
          </p>

          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>
                Nguồn tài liệu chính thống trích xuất:{' '}
                <strong className="text-emerald-300 font-semibold">{item.source}</strong> (Báo cáo thường niên về rác thải nhựa)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
              >
                <span>Xem tư liệu gốc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-medium transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;
