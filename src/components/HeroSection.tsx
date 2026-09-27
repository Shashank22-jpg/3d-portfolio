import React from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { ParallaxContainer } from './ParallaxContainer';

interface HeroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-transparent z-10">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase())}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading with Subtle Parallax */}
      <div className="w-full overflow-hidden z-10 px-2 my-auto">
        <ParallaxContainer depth={14} rotateFactor={3}>
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-[9.5vw] sm:text-[10.5vw] md:text-[11.5vw] lg:text-[12.2vw] select-none text-center drop-shadow-2xl">
              Hi, i&apos;m shashank
            </h1>
          </FadeIn>
        </ParallaxContainer>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20">
        {/* Left paragraph with Parallax */}
        <ParallaxContainer depth={8}>
          <FadeIn delay={0.35} y={20} className="max-w-[200px] sm:max-w-[280px] md:max-w-[340px]">
            <p
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug drop-shadow-md"
            >
              CS ENGINEERING STUDENT & ASPIRING SOFTWARE DEVELOPER BUILDING DIGITAL EXPERIENCES
            </p>
          </FadeIn>
        </ParallaxContainer>

        {/* Right contact button */}
        <ParallaxContainer depth={12}>
          <FadeIn delay={0.5} y={20}>
            <ContactButton
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </FadeIn>
        </ParallaxContainer>
      </div>
    </section>
  );
};

export default HeroSection;
