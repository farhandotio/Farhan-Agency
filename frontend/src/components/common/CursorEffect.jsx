import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorEffect = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) return null;

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;

    gsap.set([cursor, cursorBorder], { xPercent: -50, yPercent: -50 });

    // Cursor movement
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3.out' });
    const xToBorder = gsap.quickTo(cursorBorder, 'x', { duration: 0.5, ease: 'power3.out' });
    const yToBorder = gsap.quickTo(cursorBorder, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToBorder(e.clientX);
      yToBorder(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Hover effect on all elements
    const handleMouseEnter = () => {
      gsap.to([cursor, cursorBorder], { scale: 1.5, duration: 0.2 });
    };
    const handleMouseLeave = () => {
      gsap.to([cursor, cursorBorder], { scale: 0.8, duration: 0.2 });
    };

    // Apply hover listener to all elements
    const allElements = document.querySelectorAll('body *');
    allElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Click animation
    const handleMouseDown = () => gsap.to([cursor, cursorBorder], { scale: 0.6, duration: 0.2 });
    const handleMouseUp = () => gsap.to([cursor, cursorBorder], { scale: 1, duration: 0.2 });

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      allElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 lg:h-[1.5vw] lg:w-[1.5vw] bg-primary pointer-events-none rounded-full mix-blend-difference z-50"
      />
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-10 h-10 lg:w-[3vw] lg:h-[3vw] pointer-events-none border-2 lg:border-[.2vw] rounded-full mix-blend-difference border-primary opacity-50 z-50"
      />
    </>
  );
};

export default CursorEffect;
