import { FiMail, FiPhone, FiMapPin, FiGlobe, FiLinkedin, FiGithub } from "react-icons/fi";

// A4 aspect: 21/29.7
// scale prop controls display scale (1 = full page). The content is written for 794px (A4 at 96dpi).

export const ResumePreview = ({ resume, template = "modern", scale = 0.5, className = "" }) => {
  const t = template || resume?.template || "modern";
  const data = resume?.data || {};

  const outerStyle = { width: 794 * scale, height: 1123 * scale };
  const innerStyle = { width: 794, height: 1123, transform: `scale(${scale})`, transformOrigin: "top left" };

  const Body = () => {
    if (t === "creative" || t === "editorial") return <CreativeTemplate data={data} accent="#FF3B30" />;
    if (t === "modern-sidebar") return <SidebarTemplate data={data} accent="#0EA5E9" />;
    if (t === "professional") return <ProfessionalTemplate data={data} />;
    if (t === "minimal" || t === "compact") return <MinimalTemplate data={data} />;
    if (t === "ats") return <ATSTemplate data={data} />;
    return <ModernTemplate data={data} accent="#007AFF" />;
  };

  return (
    <div className={"relative shrink-0 " + className} style={outerStyle}>
      <div className="absolute inset-0 origin-top-left bg-white text-black shadow-[0_10px_40px_-12px_rgba(0,0,0,0.25)] rounded-md overflow-hidden ring-1 ring-black/5" style={innerStyle}>
        <Body />
      </div>
    </div>
  );
}

// ---------- Templates ----------
function Header({ data, accent = "#007AFF", showLine = true, align = "left" }) {
  const p = data.personal || {};
  return (
    <div className={"px-12 pt-12 " + (align === "center" ? "text-center" : "text-left")}>
      <div className="flex items-baseline gap-3 flex-wrap">
        <h1 className="font-heading font-black text-[34px] leading-none tracking-tight">{p.fullName || "Your Name"}</h1>
      </div>
      <p className="mt-2 text-[15px] font-medium" style={{ color: accent }}>{p.profession || "Your Profession"}</p>
      <div className={"mt-4 text-[11px] text-neutral-700 flex flex-wrap gap-x-4 gap-y-1 " + (align === "center" ? "justify-center" : "")}>
        {p.email && <span className="inline-flex items-center gap-1"><FiMail className="h-3 w-3" />{p.email}</span>}
        {p.phone && <span className="inline-flex items-center gap-1"><FiPhone className="h-3 w-3" />{p.phone}</span>}
        {p.location && <span className="inline-flex items-center gap-1"><FiMapPin className="h-3 w-3" />{p.location}</span>}
        {p.website && <span className="inline-flex items-center gap-1"><FiGlobe className="h-3 w-3" />{p.website}</span>}
        {p.linkedin && <span className="inline-flex items-center gap-1"><FiLinkedin className="h-3 w-3" />{p.linkedin}</span>}
        {p.github && <span className="inline-flex items-center gap-1"><FiGithub className="h-3 w-3" />{p.github}</span>}
      </div>
      {showLine && <div className="mt-6 h-px w-full" style={{ background: accent, opacity: 0.4 }} />}
    </div>
  );
}

function SectionTitle({ children, accent = "#007AFF" }) {
  return (
    <h2 className="mt-6 mb-3 font-heading font-bold text-[13px] uppercase tracking-[0.18em]" style={{ color: accent }}>
      {children}
    </h2>
  );
}

