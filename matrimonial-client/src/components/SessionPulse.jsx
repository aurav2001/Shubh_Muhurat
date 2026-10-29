import React, { useEffect, useState } from 'react';

// Maker's Mark Easter Egg for Shubh Muhurat Matrimonial.
// Nothing renders and nothing is logged until the secret key sequence below is
// typed outside input fields; then the handcrafted royal monogram fades in for a few seconds.
const SEQUENCE = 'gpgp';
const WINDOW_MS = 1800;
const SHOW_MS = 3800;

const SessionPulse = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let typed = '';
    let last = 0;
    let hideTimer = null;

    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;
      if (e.key === 'Escape') {
        setVisible(false);
        return;
      }
      if (e.key.length !== 1) return;

      const now = Date.now();
      typed = (now - last > WINDOW_MS ? '' : typed) + e.key.toLowerCase();
      last = now;

      if (!typed.endsWith(SEQUENCE)) return;

      typed = '';
      setVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), SHOW_MS);
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-6 left-6 z-[2147483000] pointer-events-none select-none"
      style={{ animation: 'gpFade 3.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      <style>{`
        @keyframes gpFade {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.92);
            filter: blur(4px);
          }
          14% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
          82% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(10px) scale(0.96);
            filter: blur(2px);
          }
        }
      `}</style>

      {/* Royal Matrimonial Card Design */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#1C090F]/95 via-[#120508]/95 to-[#080204]/98 border border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(229,57,53,0.3),inset_0_1px_1px_rgba(251,191,36,0.35)] backdrop-blur-md flex flex-col items-center justify-center p-3 overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-rose-600/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-rose-600/20 to-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Monogram SVG */}
        <svg
          viewBox="0 0 120 120"
          className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_4px_12px_rgba(245,158,11,0.35)]"
        >
          <defs>
            <linearGradient id="gpRoyalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="30%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#E53935" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <radialGradient id="gpDotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
          </defs>

          {/* Letter 'G' */}
          <path
            d="M62 40 A24 24 0 1 0 62 80 L62 62 L48 62"
            fill="none"
            stroke="url(#gpRoyalGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter 'P' */}
          <path
            d="M74 88 L74 34 L88 34 A14 14 0 0 1 88 62 L74 62"
            fill="none"
            stroke="url(#gpRoyalGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Royal Accent Dot */}
          <circle cx="60" cy="104" r="3.5" fill="url(#gpDotGlow)" />
        </svg>

        {/* Brand Tagline */}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.28em] text-amber-200/90 font-poppins uppercase text-center drop-shadow-sm">
            ✦ CRAFTED BY GP ✦
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionPulse;
