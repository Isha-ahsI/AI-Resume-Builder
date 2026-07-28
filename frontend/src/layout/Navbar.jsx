import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
// import LogoMark from "./LogoMark";
import  ThemeToggle  from "../components/ui/ThemeToggle";
import { NAV } from "../data/testIds";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Features", to: "/#features" },
  { label: "Templates", to: "/templates" },
  { label: "How it works", to: "/#how" },
  { label: "FAQ", to: "/#faq" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const nav = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="glass border-b border-border">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
            {/* <LogoMark /> */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.to}
                  className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user ? (
                <button
                  data-testid="nav-dashboard-btn"
                  onClick={() => nav("/dashboard")}
                  className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Dashboard <FiArrowUpRight className="h-4 w-4" />
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    data-testid={NAV.loginBtn}
                    className="hidden sm:inline-flex items-center h-9 px-4 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    data-testid={NAV.registerBtn}
                    className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Start Free
                  </Link>
                </>
              )}
              <button
                className="lg:hidden h-9 w-9 grid place-items-center rounded-full border border-border"
                onClick={() => setOpen((o) => !o)}
                data-testid={NAV.mobileMenuBtn}
                aria-label="Menu"
              >
                {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {open && (
            <div className="lg:hidden border-t border-border bg-background">
              <div className="px-5 py-4 space-y-1">
                {links.map((l) => (
                  <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm text-foreground hover:bg-muted">{l.label}</a>
                ))}
                <div className="flex gap-2 pt-2">
                  <Link to="/login" className="flex-1 h-10 grid place-items-center rounded-full border border-border text-sm font-medium">Login</Link>
                  <Link to="/register" className="flex-1 h-10 grid place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">Start Free</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}