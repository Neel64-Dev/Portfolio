import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';

export const certificates = [
    {
        title: 'Microsoft Certified: Azure Fundamentals',
        issuer: 'Microsoft',
        date: '2024',
        badge: 'azure',
        description: 'Demonstrated foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
    },
    {
        title: 'Microsoft Certified: Power Platform Fundamentals',
        issuer: 'Microsoft',
        date: '2024',
        badge: 'power-platform',
        description: 'Demonstrated foundational knowledge of Power Platform components including Power Apps, Power BI, and Power Automate.',
    },
    {
        title: 'GitHub Foundations',
        issuer: 'GitHub',
        date: '2024',
        badge: 'github',
        description: 'Completed GitHub Foundations certification program demonstrating proficiency in Git and GitHub workflows.',
    },
];

const getBadgeImage = (badge: string) => {
    // You can replace these with actual badge image URLs
    const badges: Record<string, string> = {
        'azure': 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
        // 'power-platform': 'https://images.credly.com/size/340x340/images/2a6251f2-737b-4bf6-9190-d77570cc76fc/image.png',
        'power-platform': 'https://neel1292.github.io/images/certificate/PL-900.png',
        'github': 'https://images.credly.com/size/340x340/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png',
    };
    return badges[badge] || '';
};

export const Certificates = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="certificates" className="py-20 px-4 md:px-8 bg-card/50" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-mono">
                        <span className="text-primary">{'// '}</span>Certificates
                    </h2>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                            >
                                <div className="flex flex-col items-center">
                                    {/* Badge Image */}
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 transition-transform duration-300 group-hover:scale-110">
                                        <img
                                            src={getBadgeImage(cert.badge)}
                                            alt={cert.title}
                                            className="w-full h-full object-contain drop-shadow-lg"
                                        />
                                    </div>

                                    {/* Certificate Info */}
                                    <div className="text-center max-w-xs">
                                        <h3 className="font-bold text-foreground mb-1 text-sm md:text-base">
                                            {cert.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-primary font-mono mb-1">
                                            {cert.issuer}
                                        </p>
                                        <p className="text-xs text-muted-foreground mb-2">{cert.date}</p>

                                        {/* Tooltip on hover */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-xs text-muted-foreground mt-2 px-4">
                                                {cert.description}
                                            </p>
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
