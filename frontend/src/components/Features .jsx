import React from 'react'
import { LANDING } from "../data/testIds";
import { SectionHeading } from './ui/SectionHeading'
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { featureCards } from '../data/mockData'
import { TbSparkles, TbShieldCheck, TbTemplate, TbBrain, TbEye, TbDownload, TbWand, TbPencil, TbListCheck, TbMail, TbScan, TbTarget } from "react-icons/tb";

const iconMap = {
  sparkles: TbSparkles,
  "shield-check": TbShieldCheck,
  "layout-template": TbTemplate,
  brain: TbBrain,
  eye: TbEye,
  download: TbDownload,
  "wand-2": TbWand,
  "pencil-line": TbPencil,
  "list-checks": TbListCheck,
  mail: TbMail,
  "scan-line": TbScan,
  target: TbTarget,
};

export const Features = () => {
    return (
        <>
            <section id="features" data-testid={LANDING.featuresSection} className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
                <SectionHeading label="What's inside" title={<>Every tool a modern job seeker needs, <span className="text-gradient-primary">nothing they don't.</span></>} />
                <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {featureCards.map((f, i) => {
                        const Icon = iconMap[f.icon] || Sparkles;
                        return (
                            <motion.div key={f.key} variants={fadeUp} className={"group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground " + (i === 0 ? "lg:row-span-2 lg:p-8" : "")}>
                                <div className="h-10 w-10 rounded-xl bg-foreground text-background grid place-items-center"><Icon className="h-5 w-5" /></div>
                                <h3 className="mt-5 font-heading font-bold text-xl tracking-tight">{f.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                                {i === 0 && (
                                    <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Sample</div>
                                        <p className="mt-1 text-sm">"Managed onboarding project" → <span className="text-primary font-semibold">"Led onboarding redesign, lifting week-1 retention +34% (+$1.4M ARR)."</span></p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>
        </>
    )
}
