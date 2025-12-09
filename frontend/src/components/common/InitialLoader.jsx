// InitialLoader.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const InitialLoader = ({ minDuration = 800 }) => {
  const [visible, setVisible] = useState(true);

  const containerRef = useRef(null);
  // Refined naming for clarity on stack order
  const pageFrontRef = useRef(null); // The one with the greeting
  const pageMiddleRef = useRef(null); // The middle sheet
  const pageBackRef = useRef(null); // The back sheet
  const helloRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        onComplete: () => setVisible(false),
      });
    };

    const startAnimation = () => {
      // Convert minDuration to seconds
      const minSec = Math.max(0, minDuration) / 1000;

      if (reduceMotion) {
        tlRef.current = gsap
          .timeline()
          .to({}, { duration: minSec, onComplete: () => finish() });
        return;
      }

      // create timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current = tl;

      // --- INITIAL STATES ---
      // Pages start below screen (yPercent: 100)
      gsap.set(
        [pageFrontRef.current, pageMiddleRef.current, pageBackRef.current],
        {
          yPercent: 100,
          clearProps: "opacity",
        }
      );
      // Greeting text starts slightly offset and transparent
      gsap.set(helloRef.current, { y: 20, opacity: 0, scale: 0.98 });

      // --- ANIMATION IN (Pages slide up sequentially, overlapping) ---
      // The back page comes up first
      tl.to(pageBackRef.current, { yPercent: 0, duration: 0.8 }, 0)
        // Middle page follows
        .to(pageMiddleRef.current, { yPercent: 0, duration: 0.8 }, "-=0.55")
        // Front page comes up last (ensures it's on top)
        .to(pageFrontRef.current, { yPercent: 0, duration: 0.8 }, "-=0.55");

      // Animate greeting inside the front page
      tl.to(
        helloRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "+=0.12"
      );

      // --- HOLD ---
      tl.to({}, { duration: minSec });

      // --- ANIMATION OUT (Pages slide up off-screen one-by-one) ---
      // Front page (greeting) slides up first
      tl.to(pageFrontRef.current, { yPercent: -120, duration: 0.6 })
        // Middle page follows
        .to(pageMiddleRef.current, { yPercent: -120, duration: 0.6 }, "-=0.35")
        // Back page slides up last
        .to(pageBackRef.current, { yPercent: -120, duration: 0.6 }, "-=0.35");

      // Subtle container fade and finish
      tl.to(
        containerRef.current,
        { opacity: 0, duration: 0.4, onComplete: () => setVisible(false) },
        "+=0.08"
      );
    };

    // Start after window load or soon after mount
    if (document.readyState === "complete") {
      startAnimation();
    } else {
      const onLoad = () => startAnimation();
      window.addEventListener("load", onLoad, { once: true });
      const fallback = setTimeout(() => {
        if (!tlRef.current) startAnimation();
      }, 3000);

      return () => {
        clearTimeout(fallback);
        window.removeEventListener("load", onLoad);
        if (tlRef.current) tlRef.current.kill();
      };
    }

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, [minDuration]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="false"
      role="status"
      className="fixed inset-0 z-9999 flex items-center justify-center bg-bg text-text overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      <div
        ref={pageBackRef}
        className="absolute inset-0 bg-primary flex items-center justify-center rounded-4xl"
        aria-hidden="true"
      ></div>

      {/* 2. Middle Page */}
      <div
        ref={pageMiddleRef}
        className="absolute inset-0 bg-secondary flex items-center justify-center rounded-4xl"
        aria-hidden="true"
      ></div>

      {/* 3. Front Page */}
      <div
        ref={pageFrontRef}
        className="absolute inset-0 bg-bg flex items-center justify-center rounded-3xl"
      >
        <div className="text-center px-6 text-text">
          <h1
            ref={helloRef}
            className="text-3xl md:text-5xl font-extrabold tracking-wide"
            aria-hidden="true"
          >
            Assalamu Alaikum
          </h1>
          <p className="mt-3 opacity-80">MD Farhan Sadik — Web Developer</p>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
