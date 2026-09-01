import React from 'react';
import { FadeIn } from './FadeIn';

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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8 w-full max-w-3xl">
          {activeCategories.map((cat, i) => (
            <FadeIn key={cat.title} delay={i * 0.15} y={30} className="w-full">
              <div className="h-full rounded-[30px] sm:rounded-[40px] border border-[#BBCCD7]/20 bg-[#0C0C0C]/80 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#B600A8]/60 transition-all duration-300 shadow-2xl group">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium uppercase tracking-wide text-[#D7E2EA] mb-6 pb-4 border-b border-[#D7E2EA]/10 flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="text-xs font-light text-[#BBCCD7]/60 tracking-widest lowercase">
                      {cat.skills.length} skills
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-6 py-3 rounded-full border border-[#BBCCD7]/25 bg-[#18011F]/70 text-[#D7E2EA] font-medium text-sm sm:text-base tracking-wide hover:border-[#B600A8] hover:bg-[#B600A8]/20 hover:scale-105 transition-all duration-200 shadow-md cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
