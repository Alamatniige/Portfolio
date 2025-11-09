import { useState, useEffect } from 'react';
import logo from '../../assets/rmbsapio.webp';
import { useIsMobile } from '../../hooks/useIsMobile';

export default function Header() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSpinning(false);
      }, 600); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 100; // Account for fixed header height + spacing
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    // Close navigation on mobile after clicking
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const handleLogoClick = () => {
    setIsSpinning(true);
    
    // On desktop: scroll to top
    // On mobile: only toggle navigation expansion
    if (!isMobile) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Toggle navigation expansion on mobile
      setIsExpanded(!isExpanded);
    }
  };

  const handleTopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Close navigation on mobile after clicking
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 transition-all duration-300">
      <div 
        className={`
          backdrop-blur-xl bg-background/70 border border-border/40 
          rounded-full shadow-lg shadow-black/10
          px-4 py-2 md:px-6 md:py-3 flex items-center justify-between
          transition-all duration-300 ease-in-out
          ${isScrolled ? 'shadow-2xl shadow-black/20 bg-background/80' : ''}
          ${isExpanded ? 'md:px-8' : ''}
        `}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className={`w-6 h-6 md:w-8 md:h-8 object-contain transition-transform duration-300 ${isSpinning ? 'logo-spin' : ''}`}
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Navigation */}
        <nav className={`
          ${isMobile ? (isExpanded ? 'flex' : 'hidden') : 'flex'}
          md:flex items-center gap-4 md:gap-6 lg:gap-8
          transition-all duration-300 ease-in-out
          ${isMobile && isExpanded ? 'flex-col absolute top-full left-0 right-0 mt-2 py-4 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/40 shadow-lg' : ''}
        `}>
          {/* Top - Only visible on mobile */}
          {isMobile && (
            <a 
              href="#top" 
              onClick={handleTopClick}
              className="!text-foreground hover:text-primary transition-all duration-200 hover:scale-105 active:button-bounce text-body font-medium px-3 py-2"
            >
              Home
            </a>
          )}
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, '#about')}
            className="!text-foreground hover:text-primary transition-all duration-200 hover:scale-105 active:button-bounce text-body font-medium px-3 py-2 md:px-0 md:py-0"
          >
            About Me
          </a>
          <a 
            href="#projects" 
            onClick={(e) => handleNavClick(e, '#projects')}
            className="!text-foreground hover:text-primary transition-all duration-200 hover:scale-105 active:button-bounce text-body font-medium px-3 py-2 md:px-0 md:py-0"
          >
            Projects
          </a>
          <a 
            href="#techstack" 
            onClick={(e) => handleNavClick(e, '#techstack')}
            className="!text-foreground hover:text-primary transition-all duration-200 hover:scale-105 active:button-bounce text-body font-medium px-3 py-2 md:px-0 md:py-0"
          >
            Techstack
          </a>
        </nav>

        {/* CTA Button */}
        <div className={isMobile && isExpanded ? 'hidden' : 'block'}>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="
              !text-foreground hover:text-primary 
              transition-all duration-200 
              hover:scale-105 active:button-bounce 
              text-body font-medium
              px-3 py-2 md:px-4 md:py-2 rounded-full
              hover:bg-primary/10
            "
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}