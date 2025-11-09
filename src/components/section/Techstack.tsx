import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChromaGrid from '../ui/ChromaGrid';
import { useIsMobile } from '../../hooks/useIsMobile';
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
    const [iconSize, setIconSize] = useState(280);

    useEffect(() => {
        const updateIconSize = () => {
            if (window.innerWidth < 640) {
                setIconSize(180);
            } else if (window.innerWidth < 768) {
                setIconSize(220);
            } else {
                setIconSize(280);
            }
        };

        updateIconSize();
        window.addEventListener('resize', updateIconSize);
        return () => window.removeEventListener('resize', updateIconSize);
    }, []);

    const techstack = [
        {
            image: <ReactOriginal size={iconSize} />,
            title: 'React',
            subtitle: 'Frontend Development',
            borderColor: '#4F46E5',
            gradient: 'linear-gradient(145deg,#4F46E5,#000)',
            url: 'https://react.dev/'
        },
        {
            image: <NextjsOriginal size={iconSize} />,
            title: 'Next.js',
            subtitle: 'Backend Development',
            borderColor: '#10B981',
            gradient: 'linear-gradient(210deg,#10B981,#000)',
            url: 'https://nextjs.org/'
        },
        {
            image: <TailwindcssOriginal size={iconSize} />,
            title: 'Tailwind CSS',
            subtitle: 'UI/UX Design',
            borderColor: '#F59E0B',
            gradient: 'linear-gradient(165deg,#F59E0B,#000)',
            url: 'https://tailwindcss.com/'
        },
        {
            image: <TypescriptOriginal size={iconSize} />,
            title: 'Typescript',
            subtitle: 'Programming Language',
            borderColor: '#EF4444',
            gradient: 'linear-gradient(195deg,#EF4444,#000)',
            url: 'https://www.typescriptlang.org/'
        },
        {
            image: <PythonOriginal size={iconSize} />,
            title: 'Python',
            subtitle: 'Programming Language',
            borderColor: '#8B5CF6',
            gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
            url: 'https://www.python.org/'
        },
        {
            image: <JavaOriginal size={iconSize} />,
            title: 'Java',
            subtitle: 'Programming Language',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://www.java.com/'
        },
        {
            image: <SvelteOriginal size={iconSize} />,
            title: 'Svelte',
            subtitle: 'Frontend Development',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://svelte.dev/'
        },
        {
            image: <NodejsOriginal size={iconSize} />,
            title: 'Node.js',
            subtitle: 'Backend Development',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://nodejs.org/'
        },
        {
            image: <FlutterOriginal size={iconSize} />,
            title: 'Flutter',
            subtitle: 'Mobile Development',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://flutter.dev/'
        },
        {
            image: <DartOriginal size={iconSize} />,
            title: 'Dart',
            subtitle: 'Programming Language',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://dart.dev/'
        },
        {
            image: <CplusplusOriginal size={iconSize} />,
            title: 'C++',
            subtitle: 'Programming Language',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://learncpp.com/'
        },
        {
            image: <Html5Original size={iconSize} />,
            title: 'HTML5',
            subtitle: 'Web Development',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
            url: 'https://html.com/'
        },
        {
            image: <Css3Original size={iconSize} />,
            title: 'CSS3',
            subtitle: 'Web Development',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg,#06B6D4,#000)',
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
            <ChromaGrid 
            items={techstack}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            />
            </div>
        </section>
    );
}