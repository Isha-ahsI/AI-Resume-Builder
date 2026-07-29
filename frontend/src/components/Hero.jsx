import React from 'react'
import { Link } from "react-router-dom";
import { AnimatedShapeGrid } from './ui/AnimatedShapeGrid'
import { RotatingWords } from './ui/RotatingWords'
import { ResumePreview } from './resume/ResumePreview'
import { defaultResumeData } from '../data/mockData'
import { LANDING } from "../data/testIds";
import { fadeUp, stagger } from "../lib/animations";
import { LuSparkles } from "react-icons/lu";
import { motion } from "framer-motion";
import { FaCheck,FaArrowRightLong } from "react-icons/fa6";
import { VscEditSparkle } from "react-icons/vsc";


export const Hero = () => {
    return (
        <>
            <section className="relative overflow-hidden border-b border-border">
                <AnimatedShapeGrid />
                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
                    <motion.div variants={stagger(0.08)} initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1.5 text-xs font-mono-stat">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-muted-foreground">v1.0 · trusted by 47,382 job seekers this week</span>
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="mt-6 text-4xl sm:text-5xl lg:text-[64px] font-black leading-[1.02] tracking-tight text-balance">
                            Build a{" "}
                            <RotatingWords words={["Professional Resume", "ATS-Friendly Resume", "Cover Letter", "Portfolio"]} />
                            <br />
                            <span className="text-muted-foreground/70">that actually gets you hired.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                            Rezume writes recruiter-ready summaries, rewrites experience bullets, and lands your resume in front of hiring managers — with AI, in minutes.
                        </motion.p>
                        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                            <Link to="/register" data-testid={LANDING.heroGenerateBtn} className="btn-shine relative overflow-hidden inline-flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-95">
                                <LuSparkles className="h-4 w-4" /> Generate my resume <FaArrowRightLong className="h-4 w-4" />
                            </Link>
                            <Link to="/templates" data-testid={LANDING.heroTemplatesBtn} className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition-colors">
                                Browse templates
                            </Link>
                        </motion.div>
                        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5"><FaCheck className="h-3.5 w-3.5 text-primary" /> No credit card</div>
                            <div className="flex items-center gap-1.5"><FaCheck className="h-3.5 w-3.5 text-primary" /> Free forever plan</div>
                            <div className="flex items-center gap-1.5"><FaCheck className="h-3.5 w-3.5 text-primary" /> Export PDF instantly</div>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                        <div className="relative w-full flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* main preview */}
                                <div className="relative">
                                    <ResumePreview resume={{ data: defaultResumeData }} template="modern" scale={0.55} />
                                </div>
                                {/* floating AI badges */}
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -left-8 top-8 glass rounded-2xl p-3 shadow-xl w-48">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><LuSparkles className="h-3.5 w-3.5 text-primary" /> ATS Score</div>
                                    <div className="mt-1.5 font-heading font-black text-3xl font-mono-stat">82<span className="text-base text-muted-foreground">/100</span></div>
                                    <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: "82%" }} /></div>
                                </motion.div>
                                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute -right-6 top-40 glass rounded-2xl p-3 shadow-xl w-56">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><VscEditSparkle className="h-3.5 w-3.5 text-accent" /> AI Rewrite</div>
                                    <p className="mt-1.5 text-xs leading-snug"><span className="line-through text-muted-foreground">worked on onboarding</span><br />Led onboarding redesign, <span className="font-semibold text-foreground">+34% retention</span>.</p>
                                </motion.div>
                                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -left-4 bottom-12 glass rounded-2xl p-3 shadow-xl">
                                    <div className="flex items-center gap-2 text-xs"><span className="h-2 w-2 rounded-full bg-emerald-500" /> <span className="text-muted-foreground">Autosaved just now</span></div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
