import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxOptions {
  speed?: number; // Parallax speed multiplier (negative = move slower, positive = move faster)
  start?: string; // ScrollTrigger start position
  end?: string; // ScrollTrigger end position
  scrub?: number | boolean; // Whether to scrub the animation
  ease?: string; // Easing function
}

/**
 * Hook for creating GSAP parallax effects on scroll
 * @param options Configuration options for the parallax effect
 * @returns Ref to attach to the element
 */
export function useGSAPParallax(options: ParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const {
    speed = 0.5,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    ease = 'none',
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create parallax animation
    animationRef.current = gsap.to(element, {
      y: (_i, el) => {
        // Calculate the parallax distance based on speed
        const elementHeight = (el as HTMLElement).offsetHeight;
        return elementHeight * speed;
      },
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, start, end, scrub, ease]);

  return elementRef;
}

/**
 * Hook for creating parallax effects with custom transforms
 */
export function useGSAPParallaxTransform(
  transform: 'x' | 'y' | 'rotation' | 'scale' | 'opacity',
  options: ParallaxOptions & { value?: number | string } = {}
) {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const {
    speed = 0.5,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    ease = 'none',
    value,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const transformValue = value !== undefined 
      ? value 
      : transform === 'opacity' 
        ? 1 
        : transform === 'scale'
          ? 1
          : 0;

    const animationProps: gsap.TweenVars = {
      [transform]: transformValue,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    };

    // For y/x transforms, use speed multiplier
    if ((transform === 'x' || transform === 'y') && typeof value === 'number') {
      animationProps[transform] = value * speed;
    } else if (transform === 'y' && value === undefined) {
      animationProps.y = (_i, el) => {
        const elementHeight = (el as HTMLElement).offsetHeight;
        return elementHeight * speed;
      };
    }

    animationRef.current = gsap.to(element, animationProps);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [transform, speed, start, end, scrub, ease, value]);

  return elementRef;
}

/**
 * Hook for creating fade-in animations on scroll
 */
export function useGSAPFadeIn(options: {
  start?: string;
  end?: string;
  delay?: number;
  duration?: number;
} = {}) {
  const elementRef = useRef<HTMLElement>(null);

  const {
    start = 'top 80%',
    end = 'top 50%',
    delay = 0,
    duration = 1,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [start, end, delay, duration]);

  return elementRef;
}

/**
 * Hook for creating parallax layers with different speeds
 */
export function useGSAPParallaxLayers(
  speeds: number[],
  options: Omit<ParallaxOptions, 'speed'> = {}
) {
  const containerRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLElement | null)[]>([]);

  const {
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
    ease = 'none',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animations: gsap.core.Tween[] = [];

    layerRefs.current.forEach((layer, index) => {
      if (!layer || index >= speeds.length) return;

      const speed = speeds[index];
      const animation = gsap.to(layer, {
        y: (_i, el) => {
          const elementHeight = (el as HTMLElement).offsetHeight;
          return elementHeight * speed;
        },
        ease,
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      });

      animations.push(animation);
    });

    return () => {
      animations.forEach((anim) => anim.kill());
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [speeds, start, end, scrub, ease]);

  const setLayerRef = (index: number) => (el: HTMLElement | null) => {
    layerRefs.current[index] = el;
  };

  return { containerRef, setLayerRef };
}

