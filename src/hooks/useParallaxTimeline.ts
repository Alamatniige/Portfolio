import { useEffect, useRef, useState } from "react";

interface UseParallaxTimelineOptions {
    endElementRef: React.RefObject<HTMLElement>;
}

interface UseParallaxTimelineReturn {
    scrollProgress: number;
    lineHeight: number;
    sectionRef: React.RefObject<HTMLElement | null>;
    endRef: React.RefObject<HTMLElement>;
}

export function useParallaxTimeline({ endElementRef }: UseParallaxTimelineOptions): UseParallaxTimelineReturn {
    const sectionRef = useRef<HTMLElement>(null);
    const [lineHeight, setLineHeight] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Calculate line height from section top to end element bottom
    useEffect(() => {
        const updateLineHeight = () => {
            if (endElementRef.current && sectionRef.current) {
                const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
                const endElementBottom = endElementRef.current.getBoundingClientRect().bottom + window.scrollY;
                
                const height = endElementBottom - sectionTop;
                setLineHeight(height);
            }
        };

        // Initial calculation after render
        const timeoutId = setTimeout(updateLineHeight, 100);
        window.addEventListener("resize", updateLineHeight);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("resize", updateLineHeight);
        };
    }, [endElementRef]);

    // Calculate scroll progress manually for precise control
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !endElementRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const sectionTop = rect.top;
            const endElementBottom = endElementRef.current.offsetTop + endElementRef.current.offsetHeight;
            const endElementBottomRelative = endElementBottom - section.offsetTop;
            
            // Distance from section top to viewport bottom
            const distanceFromViewportBottom = windowHeight - sectionTop;
            
            // Total distance to scroll (end element position + viewport height)
            const totalDistance = endElementBottomRelative + windowHeight;
            
            // Calculate progress (0 to 1)
            const progress = Math.min(1, Math.max(0, distanceFromViewportBottom / totalDistance));
            
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener("scroll", handleScroll);
    }, [endElementRef]);

    return {
        scrollProgress,
        lineHeight,
        sectionRef,
        endRef: endElementRef as React.RefObject<HTMLElement>,
    };
}

