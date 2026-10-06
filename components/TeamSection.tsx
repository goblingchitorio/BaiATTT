import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/environmentalData';
import { Shield, CheckCircle2, LayoutGrid, Table as TableIcon } from 'lucide-react';

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const TeamSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  return (
    <section id="team" className="py-20 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Shield className="w-4 h-4" />
              <span>PHẦN 1 · ĐỘI NGŨ DỰ ÁN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Thành viên Dự án &amp; Phân công Nhiệm vụ
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Đội ngũ liên ngành kết hợp giữa công nghệ phần mềm, phân tích dữ liệu không gian địa lý, thiết kế trải nghiệm người dùng và nghiên cứu sinh thái môi trường.
            </p>
          </div>

          {/* View mode toggle (Grid vs Table) */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Thẻ thành viên ({TEAM_MEMBERS.length})</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Bảng phân công</span>
            </button>
          </div>
        </div>

        {/* 3x2 Grid Cards (Thẻ lưới 3x2 hiện đại, Card lift effect & Viền sáng gradient) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group relative rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient glowing border effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-800 to-zinc-900 transition-all duration-500 group-hover:from-emerald-500 group-hover:via-teal-400 group-hover:to-cyan-500 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]" />

                {/* Card Body */}
                <div className="relative h-full bg-zinc-900/90 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between border border-zinc-800/80 group-hover:border-transparent transition-colors">
                  <div>
                    {/* Header: Avatar + Number Badge */}
                    <div className="flex items-center justify-between mb-5">
                      {/* Monogram Initials Badge (Thay cho ảnh đại diện) */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-zinc-800 to-teal-500/20 border-2 border-emerald-500/40 group-hover:border-emerald-400 group-hover:scale-105 flex items-center justify-center transition-all duration-300 shadow-lg shadow-emerald-950/40">
                          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                            {getInitials(member.name)}
                          </span>
                        </div>
                        <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-zinc-950 border border-emerald-500/80 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-400 shadow">
                          0{member.id}
                        </div>
                      </div>

                      {/* Social icons */}
                      <div className="flex items-center gap-1.5">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 transition-all"
                          title="LinkedIn"
                        >
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 transition-all"
                          title="GitHub"
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </a>
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-emerald-600 transition-all"
                          title="Facebook"
                        >
                          <FacebookIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-400 mt-1 uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>

                    {/* Bio snippet */}
                    <p className="text-xs text-zinc-400 italic mb-4 border-l-2 border-emerald-600/40 pl-3">
                      "{member.bioSnippet}"
                    </p>

                    {/* Specific Responsibility */}
                    <div className="mt-3 pt-3 border-t border-zinc-800/80">
                      <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                        <span>Trách nhiệm cụ thể</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                        {member.responsibility}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800/50 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Thành viên cốt lõi</span>
                    <span className="text-emerald-400 font-medium group-hover:underline">Chi tiết hồ sơ →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View Matching Specification */
          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <th className="py-4 px-6 w-16">STT</th>
                  <th className="py-4 px-6">Họ và tên</th>
                  <th className="py-4 px-6">Vai trò chính trong dự án</th>
                  <th className="py-4 px-6">Trách nhiệm cụ thể</th>
                  <th className="py-4 px-6 text-right">Liên hệ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {TEAM_MEMBERS.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-zinc-800/40 transition-colors group"
                  >
                    <td className="py-4 px-6 font-mono text-zinc-400 font-bold">
                      0{member.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-zinc-800 border border-emerald-500/40 flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0 shadow-sm">
                          {getInitials(member.name)}
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {member.name}
                          </div>
                          <div className="text-xs text-zinc-400">{member.bioSnippet}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-emerald-400">
                      {member.role}
                    </td>
                    <td className="py-4 px-6 text-zinc-300 max-w-md text-xs sm:text-sm">
                      {member.responsibility}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md hover:bg-zinc-700 text-zinc-400 hover:text-white"
                        >
                          <LinkedInIcon className="w-4 h-4" />
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md hover:bg-zinc-700 text-zinc-400 hover:text-white"
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </a>
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md hover:bg-zinc-700 text-zinc-400 hover:text-white"
                        >
                          <FacebookIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
