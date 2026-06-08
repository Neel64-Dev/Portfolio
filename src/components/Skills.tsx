import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SkillIcon3D } from './SkillIcon3D';

export const skillCategories = [
  {
    category: 'Frontend',
    // skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    skills: ['JavaScript', 'React', 'Bootstrap','Tailwind CSS', 'Next.js'],
  },
  {
    category: 'Backend',
    // skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  },
  // {
  //   category: '3D & Animation',
  //   // skills: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL', 'Blender'],
  //   skills: ['GSAP'],
  // },
  {
    category: 'Library',
    // skills: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL', 'Blender'],
    skills: ['Redux Toolkit', 'React Router DOM', 'TanStack', 'Multer'],
  },
  {
    category: 'Tools & Others',
    // skills: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'],
    skills: ['Git', 'GitLab', 'Docker'],
  },
  {
    category: 'Deployments',
    // skills: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'],
    skills: ['Railway', 'GitHub Actions', 'Render', 'Netlify'],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-mono">
            <span className="text-primary">{'// '}</span>Tech Stack
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                className="p-6 bg-card rounded-lg border border-border card-glow"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4 text-primary font-mono text-center">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillIcon3D
                      key={skill}
                      skill={skill}
                      delay={catIndex * 0.1 + skillIndex * 0.05}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
