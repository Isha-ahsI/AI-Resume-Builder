import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
// import LogoMark from "@/components/common/LogoMark";
import ThemeToggle from "../components/ui/ThemeToggle";

export const NotFound = () => {
    return (
        <>
            <div className="min-h-screen bg-background text-foreground grid-bg">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
                    {/* <LogoMark /> */}
                    <ThemeToggle />
                </div>
                <main className="mx-auto max-w-3xl px-5 sm:px-8 py-24 sm:py-32 text-center">
                    <div className="inline-flex font-mono-stat text-xs uppercase tracking-[0.24em] text-muted-foreground border border-border rounded-full px-3 py-1">error · 404</div>
                    <h1 className="mt-8 text-[110px] sm:text-[180px] font-heading font-black leading-none tracking-tight text-gradient-primary">404</h1>
                    <p className="mt-4 text-xl font-heading font-bold tracking-tight">This page didn't make it past the ATS.</p>
                    <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">The link may have expired or been moved. Let's get you back on track.</p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background font-semibold text-sm"><FaArrowLeftLong className="h-4 w-4" /> Back to home</Link>
                        <Link to="/dashboard" className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-border text-sm font-semibold hover:bg-muted">Go to dashboard</Link>
                    </div>
                </main>
            </div>
        </>
    )
}
