import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

export const projects = [
  {
    title: 'E-Commerce FullStack Application',
    description: 'A comprehensive full-stack e-commerce platform featuring product management, shopping cart, user authentication, and payment integration. Built with modern technologies and optimized for performance using caching strategies.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Express.js', 'TailwindCSS', 'Redux Toolkit', 'Node Cache'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express.js', 'TailwindCSS', 'Redux Toolkit'],
    github: 'https://github.com/Neel1292/e-commerce',
    demo: '',
  },
  {
    title: 'React Assessment - Virtualization',
    description: 'Advanced React application implementing virtualization concepts using TanStack Query and TanStack Table. Features efficient data handling, pagination, and optimized rendering for large datasets.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    technologies: ['React', 'TanStack Query', 'TanStack Table', 'React Router DOM', 'TypeScript'],
    tech: ['React', 'TanStack Query', 'TanStack Table', 'React Router DOM'],
    github: 'https://github.com/Neel1292/react-assessment',
    demo: '',
  },
  {
    title: 'Blog Post Application',
    description: 'Full-featured blogging platform with user authentication, post creation, image uploads, and content management. Demonstrates proficiency in backend technologies and RESTful API design.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    technologies: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Multer'],
    tech: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Multer'],
    github: 'https://github.com/Neel1292/blog-post-app',
    demo: '',
  },
  {
    title: 'School Management System',
    description: 'Comprehensive school management platform with role-based access control. Features admin, teacher, and student portals with capabilities for user management, student enrollment, and question management.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    technologies: ['TypeScript', 'JavaScript', 'HTML5', 'CSS'],
    tech: ['TypeScript', 'JavaScript', 'HTML5', 'CSS'],
    github: 'https://github.com/Neel1292/school-management',
    demo: '',
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-mono">
            <span className="text-primary">{'// '}</span>Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group bg-card rounded-lg border border-border overflow-hidden hover-glow"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 font-mono group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1 bg-primary/10 text-primary rounded border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="https://github.com/Neel1292?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-mono rounded-lg hover-glow transition-all hover:scale-105"
            >
              {/* <Github className="w-5 h-5" /> */}
              View More
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
