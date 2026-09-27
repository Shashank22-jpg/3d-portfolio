import { useState, useEffect, useRef } from 'react';

export interface MouseState {
  x: number; // -1 to 1
  y: number; // -1 to 1
  lerpX: number; // -1 to 1 (interpolated)
  lerpY: number; // -1 to 1 (interpolated)
  pixelX: number; // px from left
  pixelY: number; // px from top
  scrollProgress: number; // 0 to 1
  isMobile: boolean;
}

export function useMousePosition(lerpFactor: number = 0.05): MouseState {
  const [mouseState, setMouseState] = useState<MouseState>({
    x: 0,
    y: 0,
    lerpX: 0,
    lerpY: 0,
    pixelX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    pixelY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    scrollProgress: 0,
    isMobile: false,
  });

  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    pixelX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    pixelY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    scrollProgress: 0,
    isMobile: false,
  });

  useEffect(() => {
    const checkMobile = () => {
      stateRef.current.isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    };
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      if (stateRef.current.isMobile) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetX = x;
      stateRef.current.targetY = y;
      stateRef.current.pixelX = e.clientX;
      stateRef.current.pixelY = e.clientY;
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      stateRef.current.scrollProgress = progress;
    };

    const handleResize = () => {
      checkMobile();
      handleScroll();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let animationFrameId: number;

    const updateInertia = () => {
      const state = stateRef.current;

      if (state.isMobile) {
        // Subtle auto sine-wave float motion for mobile/touch
        const time = Date.now() * 0.001;
        state.targetX = Math.sin(time * 0.5) * 0.3;
        state.targetY = Math.cos(time * 0.3) * 0.2;
      }

      state.currentX += (state.targetX - state.currentX) * lerpFactor;
      state.currentY += (state.targetY - state.currentY) * lerpFactor;

      setMouseState({
        x: state.targetX,
        y: state.targetY,
        lerpX: state.currentX,
        lerpY: state.currentY,
        pixelX: state.pixelX,
        pixelY: state.pixelY,
        scrollProgress: state.scrollProgress,
        isMobile: state.isMobile,
      });

      animationFrameId = requestAnimationFrame(updateInertia);
    };

    animationFrameId = requestAnimationFrame(updateInertia);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lerpFactor]);

  return mouseState;
}

export default useMousePosition;
