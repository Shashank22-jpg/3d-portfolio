import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { Github } from 'lucide-react';

interface ProjectData {
  id: string;
  number: string;
  category: string;
  title: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: 'proj-1',
    number: '01',
    category: 'Full Stack & AI Platform',
    title: 'AI Travel Budget Planner',
    col1Img1: '/projects/ai-travel-budget-planner.png',
    col1Img2: '/projects/ai-travel-budget-planner.png',
    col2Img: '/projects/ai-travel-budget-planner.png',
    liveUrl: 'https://ai-travel-budget-planner.vercel.app/',
    githubUrl: 'https://github.com/Shashank22-jpg/AI-Travel-Budget-Planner',
  },
];

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-20 px-4 sm:px-6 md:px-10 relative z-10 w-full"
    >
      {/* Section Heading: Singular "Project" */}
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24 text-center">
        <h2
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
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
            />
          );
        })}
      </div>
    </section>
  );
};

interface CardProps {
  index: number;
  totalCards: number;
  project: ProjectData;
  progress: MotionValue<number>;
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  index,
  totalCards,
  project,
  progress,
  targetScale,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const start = index * (1 / totalCards);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  const topOffset = index * 28;

  return (
    <div
      ref={containerRef}
      className="sticky top-24 md:top-32 h-auto min-h-[80vh] md:h-[85vh] w-full max-w-6xl flex items-center justify-center mb-12 sm:mb-20"
      style={{ top: `calc(6rem + ${topOffset}px)` }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden"
      >
        {/* Top Row: Number, Category, Project Name, Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D7E2EA]/20">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 90px)' }}
              className="font-black text-[#D7E2EA] leading-none tracking-tight"
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#D7E2EA]/70 font-medium uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-3 text-sm hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <LiveProjectButton label="Live Project" href={project.liveUrl} />
            )}
          </div>
        </div>

        {/* Bottom Row: 2-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 flex-grow items-stretch">
          {/* Left Column (40% width): 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 sm:gap-6 justify-between h-full">
            {/* Top Left Image */}
            <div
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#181818]"
            >
              <img
                src={project.col1Img1}
                alt={`${project.title} Preview 1`}
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Bottom Left Image */}
            <div
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#181818]"
            >
              <img
                src={project.col1Img2}
                alt={`${project.title} Preview 2`}
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column (60% width): 1 Tall Image */}
          <div className="md:col-span-6 h-[280px] md:h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#181818]">
            <img
              src={project.col2Img}
              alt={`${project.title} Main Feature`}
              className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;
