import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Decorative 3D Images in 4 Corners */}
      
      {/* Top-Left: Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Bottom-Left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Floating Shape"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Top-Right: Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Bottom-Right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Object Group"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph */}
        <div className="mb-16 sm:mb-20 md:mb-24 max-w-[720px]">
          <AnimatedText
            text="I'm Shashank, a Computer Science Engineering student and aspiring software developer passionate about building modern, interactive, and user-focused digital experiences. I enjoy working with web technologies, exploring AI-powered solutions, and turning ideas into real-world projects. Currently, I'm focused on strengthening my skills in JavaScript, MERN stack development, Python, and system design while continuously learning and building new projects."
            className="text-[#D7E2EA] font-medium text-center leading-relaxed text-[clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        {/* Contact Button */}
        <FadeIn delay={0.4} y={20}>
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

export default AboutSection;
