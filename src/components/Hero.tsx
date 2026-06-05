import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroDoodles } from '@/components/HeroDoodles';

const navItems = [
  { label: 'Work', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#contact' },
];

const trustTickerItems = [
  'Full Stack Developer',
  'Problem Solver',
  'Systems Thinker',
  // 'Open to Freelance & Full-Time',
  'React & Node.js',
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

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

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const tickerTrack = [...trustTickerItems, ...trustTickerItems, ...trustTickerItems, ...trustTickerItems];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden bg-hero-bg"
      aria-label="Introduction"
    >
      <div className="hero-ambient" aria-hidden="true">
        <div className="hero-ambient-orb hero-ambient-orb-1" />
        <div className="hero-ambient-orb hero-ambient-orb-2" />
      </div>

      <div className="absolute inset-x-0 top-5 z-20 flex justify-center px-4 sm:top-6">
        <nav
          className="hero-top-nav inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/85 px-2 py-1.5 shadow-card backdrop-blur-xl sm:gap-1.5 sm:px-2.5 sm:py-2"
          aria-label="Hero quick navigation"
        >
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="hero-nav-pill">
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pb-2 pt-24 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,1.2fr)] lg:gap-12 xl:gap-16">
          {/* Left section — reference-inspired content column */}
          <motion.header
            className="hero-left order-2 flex flex-col gap-7 text-center lg:order-1 lg:gap-8 lg:text-left"
            {...fadeUp(0.1)}
          >
            <h1 className="hero-headline mx-auto lg:mx-0">
              Hi, I&apos;m
              <br />
              Neel.
            </h1>

            <p className="hero-subtitle mx-auto lg:mx-0">
            <span className="hero-subtitle-body">
              a D — <strong>Strong digital portfolio design that feels premium, playful, and polished.</strong> I build <strong>polished web experiences</strong>, <strong>case studies</strong>, and <strong>brand-driven portfolio work</strong> that make a memorable first impression.
            </span>
          </p>
          </motion.header>

          {/* Right section — reference cut-out with sketch doodles */}
          <motion.div
            className="hero-right order-1 mx-auto w-full lg:order-2 lg:mx-0 lg:max-w-none"
            {...fadeUp(0)}
          >
            <div className="hero-profile-showcase">
              <HeroDoodles />
              <div className="hero-profile-float">
                <img
                  src="/home.png"
                  alt="Neel profile"
                  width={380}
                  height={456}
                  className="hero-profile-image"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hero-trust-ticker absolute inset-x-0 bottom-[0.5rem] z-10">
        <div className="hero-ticker-outer" aria-hidden="true">
          <div
            className={`hero-ticker-track${prefersReducedMotion ? ' hero-ticker-track-static' : ''}`}
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

      <motion.div
        className="hero-scroll-hint absolute bottom-6 left-1/2 z-10 -translate-x-1/2 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        aria-hidden="true"
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </motion.div>

    </section>

  );

};

