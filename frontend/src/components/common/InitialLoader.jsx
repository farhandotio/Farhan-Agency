import React, { useEffect, useRef, useState } from "react";

const InitialLoader = ({ minDuration = 800 }) => {
  // show only if not seen in this session
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem("seenInitialLoader");
    } catch {
      return true;
    }
  });
  const [percent, setPercent] = useState(0);

  // refs for timers/listeners to reliably clean up
  const loaderTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const start = Date.now();

    const tick = () => {
      // increment toward 95 to simulate progress
      setPercent((p) => {
        const next = Math.min(95, p + Math.random() * 6);
        return Math.round(next * 10) / 10;
      });
      loaderTimerRef.current = setTimeout(tick, 80);
    };

    loaderTimerRef.current = setTimeout(tick, 80);

    const finish = () => {
      // ensure minDuration
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);

      // clear tick timer before finishing
      if (loaderTimerRef.current) {
        clearTimeout(loaderTimerRef.current);
        loaderTimerRef.current = null;
      }

      // wait remaining time, then go to 100%
      fallbackTimerRef.current = setTimeout(() => {
        // set to 100 then hide shortly after so transition can show
        setPercent(100);
        setTimeout(() => {
          try {
            sessionStorage.setItem("seenInitialLoader", "1");
          } catch {}
          if (mountedRef.current) setVisible(false);
        }, 300);
      }, wait);
    };

    // finish when window loaded; fallback finish after 3s
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // also fallback if load doesn't fire
      fallbackTimerRef.current = setTimeout(finish, 3000);
    }

    return () => {
      // cleanup all timers and listener
      if (loaderTimerRef.current) {
        clearTimeout(loaderTimerRef.current);
        loaderTimerRef.current = null;
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      window.removeEventListener("load", finish);
    };
  }, [visible, minDuration]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-bg text-text"
    >
      <div className="text-center px-6">
        <h2 className="uppercase tracking-widest mb-6 text-xl opacity-90 text-primary font-bold">
          MD Farhan <span className="text-secondary">Sadik</span>
        </h2>

        {/* animated loader bar */}
        <div
          className="w-72 md:w-96 bg-white/10 rounded-full h-2 overflow-hidden relative"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.max(0, Math.min(100, percent))}%`,
              background:
                "linear-gradient(90deg,var(--color-primary),var(--color-secondary))",
            }}
          />
        </div>

        <div className="mt-3 text-sm text-mutedText">
          Loading{" "}
          <span className="font-medium" aria-label={`Loading ${Math.round(percent)} percent`}>
            {Math.round(percent)}%
          </span>
        </div>

        {/* respects reduced motion */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .transition-all { transition: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default InitialLoader;
