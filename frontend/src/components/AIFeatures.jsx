import React from 'react'
import { LANDING } from "../data/testIds";
import { SectionHeading } from './ui/SectionHeading'
import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/animations";
import { aiFeatureCards } from '../data/mockData'
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

export const AIFeatures = () => {
    return (
        <>
            <section data-testid={LANDING.aiFeaturesSection} className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
                <SectionHeading label="AI capabilities" title={<>Six AI helpers that <span className="text-gradient-primary">actually save you hours.</span></>} />
                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {aiFeatureCards.map((f) => {
                        const Icon = iconMap[f.icon] || Sparkles;
                        return (
                            <div key={f.key} className="group relative rounded-2xl border border-border bg-card p-6 hover:-translate-y-0.5 transition-transform">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Icon className="h-5 w-5" /></div>
                                    <h3 className="font-heading font-bold text-lg tracking-tight">{f.title}</h3>
                                </div>
                                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                                <div className="mt-5 flex items-center gap-2 text-xs font-mono-stat text-primary">
                                    <TbSparkles className="h-3.5 w-3.5" /> Try it in builder →
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    )
}
