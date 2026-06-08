import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroDoodles } from '@/components/HeroDoodles';
import { HeroTrustTicker } from '@/components/HeroTrustTicker';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { label: 'Work', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Connect', href: '#contact' },
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

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

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

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pt-24 pb-0 sm:px-8 lg:px-12">
        <div className="grid w-full flex-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,1.2fr)] lg:gap-12 xl:gap-16">
          {/* Left section — reference-inspired content column */}
          <motion.header
            className="hero-left order-2 flex flex-col gap-6 self-center pb-8 text-center lg:order-1 lg:gap-7 lg:pb-12 lg:text-left"
            {...fadeUp(0.1)}
          >
            <h1 className="hero-headline mx-auto lg:mx-0">
              Hi, I&apos;m <span className="hero-headline-name">Neel</span>.
            </h1>

            <div className="hero-intro mx-auto lg:mx-0">
              <p className="hero-subtitle-lead">
                I build web experiences that don&apos;t just work—they{' '}
                <em className="hero-subtitle-emphasis">stand out</em>.
              </p>

              <p className="hero-subtitle-body">
                As a developer, I focus on crafting interactive, scalable, and visually
                compelling applications using modern JavaScript technologies. I care deeply
                about performance, usability, and clean architecture—turning complex ideas
                into seamless digital solutions.
              </p>

              <p className="hero-subtitle-body">
                When I&apos;m not coding, I&apos;m experimenting with new tools, contributing
                to open source, and engaging with the developer community—driven by curiosity
                and a constant desire to innovate.
              </p>
            </div>

            {/* <motion.div
              className="hero-cta-group flex flex-wrap justify-center gap-3 lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a href="#experience" className="btn-primary hero-focus-ring">
                View Work
              </a>
              <a href="#contact" className="btn-secondary hero-focus-ring">
                Get in Touch
              </a>
            </motion.div> */}
          </motion.header>

          {/* Right section — reference cut-out with sketch doodles */}
          <div className="hero-right order-1 mx-auto w-full self-end lg:order-2 lg:mx-0 lg:max-w-none">
            <div className="hero-profile-showcase">
              <HeroDoodles />
              <motion.div
                className="hero-profile-float"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: isMobile ? -20 : 28 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: isMobile ? [0.22, 1, 0.36, 1] : 'easeIn',
                }}
              >
                <img
                  src="/home.png"
                  alt="Neel profile"
                  width={380}
                  height={456}
                  className="hero-profile-image"
                  decoding="async"
                  fetchPriority="high"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <HeroTrustTicker items={trustTickerItems} reducedMotion={prefersReducedMotion} />

      <motion.div
        className="hero-scroll-hint pointer-events-none absolute bottom-[4.5rem] left-1/2 z-20 -translate-x-1/2 lg:hidden"
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

