import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
// import { ArrowLeft, ArrowRight, Check, Loader2, Plus, X, Sparkles } from "lucide-react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiLoader, FiPlus, FiX } from "react-icons/fi";
import { TbSparkles } from "react-icons/tb";
import { WIZARD } from "../data/testIds";
import { popularSkills, languagesLibrary, industries, workPrefs } from "../data/mockData";
import { useResumes } from "../context/ResumeContext";

const STEPS = [
  { id: 1, title: "Basic info", desc: "Where recruiters find you." },
  { id: 2, title: "Education", desc: "Your academic foundation." },
  { id: 3, title: "Skills", desc: "What you're strong at." },
  { id: 4, title: "Projects", desc: "Things you've built." },
  { id: 5, title: "Career goals", desc: "Where you're heading." },
  { id: 6, title: "Languages", desc: "Languages you speak." },
  { id: 7, title: "Social links", desc: "Public profiles." },
];

const initialData = {
  personal: { fullName: "", profession: "", company: "", experienceYears: "", location: "", phone: "" },
  education: { degree: "", college: "", graduationYear: "", cgpa: "" },
  skills: [],
  project: { name: "", tech: "", github: "", live: "", desc: "" },
  goals: { desiredRole: "", industry: "", workPreference: "", expectedSalary: "", intro: "" },
  languages: [],
  socials: { linkedin: "", github: "", portfolio: "", leetcode: "", codechef: "", codeforces: "", hackerrank: "" },
};

const KEY = "rb-setup-wizard";

