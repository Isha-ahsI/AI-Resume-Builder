import React from 'react'
import { LANDING } from "../data/testIds";
import { SectionHeading } from './ui/SectionHeading'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { templates,defaultResumeData } from '../data/mockData'
import { ResumePreview } from './resume/ResumePreview'


export const TemplatesSection = () => {
    return (
        <>
            <section id="templates" data-testid={LANDING.templatesSection} className="relative border-t border-border bg-muted/20">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <SectionHeading label="Templates" title={<>Recruiter-tested layouts. <br className="hidden md:block" /><span className="text-muted-foreground">Ship any of them in one click.</span></>} />
                        <Link to="/templates" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Browse all templates <FaArrowRightLong className="h-4 w-4" /></Link>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {templates.slice(0, 4).map((t) => (
                            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="group">
                                <div className="relative overflow-hidden rounded-2xl border border-border bg-background aspect-[3/4] flex items-start justify-center p-4">
                                    <ResumePreview resume={{ data: defaultResumeData }} template={t.id} scale={0.32} />
                                    <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link to={`/preview?template=${t.id}`} className="flex-1 h-9 grid place-items-center rounded-full bg-foreground text-background text-xs font-semibold">Preview</Link>
                                        <Link to={`/builder?template=${t.id}`} className="flex-1 h-9 grid place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">Use</Link>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <div>
                                        <div className="font-heading font-bold">{t.name}</div>
                                        <div className="text-xs text-muted-foreground">{t.category}</div>
                                    </div>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono-stat" style={{ background: t.accent + "22", color: t.accent }}>New</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
