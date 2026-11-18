import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Bot,
  CreditCard,
  Database,
  ArrowUpRight,
} from 'lucide-react';
import { ProjectData } from '../data/projectsData';

interface ProjectDetailsModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project || !project.details) return null;

  const { details } = project;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0C0C0C]/95 border-2 border-[#D7E2EA]/30 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(182,0,168,0.25)] flex flex-col overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 sm:p-7 md:p-8 border-b border-[#D7E2EA]/15 bg-[#121316]/80 backdrop-blur-md relative z-20">
              <div className="flex flex-col gap-1.5 pr-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-[#BBCCD7]">
                    {project.number}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#B600A8]/30 to-[#7621B0]/30 border border-[#B600A8]/60 text-[#D7E2EA] shadow-[0_0_12px_rgba(182,0,168,0.35)]">
                      <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                      Featured Project
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-[#BBCCD7]/70">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide text-[#D7E2EA]">
                  {project.title}
                </h2>
                {details.tagline && (
                  <p className="text-xs sm:text-sm md:text-base text-[#BBCCD7]/90 font-light italic">
                    {details.tagline}
                  </p>
                )}
              </div>

              {/* Action Buttons & Close */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D7E2EA]/30 bg-[#18011F]/70 text-[#D7E2EA] text-xs font-medium uppercase tracking-wider hover:border-[#B600A8] hover:bg-[#B600A8]/30 transition-all cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D7E2EA]/30 bg-[#121316] text-[#D7E2EA] text-xs font-medium uppercase tracking-wider hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 sm:p-2.5 rounded-full border border-[#D7E2EA]/20 bg-[#181818]/80 text-[#D7E2EA] hover:bg-[#B600A8]/20 hover:border-[#B600A8] hover:scale-105 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto p-5 sm:p-7 md:p-10 space-y-8 sm:space-y-10 custom-scrollbar flex-grow">
              {/* Screenshots Gallery */}
              {details.screenshots && details.screenshots.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B600A8]" />
                    <h3 className="text-sm sm:text-base uppercase tracking-widest font-semibold text-[#BBCCD7]">
                      Application Showcase
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {details.screenshots.map((s, idx) => (
                      <div
                        key={idx}
                        className="rounded-[20px] sm:rounded-[26px] overflow-hidden border border-[#D7E2EA]/20 bg-[#141416] p-2 sm:p-3 flex flex-col justify-between group shadow-xl"
                      >
                        <div className="overflow-hidden rounded-[16px] sm:rounded-[20px] bg-[#0C0C0C] aspect-[16/9]">
                          <img
                            src={s.url}
                            alt={s.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="pt-3 px-1.5 pb-1">
                          <h4 className="text-sm font-semibold text-[#D7E2EA] uppercase tracking-wide">
                            {s.caption}
                          </h4>
                          <p className="text-xs text-[#BBCCD7]/70 font-light mt-1">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 1. Project Overview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#B600A8]" />
                  <h3 className="text-sm sm:text-base uppercase tracking-widest font-semibold text-[#BBCCD7]">
                    Project Overview
                  </h3>
                </div>
                <div className="p-5 sm:p-6 rounded-[22px] bg-[#141418]/80 border border-[#D7E2EA]/15 shadow-inner">
                  <p className="text-sm sm:text-base text-[#D7E2EA]/90 leading-relaxed font-light">
                    {details.overview}
                  </p>
                </div>
              </div>

              {/* 2. Key Features */}
              {details.features && details.features.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B600A8]" />
                    <h3 className="text-sm sm:text-base uppercase tracking-widest font-semibold text-[#BBCCD7]">
                      Key Features & Capabilities
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {details.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-[20px] bg-[#141418]/80 border border-[#D7E2EA]/15 hover:border-[#B600A8]/60 transition-colors duration-200"
                      >
                        <h4 className="text-sm sm:text-base font-semibold text-[#D7E2EA] mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8]" />
                          {feat.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#BBCCD7]/75 font-light leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. System Architecture */}
              {details.architecture && details.architecture.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#B600A8]" />
                    <h3 className="text-sm sm:text-base uppercase tracking-widest font-semibold text-[#BBCCD7]">
                      System Architecture
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {details.architecture.map((arch, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-[20px] bg-[#141418]/80 border border-[#D7E2EA]/15 flex flex-col md:flex-row md:items-start justify-between gap-3"
                      >
                        <div className="md:w-1/3">
                          <h4 className="text-sm font-semibold text-[#D7E2EA] uppercase tracking-wide">
                            {arch.layer}
                          </h4>
                          <span className="text-xs text-[#B600A8] font-mono tracking-wide">
                            {arch.technologies}
                          </span>
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-xs sm:text-sm text-[#BBCCD7]/80 font-light leading-relaxed">
                            {arch.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Complete Technology Stack */}
              {details.techStackCategories && details.techStackCategories.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#B600A8]" />
                    <h3 className="text-sm sm:text-base uppercase tracking-widest font-semibold text-[#BBCCD7]">
                      Technology Stack
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {details.techStackCategories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-[20px] bg-[#141418]/80 border border-[#D7E2EA]/15 flex flex-col justify-between"
                      >
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#BBCCD7]/70 mb-3 border-b border-[#D7E2EA]/10 pb-2">
                          {cat.category}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 text-xs rounded-full bg-[#18011F]/70 border border-[#BBCCD7]/25 text-[#D7E2EA] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Engineering Challenges & Solutions */}
              {details.challenges && details.challenges.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B600A8]" />
                    <h3 className="text-sm sm:text-base uppercase tracking-widest font-semibold text-[#BBCCD7]">
                      Engineering Challenges & Solutions
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {details.challenges.map((c, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-[22px] bg-[#141418]/80 border border-[#D7E2EA]/15 space-y-2"
                      >
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#BE4C00]">
                          <span className="w-2 h-2 rounded-full bg-[#BE4C00]" />
                          Challenge: {c.challenge}
                        </div>
                        <div className="text-xs sm:text-sm text-[#BBCCD7]/85 font-light leading-relaxed pl-4 border-l-2 border-[#7621B0]/40">
                          <strong className="text-[#D7E2EA] font-medium">Solution: </strong>
                          {c.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Key Learnings & Takeaways */}
              {details.learnings && details.learnings.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B600A8]" />
                    <h3 className="text-sm sm:text-base uppercase tracking-widest font-semibold text-[#BBCCD7]">
                      Key Learnings
                    </h3>
                  </div>
                  <div className="p-5 rounded-[22px] bg-[#141418]/80 border border-[#D7E2EA]/15">
                    <ul className="space-y-2">
                      {details.learnings.map((learning, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#BBCCD7]/85 font-light leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#B600A8] flex-shrink-0 mt-0.5" />
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#D7E2EA]/15 bg-[#121316]/90 flex flex-wrap items-center justify-between gap-3 relative z-20">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#7621B0] text-white text-xs sm:text-sm font-medium uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all shadow-lg cursor-pointer"
                  >
                    <span>Visit Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[#D7E2EA]/10 transition-all cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub</span>
                  </a>
                )}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-[#D7E2EA]/20 text-[#BBCCD7] hover:text-white hover:border-[#D7E2EA]/40 text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
