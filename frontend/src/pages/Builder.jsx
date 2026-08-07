import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { FaUser, FaFileAlt, FaBriefcase, FaGraduationCap, FaWrench, FaTrophy, FaAward, FaGlobe, FaLink as LinkIcon, FaUsers, FaSave, FaStar, FaMagic, FaTasks, FaEnvelope, FaPlus, FaTimes, FaChevronRight, FaDownload, FaEye, FaTrash } from "react-icons/fa";

import { AppLayout } from "../components/ui/AppLayout";
import { ResumePreview } from "../components/resume/ResumePreview";
import AIGenerateDialog from "../components/resume/AIGenerateDialog";
import { useResumes } from "../context/ResumeContext";
import { defaultResumeData, aiMockOutputs, templates } from "../data/mockData";
import { BUILDER } from "../data/testIds";

const SECTIONS = [
    { key: "personal", label: "Personal", icon: FaUser },
    { key: "summary", label: "Summary", icon: FaFileAlt },
    { key: "experience", label: "Experience", icon: FaBriefcase },
    { key: "education", label: "Education", icon: FaGraduationCap },
    { key: "projects", label: "Projects", icon: FaWrench },
    { key: "skills", label: "Skills", icon: FaTasks },
    { key: "certificates", label: "Certificates", icon: FaAward },
    { key: "achievements", label: "Achievements", icon: FaTrophy },
    { key: "languages", label: "Languages", icon: FaGlobe },
    { key: "socials", label: "Social Links", icon: LinkIcon },
    { key: "references", label: "References", icon: FaUsers },
];

const uid = () => "x_" + Math.random().toString(36).slice(2, 8);

