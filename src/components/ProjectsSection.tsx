import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { Github, Sparkles } from 'lucide-react';
import { PROJECTS, ProjectData } from '../data/projectsData';

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="bg-transparent text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-20 px-4 sm:px-6 md:px-10 relative z-10 w-full"
    >
      {/* Section Heading: "Projects" */}
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24 text-center">
        <h2
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center drop-shadow-xl"
        >
          Projects
        </h2>
      </FadeIn>

      {/* Sticky Stacking Cards Container */}
      <div ref={containerRef} className="relative flex flex-col items-center gap-12 sm:gap-16">
        {PROJECTS.map((project, index) => {
          const targetScale = 1 - (PROJECTS.length - 1 - index) * 0.03;
          return (
            <Card
              key={project.id}
              index={index}
              totalCards={PROJECTS.length}
              project={project}
              progress={scrollYProgress}
              targetScale={targetScale}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          );
        })}
      </div>

      {/* Expandable Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

interface CardProps {
  index: number;
  totalCards: number;
  project: ProjectData;
  progress: MotionValue<number>;
  targetScale: number;
  onOpenDetails: (project: ProjectData) => void;
}

const Card: React.FC<CardProps> = ({
  index,
  totalCards,
  project,
  progress,
  targetScale,
  onOpenDetails,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const start = index * (1 / totalCards);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  const topOffset = index * 28;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation between -8 and 8 degrees for smooth 3D tilt
    const rY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    const rX = -((y - rect.height / 2) / (rect.height / 2)) * 8;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rX, y: rY });
    setGlarePos({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="sticky top-24 md:top-32 h-auto min-h-[82vh] md:min-h-[88vh] w-full max-w-6xl flex items-center justify-center mb-12 sm:mb-20"
      style={{ top: `calc(6rem + ${topOffset}px)` }}
    >
      <motion.div
        style={{
          scale,
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-in-out',
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C]/90 backdrop-blur-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden relative group"
      >
        {/* Dynamic Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-30"
          style={{
            background: `radial-gradient(600px circle at ${glarePos.x}% ${glarePos.y}%, rgba(215, 226, 234, 0.12), transparent 80%)`,
          }}
          aria-hidden="true"
        />

        {/* Top Row: Number, Category, Project Name, Action Buttons with 3D depth */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6 pb-4 border-b border-[#D7E2EA]/20 relative z-20"
        >
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 90px)' }}
              className="font-black text-[#D7E2EA] leading-none tracking-tight"
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#B600A8]/30 to-[#7621B0]/30 border border-[#B600A8]/60 text-[#D7E2EA] shadow-[0_0_12px_rgba(182,0,168,0.35)]">
                    <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
                    Featured Project
                  </span>
                )}
                <span className="text-[#D7E2EA]/70 font-medium uppercase tracking-widest text-xs sm:text-sm">
                  {project.category}
                </span>
              </div>
              <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {project.title}
              </h3>
              {project.tagline && (
                <p className="text-xs sm:text-sm text-[#BBCCD7]/80 font-light italic mt-0.5">
                  {project.tagline}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {project.details && (
              <button
                type="button"
                onClick={() => onOpenDetails(project)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#B600A8] bg-[#18011F]/70 text-[#D7E2EA] font-medium uppercase tracking-widest px-5 py-3 text-xs sm:text-sm hover:bg-[#B600A8]/30 hover:scale-105 transition-all cursor-pointer shadow-[0_0_15px_rgba(182,0,168,0.25)]"
              >
                <Sparkles className="w-4 h-4 text-[#B600A8]" /> Details
              </button>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-5 py-3 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 hover:scale-105 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <LiveProjectButton label="Live Project" href={project.liveUrl} />
            )}
          </div>
        </div>

        {/* Technology Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div
            style={{ transform: 'translateZ(35px)' }}
            className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6 relative z-20"
          >
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-[#121316]/80 border border-[#D7E2EA]/20 text-[#D7E2EA]/90 hover:border-[#B600A8]/80 hover:text-[#D7E2EA] transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Row: 2-Column Image Grid with 3D Depth Shift */}
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 flex-grow items-stretch relative z-20 min-h-[260px] sm:min-h-[320px]"
        >
          {/* Left Column (40% width): 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6 justify-between h-full">
            {/* Top Left Image */}
            <div
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#181818] shadow-lg border border-[#D7E2EA]/20 group/img cursor-pointer relative"
              onClick={() => project.details && onOpenDetails(project)}
            >
              <img
                src={project.col1Img1}
                alt={`${project.title} Preview 1`}
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/img:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Bottom Left Image */}
            <div
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#181818] shadow-lg border border-[#D7E2EA]/20 group/img cursor-pointer relative"
              onClick={() => project.details && onOpenDetails(project)}
            >
              <img
                src={project.col1Img2}
                alt={`${project.title} Preview 2`}
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/img:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width): 1 Tall Image */}
          <div
            className="md:col-span-6 h-[260px] md:h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#181818] shadow-lg border border-[#D7E2EA]/20 group/img cursor-pointer relative"
            onClick={() => project.details && onOpenDetails(project)}
          >
            <img
              src={project.col2Img}
              alt={`${project.title} Main Feature`}
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] group-hover/img:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
