import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  start = 'top 80%',
  end = 'top 30%',
  scrub = true,
  baseOpacity = 0.1,
}) => {
  const containerRef = useRef(null);

  const words = useMemo(() => {
    if (typeof children !== 'string') return children;
    return children.split(' ').map((word, index) => (
      <span 
        key={index}
        style={{ 
            display: 'inline-block', 
            position: 'relative', 
            marginRight: '0.25em' 
        }}
      >
        {/* The "base" layer that is always visible but dimmed */}
        <span 
          style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              pointerEvents: 'none',
              opacity: baseOpacity 
          }}
        >
          {word}
        </span>
        {/* The "revealing" layer that animates to full opacity */}
        <span 
          className="reveal-word"
          style={{ 
              position: 'relative', 
              opacity: 0 
          }}
        >
          {word}
        </span>
      </span>
    ));
  }, [children, baseOpacity]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const revealWords = el.querySelectorAll('.reveal-word');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller: scrollContainerRef?.current || window,
        start: start,
        end: end,
        scrub: scrub,
      },
    });

    tl.to(revealWords, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [scrollContainerRef, start, end, scrub]);

  return (
    <div 
      ref={containerRef} 
      className={containerClassName}
      style={{ position: 'relative' }}
    >
      <div 
        className={textClassName}
        style={{ 
          display: 'inline-flex', 
          flexWrap: 'wrap',
          lineHeight: 'normal'
        }}
      >
        {words}
      </div>
    </div>
  );
};

export default ScrollReveal;
