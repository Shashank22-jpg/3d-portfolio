import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="price"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-28 text-center">
          <h2
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            className="font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
          >
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.1} y={30}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] gap-4 md:gap-12">
                {/* Number Left */}
                <div className="flex-shrink-0">
                  <span
                    style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                    className="font-black text-[#0C0C0C] leading-none tracking-tight block select-none"
                  >
                    {service.number}
                  </span>
                </div>

                {/* Name + Description Right */}
                <div className="flex flex-col gap-2 md:gap-3 flex-grow">
                  <h3
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                    className="font-medium uppercase tracking-wide text-[#0C0C0C]"
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
