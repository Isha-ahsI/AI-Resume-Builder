import React from 'react'
import { Link } from "react-router-dom";
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
// import LogoMark from "./LogoMark";

const cols = [
  { title: "Product", links: [ ["Templates","/templates"], ["Dashboard","/dashboard"], ["Builder","/builder"], ["Preview","/preview"] ] },
  { title: "Company", links: [ ["About","#"], ["Careers","#"], ["Blog","#"], ["Contact","#"] ] },
  { title: "Legal", links: [ ["Privacy","#"], ["Terms","#"], ["Cookies","#"], ["Security","#"] ] },
];

export const Footer = () => {
  return (
    <>
      <footer className="mt-24 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            <div className="col-span-2 space-y-5">
              {/* <LogoMark to={null} /> */}
              <p className="text-sm text-muted-foreground max-w-xs">Rezume is the modern, ATS-friendly resume builder with AI baked in. Get hired faster.</p>
              <div className="flex items-center gap-2">
                {[FiTwitter, FiGithub, FiLinkedin, FiInstagram].map((Icon, i) => (
                  <Link key={i} to="#" className="h-9 w-9 rounded-full border border-border grid place-items-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">{c.title}</div>
                <ul className="space-y-2.5">
                  {c.links.map(([label, to]) => (
                    <li key={label}><Link to={to} className="text-sm text-foreground hover:text-primary transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Rezume Labs. Crafted for the modern job seeker.</p>
            <p className="text-xs text-muted-foreground font-mono-stat">v1.0.0 · uptime 99.98%</p>
          </div>
        </div>
      </footer>
    </>
  )
}
