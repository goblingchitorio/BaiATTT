import React, { useState } from 'react';
import { CHART_DATA_SUMMARY, AUTHORITATIVE_SOURCES } from '../data/environmentalData';
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Clock,
  Info,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

const DataDashboardSection: React.FC = () => {
  // Chart 1 (Donut) state
  const [activeDonutIndex, setActiveDonutIndex] = useState<number | null>(null);

  // Chart 2 (Bar) toggle datasets
  const [showTotalWaste, setShowTotalWaste] = useState(true);
  const [showRecycled, setShowRecycled] = useState(true);
  const [hoveredBarYear, setHoveredBarYear] = useState<string | null>(null);

  // Chart 3 (Line) hover point
  const [hoveredLineIndex, setHoveredLineIndex] = useState<number | null>(null);
  const [showVnWaste, setShowVnWaste] = useState(true);
  const [showVnLeak, setShowVnLeak] = useState(true);

  // Chart 4 (Decomposition Area / Bar) active item
  const [activeDecompIndex, setActiveDecompIndex] = useState<number | null>(null);

  // Math for Donut Chart
  const totalPercentage = CHART_DATA_SUMMARY.wasteTreatment.reduce((acc, curr) => acc + curr.percentage, 0);
  let cumulativeAngle = 0;
  const donutSegments = CHART_DATA_SUMMARY.wasteTreatment.map((item, index) => {
    const angle = (item.percentage / totalPercentage) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    // SVG arc calculation
    const radStart = ((startAngle - 90) * Math.PI) / 180;
    const radEnd = ((endAngle - 90) * Math.PI) / 180;
    const radius = 80;
    const innerRadius = 50;
    const cx = 100;
    const cy = 100;

    const x1 = cx + radius * Math.cos(radStart);
    const y1 = cy + radius * Math.sin(radStart);
    const x2 = cx + radius * Math.cos(radEnd);
    const y2 = cy + radius * Math.sin(radEnd);

    const x3 = cx + innerRadius * Math.cos(radEnd);
    const y3 = cy + innerRadius * Math.sin(radEnd);
    const x4 = cx + innerRadius * Math.cos(radStart);
    const y4 = cy + innerRadius * Math.sin(radStart);

    const largeArc = angle > 180 ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return { ...item, pathData, startAngle, endAngle, index };
  });

  return (
    <section id="dashboard" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4" />
            <span>PHẦN 3 · TRỰC QUAN HÓA DỮ LIỆU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hệ thống Biểu đồ Trực quan hóa Dữ liệu (Data Dashboard)
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">
            Thống kê động và biểu đồ tương tác phản ánh thực trạng phân bổ xử lý, tốc độ gia tăng rác thải nhựa qua các năm, xu hướng xả thải tại Việt Nam và thời gian phân hủy kéo dài hàng thế kỷ.
          </p>
        </div>

        {/* 2x2 Grid of Interactive Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ============================================================== */}
          {/* BIỂU ĐỒ 1: TRÒN (DONUT / PIE CHART) - PHÂN BỔ XỬ LÝ */}
          {/* ============================================================== */}
          <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between backdrop-blur-sm hover:border-zinc-700 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <PieIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Biểu đồ 1: Phân bổ Xử lý Rác thải Nhựa</h3>
                    <p className="text-xs text-zinc-400">Tỷ lệ % Tái chế, Chôn lấp và Thải ra đại dương</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  Donut Chart
                </span>
              </div>

              {/* Chart Graphics */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-6">
                {/* SVG Donut */}
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                    {donutSegments.map((segment) => {
                      const isHovered = activeDonutIndex === segment.index;
                      return (
                        <path
                          key={segment.label}
                          d={segment.pathData}
                          fill={segment.color}
                          className="transition-all duration-300 cursor-pointer"
                          style={{
                            opacity: activeDonutIndex !== null && !isHovered ? 0.45 : 1,
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: '100px 100px',
                            filter: isHovered ? 'drop-shadow(0px 0px 8px rgba(255,255,255,0.4))' : 'none'
                          }}
                          onMouseEnter={() => setActiveDonutIndex(segment.index)}
                          onMouseLeave={() => setActiveDonutIndex(null)}
                        />
                      );
                    })}
                  </svg>

                  {/* Donut Center Info */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-2xl font-black text-white">
                      {activeDonutIndex !== null
                        ? `${CHART_DATA_SUMMARY.wasteTreatment[activeDonutIndex].percentage}%`
                        : '100%'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium px-2 truncate max-w-[100px]">
                      {activeDonutIndex !== null
                        ? CHART_DATA_SUMMARY.wasteTreatment[activeDonutIndex].label
                        : 'Tổng phát sinh'}
                    </span>
                  </div>
                </div>

                {/* Legends & Breakdown */}
                <div className="space-y-3 w-full sm:w-auto">
                  {CHART_DATA_SUMMARY.wasteTreatment.map((item, index) => {
                    const isHovered = activeDonutIndex === index;
                    return (
                      <div
                        key={item.label}
                        onMouseEnter={() => setActiveDonutIndex(index)}
                        onMouseLeave={() => setActiveDonutIndex(null)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isHovered
                            ? 'bg-zinc-800/80 border-emerald-500/50 shadow-md'
                            : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs font-semibold text-white">{item.label}</span>
                          </div>
                          <span
                            className="text-xs font-bold font-mono"
                            style={{ color: item.color }}
                          >
                            {item.percentage}%
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 pl-5">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Rê chuột lên các lát bánh để xem tỷ lệ phân bổ</span>
              </span>
              <a
                href={AUTHORITATIVE_SOURCES.vietnamRecycle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                title="Xem Báo cáo Hiện trạng Môi trường Quốc gia"
              >
                <span>Nguồn: Bộ TN&amp;MT</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BIỂU ĐỒ 2: CỘT GHÉP (BAR CHART) - SẢN LƯỢNG RÁC QUA CÁC NĂM */}
          {/* ============================================================== */}
          <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between backdrop-blur-sm hover:border-zinc-700 transition-colors shadow-lg">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Biểu đồ 2: Sản lượng Rác &amp; Tái chế qua các năm</h3>
                    <p className="text-xs text-zinc-400">Trục Y: Triệu tấn · Trục X: Năm (2018 - 2026)</p>
                  </div>
                </div>

                {/* Dataset Toggle buttons (Chọn/bỏ chọn dòng dữ liệu) */}
                <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
                  <button
                    onClick={() => setShowTotalWaste(!showTotalWaste)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      showTotalWaste
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    {showTotalWaste ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>Tổng rác</span>
                  </button>

                  <button
                    onClick={() => setShowRecycled(!showRecycled)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      showRecycled
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    {showRecycled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>Tái chế</span>
                  </button>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="my-6">
                <div className="h-52 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-zinc-800">
                  {CHART_DATA_SUMMARY.yearlyTrends.map((d) => {
                    const isHovered = hoveredBarYear === d.year;
                    const maxScale = 500; // max million tons
                    const totalHeight = (d.totalWaste / maxScale) * 100;
                    const recHeight = (d.recycled / maxScale) * 100;

                    return (
                      <div
                        key={d.year}
                        onMouseEnter={() => setHoveredBarYear(d.year)}
                        onMouseLeave={() => setHoveredBarYear(null)}
                        className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group relative"
                      >
                        {/* Tooltip on hover */}
                        {isHovered && (
                          <div className="absolute -top-16 z-30 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 shadow-xl text-left whitespace-nowrap pointer-events-none">
                            <div className="text-[11px] font-bold text-white">Năm {d.year}</div>
                            <div className="text-[10px] text-rose-400">Tổng: {d.totalWaste} triệu tấn</div>
                            <div className="text-[10px] text-emerald-400">Tái chế: {d.recycled}M ({d.rate})</div>
                          </div>
                        )}

                        <div className="w-full flex items-end justify-center gap-1 h-full">
                          {/* Bar 1: Total Waste */}
                          {showTotalWaste && (
                            <div
                              style={{ height: `${totalHeight}%` }}
                              className={`w-3.5 sm:w-5 rounded-t-sm transition-all duration-300 ${
                                isHovered
                                  ? 'bg-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                                  : 'bg-rose-500/80 hover:bg-rose-400'
                              }`}
                            />
                          )}

                          {/* Bar 2: Recycled */}
                          {showRecycled && (
                            <div
                              style={{ height: `${recHeight}%` }}
                              className={`w-3.5 sm:w-5 rounded-t-sm transition-all duration-300 ${
                                isHovered
                                  ? 'bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                                  : 'bg-emerald-500 hover:bg-emerald-400'
                              }`}
                            />
                          )}
                        </div>

                        {/* Year Label */}
                        <span
                          className={`text-[10px] mt-2 font-mono transition-colors ${
                            isHovered ? 'text-white font-bold' : 'text-zinc-400'
                          }`}
                        >
                          {d.year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                  <span>Tổng rác phát sinh</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  <span>Lượng được tái chế</span>
                </span>
              </div>
              <a
                href={AUTHORITATIVE_SOURCES.globalWaste.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                title="Xem Báo cáo UNEP & OECD"
              >
                <span>Nguồn: UNEP &amp; OECD</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BIỂU ĐỒ 3: ĐƯỜNG (LINE CHART) - XU HƯỚNG LƯỢNG RÁC 2015-2026 */}
          {/* ============================================================== */}
          <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between backdrop-blur-sm hover:border-zinc-700 transition-colors shadow-lg">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Biểu đồ 3: Xu hướng Rác thải tại Việt Nam</h3>
                    <p className="text-xs text-zinc-400">Giai đoạn 2015 - 2026 · Đơn vị: Nghìn tấn / năm</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
                  <button
                    onClick={() => setShowVnWaste(!showVnWaste)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      showVnWaste
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    {showVnWaste ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>Phát thải</span>
                  </button>

                  <button
                    onClick={() => setShowVnLeak(!showVnLeak)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      showVnLeak
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    {showVnLeak ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>Rò rỉ biển</span>
                  </button>
                </div>
              </div>

              {/* Line Chart SVG */}
              <div className="my-6">
                <div className="relative h-52 w-full">
                  <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="leakGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[40, 90, 140, 190].map((y) => (
                      <line
                        key={y}
                        x1="20"
                        y1={y}
                        x2="480"
                        y2={y}
                        stroke="#27272a"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Path 1: Total Waste Line (1100 -> 1840 scale to 0-2000 => y: 200 - (val/2000)*180) */}
                    {showVnWaste && (
                      <path
                        d="M 30 101 L 95 78 L 160 60 L 225 48 L 290 42 L 355 38 L 420 36 L 470 34"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    )}

                    {/* Path 2: Ocean Leak Line (280 -> 230 scale) */}
                    {showVnLeak && (
                      <path
                        d="M 30 174 L 95 171 L 160 167 L 225 168 L 290 172 L 355 174 L 420 176 L 470 179"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    )}

                    {/* Data Points on hover */}
                    {CHART_DATA_SUMMARY.vietnamTrends.map((pt, idx) => {
                      const x = 30 + idx * 62.8;
                      const yWaste = 200 - (pt.amount / 2000) * 180;
                      const yLeak = 200 - (pt.oceanLeak / 2000) * 180;
                      const isHovered = hoveredLineIndex === idx;

                      return (
                        <g key={pt.year} className="cursor-pointer">
                          {showVnWaste && (
                            <circle
                              cx={x}
                              cy={yWaste}
                              r={isHovered ? 6 : 4}
                              fill="#f59e0b"
                              stroke="#09090b"
                              strokeWidth="2"
                              onMouseEnter={() => setHoveredLineIndex(idx)}
                              onMouseLeave={() => setHoveredLineIndex(null)}
                            />
                          )}

                          {showVnLeak && (
                            <circle
                              cx={x}
                              cy={yLeak}
                              r={isHovered ? 6 : 4}
                              fill="#06b6d4"
                              stroke="#09090b"
                              strokeWidth="2"
                              onMouseEnter={() => setHoveredLineIndex(idx)}
                              onMouseLeave={() => setHoveredLineIndex(null)}
                            />
                          )}

                          {/* Year label below */}
                          <text
                            x={x}
                            y="198"
                            fill={isHovered ? '#ffffff' : '#71717a'}
                            fontSize="10"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {pt.year}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Active Tooltip card */}
                  {hoveredLineIndex !== null && (
                    <div className="absolute top-2 right-2 p-2.5 rounded-xl bg-zinc-950 border border-zinc-700 shadow-xl text-xs">
                      <div className="font-bold text-white mb-1">
                        Năm {CHART_DATA_SUMMARY.vietnamTrends[hoveredLineIndex].year}
                      </div>
                      <div className="text-amber-400">
                        Phát thải: {CHART_DATA_SUMMARY.vietnamTrends[hoveredLineIndex].amount} nghìn tấn
                      </div>
                      <div className="text-cyan-400">
                        Rò rỉ biển: {CHART_DATA_SUMMARY.vietnamTrends[hoveredLineIndex].oceanLeak} nghìn tấn
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Rò rỉ đại dương có dấu hiệu giảm nhẹ nhờ dọn sạch</span>
              </span>
              <a
                href={AUTHORITATIVE_SOURCES.vietnamWaste.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
                title="Xem Báo cáo World Bank & Bộ TN&MT"
              >
                <span>Nguồn: World Bank &amp; Bộ TN&amp;MT</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BIỂU ĐỒ 4: MIỀN (AREA / HORIZONTAL) - THỜI GIAN PHÂN HỦY NHỰA */}
          {/* ============================================================== */}
          <div className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between backdrop-blur-sm hover:border-zinc-700 transition-colors shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Biểu đồ 4: Thời gian Phân hủy các Loại Nhựa</h3>
                    <p className="text-xs text-zinc-400">Mức độ tồn lưu trong môi trường tự nhiên (Năm)</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  Area Timeline
                </span>
              </div>

              {/* Horizontal comparative Area Bars */}
              <div className="space-y-3.5 my-4">
                {CHART_DATA_SUMMARY.decompositionItems.map((item, index) => {
                  const maxYears = 1000;
                  const percentWidth = (item.years / maxYears) * 100;
                  const isHovered = activeDecompIndex === index;

                  return (
                    <div
                      key={item.item}
                      onMouseEnter={() => setActiveDecompIndex(index)}
                      onMouseLeave={() => setActiveDecompIndex(null)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-zinc-800/90 border-rose-500/50 shadow-md'
                          : 'bg-zinc-950/40 border-zinc-800/80 hover:bg-zinc-800/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.item}</span>
                        </span>
                        <span className="font-bold font-mono text-rose-400">
                          {item.years} năm
                        </span>
                      </div>

                      {/* Bar Fill */}
                      <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden relative">
                        <div
                          style={{
                            width: `${percentWidth}%`,
                            backgroundColor: item.color
                          }}
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHovered ? 'brightness-125' : ''
                          }`}
                        />
                      </div>

                      {isHovered && (
                        <div className="text-[11px] text-zinc-300 mt-2 pt-1 border-t border-zinc-800 flex items-center justify-between">
                          <span className="text-zinc-400">Nhóm: {item.category}</span>
                          <span className="text-rose-400 font-medium">
                            Gấp {Math.round(item.years / 80)} lần tuổi thọ con người!
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1 text-rose-400">
                <Info className="w-3.5 h-3.5" />
                <span>Túi nilon mất tới 1.000 năm để phân hủy hoàn toàn</span>
              </span>
              <a
                href={AUTHORITATIVE_SOURCES.decomposition.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-rose-400 hover:underline inline-flex items-center gap-1"
                title="Xem Báo cáo Phân hủy Rác biển NOAA"
              >
                <span>Nguồn: NOAA Marine Debris</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataDashboardSection;
