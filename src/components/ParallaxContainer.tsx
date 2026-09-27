import React from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface ParallaxContainerProps {
  children: React.ReactNode;
  depth?: number; // Speed/distance factor (e.g. 15 for foreground, 5 for background)
  rotateFactor?: number; // Subtle tilt factor
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  depth = 10,
  rotateFactor = 0,
  className = '',
  style = {},
}) => {
  const { lerpX, lerpY, isMobile } = useMousePosition(0.05);

  const shiftX = isMobile ? 0 : lerpX * depth;
  const shiftY = isMobile ? 0 : -lerpY * depth;
  const rotX = isMobile ? 0 : -lerpY * rotateFactor;
  const rotY = isMobile ? 0 : lerpX * rotateFactor;

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: `translate3d(${shiftX}px, ${shiftY}px, 0px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
