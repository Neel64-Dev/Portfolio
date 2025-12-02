import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export const educations = [
    {
        degree: 'Bachelor of Engineering - BE, Information Technology',
        institution: 'L.D. College of Engineering',
        location: 'Ahmedabad, Gujarat',
        period: 'Jun 2021 - Jun 2024',
        grade: 'CGPA: 8.23',
        description: 'Focused on Information Technology, software development, and modern web technologies.',
        skills: ['Java', 'Team Work', 'Cricket', 'JavaScript'],
    },
    {
        degree: 'Diploma, Information Technology',
        institution: 'Dalia Institute of Diploma Studies',
        location: 'Ahmedabad, Gujarat',
        period: 'Aug 2018 - Jun 2021',
        grade: 'CGPA: 9.85',
        description: 'Specialized in Information Technology with focus on web development and programming.',
        skills: ['HTML5', 'Cascading Style Sheets (CSS)', 'Java'],
    },
    {
        degree: 'Secondary School Certificate (SSC)',
        institution: 'Vedant International School, Ahmedabad',
        location: 'Ahmedabad, Gujarat',
        period: 'Apr 2005 - Jun 2018',
        grade: 'Percentage: 64.80%',
        description: 'Completed secondary education with diverse extracurricular activities.',
        skills: ['Cricket', 'Dance', 'Team Work', 'Volleyball'],
    },
];

export const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="education" className="py-20 px-4 md:px-8 bg-card/50" ref={ref}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-mono">
                        <span className="text-primary">{'// '}</span>Education
                    </h2>

                    <div className="space-y-6">
                        {educations.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                            >
                                <div className="bg-card p-6 rounded-lg border border-border card-glow hover-glow">
                                    <div className="flex gap-4">
                                        {/* College Logo */}
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-white rounded-lg p-2 border border-border flex items-center justify-center overflow-hidden">
                                                <GraduationCap className="w-10 h-10 text-primary" />
                                            </div>
                                        </div>

                                        {/* Education Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h3>
                                                    <div className="text-primary font-mono text-sm mb-1">
                                                        {edu.institution}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{edu.location}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {edu.period}
                                                    </div>
                                                    <div className="text-primary text-sm font-mono">
                                                        {edu.grade}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground text-sm mb-3">{edu.description}</p>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2">
                                                {edu.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
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
