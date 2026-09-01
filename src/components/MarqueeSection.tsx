import React, { useRef, useState, useEffect } from 'react';

const MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const row1Images = [...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11)];
const row2Images = [...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11)];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const row1X = scrollOffset - 200;
  const row2X = -(scrollOffset - 200);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: Moves RIGHT on scroll */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 w-max"
            style={{
              transform: `translate3d(${row1X}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {row1Images.map((src, index) => (
              <div
                key={`row1-${index}`}
                className="w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181818]"
              >
                <img
                  src={src}
                  alt={`Portfolio showcase tile ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 w-max"
            style={{
              transform: `translate3d(${row2X}px, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {row2Images.map((src, index) => (
              <div
                key={`row2-${index}`}
                className="w-[300px] h-[190px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181818]"
              >
                <img
                  src={src}
                  alt={`Portfolio showcase tile ${index + 12}`}
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
