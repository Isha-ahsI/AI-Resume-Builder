import React from 'react'
import { LANDING } from "../data/testIds";
import { SectionHeading } from './ui/SectionHeading'
import { motion } from "framer-motion";
import { howItWorks } from '../data/mockData'


export const HowItWorks = () => {
    return (
        <section id="how" data-testid={LANDING.howItWorksSection} className="border-t border-border bg-muted/20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
                <SectionHeading label="How it works" title={<>From blank page to hired, <span className="text-muted-foreground">in four steps.</span></>} />
                <div className="mt-14 grid md:grid-cols-4 gap-6 relative">
                    <div className="hidden md:block absolute top-6 left-8 right-8 h-px bg-border" />
                    {howItWorks.map((s, i) => (
                        <motion.div key={s.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="relative">
                            <div className="h-12 w-12 rounded-full bg-foreground text-background grid place-items-center font-mono-stat font-bold text-lg z-10 relative">{s.step}</div>
                            <div className="mt-4 font-heading font-bold text-lg">{s.title}</div>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
