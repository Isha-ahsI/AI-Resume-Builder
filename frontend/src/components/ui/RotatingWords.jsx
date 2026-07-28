import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const RotatingWords = ({ words = [], interval = 2400 }) => {
    const [i, setI] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
        return () => clearInterval(id);
    }, [words.length, interval]);

    const w = words[i] || "";
    return (
        <>
            <span className="relative inline-block align-bottom" style={{ minWidth: `${Math.max(...words.map(x => x.length)) * 0.55}ch` }}>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={w}
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block text-gradient-primary"
                    >
                        {w}
                    </motion.span>
                </AnimatePresence>
            </span>
        </>
    );
}
