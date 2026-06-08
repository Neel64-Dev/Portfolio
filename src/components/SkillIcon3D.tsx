import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiGraphql,
  SiThreedotjs, SiBlender,
  SiGit, SiDocker, SiAmazon, SiFigma,
  SiJavascript, SiBootstrap, SiGitlab, SiNetlify, SiRender,
  SiGreensock, SiRedux, SiReactrouter, SiRailway, SiGithubactions,
} from 'react-icons/si';
import { Code2, Sparkles, Package, Database } from 'lucide-react';

const iconMap: Record<string, any> = {
  'React': SiReact,
  'TypeScript': SiTypescript,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'GraphQL': SiGraphql,
  'Three.js': SiThreedotjs,
  'React Three Fiber': SiReact,
  'GSAP': SiGreensock,
  'WebGL': SiThreedotjs,
  'Blender': SiBlender,
  'Git': SiGit,
  'Docker': SiDocker,
  'AWS': SiAmazon,
  'Figma': SiFigma,
  'VS Code': Code2,
  'JavaScript': SiJavascript,
  'Bootstrap': SiBootstrap,
  'GitLab': SiGitlab,
  'Netlify': SiNetlify,
  'Render': SiRender,
  'Railway': SiRailway,
  'GitHub Actions': SiGithubactions,
  'Redux Toolkit': SiRedux,
  'React Router DOM': SiReactrouter,
  'TanStack': Database,
  'Multer': Package,
};

interface SkillIcon3DProps {
  skill: string;
  delay: number;
  isInView: boolean;
}

export const SkillIcon3D = ({ skill, delay, isInView }: SkillIcon3DProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[skill];

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border cursor-pointer skill-icon-3d"
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? 10 : 0,
          z: isHovered ? 50 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {Icon && (
          <Icon
            className="w-8 h-8 text-primary transition-colors"
            style={{
              filter: isHovered ? 'drop-shadow(0 0 8px hsl(var(--primary)))' : 'none',
            }}
          />
        )}
        <span className="text-xs font-mono text-muted-foreground text-center">
          {skill}
        </span>
      </motion.div>
    </motion.div>
  );
};
