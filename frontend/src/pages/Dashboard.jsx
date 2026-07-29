import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { FileText, LayoutTemplate, Download, Sparkles, Plus, Edit3, Copy, Trash2, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import { FiFileText, FiDownload, FiPlus, FiEdit3, FiCopy, FiTrash2, FiArrowUpRight, FiTrendingUp, FiClock } from "react-icons/fi";
import { TbTemplate, TbSparkles } from "react-icons/tb";
import {AppLayout} from "../components/ui/AppLayout";
import {ResumePreview} from "../components/resume/ResumePreview";
import { useResumes } from "../context/ResumeContext";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD } from "../data/testIds";
import { toast } from "sonner";
import { fadeUp, stagger } from "../lib/animations";

function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export const Dashboard = () => {
    const { resumes, createResume, deleteResume, duplicateResume, setCurrent } = useResumes();
    const { user } = useAuth();
    const nav = useNavigate();

    const stats = [
        { key: "resumes", label: "My Resumes", value: resumes.length, delta: "+2 this month", icon: FiFileText },
        { key: "templates", label: "Templates", value: 8, delta: "New: Editorial", icon: TbTemplate },
        { key: "downloads", label: "Downloads", value: 24, delta: "+11 this week", icon: FiDownload },
        { key: "credits", label: "AI Credits", value: 137, delta: "Resets Mar 1", icon: TbSparkles },
    ];

    const onCreate = () => {
        const nr = createResume({ title: "New Resume" });
        toast.success("Draft created");
        nav(`/builder/${nr.id}`);
    };
    return (
        <>
            <AppLayout>
                <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 sm:py-14">
                    <motion.div variants={stagger()} initial="hidden" animate="visible">
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <div className="text-xs font-mono-stat uppercase tracking-[0.24em] text-muted-foreground">Dashboard</div>
                                <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight">Welcome back, {user?.name?.split(" ")[0] || "friend"}.</h1>
                                <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off, or start a fresh resume.</p>
                            </div>
                            <button onClick={onCreate} data-testid={DASHBOARD.createResumeBtn} className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90">
                                <FiPlus className="h-4 w-4" /> Create resume
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map(({ key, label, value, delta, icon: Icon }) => (
                                <div key={key} data-testid={DASHBOARD.statCard(key)} className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 group hover:border-foreground transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
                                        <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center"><Icon className="h-4 w-4" /></div>
                                    </div>
                                    <div className="mt-3 flex items-baseline gap-2">
                                        <div className="font-heading font-black text-4xl font-mono-stat">{value}</div>
                                        <div className="text-[11px] font-mono-stat text-emerald-500 inline-flex items-center gap-0.5"><FiTrendingUp className="h-3 w-3" /> {delta}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Recently edited grid */}
                        <motion.div variants={fadeUp} className="mt-10">
                            <div className="flex items-baseline justify-between">
                                <h2 className="font-heading font-bold text-xl tracking-tight">Recently edited</h2>
                                <Link to="/templates" className="text-sm text-primary hover:underline inline-flex items-center gap-1">Browse templates <FiArrowUpRight className="h-3.5 w-3.5" /></Link>
                            </div>
                            <div className="mt-4 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {resumes.slice(0, 3).map((r) => (
                                    <div key={r.id} className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground transition-colors">
                                        <div className="relative bg-muted/40 flex items-start justify-center p-4 h-64 overflow-hidden">
                                            <ResumePreview resume={r} template={r.template} scale={0.32} />
                                            <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { setCurrent(r.id); nav(`/builder/${r.id}`); }} data-testid={DASHBOARD.editResume(r.id)} className="flex-1 h-9 rounded-full bg-foreground text-background text-xs font-semibold inline-flex items-center justify-center gap-1"><FiEdit3 className="h-3.5 w-3.5" /> Edit</button>
                                                <button onClick={() => { setCurrent(r.id); nav(`/preview/${r.id}`); }} className="flex-1 h-9 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Preview</button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <div className="font-heading font-semibold truncate">{r.title}</div>
                                                    <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><FiClock className="h-3 w-3" /> {timeAgo(r.updatedAt)} · {r.template}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">ATS</div>
                                                    <div className="font-mono-stat font-bold text-sm">{r.atsScore}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Full table */}
                        <motion.div variants={fadeUp} className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
                            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                                <h2 className="font-heading font-bold text-lg tracking-tight">All resumes</h2>
                                <span className="text-xs text-muted-foreground font-mono-stat">{resumes.length} total</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        <tr className="border-b border-border">
                                            <th className="text-left px-5 py-3 font-medium">Title</th>
                                            <th className="text-left px-5 py-3 font-medium">Template</th>
                                            <th className="text-left px-5 py-3 font-medium">ATS</th>
                                            <th className="text-left px-5 py-3 font-medium">Updated</th>
                                            <th className="text-right px-5 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resumes.map((r) => (
                                            <tr key={r.id} data-testid={DASHBOARD.resumeRow(r.id)} className="border-b border-border last:border-0 hover:bg-muted/40">
                                                <td className="px-5 py-3.5 font-medium">{r.title}</td>
                                                <td className="px-5 py-3.5"><span className="inline-flex items-center px-2 py-0.5 rounded-full border border-border text-xs capitalize">{r.template}</span></td>
                                                <td className="px-5 py-3.5 font-mono-stat">{r.atsScore}</td>
                                                <td className="px-5 py-3.5 text-muted-foreground">{timeAgo(r.updatedAt)}</td>
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <IconBtn testid={DASHBOARD.editResume(r.id)} title="Edit" onClick={() => { setCurrent(r.id); nav(`/builder/${r.id}`); }}><FiEdit3 className="h-3.5 w-3.5" /></IconBtn>
                                                        <IconBtn testid={DASHBOARD.duplicateResume(r.id)} title="Duplicate" onClick={() => { duplicateResume(r.id); toast.success("Duplicated"); }}><FiCopy className="h-3.5 w-3.5" /></IconBtn>
                                                        <IconBtn testid={DASHBOARD.deleteResume(r.id)} title="Delete" onClick={() => { deleteResume(r.id); toast.success("Deleted"); }} danger><FiTrash2 className="h-3.5 w-3.5" /></IconBtn>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {resumes.length === 0 && (
                                            <tr><td colSpan={5} className="px-5 py-10 text-center text-muted-foreground text-sm">No resumes yet. Create your first one.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </AppLayout>
        </>
    )
}


function IconBtn({ children, title, onClick, testid, danger }) {
  return (
    <button title={title} onClick={onClick} data-testid={testid} className={"h-8 w-8 rounded-md grid place-items-center border border-border hover:bg-muted " + (danger ? "text-destructive hover:text-destructive" : "")}>{children}</button>
  );
}
