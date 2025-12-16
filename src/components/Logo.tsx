import { motion } from 'framer-motion';

export const Logo = () => {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: -5 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 10
            }
        }
    };

    return (
        <motion.div
            className="font-macklin text-5xl text-primary cursor-default flex items-center"
            initial="hidden"
            animate="visible"
            variants={container}
            whileHover={{ scale: 1.05 }}
        >
            <motion.span variants={item}>N</motion.span>
            {/* <motion.span variants={item} className="tracking-tighter">.</motion.span> */}
            <motion.span variants={item} className="tracking-tighter">,</motion.span>
        </motion.div>
    );
};
