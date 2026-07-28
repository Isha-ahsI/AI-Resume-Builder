import React from 'react'
import { Link, useLocation } from "react-router-dom";
// import LogoMark from "@/components/common/LogoMark";
import ThemeToggle from "./ThemeToggle";
import { AnimatedShapeGrid } from "./AnimatedShapeGrid";

export const AuthLayout = ({ title, subtitle, children, footer }) => {
    return (
        <>
            <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
                {/* Left: brand panel */}
                <div className="relative hidden lg:flex flex-col justify-between p-10 bg-foreground text-background overflow-hidden">
                    <AnimatedShapeGrid />
                    {/* <div className="relative z-10"><LogoMark to="/" /></div> */}
                    <div className="relative z-10 max-w-md">
                        <div className="text-xs uppercase tracking-[0.24em] opacity-60">Modern resumes</div>
                        <h1 className="mt-3 font-heading font-black text-4xl leading-[1.05] tracking-tight">The resume tool built for people who ship.</h1>
                        <p className="mt-4 text-sm opacity-70 leading-relaxed">Craft ATS-optimized resumes with an AI that actually understands your role. From bullet notes to interview invites — in minutes.</p>
                    </div>
                    <div className="relative z-10 text-xs font-mono-stat opacity-60">"Landed 3 interviews in a week." — Priya S., Product Designer</div>
                </div>

                {/* Right: form */}
                <div className="relative flex flex-col">
                    <div className="flex items-center justify-between p-5 lg:hidden">
                        {/* <LogoMark to="/" /> */}
                        <ThemeToggle />
                    </div>
                    <div className="hidden lg:flex items-center justify-end p-5"><ThemeToggle /></div>
                    <div className="flex-1 flex items-center justify-center px-5 pb-10">
                        <div className="w-full max-w-md">
                            <div className="mb-8">
                                <h2 className="font-heading font-black text-3xl tracking-tight">{title}</h2>
                                {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
                            </div>
                            {children}
                            {footer && <div className="mt-8 text-sm text-muted-foreground text-center">{footer}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
