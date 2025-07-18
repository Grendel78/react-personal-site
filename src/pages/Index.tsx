import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Dust from '@/components/Dust';
import { ImanokProgress } from '@/components/ImanokProgress';
import { useImanokCode } from '@/hooks/useImanokCode';
import { useIsMobile } from '@/hooks/useMobile';

const Index = () => {
  const { progress, showSuccess } = useImanokCode();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen">
      <Dust />
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      {!isMobile && <ImanokProgress progress={progress} showSuccess={showSuccess} />}
    </div>
  );
};

export default Index;
