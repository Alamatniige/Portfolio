import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/block/Header';
import Milestone from './components/section/Milestone'
import Footer from './components/block/Footer'
import Banner from './components/section/Banner';
import Projects from './components/section/Projects';
import Techstack from './components/section/Techstack';
import Contact from './components/section/Contact';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    
    // Refresh ScrollTrigger after initial render
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('resize', handleResize);
      // Cleanup all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative w-full">
        <Header />
        <main className='relative'>
          <Banner />
          <Milestone />
          <Projects />
          <Techstack />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
