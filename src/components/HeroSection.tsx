import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

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
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
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

      {/* Hero Heading */}
      <div className="w-full overflow-hidden z-0 px-2">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-[9.5vw] sm:text-[10.5vw] md:text-[11.5vw] lg:text-[12.2vw] mt-6 sm:mt-4 md:-mt-5 select-none text-center">
            Hi, i&apos;m shashank
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait - Magnet Wrapped */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Shashank Portrait"
              className="w-full h-auto object-cover max-h-[70vh] sm:max-h-[80vh] drop-shadow-2xl"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20">
        {/* Left paragraph */}
        <FadeIn delay={0.35} y={20} className="max-w-[200px] sm:max-w-[280px] md:max-w-[340px]">
          <p
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
          >
            CS ENGINEERING STUDENT & ASPIRING SOFTWARE DEVELOPER BUILDING DIGITAL EXPERIENCES
          </p>
        </FadeIn>

        {/* Right contact button */}
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
      </div>
    </section>
  );
};

export default HeroSection;
