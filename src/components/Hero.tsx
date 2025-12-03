import { motion } from 'framer-motion';
import { Scene3D } from './Scene3D';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Typing effect for the subtitle
  const typedText = useTypingEffect({
    texts: ["I'm Neel", "a Full Stack Web Developer", "a Designer"],
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D mousePosition={mousePosition} scrollProgress={scrollProgress} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-glow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-primary font-mono">{"<"}</span>
            Hello World
            <span className="text-primary font-mono">{" />"}</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-primary mb-8 font-mono font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="inline-flex items-center">
              {typedText}
              <span className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 animate-blink"></span>
            </span>
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <a
              href="experience"
              className="px-8 py-3 bg-primary text-primary-foreground font-mono rounded hover-glow transition-all"
            >
              View Work
            </a>
            <a
              href="contact"
              className="px-8 py-3 bg-secondary text-secondary-foreground font-mono rounded hover:bg-secondary/80 transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  );
};
