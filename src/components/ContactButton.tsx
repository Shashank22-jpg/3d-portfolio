import React, { useRef, useState } from 'react';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  onClick,
  label = 'Contact Me',
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rY = ((x - rect.width / 2) / (rect.width / 2)) * 14;
    const rX = -((y - rect.height / 2) / (rect.height / 2)) * 14;

    setRotate({ x: rX, y: rY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: isHovered
          ? '0px 12px 25px rgba(181, 1, 167, 0.45), inset 4px 4px 12px #7721B1'
          : '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
        transform: `perspective(600px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovered ? '12px' : '0px'}) scale(${isHovered ? 1.05 : 1})`,
        transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out' : 'transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out',
        transformStyle: 'preserve-3d',
      }}
      className={`rounded-full text-white font-medium uppercase tracking-widest cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
    >
      <span style={{ transform: 'translateZ(10px)', display: 'inline-block' }}>
        {label}
      </span>
    </button>
  );
};

export default ContactButton;
