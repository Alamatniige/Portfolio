import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/button";
import CardSwap, { Card } from "../ui/CardSwap";
import { useIsMobile } from "../../hooks/useIsMobile";

type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string | null;
  images: { src: string; alt: string }[];
  contributions: string[];
};

/*

const projectImages = [
  { src: "src\\assets\\react.svg", alt: "Sample" },
  { src: "src\\assets\\react.svg", alt: "Sample" },
  { src: "src\\assets\\react.svg", alt: "Sample" },
];

*/

const thImages = [
  { src: "src\\assets\\images\\th1.jpg", alt: "TechHub Image 1" },
  { src: "src\\assets\\images\\th2.jpg", alt: "TechHub Image 2" },
  { src: "src\\assets\\images\\th3.jpg", alt: "TechHub Image 3" },
];

const dcImages = [
  { src: "src\\assets\\images\\dc1.png", alt: "Designers Circles Image 1" },
  { src: "src\\assets\\images\\dc2.png", alt: "Designers Circles Image 2" },
  { src: "src\\assets\\images\\dc3.png", alt: "Designers Circles Image 3" },
];

const izajWebImages = [
  {
    src: "src\\assets\\images\\izaj1.png",
    alt: "Izaj Lighting Centre Image 1",
  },
  {
    src: "src\\assets\\images\\izaj2.png",
    alt: "Izaj Lighting Centre Image 2",
  },
  {
    src: "src\\assets\\images\\izaj3.png",
    alt: "Izaj Lighting Centre Image 3",
  },
];

const izajDesktopImages = [
  { src: "src\\assets\\images\\izajdesktop1.png", alt: "Izaj Desktop Image 1" },
  { src: "src\\assets\\images\\izajdesktop2.png", alt: "Izaj Desktop Image 2" },
  { src: "src\\assets\\images\\izajdesktop3.png", alt: "Izaj Desktop Image 3" },
  { src: "src\\assets\\images\\izajdesktop4.png", alt: "Izaj Desktop Image 4" },
];

const buddeImages = [
  { src: "src\\assets\\images\\budde1.png", alt: "Budde Roofing Image 1" },
  { src: "src\\assets\\images\\budde2.png", alt: "Budde Roofing Image 2" },
  { src: "src\\assets\\images\\budde3.png", alt: "Budde Roofing Image 3" },
];

