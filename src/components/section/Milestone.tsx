import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bookImg from '@/assets/milestone/book-shelf.svg'
import gearImg from '@/assets/milestone/gear.svg'
import plantImg from '@/assets/milestone/plant.svg'
import peopleImg from '@/assets/milestone/people.svg'
import targetImg from '@/assets/milestone/target.svg'
import { useParallaxTimeline } from '../../hooks/useParallaxTimeline';
import { useIsMobile } from '../../hooks/useIsMobile';

type JourneyMilestone = {
    title: string;
    period: string;
    description: string;
    skills?: string[];
    image: string;
};

const JOURNEY: JourneyMilestone[] = [
    {
        title: "The Beginning",
        period: "Year 1",
        description: "Started my IT journey with excitement and curiosity. Learned programming fundamentals, data structures, and basic computer science concepts. This foundation sparked my passion for technology.",
        skills: ["Programming Basics", "Data Structures", "Algorithms"],
        image: bookImg,
    },
    {
        title: "Building Foundations",
        period: "Year 2",
        description: "Dove deeper into software engineering principles. Worked on multiple projects, learned different programming languages, and started exploring web development and databases. Joined coding communities and participated in hackathons.",
        skills: ["Web Development", "Databases", "Version Control"],
        image: gearImg,
    },
    {
        title: "Specialization & Projects",
        period: "Year 3",
        description: "Chose my specialization path and worked on more complex projects. Focused on full-stack development, system design, and best practices. Built portfolio projects and contributed to open-source initiatives.",
        skills: ["Full-Stack Development", "System Design", "DevOps"],
        image: targetImg,
    },
    {
        title: "Real-World Experience",
        period: "Internships & Beyond",
        description: "Applied my knowledge in real-world scenarios through internships and freelance work. Gained experience working in teams, understanding client needs, and delivering production-ready solutions.",
        skills: ["Team Collaboration", "Agile Methodology", "Client Communication"],
        image: peopleImg,
    },
    {
        title: "Continuous Growth",
        period: "Present & Future",
        description: "Continuously learning new technologies, staying updated with industry trends, and building impactful projects. Preparing for graduation and looking forward to contributing to innovative tech solutions.",
        skills: ["Latest Technologies", "Industry Trends", "Problem Solving"],
        image: plantImg,
    },
];

