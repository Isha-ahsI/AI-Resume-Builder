import React from 'react'
import { motion } from "framer-motion";

const shapes = [
    { type: "square", x: 8, y: 12, size: 60, delay: 0, color: "primary" },
    { type: "circle", x: 82, y: 10, size: 90, delay: 0.6, color: "primary" },
    { type: "square", x: 74, y: 68, size: 40, delay: 0.2, color: "accent" },
    { type: "circle", x: 14, y: 74, size: 70, delay: 0.9, color: "accent" },
    { type: "square", x: 46, y: 22, size: 28, delay: 0.4, color: "foreground" },
    { type: "circle", x: 62, y: 44, size: 50, delay: 0.7, color: "primary" },
    { type: "square", x: 30, y: 52, size: 34, delay: 0.3, color: "primary" },
    { type: "circle", x: 4, y: 42, size: 26, delay: 1.1, color: "accent" },
];

const colorMap = {
    primary: "hsl(var(--primary))",
    accent: "hsl(var(--accent))",
    foreground: "hsl(var(--foreground))",
};

export const AnimatedShapeGrid = ({ className = "" })  => {
    return (
        <>
            <div aria-hidden className={"pointer-events-none absolute inset-0 overflow-hidden " + className}>
                {/* base grid */}
                <div className="absolute inset-0 grid-bg opacity-40 dark:opacity-25" style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)" }} />
                {/* soft color wash */}
                <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: colorMap.primary }} />
                <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full opacity-15 blur-3xl" style={{ background: colorMap.accent }} />

                {shapes.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.6, y: 30 }}
                        animate={{ opacity: 0.55, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute"
                        style={{
                            left: `${s.x}%`, top: `${s.y}%`,
                            width: s.size, height: s.size,
                            border: `1.5px solid ${colorMap[s.color]}`,
                            borderRadius: s.type === "circle" ? "999px" : "8px",
                            background: "transparent",
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0], rotate: s.type === "square" ? [0, 4, 0] : 0 }}
                            transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                            className="h-full w-full"
                            style={{
                                borderRadius: s.type === "circle" ? "999px" : "8px",
                                background: `radial-gradient(circle at 30% 30%, ${colorMap[s.color]}22, transparent 70%)`,
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    )
}
