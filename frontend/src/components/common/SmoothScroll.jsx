import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let lenisInstance = null;

export const getLenis = () => lenisInstance;

const SmoothScroll = () => {
  useEffect(() => {
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        smooth: true,
        smoothTouch: true,
      });

      const raf = (time) => {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  }, []);

  return null;
};

export default SmoothScroll;
