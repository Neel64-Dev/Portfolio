import { useEffect, useRef } from 'react';

const TickerStar = () => (
  <svg
    className="hero-ticker-star"
    width="10"
    height="10"
    viewBox="0 0 9 9"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.5 0 C4.5 2.5 2.5 4.5 0 4.5 C2.5 4.5 4.5 6.5 4.5 9 C4.5 6.5 6.5 4.5 9 4.5 C6.5 4.5 4.5 2.5 4.5 0Z" />
  </svg>
);

type HeroTrustTickerProps = {
  items: string[];
  reducedMotion: boolean | null;
};

export const HeroTrustTicker = ({ items, reducedMotion }: HeroTrustTickerProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const directionRef = useRef(-1);
  const lastScrollRef = useRef(0);
  const loopWidthRef = useRef(0);

  const tickerTrack = [...items, ...items, ...items, ...items];

  useEffect(() => {
    if (reducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    measure();
    window.addEventListener('resize', measure);

    let raf = 0;
    const speed = 0.55;

    const tick = () => {
      const loopWidth = loopWidthRef.current;

      if (loopWidth > 0) {
        offsetRef.current += directionRef.current * speed;

        if (offsetRef.current <= -loopWidth) {
          offsetRef.current += loopWidth;
        } else if (offsetRef.current > 0) {
          offsetRef.current -= loopWidth;
        }

        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    lastScrollRef.current = window.scrollY;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollRef.current + 1) {
        directionRef.current = 1;
      } else if (currentScroll < lastScrollRef.current - 1) {
        directionRef.current = -1;
      }

      lastScrollRef.current = currentScroll;
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      track.style.transform = '';
    };
  }, [reducedMotion]);

  return (
    <div className="hero-trust-ticker relative z-10 shrink-0">
      <div className="hero-ticker-outer" aria-hidden="true">
        <div
          ref={trackRef}
          className={`hero-ticker-track${reducedMotion ? ' hero-ticker-track-static' : ' hero-ticker-track-scroll-driven'}`}
        >
          {tickerTrack.map((item, index) => (
            <span key={`${item}-${index}`} className="hero-ticker-item">
              <TickerStar />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