export const Builder = () => {
    const { id } = useParams();
    const [search] = useSearchParams();
    const { resumes, current, currentId, setCurrent, createResume, updateResumeData, updateResume } = useResumes();
    const nav = useNavigate();

    useEffect(() => {
        if (id) { setCurrent(id); return; }
        if (search.get("template") && !current) {
            const nr = createResume({ template: search.get("template"), title: "Untitled Resume" });
            nav(`/builder/${nr.id}`, { replace: true });
        } else if (!current && resumes.length === 0) {
            const nr = createResume({ title: "Untitled Resume" });
            nav(`/builder/${nr.id}`, { replace: true });
        }
    }, [id]); // eslint-disable-line

    const resume = resumes.find((r) => r.id === (id || currentId)) || current || resumes[0];
    const [section, setSection] = useState("personal");
    const [aiOpen, setAiOpen] = useState(null); // "summary" | "skills" | "rewrite" | "cover" | ...
    const [lastSaved, setLastSaved] = useState(Date.now());
    const saveRef = useRef(null);

    // Auto save every 10s
    useEffect(() => {
        if (!resume) return;
        if (saveRef.current) clearInterval(saveRef.current);
        saveRef.current = setInterval(() => setLastSaved(Date.now()), 10000);
        return () => clearInterval(saveRef.current);
    }, [resume?.id]);

    if (!resume) return null;
    const data = resume.data;

    const setData = (patch) => updateResumeData(resume.id, patch);

    const acceptAI = (kind, output) => {
        if (kind === "summary") setData({ summary: output });
        if (kind === "skills") setData({ skills: Array.from(new Set([...(data.skills || []), ...aiMockOutputs.skills])) });
        if (kind === "rewrite") {
            const exp = [...(data.experience || [])];
            if (exp[0]) exp[0] = { ...exp[0], bullets: aiMockOutputs.rewrite };
            setData({ experience: exp });
        }
        if (kind === "cover") toast.success("Cover letter copied to clipboard (demo)");
        if (kind === "objective") setData({ summary: output });
        toast.success("Applied");
    };


    return (
        <>
            <AppLayout>
                <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_minmax(320px,520px)] gap-0 min-h-[calc(100vh)]">
                    {/* Left sidebar */}
                    <aside className="lg:sticky lg:top-0 lg:h-screen border-r border-border bg-background overflow-y-auto no-scrollbar">
                        <div className="p-5 border-b border-border">
                            <input value={resume.title} onChange={(e) => updateResume(resume.id, { title: e.target.value })} className="w-full font-heading font-bold text-base bg-transparent focus:outline-none" />
                            <div className="mt-1 text-xs text-muted-foreground font-mono-stat">autosaved · just now</div>
                        </div>
                        <nav className="p-3 space-y-1">
                            {SECTIONS.map(({ key, label, icon: Icon }) => (
                                <button key={key} data-testid={BUILDER.sidebarSection(key)} onClick={() => setSection(key)} className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors " + (section === key ? "bg-foreground text-background font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                                    <Icon className="h-4 w-4" /> <span>{label}</span> <FaChevronRight className={"ml-auto h-3.5 w-3.5 " + (section === key ? "opacity-100" : "opacity-40")} />
                                </button>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-border">
                            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Template</div>
                            <select value={resume.template} onChange={(e) => updateResume(resume.id, { template: e.target.value })} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm">
                                {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    </aside>

                    {/* Middle forms */}
                    <div className="border-r border-border">
                        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-lg border-b border-border">
                            <div className="px-6 h-14 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Editing</div>
                                    <div className="text-sm font-semibold capitalize">{section}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button data-testid={BUILDER.saveBtn} onClick={() => { setLastSaved(Date.now()); toast.success("Saved"); }} className="h-8 px-3 rounded-full border border-border text-xs font-medium inline-flex items-center gap-1.5"><FaSave className="h-3.5 w-3.5" /> Save</button>
                                    <button data-testid={BUILDER.previewBtn} onClick={() => nav(`/preview/${resume.id}`)} className="h-8 px-3 rounded-full border border-border text-xs font-medium inline-flex items-center gap-1.5"><FaEye className="h-3.5 w-3.5" /> Preview</button>
                                    <button data-testid={BUILDER.downloadBtn} onClick={() => toast.success("Exporting PDF (demo)")} className="h-8 px-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1.5"><FaDownload className="h-3.5 w-3.5" /> PDF</button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 max-w-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div key={section} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                    {section === "personal" && <PersonalForm data={data} setData={setData} />}
                                    {section === "summary" && <SummaryForm data={data} setData={setData} onAI={() => setAiOpen("summary")} />}
                                    {section === "experience" && <ExperienceForm data={data} setData={setData} onAIRewrite={() => setAiOpen("rewrite")} />}
                                    {section === "education" && <EducationForm data={data} setData={setData} />}
                                    {section === "projects" && <ProjectsForm data={data} setData={setData} />}
                                    {section === "skills" && <SkillsForm data={data} setData={setData} onAI={() => setAiOpen("skills")} />}
                                    {section === "certificates" && <ListForm data={data} setData={setData} field="certificates" itemLabel="Certificate" template={{ name: "", issuer: "", year: "" }} fields={[{ k: "name", l: "Name" }, { k: "issuer", l: "Issuer" }, { k: "year", l: "Year" }]} testid={BUILDER.addCertificateBtn} />}
                                    {section === "achievements" && <ListForm data={data} setData={setData} field="achievements" itemLabel="Achievement" template={{ title: "", desc: "" }} fields={[{ k: "title", l: "Title" }, { k: "desc", l: "Description", textarea: true }]} testid="builder-add-achievement" />}
                                    {section === "languages" && <LanguagesForm data={data} setData={setData} />}
                                    {section === "socials" && <SocialsForm data={data} setData={setData} />}
                                    {section === "references" && <ListForm data={data} setData={setData} field="references" itemLabel="Reference" template={{ name: "", role: "", contact: "" }} fields={[{ k: "name", l: "Name" }, { k: "role", l: "Title" }, { k: "contact", l: "Email or phone" }]} testid="builder-add-reference" />}

                                    {/* AI toolbelt */}
                                    <div className="mt-8 p-4 rounded-2xl border border-border bg-muted/30">
                                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">AI Toolbelt</div>
                                        <div className="flex flex-wrap gap-2">
                                            <AIBtn testid={BUILDER.aiSummaryBtn} onClick={() => setAiOpen("summary")} icon={FaMagic}>Generate summary</AIBtn>
                                            <AIBtn testid={BUILDER.aiSkillsBtn} onClick={() => setAiOpen("skills")} icon={FaTasks}>Suggest skills</AIBtn>
                                            <AIBtn testid={BUILDER.aiImproveBtn} onClick={() => setAiOpen("rewrite")} icon={FaStar}>Improve experience</AIBtn>
                                            <AIBtn testid={BUILDER.aiCoverBtn} onClick={() => setAiOpen("cover")} icon={FaEnvelope}>Generate cover letter</AIBtn>
                                            <AIBtn testid="builder-ai-objective" onClick={() => setAiOpen("objective")} icon={FaStar}>Career objective</AIBtn>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right sticky preview */}
                    <aside className="hidden lg:block bg-muted/30 border-l border-border">
                        <div className="sticky top-0 h-screen overflow-y-auto no-scrollbar p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Live preview</div>
                                <div className="text-xs font-mono-stat text-emerald-500">● saved</div>
                            </div>
                            <div className="flex justify-center">
                                <ResumePreview resume={resume} template={resume.template} scale={0.52} />
                            </div>
                        </div>
                    </aside>
                </div>

                {/* AI dialogs */}
                <AIGenerateDialog open={aiOpen === "summary"} onOpenChange={(o) => !o && setAiOpen(null)} title="Generate summary" description="AI will write a 3-line summary based on your profile." mockOutput={aiMockOutputs.summary} onAccept={(o) => acceptAI("summary", o)} />
                <AIGenerateDialog open={aiOpen === "skills"} onOpenChange={(o) => !o && setAiOpen(null)} title="Suggest skills" description="We'll suggest skills recruiters expect for your role." mockOutput={"Suggested skills:\n\n" + aiMockOutputs.skills.join(", ")} onAccept={(o) => acceptAI("skills", o)} />
                <AIGenerateDialog open={aiOpen === "rewrite"} onOpenChange={(o) => !o && setAiOpen(null)} title="Rewrite experience" description="AI will rewrite your first role's bullets with quantified impact." mockOutput={aiMockOutputs.rewrite.map((b, i) => `${i + 1}. ${b}`).join("\n")} onAccept={(o) => acceptAI("rewrite", o)} />
                <AIGenerateDialog open={aiOpen === "cover"} onOpenChange={(o) => !o && setAiOpen(null)} title="Generate cover letter" description="One-page cover letter tailored to your target role." mockOutput={aiMockOutputs.cover} onAccept={(o) => acceptAI("cover", o)} />
                <AIGenerateDialog open={aiOpen === "objective"} onOpenChange={(o) => !o && setAiOpen(null)} title="Career objective" description="A punchy objective for early-career applications." mockOutput={aiMockOutputs.objective} onAccept={(o) => acceptAI("objective", o)} />
            </AppLayout>
        </>
    )
}


function AIBtn({ children, onClick, icon: Icon, testid }) {
    return <button data-testid={testid} onClick={onClick} className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-border bg-background text-xs font-semibold hover:border-foreground hover:bg-foreground hover:text-background transition-colors"><Icon className="h-3.5 w-3.5" /> {children}</button>;
}

function TextInput({ label, value, onChange, placeholder, textarea, rows = 3 }) {
    return (
        <label className="block">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            {textarea ? (
                <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10" />
            ) : (
                <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10" />
            )}
        </label>
    );
}

function PersonalForm({ data, setData }) {
    const p = data.personal || {};
    const setP = (patch) => setData({ personal: { ...p, ...patch } });
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Full name" value={p.fullName} onChange={(v) => setP({ fullName: v })} />
            <TextInput label="Profession" value={p.profession} onChange={(v) => setP({ profession: v })} />
            <TextInput label="Email" value={p.email} onChange={(v) => setP({ email: v })} />
            <TextInput label="Phone" value={p.phone} onChange={(v) => setP({ phone: v })} />
            <TextInput label="Location" value={p.location} onChange={(v) => setP({ location: v })} />
            <TextInput label="Website" value={p.website} onChange={(v) => setP({ website: v })} />
            <TextInput label="LinkedIn" value={p.linkedin} onChange={(v) => setP({ linkedin: v })} />
            <TextInput label="GitHub" value={p.github} onChange={(v) => setP({ github: v })} />
        </div>
    );
}

function SummaryForm({ data, setData, onAI }) {
    return (
        <div className="space-y-4">
            <TextInput label="Professional summary" value={data.summary} onChange={(v) => setData({ summary: v })} textarea rows={6} placeholder="A 3–4 line summary highlighting your best signals." />
            <button onClick={onAI} className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold"><FaMagic className="h-3.5 w-3.5" /> Generate with AI</button>
        </div>
    );
}

function ExperienceForm({ data, setData, onAIRewrite }) {
    const exp = data.experience || [];
    const update = (id, patch) => setData({ experience: exp.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
    const remove = (id) => setData({ experience: exp.filter((e) => e.id !== id) });
    const add = () => setData({ experience: [...exp, { id: uid(), role: "", company: "", location: "", start: "", end: "", bullets: [""] }] });
    return (
        <div className="space-y-5">
            {exp.map((e) => (
                <div key={e.id} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Role</div>
                        <button onClick={() => remove(e.id)} className="text-muted-foreground hover:text-destructive"><FaTrash className="h-4 w-4" /></button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <TextInput label="Role" value={e.role} onChange={(v) => update(e.id, { role: v })} />
                        <TextInput label="Company" value={e.company} onChange={(v) => update(e.id, { company: v })} />
                        <TextInput label="Location" value={e.location} onChange={(v) => update(e.id, { location: v })} />
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput label="Start" value={e.start} onChange={(v) => update(e.id, { start: v })} />
                            <TextInput label="End" value={e.end} onChange={(v) => update(e.id, { end: v })} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">Bullets</div>
                        {(e.bullets || []).map((b, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <textarea value={b} onChange={(ev) => { const copy = [...e.bullets]; copy[i] = ev.target.value; update(e.id, { bullets: copy }); }} rows={2} className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none" />
                                <button onClick={() => { const copy = e.bullets.filter((_, x) => x !== i); update(e.id, { bullets: copy }); }} className="h-8 w-8 grid place-items-center text-muted-foreground hover:text-destructive"><FaTimes className="h-4 w-4" /></button>
                            </div>
                        ))}
                        <button onClick={() => update(e.id, { bullets: [...(e.bullets || []), ""] })} className="inline-flex items-center gap-1 text-xs text-primary font-semibold"><FaPlus className="h-3.5 w-3.5" /> Add bullet</button>
                    </div>
                </div>
            ))}
            <div className="flex gap-2">
                <button data-testid={BUILDER.addExperienceBtn} onClick={add} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border text-sm font-semibold hover:bg-muted"><FaPlus className="h-4 w-4" /> Add experience</button>
                <button onClick={onAIRewrite} className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold"><FaStar className="h-4 w-4" /> AI rewrite</button>
            </div>
        </div>
    );
}

function EducationForm({ data, setData }) {
    const items = data.education || [];
    const update = (id, patch) => setData({ education: items.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
    const remove = (id) => setData({ education: items.filter((e) => e.id !== id) });
    const add = () => setData({ education: [...items, { id: uid(), degree: "", school: "", location: "", start: "", end: "", gpa: "" }] });
    return (
        <div className="space-y-5">
            {items.map((e) => (
                <div key={e.id} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Education</div><button onClick={() => remove(e.id)} className="text-muted-foreground hover:text-destructive"><FaTrash className="h-4 w-4" /></button></div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <TextInput label="Degree" value={e.degree} onChange={(v) => update(e.id, { degree: v })} />
                        <TextInput label="School" value={e.school} onChange={(v) => update(e.id, { school: v })} />
                        <TextInput label="Location" value={e.location} onChange={(v) => update(e.id, { location: v })} />
                        <TextInput label="GPA" value={e.gpa} onChange={(v) => update(e.id, { gpa: v })} />
                        <TextInput label="Start" value={e.start} onChange={(v) => update(e.id, { start: v })} />
                        <TextInput label="End" value={e.end} onChange={(v) => update(e.id, { end: v })} />
                    </div>
                </div>
            ))}
            <button data-testid={BUILDER.addEducationBtn} onClick={add} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border text-sm font-semibold hover:bg-muted"><FaPlus className="h-4 w-4" /> Add education</button>
        </div>
    );
}

function ProjectsForm({ data, setData }) {
    const items = data.projects || [];
    const update = (id, patch) => setData({ projects: items.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
    const remove = (id) => setData({ projects: items.filter((e) => e.id !== id) });
    const add = () => setData({ projects: [...items, { id: uid(), name: "", tech: "", github: "", live: "", desc: "" }] });
    return (
        <div className="space-y-5">
            {items.map((e) => (
                <div key={e.id} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Project</div><button onClick={() => remove(e.id)} className="text-muted-foreground hover:text-destructive"><FaTrash className="h-4 w-4" /></button></div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <TextInput label="Name" value={e.name} onChange={(v) => update(e.id, { name: v })} />
                        <TextInput label="Tech" value={e.tech} onChange={(v) => update(e.id, { tech: v })} />
                        <TextInput label="GitHub" value={e.github} onChange={(v) => update(e.id, { github: v })} />
                        <TextInput label="Live" value={e.live} onChange={(v) => update(e.id, { live: v })} />
                    </div>
                    <TextInput label="Description" value={e.desc} onChange={(v) => update(e.id, { desc: v })} textarea rows={3} />
                </div>
            ))}
            <button data-testid={BUILDER.addProjectBtn} onClick={add} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border text-sm font-semibold hover:bg-muted"><FaPlus className="h-4 w-4" /> Add project</button>
        </div>
    );
}

function SkillsForm({ data, setData, onAI }) {
    const [q, setQ] = useState("");
    const skills = data.skills || [];
    const add = () => { if (!q.trim() || skills.includes(q.trim())) return setQ(""); setData({ skills: [...skills, q.trim()] }); setQ(""); };
    const remove = (s) => setData({ skills: skills.filter((x) => x !== s) });
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 h-11 rounded-lg border border-border bg-background px-3">
                <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())} placeholder="Type a skill and press Enter" className="w-full bg-transparent focus:outline-none text-sm" />
                <button data-testid={BUILDER.addSkillBtn} onClick={add} className="text-primary text-sm font-semibold">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
                {s.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-sm">{s} <button onClick={() => remove(s)}><FaTimes className="h-3 w-3" /></button></span>
                ))}
            </div>
            <button onClick={onAI} className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold"><FaStar className="h-3.5 w-3.5" /> Suggest with AI</button>
        </div>
    );
}

function LanguagesForm({ data, setData }) {
    const items = data.languages || [];
    const update = (id, patch) => setData({ languages: items.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
    const remove = (id) => setData({ languages: items.filter((e) => e.id !== id) });
    const add = () => setData({ languages: [...items, { id: uid(), name: "", level: "Professional" }] });
    return (
        <div className="space-y-3">
            {items.map((l) => (
                <div key={l.id} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3 rounded-lg border border-border bg-card p-3">
                    <TextInput label="Language" value={l.name} onChange={(v) => update(l.id, { name: v })} />
                    <TextInput label="Level" value={l.level} onChange={(v) => update(l.id, { level: v })} />
                    <button onClick={() => remove(l.id)} className="h-10 w-10 grid place-items-center text-muted-foreground hover:text-destructive"><FaTrash className="h-4 w-4" /></button>
                </div>
            ))}
            <button onClick={add} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border text-sm font-semibold hover:bg-muted"><FaPlus className="h-4 w-4" /> Add language</button>
        </div>
    );
}

function SocialsForm({ data, setData }) {
    const s = data.socials || {};
    const setS = (patch) => setData({ socials: { ...s, ...patch } });
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {["linkedin", "github", "portfolio", "leetcode", "codechef", "codeforces", "hackerrank"].map((k) => (
                <TextInput key={k} label={k[0].toUpperCase() + k.slice(1)} value={s[k]} onChange={(v) => setS({ [k]: v })} />
            ))}
        </div>
    );
}

function ListForm({ data, setData, field, itemLabel, template, fields, testid }) {
    const items = data[field] || [];
    const update = (id, patch) => setData({ [field]: items.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
    const remove = (id) => setData({ [field]: items.filter((e) => e.id !== id) });
    const add = () => setData({ [field]: [...items, { id: uid(), ...template }] });
    return (
        <div className="space-y-4">
            {items.map((it) => (
                <div key={it.id} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                    <div className="flex items-center justify-between"><div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{itemLabel}</div><button onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive"><FaTrash className="h-4 w-4" /></button></div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {fields.map((f) => (
                            <div key={f.k} className={f.textarea ? "sm:col-span-2" : ""}>
                                <TextInput label={f.l} value={it[f.k]} onChange={(v) => update(it.id, { [f.k]: v })} textarea={f.textarea} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button data-testid={testid} onClick={add} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border text-sm font-semibold hover:bg-muted"><FaPlus className="h-4 w-4" /> Add {itemLabel.toLowerCase()}</button>
        </div>
    );
}

