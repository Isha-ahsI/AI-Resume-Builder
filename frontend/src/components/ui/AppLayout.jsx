import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { TbLayoutDashboard, TbTemplate, TbSparkles } from "react-icons/tb";
import { FiFileText, FiUser, FiLogOut, FiPlus } from "react-icons/fi";
// import LogoMark from "./LogoMark";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: TbLayoutDashboard },
    { to: "/builder", label: "Builder", icon: FiFileText },
    { to: "/templates", label: "Templates", icon: TbTemplate },
    { to: "/preview", label: "Preview", icon: TbSparkles },
    { to: "/profile", label: "Profile", icon: FiUser },
];

export const AppLayout = ({ children, hideSidebar = false }) => {
    const loc = useLocation();
    const nav = useNavigate();
    const { user, logout } = useAuth();
    return (
        <>
            <div className="min-h-screen bg-background text-foreground flex">
                {!hideSidebar && (
                    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[240px] flex-col border-r border-border bg-background z-30">
                        {/* <div className="h-16 px-5 flex items-center border-b border-border">
                            <LogoMark />
                        </div> */}
                        <div className="p-4">
                            <button
                                data-testid="sidebar-create-btn"
                                onClick={() => nav("/builder")}
                                className="w-full h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                <FiPlus className="h-4 w-4" /> Create resume
                            </button>
                        </div>
                        <nav className="flex-1 px-3 space-y-1">
                            {navItems.map(({ to, label, icon: Icon }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    data-testid={`sidebar-nav-${label.toLowerCase()}`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`
                                    }
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                </NavLink>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-border space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-muted grid place-items-center text-sm font-bold uppercase">{(user?.name || "U").slice(0, 1)}</div>
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold truncate">{user?.name || "Guest"}</div>
                                    <div className="text-xs text-muted-foreground truncate">{user?.email || "not signed in"}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ThemeToggle />
                                <button
                                    data-testid="sidebar-logout-btn"
                                    onClick={() => { logout(); nav("/"); }}
                                    className="flex-1 h-9 rounded-full border border-border text-xs font-medium inline-flex items-center justify-center gap-2 hover:bg-muted"
                                >
                                    <FiLogOut className="h-3.5 w-3.5" /> Logout
                                </button>
                            </div>
                        </div>
                    </aside>
                )}
                <main className={"flex-1 min-w-0 " + (!hideSidebar ? "lg:pl-[240px]" : "")}>
                    {children}
                </main>
            </div>
        </>
    )
}