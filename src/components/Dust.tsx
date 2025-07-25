import { useEffect, useRef, useState } from 'react';
import { useGlobalMousePosition } from '@/hooks/useGlobalMousePosition';
import { animated } from '@react-spring/web';

interface DustParticle {
  id: string;
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  size: number;
  gradient: string;
  blur: string;
  baseSpeed: number;
  brightness: number; // brightness multiplier for mouse interaction
}

const Dust = () => {
  const mousePos = useGlobalMousePosition();
  const mousePosRef = useRef({ x: 0, y: 0 });
  const dustRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<DustParticle[]>([]);

  // Update mouse position ref without triggering re-renders
  mousePosRef.current = mousePos;

  // Initialize particles with random positions and velocities
  useEffect(() => {
    const initialParticles: DustParticle[] = [
      {
        id: 'mote-1',
        x: 80, y: 80,
        vx: 0.42, vy: 0.26,
        size: 128,
        gradient: 'from-[hsl(14_95%_58%/0.12)] to-[hsl(198_93%_60%/0.08)]',
        blur: 'blur-xl',
        baseSpeed: 0.53,
        brightness: 1
      },
      {
        id: 'mote-2',
        x: window.innerWidth - 232, y: window.innerHeight - 112,
        vx: -0.26, vy: -0.42,
        size: 192,
        gradient: 'from-[hsl(285_85%_70%/0.1)] to-[hsl(14_95%_58%/0.08)]',
        blur: 'blur-xl',
        baseSpeed: 0.42,
        brightness: 1
      },
      {
        id: 'mote-3',
        x: window.innerWidth / 2 - 128, y: window.innerHeight / 2 - 128,
        vx: 0.21, vy: -0.32,
        size: 256,
        gradient: 'from-[hsl(198_93%_60%/0.06)] to-[hsl(285_85%_70%/0.05)]',
        blur: 'blur-2xl',
        baseSpeed: 0.26,
        brightness: 1
      },
      {
        id: 'mote-4',
        x: window.innerWidth * 0.75 - 80, y: 128,
        vx: -0.32, vy: 0.47,
        size: 160,
        gradient: 'from-[hsl(14_95%_58%/0.08)] to-[hsl(285_85%_70%/0.06)]',
        blur: 'blur-xl',
        baseSpeed: 0.47,
        brightness: 1
      },
      {
        id: 'mote-5',
        x: window.innerWidth * 0.25 - 72, y: window.innerHeight * 0.67 - 72,
        vx: 0.53, vy: -0.21,
        size: 144,
        gradient: 'from-[hsl(198_93%_60%/0.09)] to-[hsl(14_95%_58%/0.05)]',
        blur: 'blur-xl',
        baseSpeed: 0.58,
        brightness: 1
      },
      {
        id: 'mote-6',
        x: window.innerWidth * 0.67 - 56, y: window.innerHeight * 0.75 - 56,
        vx: -0.47, vy: 0.26,
        size: 112,
        gradient: 'from-[hsl(285_85%_70%/0.07)] to-[hsl(198_93%_60%/0.04)]',
        blur: 'blur-lg',
        baseSpeed: 0.68,
        brightness: 1
      },
      {
        id: 'mote-7',
        x: window.innerWidth * 0.15 - 32, y: window.innerHeight * 0.3 - 32,
        vx: 0.39, vy: 0.51,
        size: 64,
        gradient: 'from-[hsl(14_95%_58%/0.11)] to-[hsl(285_85%_70%/0.07)]',
        blur: 'blur-md',
        baseSpeed: 0.74,
        brightness: 1
      },
      {
        id: 'mote-8',
        x: window.innerWidth * 0.85 - 96, y: window.innerHeight * 0.45 - 96,
        vx: -0.33, vy: -0.58,
        size: 96,
        gradient: 'from-[hsl(198_93%_60%/0.1)] to-[hsl(14_95%_58%/0.06)]',
        blur: 'blur-lg',
        baseSpeed: 0.61,
        brightness: 1
      },
      {
        id: 'mote-9',
        x: window.innerWidth * 0.45 - 176, y: window.innerHeight * 0.8 - 176,
        vx: 0.28, vy: -0.44,
        size: 176,
        gradient: 'from-[hsl(285_85%_70%/0.08)] to-[hsl(198_93%_60%/0.05)]',
        blur: 'blur-xl',
        baseSpeed: 0.36,
        brightness: 1
      }
    ];
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newVx = particle.vx;
          let newVy = particle.vy;
          
          // Edge collision detection and bouncing
          if (newX <= 0 || newX >= window.innerWidth - particle.size) {
            newVx = -newVx * 0.8; // Slight damping on bounce
            newX = Math.max(0, Math.min(window.innerWidth - particle.size, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight - particle.size) {
            newVy = -newVy * 0.8; // Slight damping on bounce
            newY = Math.max(0, Math.min(window.innerHeight - particle.size, newY));
          }
          
          // Mouse deflection (only when close)
          const particleCenterX = newX + particle.size / 2;
          const particleCenterY = newY + particle.size / 2;
          
          const deltaX = mousePosRef.current.x - particleCenterX;
          const deltaY = mousePosRef.current.y - particleCenterY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          
          const deflectionRadius = 150;
          const deflectionStrength = 0.05;
          
          let newBrightness = 1; // Default brightness
          
          if (distance < deflectionRadius && distance > 0) {
            // Deflect velocity away from mouse
            const deflectionForce = (deflectionRadius - distance) / deflectionRadius;
            newVx += (-deltaX / distance) * deflectionForce * deflectionStrength;
            newVy += (-deltaY / distance) * deflectionForce * deflectionStrength;
            
            // Increase brightness by deflectionForce when close to mouse
            newBrightness = 1 + (deflectionForce * 2);
          }
          
          // Gentle speed normalization to maintain consistent movement
          const currentSpeed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (currentSpeed > 0) {
            const speedFactor = particle.baseSpeed / currentSpeed;
            newVx *= speedFactor;
            newVy *= speedFactor;
          }
          
          // Add subtle floating variation
          const time = Date.now() * 0.001;
          const floatX = Math.sin(time * 0.5 + particle.x * 0.01) * 0.1;
          const floatY = Math.cos(time * 0.3 + particle.y * 0.01) * 0.1;
          
          return {
            ...particle,
            x: newX + floatX,
            y: newY + floatY,
            vx: newVx,
            vy: newVy,
            brightness: newBrightness
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={dustRef} className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <OptimizedParticle key={particle.id} particle={particle} />
      ))}
    </div>
  );
};

const OptimizedParticle = ({ particle }: { particle: DustParticle }) => {
  return (
    <animated.div
      className={`absolute bg-gradient-to-br ${particle.gradient} rounded-full will-change-transform`}
      style={{
        transform: `translate3d(${particle.x}px, ${particle.y}px, 0px)`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        filter: `blur(${particle.blur === 'blur-xl' ? '20px' : particle.blur === 'blur-2xl' ? '32px' : particle.blur === 'blur-lg' ? '16px' : '12px'}) brightness(${particle.brightness})`,
      }}
    />
  );
};

export default Dust;