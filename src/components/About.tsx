import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Rocket } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable solutions with modern best practices.',
  },
  {
    icon: Palette,
    title: 'Design Focus',
    description: 'Crafting beautiful, intuitive interfaces that users love.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Optimizing for speed and efficiency in every project.',
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center font-mono">
            <span className="text-primary">{'// '}</span>About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground mb-4">
                I'm a passionate developer who loves creating interactive web experiences.
                With expertise in modern JavaScript frameworks and a keen eye for design,
                I bring ideas to life through code.
              </p>
              <p className="text-lg text-muted-foreground">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open source, or sharing knowledge with the dev community.
              </p>
            </motion.div>

            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden card-glow group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img
                src="/profile.png"
                alt="Profile"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div> */}

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 bg-card rounded-lg border border-border hover-glow"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2 font-mono">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
