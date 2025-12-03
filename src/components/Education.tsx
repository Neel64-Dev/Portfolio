import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, School } from 'lucide-react';

// TypeScript interface for education data
interface EducationData {
    degree: string;
    institution: string;
    location: string;
    period: string;
    grade: string;
    description: string;
    skills: string[];
    type: 'university' | 'college' | 'school';
}

// Animation constants
const ANIMATION_CONFIG = {
    SECTION_DURATION: 0.8,
    CARD_DURATION: 0.6,
    STAGGER_DELAY: 0.2,
    VIEW_MARGIN: '-100px',
} as const;

export const educations: EducationData[] = [
    {
        degree: 'Bachelor of Engineering - BE, Information Technology',
        institution: 'L.D. College of Engineering',
        location: 'Ahmedabad, Gujarat',
        period: 'Jun 2021 - Jun 2024',
        grade: 'CGPA: 8.23',
        description: 'Focused on Information Technology, software development, and modern web technologies.',
        skills: ['Java', 'HTML5', 'Cascading Style Sheets (CSS)', 'Bootstrap', 'Object Oriented Programming', 'JavaScript', 'Team Work'],
        type: 'university',
    },
    {
        degree: 'Diploma, Information Technology',
        institution: 'Dalia Institute of Diploma Studies',
        location: 'Kheda, Gujarat',
        period: 'Aug 2018 - Jun 2021',
        grade: 'CGPA: 9.85',
        description: 'Specialized in Information Technology with focus on web development and programming.',
        skills: ['HTML5', 'Cascading Style Sheets (CSS)', 'Java'],
        type: 'college',
    },
    {
        degree: 'Secondary School Certificate (SSC)',
        institution: 'Vedant International School, Ahmedabad',
        location: 'Ahmedabad, Gujarat',
        period: 'Apr 2005 - Jun 2018',
        grade: 'Percentage: 64.80%',
        description: 'Completed secondary education with diverse extracurricular activities.',
        skills: ['Cricket', 'Dance', 'Team Work', 'Volleyball'],
        type: 'school',
    },
];

export const Education = () => {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: ANIMATION_CONFIG.VIEW_MARGIN });

    const getIcon = (type: EducationData['type']) => {
        switch (type) {
            case 'university': return <GraduationCap className="w-6 h-6" />;
            case 'college': return <BookOpen className="w-6 h-6" />;
            case 'school': return <School className="w-6 h-6" />;
            default: return <Award className="w-6 h-6" />;
        }
    };

    return (
        <section id="education" className="py-20 px-4 md:px-8 relative overflow-hidden" ref={ref}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: ANIMATION_CONFIG.SECTION_DURATION }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center font-mono">
                        <span className="text-primary">{'// '}</span>Academic Path
                    </h2>

                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 -translate-x-1/2" />

                        <div className="space-y-12 md:space-y-24">
                            {educations.map((edu, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <motion.div
                                        key={`${edu.institution}-${edu.period}`.replace(/\s+/g, '-')}
                                        className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''
                                            }`}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: ANIMATION_CONFIG.CARD_DURATION, delay: 0.2 }}
                                    >
                                        {/* Timeline Node */}
                                        <div className="absolute left-4 md:left-1/2 w-12 h-12 bg-card border-4 border-primary rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-lg shadow-primary/20 group hover:scale-110 transition-transform duration-300">
                                            <div className="text-primary group-hover:text-primary transition-colors">
                                                {getIcon(edu.type)}
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                                            <div className="group bg-card p-6 md:p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden">
                                                {/* Hover Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                <div className="relative z-10">
                                                    {/* Header */}
                                                    <div className="flex flex-col gap-2 mb-4">
                                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                                            <span className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20">
                                                                {edu.period}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                                <MapPin className="w-3 h-3" />
                                                                {edu.location}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                                            {edu.degree}
                                                        </h3>
                                                        <div className="text-lg font-semibold text-muted-foreground">
                                                            {edu.institution}
                                                        </div>
                                                    </div>

                                                    {/* Grade Badge */}
                                                    <div className="inline-block mb-4 px-3 py-1 bg-secondary text-secondary-foreground text-sm font-mono rounded-md">
                                                        {edu.grade}
                                                    </div>

                                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                                        {edu.description}
                                                    </p>

                                                    {/* Skills/Tags */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {edu.skills.map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="px-2.5 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-md border border-border/50 hover:border-primary/30 transition-colors"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Empty space for the other side on desktop */}
                                        <div className="hidden md:block md:w-1/2" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
