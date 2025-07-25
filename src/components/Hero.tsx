import { ArrowRight, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { useIsMobile } from '@/hooks/useMobile';
import { useAnalytics } from '@/hooks/useAnalytics';
import joedyImage from '@/assets/images/joedy.jpg';
import joedyResume from '@/assets/documents/joedy_felts_resume.pdf';

const Hero = () => {
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { trackButtonClick, trackEasterEgg } = useAnalytics();

  const handleViewMyWork = () => {
    trackButtonClick('View My Work', 'hero_section');
    
    // Scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    
    setIsHovering(true);
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set timeout to show speech bubble after 2.5 seconds
    hoverTimeoutRef.current = setTimeout(() => {
      setShowSpeechBubble(true);
      trackEasterEgg('hint_revealed');
    }, 2500);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    
    setIsHovering(false);
    
    // Clear timeout and hide speech bubble immediately
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setShowSpeechBubble(false);
  };

  return (
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden ${!isMobile ? 'pt-20' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <div className="mb-8 relative">
            <div 
              className={`w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 mx-auto mb-8 flex items-center justify-center backdrop-blur-sm border border-white/10 spotlight-hover ${
                isHovering && !isMobile ? 'animate-portrait-vibrate' : ''
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/30 to-purple-500/30 flex items-center justify-center">
                <img src={joedyImage} alt="Joedy Felts" className="w-40 h-40 rounded-full object-cover" />
              </div>
            </div>
            
            {/* Speech Bubble - Only show on desktop */}
            {!isMobile && (
              <div 
                className={`absolute -top-12 -left-16 translate-x-10 transition-all duration-300 ease-in-out pointer-events-none z-20 ${
                  showSpeechBubble ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative bg-white text-gray-800 px-6 py-4 rounded-2xl shadow-xl max-w-xs">
                  <p className="text-sm font-medium text-center leading-relaxed">
                    I've hidden a secret on this site... let's just say, if you're craving 30 lives, your fingers already know the way.
                  </p>
                  <div className="absolute bottom-0 right-5 transform translate-x-1 translate-y-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      className="fill-white"
                      style={{ transform: 'rotate(-154deg)' }}
                    >
                      <path d="M0,0 L20,10 L0,20 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text-subtle">Joedy Felts</span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl mb-4 font-light opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="gradient-text-coral">Full Stack Developer</span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8 opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <MapPin className="w-4 h-4" />
            <span>Richmond, VA</span>
          </div>
          
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            Full stack developer with over 10 years of experience building fast, accessible, and user-friendly web applications. I love turning complex problems into elegant solutions that are fun to use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 translate-y-4 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <Button 
              size="lg" 
              className="btn-energetic-coral px-8 py-3 text-white font-semibold"
              onClick={handleViewMyWork}
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10" />
            </Button>
            <a 
              href={joedyResume}
              download="Joedy_Felts_Resume.pdf"
              className="flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--energetic-primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => trackButtonClick('Download Resume', 'hero_section')}
            >
              <Button 
                variant="blue"
                size="lg"
                className="px-8 py-3 font-semibold"
                tabIndex={-1}
              >
                <Download className="mr-2 h-4 w-4" />
                <span>Download Resume</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
