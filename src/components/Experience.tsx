import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

export const experiences = [
  {
    role: 'Junior Software Engineer',
    company: 'ManekTech',
    period: 'April 2025 - Present',
    description: 'Working as a Junior Software Engineer, developing and maintaining full-stack web applications using modern technologies and frameworks.',
    technologies: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Express', 'Firebase'],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Prioxis Technologies Pvt. Ltd.',
    period: 'July 2024 - April 2025',
    description: 'Working as a Junior Software Engineer, developing and maintaining full-stack web applications using modern technologies and frameworks.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    role: 'Software Developer Intern',
    company: 'Prioxis Technologies Pvt. Ltd.',
    period: 'January 2024 - July 2024',
    description: 'Worked as a Software Developer Intern, contributing to various web development projects and learning industry best practices.',
    technologies: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
  },
  {
    role: 'Web Development Intern',
    company: 'QSpiders - Software Testing Training Institute',
    period: '11-June-2023 - 27-June-2023',
    description: 'Completed a web development internship, gaining hands-on experience in building responsive websites and web applications.',
    technologies: ['HTML5', 'CSS', 'JavaScript', 'Web Development'],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-mono">
            <span className="text-primary">{'// '}</span>Experience
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:pr-[50%] md:pl-0' : 'md:pl-[50%] md:pr-0'
                  } pl-8 md:pl-12`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                {/* <div className={`absolute top-6 ${
                  index % 2 === 0 ? 'md:right-[-6px]' : 'md:left-[-6px]'
                } left-[-6px] w-3 h-3 bg-primary rounded-full border-4 border-background`} /> */}

                <div className="bg-card p-6 rounded-lg border border-border card-glow">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                    <span className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-mono">{exp.company}</span>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded-full"
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
