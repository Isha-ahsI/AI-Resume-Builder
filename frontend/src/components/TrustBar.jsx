import React from 'react'
import { LANDING } from "../data/testIds";

export const TrustBar = () => {
    const brands = ["Stripe", "Figma", "Airbnb", "Notion", "Loop", "Vercel", "Linear", "Ramp"];
    return (
        <>
            <section className="border-b border-border bg-muted/30">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-y-5 gap-x-8">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Trusted by candidates hired at</p>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 opacity-70">
                        {brands.map((b) => <span key={b} className="font-heading font-semibold tracking-tight text-lg">{b}</span>)}
                    </div>
                </div>
            </section>
        </>
    )
}
