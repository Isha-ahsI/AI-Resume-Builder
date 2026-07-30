import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FiUser, FiMail, FiMapPin, FiPhone, FiBell, FiLock, FiLogOut, FiSave, FiLoader } from "react-icons/fi";
import { TbPalette } from "react-icons/tb";
import { AppLayout } from "../components/ui/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { PROFILE } from "../data/testIds";
import { Switch } from "../components/ui/switch";

export const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const [form, setForm] = useState({ name: "", email: "", phone: "", location: "" });
    const [notif, setNotif] = useState({ product: true, marketing: false, jobs: true });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const onSave = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        updateUser({ name: form.name, email: form.email });
        setLoading(false);
        toast.success("Profile updated");
    };

    const onChangePwd = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        toast.success("Password updated (demo)");
    };
    return (
        <>
            <AppLayout>
                <div className="mx-auto max-w-4xl px-5 sm:px-8 py-10 sm:py-14">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <div className="text-xs font-mono-stat uppercase tracking-[0.24em] text-muted-foreground">Profile</div>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">Account settings</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Manage your profile, appearance and notifications.</p>
                    </motion.div>

                    {/* Profile card */}
                    <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
                        <div className="flex items-center gap-5">
                            <div className="h-20 w-20 rounded-2xl bg-foreground text-background grid place-items-center text-2xl font-black uppercase">{(form.name || "U").slice(0, 1)}</div>
                            <div>
                                <div className="font-heading font-bold text-xl">{form.name || "Your name"}</div>
                                <div className="text-sm text-muted-foreground">{form.email}</div>
                                <div className="mt-2 text-[11px] font-mono-stat px-2 py-0.5 rounded-full bg-primary/10 text-primary inline-block">Pro plan · renews Mar 1</div>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <Field icon={FiUser} label="Full name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent focus:outline-none text-sm" /></Field>
                            <Field icon={FiMail} label="Email"><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent focus:outline-none text-sm" /></Field>
                            <Field icon={FiPhone} label="Phone"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent focus:outline-none text-sm" /></Field>
                            <Field icon={FiMapPin} label="Location"><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-transparent focus:outline-none text-sm" /></Field>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button onClick={onSave} disabled={loading} data-testid={PROFILE.updateBtn} className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                                {loading ? <FiLoader className="h-4 w-4 animate-spin" /> : <FiSave className="h-4 w-4" />} Save changes
                            </button>
                        </div>
                    </div>

                    {/* Appearance */}
                    <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                        <div className="flex items-center gap-3"><TbPalette className="h-5 w-5" /><h2 className="font-heading font-bold text-lg">Appearance</h2></div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3" data-testid={PROFILE.themeSelect}>
                            {["light", "dark"].map((t) => (
                                <button key={t} onClick={() => setTheme(t)} className={"rounded-xl border p-4 text-left transition-colors " + (theme === t ? "border-foreground bg-muted" : "border-border hover:bg-muted")}>
                                    <div className={"h-16 rounded-lg mb-3 " + (t === "light" ? "bg-neutral-100 border border-neutral-200" : "bg-black border border-neutral-800")} />
                                    <div className="text-sm font-semibold capitalize">{t}</div>
                                    <div className="text-xs text-muted-foreground">{t === "light" ? "Bright, high contrast" : "Low-light comfort"}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                        <div className="flex items-center gap-3"><FiBell className="h-5 w-5" /><h2 className="font-heading font-bold text-lg">Notifications</h2></div>
                        <div className="mt-4 divide-y divide-border">
                            {[["product", "Product updates", "New templates, AI features and improvements"], ["marketing", "Marketing emails", "Tips, offers and career resources"], ["jobs", "Job matches", "Weekly matches based on your target role"]].map(([k, label, desc]) => (
                                <div key={k} className="flex items-center justify-between py-3">
                                    <div><div className="text-sm font-medium">{label}</div><div className="text-xs text-muted-foreground">{desc}</div></div>
                                    <Switch data-testid={PROFILE.notifSwitch + "-" + k} checked={notif[k]} onCheckedChange={(v) => setNotif({ ...notif, [k]: v })} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Change password */}
                    <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
                        <div className="flex items-center gap-3"><FiLock className="h-5 w-5" /><h2 className="font-heading font-bold text-lg">Change password</h2></div>
                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <F label="Current" />
                            <F label="New" />
                            <F label="Confirm new" />
                        </div>
                        <div className="mt-5 flex justify-end">
                            <button onClick={onChangePwd} disabled={loading} data-testid={PROFILE.changePwdBtn} className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-foreground text-background text-sm font-semibold">
                                {loading ? <FiLoader className="h-4 w-4 animate-spin" /> : null} Update password
                            </button>
                        </div>
                    </div>

                    {/* Danger */}
                    <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8 flex items-center justify-between">
                        <div>
                            <div className="font-heading font-bold text-lg">Sign out</div>
                            <div className="text-sm text-muted-foreground">You will need to log in again next time.</div>
                        </div>
                        <button data-testid={PROFILE.logoutBtn} onClick={() => { logout(); toast.success("Signed out"); nav("/"); }} className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-destructive/40 text-destructive hover:bg-destructive/10 text-sm font-semibold">
                            <FiLogOut className="h-4 w-4" /> Log out
                        </button>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center gap-2 h-11 rounded-lg border border-border bg-background px-3 focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/10">
        <Icon className="h-4 w-4 text-muted-foreground" />
        {children}
      </div>
    </label>
  );
}
function F({ label }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input type="password" placeholder="••••••••" className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10" />
    </label>
  );
}

