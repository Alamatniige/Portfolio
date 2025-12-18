import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../../assets/rmbsapio.webp'
import TiltedCard from '../ui/TiltedCard';
import { useIsMobile } from '../../hooks/useIsMobile';

export default function Banner() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const galaxyRef = useRef<HTMLDivElement>(null);

  // GSAP Parallax effects
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    const galaxy = galaxyRef.current;
    
    if (!section || !text || !image) return;

    // Reduce parallax intensity on mobile (50-70% reduction)
    const parallaxMultiplier = isMobile ? 0.3 : 1;

    // Parallax effect for text (moves slower)
    gsap.to(text, {
      y: -100 * parallaxMultiplier,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Parallax effect for image (moves faster)
    gsap.to(image, {
      y: -150 * parallaxMultiplier,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Parallax effect for Galaxy background (moves slowest)
    if (galaxy) {
      gsap.to(galaxy, {
        y: -50 * parallaxMultiplier,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Fade in animation for text elements
    gsap.fromTo(
      text,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Fade in animation for image
    gsap.fromTo(
      image,
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: image,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      // Kill all ScrollTriggers associated with this section
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars.trigger;
        if (triggerElement === section || triggerElement === text || triggerElement === image || triggerElement === galaxy) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="section-1 relative flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Image - First on mobile, second on desktop */}
        <div ref={imageRef} className="relative w-full h-[200px] sm:h-[260px] md:h-[420px] lg:h-[520px] flex items-center justify-center order-1 md:order-2">
          <TiltedCard
            imageSrc={heroImg}
            altText="AI Generated Image of myself."
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            scaleOnHover={1.05}
            rotateAmplitude={10}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>
        {/* Text - Second on mobile, first on desktop */}
        <div ref={textRef} className="text-center md:text-left order-2 md:order-1">
          <h2 className="text-heading-1 tracking-wide text-foreground mb-4 md:mb-6">
            Ruiz Miguel Sapio
          </h2>
          <p className="text-body-lg text-foreground mb-6 md:mb-8 max-w-prose mx-auto md:mx-0">
            I'm an IT student with a passion for building digital solutions that solve real-world problems.
          </p>
        </div>
      </div>
    </section>
    
  );
}