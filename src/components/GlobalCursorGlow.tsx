import React from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const GlobalCursorGlow: React.FC = () => {
  const { pixelX, pixelY, isMobile } = useMousePosition(0.06);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-500 overflow-hidden"
      style={{
        background: `radial-gradient(550px circle at ${pixelX}px ${pixelY}px, rgba(118, 33, 176, 0.14), rgba(186, 0, 168, 0.05) 40%, rgba(12, 12, 12, 0) 80%)`,
      }}
      aria-hidden="true"
    />
  );
};

export default GlobalCursorGlow;
