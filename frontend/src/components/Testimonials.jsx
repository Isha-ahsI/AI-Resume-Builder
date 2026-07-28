import React from 'react'
import { SectionHeading } from './ui/SectionHeading'
import { LANDING } from "../data/testIds";
import { FaStar } from "react-icons/fa";
import { testimonials } from '../data/mockData'



export const Testimonials = () => {
    return (
        <>
            <section data-testid={LANDING.testimonialsSection} className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
                <SectionHeading label="Loved by candidates" title={<>People who got hired using Rezume.</>} />
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.id} className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col">
                            <div className="flex items-center gap-3">
                                <img src={t.photo} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                                <div>
                                    <div className="font-heading font-semibold text-sm">{t.name}</div>
                                    <div className="text-xs text-muted-foreground">{t.role}</div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-0.5 text-primary">
                                {Array.from({ length: t.rating }).map((_, i) => <FaStar key={i} className="h-3.5 w-3.5 fill-primary" />)}
                            </div>
                            <p className="mt-3 text-sm leading-relaxed">{t.comment}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