export default function Milestone() {
    const isMobile = useIsMobile();
    const lastMilestoneRef = useRef<HTMLLIElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const milestonesRef = useRef<HTMLOListElement>(null);
    
    // Use the parallax timeline hook
    const { scrollProgress, lineHeight, sectionRef } = useParallaxTimeline({
        endElementRef: lastMilestoneRef as React.RefObject<HTMLElement>,
    });

    // Parallax timeline animation logic
    const progress = useMotionValue(scrollProgress);
    
    useEffect(() => {
        progress.set(scrollProgress);
    }, [scrollProgress, progress]);

    const springProgress = useSpring(progress, {
        stiffness: 100,
        damping: 30,
        mass: 0.5,
    });

    const clipPathBottom = useTransform(springProgress, (latest) => {
        return `inset(0 0 ${(1 - latest) * 100}% 0)`;
    });

    const opacity = useTransform(springProgress, (latest) => {
        return latest > 0 ? 1 : 0;
    });

    // Parallax effect: calculate vertical offset to keep line centered in viewport
    const parallaxY = useMotionValue(0);
    
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowCenter = windowHeight / 2;

            if (rect.top < windowCenter && rect.bottom > windowCenter) {
                const sectionCenter = rect.top + rect.height / 2;
                const offset = windowCenter - sectionCenter;
                parallaxY.set(offset);
            } else {
                parallaxY.set(0);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionRef, parallaxY]);

    // GSAP Parallax effects for milestone items
    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const milestones = milestonesRef.current;
        
        if (!section || !header || !milestones) return;

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

        // Animate milestone items on scroll
        const milestoneItems = milestones.querySelectorAll('li');
        milestoneItems.forEach((item, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === milestoneItems.length - 1;
            
            // Skip parallax for last item (it's vertically stacked)
            if (!isLast) {
                const imageDiv = item.querySelector('div[class*="relative"]');
                const descriptionDiv = item.querySelector('div[class*="text-"]');
                
                if (imageDiv) {
                    // Parallax effect for images
                    gsap.to(imageDiv, {
                        y: isEven ? -100 : -80,
                        scrollTrigger: {
                            trigger: item as HTMLElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }
                
                if (descriptionDiv) {
                    // Parallax effect for descriptions (opposite direction)
                    gsap.to(descriptionDiv, {
                        y: isEven ? -60 : -100,
                        scrollTrigger: {
                            trigger: item as HTMLElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }
            }

            // Fade in animation for each milestone
            gsap.fromTo(
                item as HTMLElement,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item as HTMLElement,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => {
            // Kill all ScrollTriggers associated with this section
            ScrollTrigger.getAll().forEach((trigger) => {
                const triggerElement = trigger.vars.trigger;
                if (triggerElement === section || triggerElement === header) {
                    trigger.kill();
                }
            });
            // Also kill triggers for milestone items
            milestoneItems.forEach((item) => {
                ScrollTrigger.getAll().forEach((trigger) => {
                    if (trigger.vars.trigger === item) {
                        trigger.kill();
                    }
                });
            });
        };
    }, [sectionRef, isMobile]);

    return (
        <section ref={sectionRef} id="about" className="relative w-full bg-background py-12 md:py-20 lg:py-28">
            {/* Parallax timeline line - hidden on mobile, visible on desktop */}
            {!isMobile && (
                <motion.div
                    className="pointer-events-none absolute left-1/2 top-0 w-px bg-gradient-to-b from-muted-foreground/50 via-muted-foreground/70 to-muted-foreground/50"
                    style={{
                        height: lineHeight > 0 ? `${lineHeight}px` : "100%",
                        clipPath: clipPathBottom,
                        opacity: opacity,
                        x: "-50%",
                        y: parallaxY,
                    }}
                />
            )}

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
                <header ref={headerRef} className="mb-12 md:mb-16 text-center">
                    <h2 className="text-heading-2 text-foreground">My Journey</h2>
                    <p className="mt-4 text-body text-muted-foreground">
                        A timeline of my growth as an IT College Student
                    </p>
                </header>

                <ol ref={milestonesRef} className="space-y-12 md:space-y-16 lg:space-y-24">
                    {JOURNEY.map((milestone, index) => {
                        const isLast = index === JOURNEY.length - 1;
                        
                        // On mobile: All items use same centered layout (Description first, then Image)
                        // On desktop: Use alternating layout for non-last items
                        const isEven = index % 2 === 0;
                        const shouldImageBeLeft = !isEven && !isLast;
                        
                        // Mobile: All items centered, description first then image
                        // Desktop: Last item centered, others alternating
                        return (
                            <li 
                                key={index} 
                                ref={isLast ? lastMilestoneRef : null}
                                className="relative flex flex-col md:grid md:grid-cols-2 items-center gap-6 md:gap-10 lg:gap-12"
                            >
                                {/* Description - First on mobile, positioned based on desktop layout */}
                                <div className={`
                                    order-1 w-full max-w-2xl
                                    ${shouldImageBeLeft ? 'md:order-2' : 'md:order-1'}
                                    text-center ${shouldImageBeLeft ? 'md:text-right' : 'md:text-left'}
                                `}>
                                    <div className="inline-block px-3 py-1 text-body-sm font-medium text-muted-foreground bg-background rounded-full mb-3">
                                        {milestone.period}
                                    </div>
                                    <h3 className="text-heading-3 text-foreground">{milestone.title}</h3>
                                    <p className="mt-3 text-body text-muted-foreground leading-relaxed max-w-prose mx-auto md:mx-0">
                                        {milestone.description}
                                    </p>
                                    {milestone.skills && (
                                        <div className={`mt-4 flex flex-wrap gap-2 justify-center ${shouldImageBeLeft ? "md:justify-end" : ""}`}>
                                            {milestone.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-background border border-border rounded-md hover:scale-105 duration-300 transition-transform hover:bg-primary hover:text-primary-foreground"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Image - Second on mobile, positioned based on desktop layout */}
                                <div className={`
                                    order-2 w-full max-w-md
                                    ${shouldImageBeLeft ? 'md:order-1' : 'md:order-2'}
                                    flex justify-center ${shouldImageBeLeft ? "md:justify-start" : "md:justify-end"}
                                `}>
                                    <div className={`
                                        relative mx-auto
                                        ${shouldImageBeLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}
                                    `}>
                                        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-xl bg-gradient-to-br from-background to-muted-foreground backdrop-blur-sm ring-1 ring-border shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:ring-primary/50">
                                            <img 
                                                src={milestone.image} 
                                                alt={milestone.title} 
                                                className="w-full h-full object-contain p-4" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}