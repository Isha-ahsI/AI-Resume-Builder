import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {ResumePreview} from "../components/resume/ResumePreview";
import { defaultResumeData, templates, templateCategories } from "../data/mockData";
import { TEMPLATES } from "../data/testIds";
import { fadeUp, stagger } from "../lib/animations";
import { IoIosSearch } from "react-icons/io";

export const Templates = () => {
    const [cat, setCat] = useState("All");
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        return templates.filter((t) => (cat === "All" || t.category === cat) && (t.name.toLowerCase().includes(q.toLowerCase()) || t.description.toLowerCase().includes(q.toLowerCase())));
    }, [cat, q]);

    return (
        <>
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
                    <div className="text-xs font-mono-stat uppercase tracking-[0.24em] text-muted-foreground">Templates</div>
                    <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight max-w-3xl text-balance">Every template is ATS-tested and ships in <span className="text-gradient-primary">a single click.</span></h1>
                    <p className="mt-3 text-muted-foreground max-w-2xl">Filter by role and personality. Switch templates any time — your content stays intact.</p>

                    <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
                        <div className="flex flex-wrap gap-2">
                            {templateCategories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCat(c)}
                                    data-testid={TEMPLATES.filter(c.toLowerCase().replace(/\s+/g, "-"))}
                                    className={"h-9 px-4 rounded-full border text-sm transition-colors " + (cat === c ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:bg-muted")}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 h-10 rounded-full border border-border bg-background px-4 md:w-72">
                            <IoIosSearch className="h-4 w-4 text-muted-foreground" />
                            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates" className="w-full bg-transparent focus:outline-none text-sm" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
                <motion.div variants={stagger(0.06)} initial="hidden" animate="visible" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((t) => (
                        <motion.div key={t.id} variants={fadeUp} data-testid={TEMPLATES.card(t.id)} className="group">
                            <div className="relative overflow-hidden rounded-2xl border border-border bg-background aspect-[3/4] flex items-start justify-center p-4 hover:border-foreground transition-colors">
                                <ResumePreview resume={{ data: defaultResumeData }} template={t.id} scale={0.32} />
                                <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link data-testid={TEMPLATES.previewBtn(t.id)} to={`/preview?template=${t.id}`} className="flex-1 h-9 grid place-items-center rounded-full bg-foreground text-background text-xs font-semibold">Preview</Link>
                                    <Link data-testid={TEMPLATES.useTemplate(t.id)} to={`/builder?template=${t.id}`} className="flex-1 h-9 grid place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">Use Template</Link>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex items-center justify-between">
                                    <div className="font-heading font-bold">{t.name}</div>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono-stat" style={{ background: t.accent + "22", color: t.accent }}>{t.category}</span>
                                </div>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">{t.description}</p>
                            </div>
                        </motion.div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-20 text-muted-foreground text-sm">No templates match your filter.</div>
                    )}
                </motion.div>
            </section>

        </>
    )
}