export const SetupWizard = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(() => {
    try { return { ...initialData, ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; } catch { return initialData; }
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { createResume } = useResumes();

  const set = (patch) => {
    const next = { ...data, ...patch };
    setData(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const progress = useMemo(() => (step / STEPS.length) * 100, [step]);

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const finish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const resume = createResume({
      title: `${data.personal.fullName || "New"} — ${data.personal.profession || "Resume"}`.slice(0, 60),
      data: {
        personal: {
          fullName: data.personal.fullName, profession: data.personal.profession,
          email: "", phone: data.personal.phone, location: data.personal.location,
          website: data.socials.portfolio, linkedin: data.socials.linkedin, github: data.socials.github,
        },
        summary: data.goals.intro,
        experience: [{ id: "e1", role: data.personal.profession, company: data.personal.company, location: data.personal.location, start: "2022", end: "Present", bullets: ["Add your accomplishments in the builder."] }],
        education: [{ id: "ed1", degree: data.education.degree, school: data.education.college, location: "", start: "", end: data.education.graduationYear, gpa: data.education.cgpa }],
        skills: data.skills,
        projects: data.project.name ? [{ id: "p1", name: data.project.name, tech: data.project.tech, github: data.project.github, live: data.project.live, desc: data.project.desc }] : [],
        certificates: [], achievements: [], languages: data.languages, socials: data.socials, references: [],
        careerGoals: data.goals,
      },
    });
    setLoading(false);
    toast.success("Setup complete — welcome to your builder.");
    localStorage.removeItem(KEY);
    nav(`/builder/${resume.id}`);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-10 sm:py-14 pb-32">
        <div className="flex items-baseline justify-between">
          <div className="text-xs font-mono-stat uppercase tracking-[0.24em] text-muted-foreground">Step {step} of {STEPS.length}</div>
          <div className="text-xs text-muted-foreground font-mono-stat">{Math.round(progress)}% complete</div>
        </div>
        <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden" data-testid={WIZARD.progressBar}>
          <motion.div className="h-full bg-primary" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
        <h1 className="mt-8 text-3xl sm:text-4xl font-black tracking-tight">{STEPS[step - 1].title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{STEPS[step - 1].desc}</p>

        <div className="mt-8" data-testid={WIZARD.step(step)}>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              {step === 1 && <Step1 data={data} set={set} />}
              {step === 2 && <Step2 data={data} set={set} />}
              {step === 3 && <Step3 data={data} set={set} />}
              {step === 4 && <Step4 data={data} set={set} />}
              {step === 5 && <Step5 data={data} set={set} />}
              {step === 6 && <Step6 data={data} set={set} />}
              {step === 7 && <Step7 data={data} set={set} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed action bar */}
      <div className="fixed bottom-0 inset-x-0 border-t border-border bg-background/90 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <button data-testid={WIZARD.prevBtn} onClick={prev} disabled={step === 1} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border text-sm font-medium disabled:opacity-50 hover:bg-muted">
            <FiArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="hidden sm:flex items-center gap-1">
            {STEPS.map((s) => (
              <span key={s.id} className={"h-1.5 w-6 rounded-full " + (s.id <= step ? "bg-foreground" : "bg-muted")} />
            ))}
          </div>
          {step < STEPS.length ? (
            <button data-testid={WIZARD.nextBtn} onClick={next} className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              Continue <FiArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button data-testid={WIZARD.finishBtn} onClick={finish} disabled={loading} className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-foreground text-background text-sm font-semibold">
              {loading ? <FiLoader className="h-4 w-4 animate-spin" /> : <TbSparkles className="h-4 w-4" />} Finish & build
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function LabeledInput({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10" />
    </label>
  );
}

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-foreground">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Step1({ data, set }) {
  const p = data.personal;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LabeledInput label="Full name" value={p.fullName} onChange={(v) => set({ personal: { ...p, fullName: v } })} placeholder="Alex Morgan" />
      <LabeledInput label="Profession" value={p.profession} onChange={(v) => set({ personal: { ...p, profession: v } })} placeholder="Senior Product Designer" />
      <LabeledInput label="Current company" value={p.company} onChange={(v) => set({ personal: { ...p, company: v } })} placeholder="Loop Inc." />
      <LabeledInput label="Years of experience" value={p.experienceYears} onChange={(v) => set({ personal: { ...p, experienceYears: v } })} placeholder="7" />
      <LabeledInput label="Location" value={p.location} onChange={(v) => set({ personal: { ...p, location: v } })} placeholder="San Francisco, CA" />
      <LabeledInput label="Phone" value={p.phone} onChange={(v) => set({ personal: { ...p, phone: v } })} placeholder="+1 (415) 555 0123" />
    </div>
  );
}
function Step2({ data, set }) {
  const e = data.education;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LabeledInput label="Degree" value={e.degree} onChange={(v) => set({ education: { ...e, degree: v } })} placeholder="B.S. Computer Science" />
      <LabeledInput label="College / University" value={e.college} onChange={(v) => set({ education: { ...e, college: v } })} placeholder="Stanford University" />
      <LabeledInput label="Graduation year" value={e.graduationYear} onChange={(v) => set({ education: { ...e, graduationYear: v } })} placeholder="2021" />
      <LabeledInput label="CGPA / GPA" value={e.cgpa} onChange={(v) => set({ education: { ...e, cgpa: v } })} placeholder="3.8/4.0" />
    </div>
  );
}
function Step3({ data, set }) {
  const [q, setQ] = useState("");
  const suggestions = popularSkills.filter((s) => s.toLowerCase().includes(q.toLowerCase()) && !data.skills.includes(s)).slice(0, 12);
  const add = (s) => { if (!s.trim()) return; if (data.skills.includes(s)) return; set({ skills: [...data.skills, s] }); setQ(""); };
  const remove = (s) => set({ skills: data.skills.filter((x) => x !== s) });
  return (
    <div>
      <div className="flex items-center gap-2 h-11 rounded-lg border border-border bg-background px-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add(q))} placeholder="Type a skill and press Enter" className="w-full bg-transparent focus:outline-none text-sm" />
        <button onClick={() => add(q)} className="text-primary text-sm font-semibold">Add</button>
      </div>
      {data.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.skills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-sm">
              {s} <button onClick={() => remove(s)} className="opacity-70 hover:opacity-100"><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Popular skills</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} onClick={() => add(s)} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-border text-sm hover:bg-muted"><FiPlus className="h-3 w-3" /> {s}</button>
        ))}
      </div>
    </div>
  );
}
function Step4({ data, set }) {
  const p = data.project;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LabeledInput label="Project name" value={p.name} onChange={(v) => set({ project: { ...p, name: v } })} placeholder="Bloom — meditation app" />
      <LabeledInput label="Technologies" value={p.tech} onChange={(v) => set({ project: { ...p, tech: v } })} placeholder="React Native, Firebase" />
      <LabeledInput label="GitHub URL" value={p.github} onChange={(v) => set({ project: { ...p, github: v } })} placeholder="github.com/you/project" />
      <LabeledInput label="Live demo URL" value={p.live} onChange={(v) => set({ project: { ...p, live: v } })} placeholder="project.io" />
      <label className="block sm:col-span-2">
        <span className="text-xs font-medium text-muted-foreground">Description</span>
        <textarea rows={4} value={p.desc || ""} onChange={(e) => set({ project: { ...p, desc: e.target.value } })} placeholder="What did you build and what impact did it have?" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10" />
      </label>
    </div>
  );
}
function Step5({ data, set }) {
  const g = data.goals;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LabeledInput label="Desired role" value={g.desiredRole} onChange={(v) => set({ goals: { ...g, desiredRole: v } })} placeholder="Design Lead" />
      <LabeledSelect label="Preferred industry" value={g.industry} onChange={(v) => set({ goals: { ...g, industry: v } })} options={industries} />
      <LabeledSelect label="Work preference" value={g.workPreference} onChange={(v) => set({ goals: { ...g, workPreference: v } })} options={workPrefs} />
      <LabeledInput label="Expected salary" value={g.expectedSalary} onChange={(v) => set({ goals: { ...g, expectedSalary: v } })} placeholder="$210k–$240k" />
      <label className="block sm:col-span-2">
        <span className="text-xs font-medium text-muted-foreground">Professional introduction</span>
        <textarea rows={4} value={g.intro || ""} onChange={(e) => set({ goals: { ...g, intro: e.target.value } })} placeholder="A 2–3 line summary of who you are and what you want next." className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10" />
      </label>
    </div>
  );
}
function Step6({ data, set }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Professional");
  const add = () => { if (!name) return; set({ languages: [...data.languages, { id: "l_" + Math.random().toString(36).slice(2,6), name, level }] }); setName(""); };
  const remove = (id) => set({ languages: data.languages.filter((l) => l.id !== id) });
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <LabeledSelect label="Language" value={name} onChange={setName} options={languagesLibrary} />
        <LabeledSelect label="Proficiency" value={level} onChange={setLevel} options={["Native","Fluent","Professional","Conversational","Basic"]} />
        <div className="flex items-end"><button onClick={add} className="h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2"><FiPlus className="h-4 w-4" /> Add</button></div>
      </div>
      <div className="mt-6 space-y-2">
        {data.languages.map((l) => (
          <div key={l.id} className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5">
            <div className="text-sm"><span className="font-semibold">{l.name}</span> <span className="text-muted-foreground">— {l.level}</span></div>
            <button onClick={() => remove(l.id)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
function Step7({ data, set }) {
  const s = data.socials;
  const setField = (k, v) => set({ socials: { ...s, [k]: v } });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <LabeledInput label="LinkedIn" value={s.linkedin} onChange={(v) => setField("linkedin", v)} placeholder="linkedin.com/in/you" />
      <LabeledInput label="GitHub" value={s.github} onChange={(v) => setField("github", v)} placeholder="github.com/you" />
      <LabeledInput label="Portfolio" value={s.portfolio} onChange={(v) => setField("portfolio", v)} placeholder="you.design" />
      <LabeledInput label="LeetCode" value={s.leetcode} onChange={(v) => setField("leetcode", v)} placeholder="leetcode.com/u/you" />
      <LabeledInput label="CodeChef" value={s.codechef} onChange={(v) => setField("codechef", v)} placeholder="codechef.com/users/you" />
      <LabeledInput label="Codeforces" value={s.codeforces} onChange={(v) => setField("codeforces", v)} placeholder="codeforces.com/profile/you" />
      <LabeledInput label="HackerRank" value={s.hackerrank} onChange={(v) => setField("hackerrank", v)} placeholder="hackerrank.com/you" />
    </div>
  );
}
