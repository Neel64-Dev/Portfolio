import { motion } from 'framer-motion';

interface FloatingTechIconsProps {
    mousePosition: { x: number; y: number };
}

// All unique technology icons from your tech stack
// Perfectly positioned for visual balance and aesthetics
const techIcons = [
    // Top row - evenly spaced across the top
    { name: 'React', icon: 'react', color: '#61DAFB', x: 8, y: 8 },
    { name: 'Next.js', icon: 'nextdotjs', color: '#000000', x: 25, y: 5 },
    { name: 'Render', icon: 'render', color: '#46E3B7', x: 50, y: 3 },
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6', x: 75, y: 5 },
    { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4', x: 92, y: 8 },

    // Left side - vertical spacing
    { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E', x: 5, y: 30 },
    { name: 'Git', icon: 'git', color: '#F05032', x: 3, y: 50 },
    { name: 'Redux', icon: 'redux', color: '#764ABC', x: 5, y: 70 },

    // Right side - vertical spacing
    { name: 'Node.js', icon: 'nodedotjs', color: '#339933', x: 95, y: 30 },
    { name: 'Express', icon: 'express', color: '#000000', x: 97, y: 50 },
    { name: 'MongoDB', icon: 'mongodb', color: '#47A248', x: 95, y: 70 },

    // Bottom row - evenly spaced across the bottom
    { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1', x: 8, y: 92 },
    { name: 'Bootstrap', icon: 'bootstrap', color: '#7952B3', x: 30, y: 95 },
    { name: 'GitHub', icon: 'github', color: '#181717', x: 70, y: 95 },
    { name: 'Netlify', icon: 'netlify', color: '#00C7B7', x: 92, y: 92 },
];

export const FloatingTechIcons = ({ mousePosition }: FloatingTechIconsProps) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {techIcons.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    className="absolute"
                    style={{
                        left: `${tech.x}%`,
                        top: `${tech.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div
                        className="w-12 h-12 md:w-16 md:h-16 opacity-60 hover:opacity-100 transition-opacity duration-300"
                        style={{
                            filter: `drop-shadow(0 0 8px ${tech.color}40)`,
                        }}
                    >
                        {tech.icon === 'render' ? (
                            // Custom Render icon using cloud emoji
                            <div
                                className="w-full h-full flex items-center justify-center text-4xl md:text-5xl"
                                style={{
                                    filter: `drop-shadow(0 0 4px ${tech.color})`,
                                }}
                                title="Render"
                            >
                                ☁️
                            </div>
                        ) : (
                            <img
                                src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace('#', '')}`}
                                alt={tech.name}
                                className="w-full h-full object-contain"
                                style={{
                                    filter: 'brightness(1.2)',
                                }}
                            />
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
