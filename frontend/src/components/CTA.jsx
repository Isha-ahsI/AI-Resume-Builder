import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";


export const CTA = () => {
    return (
        <>
            <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground text-background p-10 sm:p-14">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary opacity-30 blur-3xl" />
                    <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent opacity-20 blur-3xl" />
                    <div className="relative grid lg:grid-cols-2 gap-8 items-end">
                        <div>
                            <div className="text-xs uppercase tracking-[0.24em] opacity-70">Ready?</div>
                            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">Your best resume yet is one prompt away.</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                            <Link to="/register" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-background text-foreground font-semibold text-sm hover:opacity-90">
                                Start building free <FaArrowRightLong className="h-4 w-4" />
                            </Link>
                            <Link to="/templates" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-background/30 text-background font-semibold text-sm hover:bg-background/10">Explore templates</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
