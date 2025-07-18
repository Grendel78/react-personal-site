import React, { useEffect, useState } from 'react';

interface SpotlightProps {
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  x,
  y,
  width,
  height,
  active,
}) => {
  // Dynamic radius based on window width
  const [radius, setRadius] = useState(320);
  const [opacity, setOpacity] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(160); // mobile
      else if (w < 1024) setRadius(240); // tablet
      else setRadius(320); // desktop
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (active && width > 0 && height > 0) {
      // Animate in
      setShouldRender(true);
      const timer = setTimeout(() => setOpacity(1.0), 50);
      return () => clearTimeout(timer);
    } else {
      // Animate out
      setOpacity(0);
      // Clean up after animation completes
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [active, width, height]);

  if (width === 0 || height === 0 || !shouldRender) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(18px)',
        opacity,
        transition: 'opacity 0.3s ease-out',
      }}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="spotlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="5%" stopColor="hsl(25 95% 80%)" stopOpacity="0.2" />
          <stop offset="30%" stopColor="hsl(var(--energetic-primary))" stopOpacity="0.25" />
          <stop offset="45%" stopColor="hsl(var(--energetic-primary))" stopOpacity="0.3" />
          <stop offset="55%" stopColor="hsl(var(--energetic-primary))" stopOpacity="0.3" />
          <stop offset="70%" stopColor="hsl(var(--energetic-primary))" stopOpacity="0.25" />
          <stop offset="95%" stopColor="hsl(var(--energetic-blurple))" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill="url(#spotlightGradient)"
      />
    </svg>
  );
};
