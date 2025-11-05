import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!visible) return;

    let mounted = true;
    // simulate progress but finish on window.load or minimum duration
    const start = Date.now();
    const tick = () => {
      setPercent((p) => Math.min(95, p + Math.random() * 6)); // simulate to 95
      if (mounted) loaderTimer = setTimeout(tick, 80);
    };
    let loaderTimer = setTimeout(tick, 80);

    const finish = () => {
      // ensure minDuration
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        setPercent(100);
        // short fade out
        setTimeout(() => {
          try {
            sessionStorage.setItem("seenInitialLoader", "1");
          } catch {}
          if (mounted) setVisible(false);
        }, 300);
      }, wait);
    };

    // finish when window loaded; fallback finish after 3s
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      const fallback = setTimeout(finish, 3000);
      // cleanup
      return () => {
        mounted = false;
        clearTimeout(loaderTimer);
        clearTimeout(fallback);
        window.removeEventListener("load", finish);
      };
    }
    // cleanup
    return () => {
      mounted = false;
      clearTimeout(loaderTimer);
      window.removeEventListener("load", finish);
    };
  }, [visible, minDuration]);

  if (!visible) return null;

  return (
    <div
      aria-hidden={!visible}
      className="fixed inset-0 z-9999999 flex items-center justify-center bg-bg text-text"
    >
      <div className="text-center px-6">
        <h2 className="uppercase tracking-widest mb-6 text-xl opacity-80 text-primary font-bold">
          Farhan <span className="text-secondary">Agency</span>
        </h2>

        {/* animated loader bar */}
        <div className="w-72 md:w-96 bg-white/10 rounded-full h-2 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${percent}%`,
              background:
                "linear-gradient(90deg,var(--color-primary),var(--color-secondary))",
            }}
          />
        </div>

        <div className="mt-3 text-sm text-mutedText0">
          Loading <span className="font-medium">{Math.round(percent)}%</span>
        </div>

        {/* small note for reduced motion users */}
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
