import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  start = 'top 80%',
  end = 'top 30%',
  scrub = true,
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    if (typeof children !== 'string') return children;
    
    const words = children.split(' ');
    return words.map((word, wordIndex) => (
      <span 
        key={wordIndex} 
        style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
      >
        {word.split('').map((char, charIndex) => (
          <span 
            key={charIndex}
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && <span key={`space-${wordIndex}`}>&nbsp;</span>}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('span');

    gsap.fromTo(
      chars,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        rotateX: -90,
      },
      {
        duration: animationDuration,
        ease: 'power4.out',
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller: scrollContainerRef?.current || window,
          start: start,
          end: end,
          scrub: scrub,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) trigger.kill();
      });
    };
  }, [animationDuration, scrollContainerRef, start, end, scrub]);

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
        {splitText}
      </div>
    </div>
  );
};

export default ScrollFloat;
