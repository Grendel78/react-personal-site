
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleGetInTouch = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Focus the first input field after a brief delay to ensure scroll completes
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input[placeholder="First Name"]') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 800);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="text-xl font-bold text-white">
              Joedy Felts
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className={`relative transition-all text-sm font-medium pb-2 ${
              activeSection === 'home' 
                ? 'text-[hsl(14_95%_58%)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[hsl(14_95%_58%)] after:rounded-full' 
                : 'text-gray-300 hover:text-[hsl(14_95%_58%)]'
            }`}>
              Home
            </a>
            <a href="#about" className={`relative transition-all text-sm font-medium pb-2 ${
              activeSection === 'about' 
                ? 'text-[hsl(14_95%_58%)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[hsl(14_95%_58%)] after:rounded-full' 
                : 'text-gray-300 hover:text-[hsl(14_95%_58%)]'
            }`}>
              About
            </a>
            <a href="#experience" className={`relative transition-all text-sm font-medium pb-2 ${
              activeSection === 'experience' 
                ? 'text-[hsl(14_95%_58%)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[hsl(14_95%_58%)] after:rounded-full' 
                : 'text-gray-300 hover:text-[hsl(14_95%_58%)]'
            }`}>
              Experience
            </a>
            <a href="#projects" className={`relative transition-all text-sm font-medium pb-2 ${
              activeSection === 'projects' 
                ? 'text-[hsl(14_95%_58%)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[hsl(14_95%_58%)] after:rounded-full' 
                : 'text-gray-300 hover:text-[hsl(14_95%_58%)]'
            }`}>
              Projects
            </a>
            <a href="#contact" className={`relative transition-all text-sm font-medium pb-2 ${
              activeSection === 'contact' 
                ? 'text-[hsl(14_95%_58%)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[hsl(14_95%_58%)] after:rounded-full' 
                : 'text-gray-300 hover:text-[hsl(14_95%_58%)]'
            }`}>
              Contact
            </a>
          </nav>

          <div className="hidden md:flex">
            <Button 
              onClick={handleGetInTouch}
              className="btn-energetic-coral text-white font-semibold"
            >
              Get In Touch
            </Button>
          </div>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMenu} 
              className="text-white"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden nav-blur border-t border-white/10">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-orange-400 text-sm font-medium">
              Home
            </a>
            <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-orange-400 text-sm font-medium">
              About
            </a>
            <a href="#experience" className="block px-3 py-2 text-gray-300 hover:text-orange-400 text-sm font-medium">
              Experience
            </a>
            <a href="#projects" className="block px-3 py-2 text-gray-300 hover:text-orange-400 text-sm font-medium">
              Projects
            </a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-orange-400 text-sm font-medium">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
