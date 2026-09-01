import React, { useRef, useState } from 'react';
import { FadeIn } from './FadeIn';
import { Code2, Cpu, Terminal, Layers } from 'lucide-react';

interface SkillCategory {
  title: string;
  skills: string[];
}

interface SkillsSectionProps {
  categories?: SkillCategory[];
}

const DEFAULT_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'C', 'C++'],
  },
];

const getSkillIcon = (skillName: string) => {
  const lower = skillName.toLowerCase();
  if (lower.includes('python')) {
    return (
      <svg className="w-5 h-5 text-[#3776AB] inline-block mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.927 0c-5.834 0-5.467 2.535-5.467 2.535v2.636h5.539v.794H4.252S0 5.485 0 11.385c0 5.9 3.714 5.679 3.714 5.679h2.215v-3.111s-.121-3.714 3.653-3.714h6.059s3.533.061 3.533-3.412V2.535S19.575 0 11.927 0zM8.473 1.672a1.018 1.018 0 1 1 0 2.037 1.018 1.018 0 0 1 0-2.037zm3.6 22.328c5.834 0 5.467-2.535 5.467-2.535v-2.636H12v-.794h7.748s4.252.479 4.252-5.421c0-5.9-3.714-5.679-3.714-5.679h-2.215v3.111s.121 3.714-3.653 3.714h-6.059s-3.533-.061-3.533 3.412v4.303S4.425 24 12.073 24zm3.454-1.672a1.018 1.018 0 1 1 0-2.037 1.018 1.018 0 0 1 0 2.037z"/>
      </svg>
    );
  }
  if (lower.includes('c++')) {
    return <Code2 className="w-5 h-5 text-[#659AD2] inline-block mr-2" />;
  }
  if (lower === 'c') {
    return <Cpu className="w-5 h-5 text-[#A8B9CC] inline-block mr-2" />;
  }
  return <Terminal className="w-5 h-5 text-[#B600A8] inline-block mr-2" />;
};

// 3D Tilt Card Component
const TiltCard: React.FC<{ category: SkillCategory }> = ({ category }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation between -12 and 12 deg
    const rY = ((mouseX - width / 2) / (width / 2)) * 12;
    const rX = -((mouseY - height / 2) / (height / 2)) * 12;

    setRotate({ x: rX, y: rY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-in-out',
        transformStyle: 'preserve-3d',
      }}
      className="h-full rounded-[30px] sm:rounded-[40px] border border-[#BBCCD7]/25 bg-[#0C0C0C]/85 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#B600A8]/80 hover:shadow-[0_20px_50px_rgba(182,0,168,0.2)] transition-all duration-300 shadow-2xl group cursor-pointer"
    >
      <div style={{ transform: 'translateZ(30px)' }}>
        <h3 className="text-xl sm:text-2xl font-medium uppercase tracking-wide text-[#D7E2EA] mb-6 pb-4 border-b border-[#D7E2EA]/15 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#B600A8]" />
            {category.title}
          </span>
          <span className="text-xs font-light text-[#BBCCD7]/60 tracking-widest lowercase">
            {category.skills.length} skills
          </span>
        </h3>
        <div className="flex flex-wrap gap-3 sm:gap-4" style={{ transform: 'translateZ(40px)' }}>
          {category.skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center px-5 py-3 rounded-full border border-[#BBCCD7]/30 bg-[#18011F]/80 text-[#D7E2EA] font-medium text-sm sm:text-base tracking-wide hover:border-[#B600A8] hover:bg-[#B600A8]/30 hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer"
            >
              {getSkillIcon(skill)}
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories = DEFAULT_CATEGORIES,
}) => {
  const activeCategories = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  return (
    <section
      id="skills"
      className="relative z-10 w-full py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 overflow-hidden bg-gradient-to-b from-[#0C0C0C] via-[#161224] to-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] border-t border-[#7621B0]/30 shadow-[0_-20px_50px_rgba(118,33,176,0.15)]"
    >
      {/* Decorative Ambient Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#7621B0]/25 to-[#B600A8]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24 text-center">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#BBCCD7] font-medium mb-3 block">
            Technical Expertise
          </span>
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center drop-shadow-lg"
          >
            Skills
          </h2>
        </FadeIn>

        {/* 3D Tilt Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8 w-full max-w-3xl">
          {activeCategories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.15} y={30} className="w-full">
              <TiltCard category={cat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