const projects: Project[] = [
  // TechHub
  {
    title: "TechHub",
    description:
      "A mobile app for tech enthusiasts to discover and share the latest tech news and products. I created this mobile application alongside with my groupmates for our final year project in 2nd year of college.",
    tags: ["Flutter", "Dart", "Supabase"],
    url: "https://example.com/project-1",
    images: [
      { src: thImages[0].src, alt: thImages[0].alt },
      { src: thImages[1].src, alt: thImages[1].alt },
      { src: thImages[2].src, alt: thImages[2].alt },
    ],
    contributions: ["Full Stack Development", "Project Manager"],
  },
  // Izaj Web
  {
    title: "Izaj Lighting Centre E-commerce Website",
    description:
      "A website for Izaj Lighting Centre to showcase their products and services. This website was our capstone project and this aims to help the IZAJ for their product visibility and to help them reach more customers.",
    tags: ["Nextjs", " Typescript", "Supabase", "Tauri"],
    url: "https://izaj-lighting-centre.netlify.app/",
    images: [
      { src: izajWebImages[0].src, alt: izajWebImages[0].alt },
      { src: izajWebImages[1].src, alt: izajWebImages[1].alt },
      { src: izajWebImages[2].src, alt: izajWebImages[2].alt },
    ],
    contributions: ["Project Manager", "Tester", "Quality Assurance"],
  },
  // Izaj Desktop
  {
    title: "Izaj Lighting Centre Desktop Application",
    description:
      "A desktop application for Izaj Lighting Centre to manage their website. This was also our capstone project and this is for managing their products, customers orders, and more.",
    tags: ["React", "Node.js", "Python", "Supabase", "Tauri"],
    url: null, // No public URL for desktop app
    images: [
      { src: izajDesktopImages[0].src, alt: izajDesktopImages[0].alt },
      { src: izajDesktopImages[1].src, alt: izajDesktopImages[1].alt },
      { src: izajDesktopImages[2].src, alt: izajDesktopImages[2].alt },
      { src: izajDesktopImages[3].src, alt: izajDesktopImages[3].alt },
    ],
    contributions: [
      "Full Stack Development",
      "Project Manager",
      "Tester",
      "Quality Assurance",
    ],
  },
  // Designers Circles
  {
    title: "Designers Circles",
    description:
      "A platform for designers that aims to help the designers to build a schedule for their clients and to help them manage their projects.",
    tags: ["Nextjs", "Typescript", "Drizzle", "Tailwind CSS"],
    url: "https://designerscircle.co.uk/",
    images: [
      { src: dcImages[0].src, alt: dcImages[0].alt },
      { src: dcImages[1].src, alt: dcImages[1].alt },
      { src: dcImages[2].src, alt: dcImages[2].alt },
    ],
    contributions: ["Front End Development"],
  },
  //Budde Roofing & Gutters
  {
    title: "Budde Roofing & Gutters",
    description:
      "A website for Budde Roofing & Gutters to showcase their services and projects. This platform aims to help Budde Roofing & Gutters reach more customers and manage their projects efficiently.",
    tags: ["React", "Typescript", "Node.js", "Tailwind CSS"],
    url: "https://budderoofingandgutters.ca/",
    images: [
      { src: buddeImages[0].src, alt: buddeImages[0].alt },
      { src: buddeImages[1].src, alt: buddeImages[1].alt },
      { src: buddeImages[2].src, alt: buddeImages[2].alt },
    ],
    contributions: ["Front End Development"],
  },
  // Add more projects as needed
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = projects[currentIndex];
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const showPrev = () => {
    setCurrentIndex((idx) => (idx - 1 + projects.length) % projects.length);
  };

  const showNext = () => {
    setCurrentIndex((idx) => (idx + 1) % projects.length);
  };

  // GSAP Parallax effects
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const description = descriptionRef.current;
    const media = mediaRef.current;

    if (!section || !header || !content) return;

    // Reduce parallax intensity on mobile
    const parallaxMultiplier = isMobile ? 0.3 : 1;

    // Parallax effect for header
    gsap.to(header, {
      y: -50 * parallaxMultiplier,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Parallax effect for description (moves slower)
    if (description) {
      gsap.to(description, {
        y: -80 * parallaxMultiplier,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Parallax effect for media (moves faster)
    if (media) {
      gsap.to(media, {
        y: -120 * parallaxMultiplier,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

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
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Fade in animation for content
    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      // Kill all ScrollTriggers associated with this section
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.vars.trigger;
        if (
          triggerElement === section ||
          triggerElement === header ||
          triggerElement === content ||
          triggerElement === description ||
          triggerElement === media
        ) {
          trigger.kill();
        }
      });
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative flex items-center overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <header ref={headerRef} className="mb-12 md:mb-16 text-center">
          <h2 className="text-heading-2 text-foreground">Projects</h2>
          <p className="mt-4 text-body text-muted-foreground">
            A list of my projects that I have worked on
          </p>
        </header>

        <div ref={contentRef} className="relative">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            {/* Project Description - First on mobile, centered */}
            <div
              ref={descriptionRef}
              className="bg-background rounded-xl p-4 md:p-6 w-full max-w-full md:max-w-none order-1"
            >
              <h3 className="text-heading-3 text-foreground text-center md:text-left">
                {current.title}
              </h3>
              <p className="mt-3 text-body text-muted-foreground leading-relaxed text-center md:text-left">
                {current.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium text-primary-foreground border border-border rounded-md hover:scale-105 duration-300 transition-transform bg-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 items-center md:items-start">
                {current.contributions.map((contribution) => (
                  <span
                    key={contribution}
                    className="px-2.5 py-1 text-xs font-medium text-left w-fit inline-flex text-muted-foreground bg-background border border-border rounded-md hover:scale-105 duration-300 transition-transform hover:bg-primary hover:text-primary-foreground"
                  >
                    - {contribution}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex justify-center md:justify-start">
                {current.url ? (
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Button variant="outline">View Project</Button>
                  </a>
                ) : (
                  <Button variant="outline" disabled>
                    View Project
                  </Button>
                )}
              </div>
            </div>

            {/* Project Media - Second on mobile */}
            <div
              ref={mediaRef}
              style={{ height: "400px", position: "relative" }}
              className="w-full order-2"
            >
              <CardSwap
                key={currentIndex}
                cardDistance={70}
                verticalDistance={70}
                delay={3000}
                pauseOnHover={true}
              >
                {current.images.map((img, idx) => (
                  <Card key={idx}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>

          {/* Bottom-centered arrows - Third on mobile */}
          <div className="mt-8 flex items-center justify-center gap-6 order-3">
            <button
              aria-label="Previous project"
              onClick={showPrev}
              className="inline-flex items-center justify-center rounded-full p-3 min-w-[44px] min-h-[44px] text-xl text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors touch-manipulation"
            >
              ◀
            </button>
            <div className="text-body-sm text-muted-foreground select-none">
              {currentIndex + 1} / {projects.length}
            </div>
            <button
              aria-label="Next project"
              onClick={showNext}
              className="inline-flex items-center justify-center rounded-full p-3 min-w-[44px] min-h-[44px] text-xl text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors touch-manipulation"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
