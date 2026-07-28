import React from 'react'

export const SectionHeading = ({ label, title }) => {
    return (
        <>
            <div>
                <div className="text-xs font-mono-stat uppercase tracking-[0.24em] text-muted-foreground">{label}</div>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] max-w-3xl text-balance">{title}</h2>
            </div>
        </>
    )
}