function ModernTemplate({ data, accent }) {
  return (
    <div className="h-full w-full">
      <Header data={data} accent={accent} />
      <div className="px-12 pb-12 text-[12px] leading-snug">
        <SectionTitle accent={accent}>Summary</SectionTitle>
        <p className="text-neutral-800">{data.summary}</p>

        <SectionTitle accent={accent}>Experience</SectionTitle>
        <div className="space-y-4">
          {(data.experience || []).map((e) => (
            <div key={e.id}>
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <div className="font-semibold text-[13px]">{e.role} <span className="text-neutral-500 font-normal">· {e.company}</span></div>
                  <div className="text-[11px] text-neutral-500">{e.location}</div>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono-stat whitespace-nowrap">{e.start} — {e.end}</div>
              </div>
              <ul className="mt-1.5 list-disc pl-4 space-y-1">
                {(e.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <SectionTitle accent={accent}>Education</SectionTitle>
            {(data.education || []).map((ed) => (
              <div key={ed.id} className="mb-3">
                <div className="font-semibold">{ed.degree}</div>
                <div className="text-neutral-600">{ed.school}</div>
                <div className="text-[11px] text-neutral-500 font-mono-stat">{ed.start} — {ed.end} · GPA {ed.gpa}</div>
              </div>
            ))}
          </div>
          <div>
            <SectionTitle accent={accent}>Skills</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {(data.skills || []).map((s) => (
                <span key={s} className="text-[11px] px-2 py-0.5 rounded-full border" style={{ borderColor: accent + "66", color: "#111" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <SectionTitle accent={accent}>Projects</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          {(data.projects || []).map((p) => (
            <div key={p.id}>
              <div className="font-semibold">{p.name}</div>
              <div className="text-[11px] text-neutral-500">{p.tech}</div>
              <p className="text-[12px] text-neutral-700 mt-0.5">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfessionalTemplate({ data }) {
  const accent = "#0F172A";
  return (
    <div className="h-full w-full">
      <div className="px-12 pt-12 text-center">
        <h1 className="text-[36px] font-serif tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>{data.personal?.fullName}</h1>
        <p className="mt-1 text-[13px] uppercase tracking-[0.3em] text-neutral-700">{data.personal?.profession}</p>
        <div className="mt-3 text-[11px] text-neutral-700 space-x-3">
          <span>{data.personal?.email}</span><span>·</span><span>{data.personal?.phone}</span><span>·</span><span>{data.personal?.location}</span>
        </div>
        <div className="mt-4 h-[2px] w-full" style={{ background: accent }} />
      </div>
      <div className="px-12 pb-12 text-[12px]">
        <SectionTitle accent={accent}>Profile</SectionTitle>
        <p className="text-neutral-800" style={{ fontFamily: "'Georgia', serif" }}>{data.summary}</p>
        <SectionTitle accent={accent}>Professional Experience</SectionTitle>
        {(data.experience || []).map((e) => (
          <div key={e.id} className="mb-3">
            <div className="flex justify-between"><div className="font-semibold" style={{ fontFamily: "'Georgia', serif" }}>{e.company} — {e.role}</div><div className="font-mono-stat text-[11px]">{e.start}–{e.end}</div></div>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">{(e.bullets || []).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
        <SectionTitle accent={accent}>Education</SectionTitle>
        {(data.education || []).map((ed) => (
          <div key={ed.id} className="mb-2"><span className="font-semibold">{ed.school}</span> — {ed.degree} <span className="text-neutral-500 font-mono-stat text-[11px]">({ed.start}–{ed.end})</span></div>
        ))}
        <SectionTitle accent={accent}>Skills</SectionTitle>
        <p>{(data.skills || []).join(" · ")}</p>
      </div>
    </div>
  );
}

function MinimalTemplate({ data }) {
  return (
    <div className="h-full w-full px-14 py-14 text-[12px]">
      <div className="flex items-end justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-[30px] font-heading font-light tracking-tight">{data.personal?.fullName}</h1>
          <p className="text-[13px] text-neutral-500">{data.personal?.profession}</p>
        </div>
        <div className="text-right text-[11px] text-neutral-600 space-y-0.5">
          <div>{data.personal?.email}</div><div>{data.personal?.phone}</div><div>{data.personal?.location}</div>
        </div>
      </div>
      <div className="mt-6"><div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-1.5">Summary</div><p>{data.summary}</p></div>
      <div className="mt-6"><div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-1.5">Experience</div>
        <div className="space-y-3">{(data.experience || []).map((e) => (
          <div key={e.id}>
            <div className="flex justify-between"><div className="font-semibold">{e.role}, {e.company}</div><div className="font-mono-stat text-[11px] text-neutral-500">{e.start}—{e.end}</div></div>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">{(e.bullets || []).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}</div>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-6">
        <div><div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-1.5">Education</div>{(data.education || []).map((ed) => <div key={ed.id}>{ed.degree}, {ed.school} <span className="text-neutral-500 font-mono-stat text-[11px]">{ed.start}–{ed.end}</span></div>)}</div>
        <div><div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-1.5">Skills</div><p className="text-neutral-700">{(data.skills || []).join(", ")}</p></div>
      </div>
    </div>
  );
}

function CreativeTemplate({ data, accent }) {
  return (
    <div className="h-full w-full grid grid-cols-[220px_1fr]">
      <aside className="p-6 text-white" style={{ background: "#0A0A0A" }}>
        <div className="h-16 w-16 rounded-full" style={{ background: accent }} />
        <h1 className="mt-4 text-[22px] font-heading font-black leading-tight">{data.personal?.fullName}</h1>
        <p className="text-[12px]" style={{ color: accent }}>{data.personal?.profession}</p>
        <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Contact</div>
        <div className="text-[11px] space-y-1 text-neutral-200">
          <div>{data.personal?.email}</div><div>{data.personal?.phone}</div><div>{data.personal?.location}</div><div>{data.personal?.linkedin}</div>
        </div>
        <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Skills</div>
        <div className="flex flex-wrap gap-1">{(data.skills || []).map((s) => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/10">{s}</span>)}</div>
        <div className="mt-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-2">Languages</div>
        {(data.languages || []).map((l) => <div key={l.id} className="text-[11px]">{l.name} — {l.level}</div>)}
      </aside>
      <div className="p-8 text-[12px]">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: accent }}>About</h2>
        <p>{data.summary}</p>
        <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] mt-5 mb-2" style={{ color: accent }}>Experience</h2>
        {(data.experience || []).map((e) => (
          <div key={e.id} className="mb-3 border-l-2 pl-3" style={{ borderColor: accent }}>
            <div className="flex justify-between"><div className="font-semibold">{e.role} · {e.company}</div><div className="font-mono-stat text-[11px] text-neutral-500">{e.start}—{e.end}</div></div>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">{(e.bullets || []).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
        <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] mt-5 mb-2" style={{ color: accent }}>Projects</h2>
        <div className="space-y-2">
          {(data.projects || []).map((p) => <div key={p.id}><div className="font-semibold">{p.name}</div><div className="text-[11px] text-neutral-500">{p.tech}</div><p>{p.desc}</p></div>)}
        </div>
      </div>
    </div>
  );
}

function SidebarTemplate({ data, accent }) {
  return (
    <div className="h-full w-full grid grid-cols-[240px_1fr]">
      <aside className="p-6 bg-neutral-100 border-r border-neutral-200">
        <h1 className="text-[22px] font-heading font-black leading-tight">{data.personal?.fullName}</h1>
        <p className="text-[12px] font-medium" style={{ color: accent }}>{data.personal?.profession}</p>
        <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Contact</div>
        <div className="text-[11px] space-y-0.5">{[data.personal?.email, data.personal?.phone, data.personal?.location, data.personal?.website].filter(Boolean).map((x, i) => <div key={i}>{x}</div>)}</div>
        <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Skills</div>
        <ul className="text-[11px] space-y-0.5">{(data.skills || []).map((s) => <li key={s}>· {s}</li>)}</ul>
        <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Education</div>
        {(data.education || []).map((ed) => <div key={ed.id} className="text-[11px]"><div className="font-semibold">{ed.degree}</div><div>{ed.school}</div><div className="font-mono-stat text-neutral-500">{ed.start}–{ed.end}</div></div>)}
      </aside>
      <div className="p-8 text-[12px]">
        <h2 className="font-heading font-bold text-[13px] uppercase tracking-[0.18em]" style={{ color: accent }}>Summary</h2>
        <p className="mt-1.5">{data.summary}</p>
        <h2 className="mt-5 font-heading font-bold text-[13px] uppercase tracking-[0.18em]" style={{ color: accent }}>Experience</h2>
        {(data.experience || []).map((e) => (
          <div key={e.id} className="mt-2">
            <div className="flex justify-between"><div className="font-semibold">{e.role} — {e.company}</div><div className="font-mono-stat text-[11px] text-neutral-500">{e.start}—{e.end}</div></div>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">{(e.bullets || []).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ATSTemplate({ data }) {
  return (
    <div className="h-full w-full px-14 py-12 text-[12px]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <h1 className="text-[24px] font-bold">{data.personal?.fullName}</h1>
      <div className="text-[12px]">{data.personal?.profession}</div>
      <div className="text-[11px] mt-1">{[data.personal?.email, data.personal?.phone, data.personal?.location, data.personal?.linkedin].filter(Boolean).join(" | ")}</div>
      <h2 className="mt-4 font-bold text-[13px]">PROFESSIONAL SUMMARY</h2><p>{data.summary}</p>
      <h2 className="mt-4 font-bold text-[13px]">WORK EXPERIENCE</h2>
      {(data.experience || []).map((e) => (
        <div key={e.id} className="mt-2">
          <div className="font-bold">{e.role}</div>
          <div>{e.company} · {e.location} · {e.start}–{e.end}</div>
          <ul className="list-disc pl-5 mt-0.5">{(e.bullets || []).map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>
      ))}
      <h2 className="mt-4 font-bold text-[13px]">EDUCATION</h2>
      {(data.education || []).map((ed) => <div key={ed.id}>{ed.degree}, {ed.school} ({ed.start}–{ed.end})</div>)}
      <h2 className="mt-4 font-bold text-[13px]">SKILLS</h2>
      <div>{(data.skills || []).join(", ")}</div>
    </div>
  );
}