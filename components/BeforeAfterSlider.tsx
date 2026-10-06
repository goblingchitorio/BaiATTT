import React, { useState, useRef, useCallback } from 'react';
import { BeforeAfterItem } from '../types';
import { MoveHorizontal, Sparkles, AlertOctagon, ExternalLink } from 'lucide-react';

interface BeforeAfterSliderProps {
  item: BeforeAfterItem;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 p-5 md:p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{item.title}</span>
          </h4>
          <p className="text-xs text-emerald-400 font-medium">{item.location}</p>
        </div>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-zinc-400 hover:text-emerald-400 font-mono inline-flex items-center gap-1 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800 transition-colors"
          title="Xem bài viết tư liệu nguồn"
        >
          <span>Nguồn: {item.source}</span>
          <ExternalLink className="w-3 h-3 text-emerald-400" />
        </a>
      </div>

      {/* Interactive Slider Container */}
      <div
        ref={containerRef}
        className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden cursor-ew-resize select-none border border-zinc-700/60"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* "After" Image (Background - Cleaned / Beautiful) */}
        <img
          src={item.afterImg}
          alt={item.afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* "After" Label Badge */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sau khi dọn dẹp</span>
        </div>

        {/* "Before" Image (Clipped Overlay - Polluted) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={item.beforeImg}
            alt={item.beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
            }}
          />
        </div>

        {/* "Before" Label Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          <span>Trước khi phục hồi</span>
        </div>

        {/* Slider Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-xl border-2 border-emerald-500">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Hint overlay at bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-zinc-950/70 border border-zinc-700/60 text-zinc-300 text-[11px] backdrop-blur-sm pointer-events-none">
          Kéo thanh trượt để so sánh Trước &amp; Sau
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 pt-3 border-t border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {item.description}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
