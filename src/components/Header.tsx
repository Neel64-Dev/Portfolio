import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 pointer-events-none"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="pointer-events-auto px-3 py-1">
                <Logo />
            </div>

            <div className="pointer-events-auto">
                <ThemeToggle />
            </div>
        </motion.header>
    );
};
