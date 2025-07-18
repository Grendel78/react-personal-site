import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useIsMobile } from './useMobile';

const IMANOK_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA', 'Enter'
];

export const useImanokCode = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const isMobile = useIsMobile();

  const triggerEasterEgg = () => {
    setShowSuccess(true);
    
    const audio = new Audio('/artnoc.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Fallback if audio fails
      console.log('🎮 Secret Code Activated!');
    });

    // Fireworks function
    const firework = () => {
      confetti({
        particleCount: 120,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#a8e6cf', '#dcedc1', '#ffd3a5', '#f093fb', '#f5576c']
      });
    };

    // Create fireworks over 5 seconds
    const fireworkInterval = setInterval(firework, 200);
    
    // Stop fireworks after 5 seconds
    setTimeout(() => {
      clearInterval(fireworkInterval);
    }, 5000);

    // Hide success message and reset after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setProgress(0);
    }, 5000);
  };

  useEffect(() => {
    // Don't enable konami code on mobile devices
    if (isMobile) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      setSequence(prevSequence => {
        const newSequence = [...prevSequence, event.code];
        
        // Keep only the last 11 keys (length of Imanok code)
        if (newSequence.length > IMANOK_CODE.length) {
          newSequence.shift();
        }
        
        // Check progress in the sequence
        let correctProgress = 0;
        for (let i = 0; i < newSequence.length; i++) {
          if (newSequence[i] === IMANOK_CODE[i]) {
            correctProgress = i + 1;
          } else {
            correctProgress = 0;
            break;
          }
        }
        
        setProgress(correctProgress);
        
        // Check if the sequence matches the Imanok code
        if (newSequence.length === IMANOK_CODE.length) {
          const isImanokCode = newSequence.every((key, index) => key === IMANOK_CODE[index]);
          if (isImanokCode) {
            triggerEasterEgg();
            return []; // Reset sequence
          }
        }
        
        // Reset if sequence is broken
        if (correctProgress === 0 && newSequence.length > 0) {
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile]);

  return { progress, showSuccess };
};
