import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';

// TypeScript interface for experience data
interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  location?: string;
}

// Animation constants
const ANIMATION_CONFIG = {
  SECTION_DURATION: 0.8,
  CARD_DURATION: 0.5,
  CARD_STAGGER: 0.15,
  VIEW_MARGIN: '-100px',
} as const;

export const experiences: Experience[] = [
  {
    role: 'Junior Software Engineer',
    company: 'ManekTech',
    period: 'April 2025 - Present',
    location: 'On-site',
    description: 'Working as a Junior Software Engineer, developing and maintaining full-stack web applications using modern technologies and frameworks.',
    technologies: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Express', 'Firebase', 'Redis', 'Github Actions(CD)'],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Prioxis Technologies Pvt. Ltd.',
    period: 'July 2024 - April 2025',
    location: 'On-site',
    description: 'Working as a Junior Software Engineer, developing and maintaining full-stack web applications using modern technologies and frameworks.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    role: 'Software Developer Intern',
    company: 'Prioxis Technologies Pvt. Ltd.',
    period: 'January 2024 - July 2024',
    location: 'On-site',
    description: 'Worked as a Software Developer Intern, contributing to various web development projects and learning industry best practices.',
    technologies: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
  },
  {
    role: 'Web Development Intern',
    company: 'QSpiders - Software Testing Training Institute',
    period: '11-June-2023 - 27-June-2023',
    location: 'On-site',
    description: 'Completed a web development internship, gaining hands-on experience in building responsive websites and web applications.',
    technologies: ['HTML5', 'CSS', 'JavaScript', 'Web Development'],
  },
];

export const Experience = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: ANIMATION_CONFIG.VIEW_MARGIN });
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <section id="experience" className="py-20 px-4 md:px-8 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: ANIMATION_CONFIG.SECTION_DURATION }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-mono">
            <span className="text-primary">{'// '}</span>Professional Journey
          </h2>

          {/* Desktop: Side-by-side layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {/* Left: Company tabs */}
            <div className="space-y-2">
              {experiences.map((exp, index) => (
                <motion.button
                  key={`tab-${exp.company}-${exp.period}`.replace(/\s+/g, '-')}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${selectedIndex === index
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                      : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: ANIMATION_CONFIG.CARD_DURATION, delay: index * ANIMATION_CONFIG.CARD_STAGGER }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-2 h-2 rounded-full ${selectedIndex === index ? 'bg-primary' : 'bg-muted-foreground'}`} />
                    <div className="flex-1">
                      <h3 className={`font-bold text-sm mb-1 ${selectedIndex === index ? 'text-primary' : 'text-foreground'}`}>
                        {exp.company}
                      </h3>
                      <p className="text-xs text-muted-foreground">{exp.role}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Right: Experience details */}
            <div className="md:col-span-2">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card p-8 rounded-2xl border-2 border-border shadow-2xl relative overflow-hidden"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {experiences[selectedIndex].role}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Briefcase className="w-5 h-5" />
                        <span className="font-mono">{experiences[selectedIndex].company}</span>
                      </div>
                    </div>
                    <Award className="w-12 h-12 text-primary/20" />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{experiences[selectedIndex].period}</span>
                    </div>
                    {experiences[selectedIndex].location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{experiences[selectedIndex].location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {experiences[selectedIndex].description}
                </p>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {experiences[selectedIndex].technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.05 }}
                        className="px-3 py-1.5 bg-gradient-to-r from-primary/20 to-primary/10 text-foreground text-sm font-mono rounded-lg border border-primary/30 hover:border-primary/60 transition-all duration-200 hover:scale-105 cursor-default shadow-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-6 flex gap-2">
                  {experiences.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-primary' : 'bg-border'
                        }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile: Vertical cards */}
          <div className="md:hidden space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={`mobile-${exp.company}-${exp.period}`.replace(/\s+/g, '-')}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIMATION_CONFIG.CARD_DURATION, delay: index * ANIMATION_CONFIG.CARD_STAGGER }}
                className="bg-card p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-mono text-sm">{exp.company}</span>
                      </div>
                    </div>
                    <Award className="w-10 h-10 text-primary/20" />
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gradient-to-r from-primary/20 to-primary/10 text-foreground text-xs font-mono rounded-md border border-primary/30 transition-all duration-200 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
