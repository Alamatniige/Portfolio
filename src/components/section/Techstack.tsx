/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../../hooks/useIsMobile';
import LogoLoop from '../ui/LogoLoop';
import { 
    ReactOriginal, 
    NextjsOriginal, 
    TailwindcssOriginal, 
    TypescriptOriginal, 
    PythonOriginal, 
    JavaOriginal, 
    SvelteOriginal,
    NodejsOriginal,
    FlutterOriginal,
    DartOriginal,
    CplusplusOriginal,
    Html5Original,
    Css3Original,

} from 'devicons-react';

export default function Techstack() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    const [iconSize, setIconSize] = useState(124);

    useEffect(() => {
        const updateIconSize = () => {
            if (window.innerWidth < 640) {
                setIconSize(80);
            } else if (window.innerWidth < 768) {
                setIconSize(100);
            } else {
                setIconSize(124);
            }
        };

        updateIconSize();
        window.addEventListener('resize', updateIconSize);
        return () => window.removeEventListener('resize', updateIconSize);
    }, []);

    const logos = [
        {
            src: <ReactOriginal size={iconSize} />,
            title: 'React',
            url: 'https://react.dev/'
        },
        {
            src: <NextjsOriginal size={iconSize} />,
            title: 'Next.js',
            url: 'https://nextjs.org/'
        },
        {
            src: <TailwindcssOriginal size={iconSize} />,
            title: 'Tailwind CSS',
            url: 'https://tailwindcss.com/'
        },
        {
            src: <TypescriptOriginal size={iconSize} />,
            title: 'Typescript',
            url: 'https://www.typescriptlang.org/'
        },
        {
            src: <PythonOriginal size={iconSize} />,
            title: 'Python',
            url: 'https://www.python.org/'
        },
        {
            src: <JavaOriginal size={iconSize} />,
            title: 'Java',
            url: 'https://www.java.com/'
        },
        {
            src: <SvelteOriginal size={iconSize} />,
            title: 'Svelte',
            url: 'https://svelte.dev/'
        },
        {
            src: <NodejsOriginal size={iconSize} />,
            title: 'Node.js',
            url: 'https://nodejs.org/'
        },
        {
            src: <FlutterOriginal size={iconSize} />,
            title: 'Flutter',
            url: 'https://flutter.dev/'
        },
        {
            src: <DartOriginal size={iconSize} />,
            title: 'Dart',
            url: 'https://dart.dev/'
        },
        {
            src: <CplusplusOriginal size={iconSize} />,
            title: 'C++',
            url: 'https://learncpp.com/'
        },
        {
            src: <Html5Original size={iconSize} />,
            title: 'HTML5',
            url: 'https://html.com/'
        },
        {
            src: <Css3Original size={iconSize} />,
            title: 'CSS3',
            url: 'https://web.dev/learn/css/'
        }
    ];

    // GSAP Parallax effects
    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const grid = gridRef.current;
        
        if (!section || !header || !grid) return;

        // Reduce parallax intensity on mobile
        const parallaxMultiplier = isMobile ? 0.3 : 1;

        // Parallax effect for header
        gsap.to(header, {
            y: -60 * parallaxMultiplier,
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        // Parallax effect for grid (moves faster for depth)
        gsap.to(grid, {
            y: -100 * parallaxMultiplier,
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });

        // Fade in animation for header
        gsap.fromTo(
            header,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Fade in animation for grid
        gsap.fromTo(
            grid,
            {
                opacity: 0,
                scale: 0.95,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            // Kill all ScrollTriggers associated with this section
            ScrollTrigger.getAll().forEach((trigger) => {
                const triggerElement = trigger.vars.trigger;
                if (triggerElement === section || triggerElement === header || triggerElement === grid) {
                    trigger.kill();
                }
            });
        };
    }, [isMobile]);

    return (
        <section ref={sectionRef} id="techstack" className="section-1 relative flex flex-col items-center justify-center overflow-hidden py-12 md:py-20">
            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
                <header ref={headerRef} className="mb-12 md:mb-16 text-center">
                    <h2 className="text-heading-2 text-foreground">Techstack</h2>
                    <p className="mt-4 text-body text-muted-foreground">
                        A list of my techstack that I have worked on
                    </p>
                </header>
            </div>
            <div ref={gridRef} className="relative w-full h-full bg-background flex items-center justify-center">
                <LogoLoop 
                logos={logos}
                speed={60}
                direction="left"
                width="100%"
                logoHeight={iconSize}
                gap={32}
                pauseOnHover={true}
                hoverSpeed={0.5}
                fadeOut={true}
                fadeOutColor="#000"
                scaleOnHover={true}
                renderItem={(item, key) => (
                    <div key={key} className="flex items-center justify-center h-[var(--logoloop-logoHeight)] w-[var(--logoloop-logoHeight)]">
                        {(item as any).src}
                    </div>
                )}
                ariaLabel="Techstack logos"
                className="w-full h-full"
                />
            </div>
        </section>
    );
}