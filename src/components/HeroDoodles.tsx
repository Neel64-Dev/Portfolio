import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const doodles = [
  {
    className: 'hero-doodle hero-doodle-sketchpad',
    src: '/book.png',
    alt: 'Book icon',
    delay: 0.55,
  },
  {
    className: 'hero-doodle hero-doodle-lightbulb',
    src: '/bulb.png',
    alt: 'Lightbulb icon',
    delay: 0.7,
  },
  {
    className: 'hero-doodle hero-doodle-controller',
    src: '/laptop.png',
    alt: 'Laptop icon',
    delay: 0.85,
  },
  {
    className: 'hero-doodle hero-doodle-football',
    src: '/sports.png',
    alt: 'Sports icon',
    delay: 1,
  },
];

const slideIn = (
  delay: number,
  reduced: boolean | null,
  fromBottom: boolean,
) =>
  reduced
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: fromBottom ? 32 : -28 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.55,
          delay,
          ease: fromBottom ? ('easeIn' as const) : ([0.22, 1, 0.36, 1] as const),
        },
      };

export const HeroDoodles = () => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <>
      {doodles.map((doodle) => (
        <motion.div
          key={doodle.className}
          className={doodle.className}
          aria-hidden="true"
          {...slideIn(doodle.delay, prefersReducedMotion, !isMobile)}
        >
          <img src={doodle.src} alt={doodle.alt} />
        </motion.div>
      ))}
    </>
  );
};
