import React from 'react';
import { Global3DCanvas } from './components/Global3DCanvas';
import { GlobalCursorGlow } from './components/GlobalCursorGlow';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FadeIn } from './components/FadeIn';
import { ContactButton } from './components/ContactButton';
import { ParallaxContainer } from './components/ParallaxContainer';
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-kanit overflow-x-clip selection:bg-[#BBCCD7] selection:text-[#0C0C0C] relative">
      {/* GLOBAL 3D CANVAS ENVIRONMENT (Three.js WebGL) */}
      <Global3DCanvas />

      {/* GLOBAL DYNAMIC CURSOR LIGHT GLOW */}
      <GlobalCursorGlow />

      {/* 1. HERO SECTION */}
      <HeroSection onNavigate={handleNavigate} />

      {/* 2. ABOUT SECTION */}
      <AboutSection />

      {/* 4. SKILLS SECTION */}
      <SkillsSection />

      {/* 5. PROJECTS SECTION */}
      <ProjectsSection />

      {/* FOOTER & CONTACT SECTION */}
      <footer
        id="contact"
        className="bg-transparent text-[#D7E2EA] pt-20 pb-12 px-6 md:px-10 border-t border-[#D7E2EA]/10 relative z-20"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-12">
          <ParallaxContainer depth={12}>
            <FadeIn delay={0} y={30} className="flex flex-col items-center gap-6">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                Get in touch
              </span>
              <h2
                style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
                className="hero-heading font-black uppercase tracking-tight leading-none drop-shadow-xl"
              >
                Let&apos;s Work Together
              </h2>
              <p className="text-[#D7E2EA]/80 font-light max-w-xl text-base sm:text-lg">
                Have an exciting project or collaboration opportunity? Feel free to reach out and connect!
              </p>
            </FadeIn>
          </ParallaxContainer>

          <ParallaxContainer depth={16}>
            <FadeIn delay={0.2} y={20}>
              <ContactButton
                label="Send a Message"
                onClick={() => {
                  window.location.href = 'mailto:arshashank49@gmail.com';
                }}
              />
            </FadeIn>
          </ParallaxContainer>

          {/* Social Links */}
          <ParallaxContainer depth={8}>
            <FadeIn delay={0.3} y={20} className="flex items-center gap-6 pt-6">
              <a
                href="mailto:arshashank49@gmail.com"
                aria-label="Email"
                className="p-3.5 rounded-full border border-[#D7E2EA]/20 bg-[#121316]/70 hover:border-[#B600A8] hover:bg-[#B600A8]/20 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-5 h-5 text-[#D7E2EA]" />
              </a>
              <a
                href="https://github.com/Shashank22-jpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3.5 rounded-full border border-[#D7E2EA]/20 bg-[#121316]/70 hover:border-[#B600A8] hover:bg-[#B600A8]/20 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Github className="w-5 h-5 text-[#D7E2EA]" />
              </a>
              <a
                href="https://www.linkedin.com/in/shashank-a-r-70a89a326/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3.5 rounded-full border border-[#D7E2EA]/20 bg-[#121316]/70 hover:border-[#B600A8] hover:bg-[#B600A8]/20 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Linkedin className="w-5 h-5 text-[#D7E2EA]" />
              </a>
            </FadeIn>
          </ParallaxContainer>

          {/* Bottom Copyright + Scroll to top */}
          <div className="w-full pt-12 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#D7E2EA]/50 font-light">
            <p>© {new Date().getFullYear()} A R SHASHANK. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 uppercase tracking-widest hover:text-[#D7E2EA] transition-colors cursor-pointer"
            >
              Back to Top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
