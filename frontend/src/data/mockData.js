// Central mock data store for the AI Resume Builder

export const testimonialAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&q=85&w=200",
  "https://images.unsplash.com/photo-1699899657680-421c2c2d5064?crop=entropy&cs=srgb&fm=jpg&q=85&w=200",
  "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=srgb&fm=jpg&q=85&w=200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=srgb&fm=jpg&q=85&w=200",
];

export const testimonials = [
  { id: 1, name: "Priya Sharma", role: "Product Designer @ Figma", rating: 5, photo: testimonialAvatars[1], comment: "Landed 3 interviews in a week. The ATS optimization is unreal — my resume finally makes it past the bots." },
  { id: 2, name: "Marcus Chen", role: "Senior Engineer @ Stripe", rating: 5, photo: testimonialAvatars[0], comment: "The AI rewrite turned my flat bullets into actual accomplishments. Best hour I ever spent on my career." },
  { id: 3, name: "Aditi Rao", role: "Data Scientist @ Airbnb", rating: 5, photo: testimonialAvatars[2], comment: "I loved the template variety and how quickly I could switch styles without losing content." },
  { id: 4, name: "Daniel Okafor", role: "PM @ Notion", rating: 4, photo: testimonialAvatars[3], comment: "Setup wizard nailed onboarding. From zero to a printable resume in under 10 minutes." },
  { id: 5, name: "Sofia Rossi", role: "UX Researcher @ IBM", rating: 5, photo: testimonialAvatars[4], comment: "The cover letter generator matched the tone of the job description perfectly." },
  { id: 6, name: "Ethan Walker", role: "Founder @ Loop", rating: 5, photo: testimonialAvatars[5], comment: "Beautiful, precise, and no bloated features. This is what modern resume software should feel like." },
];

export const faqs = [
  { q: "Is Rezume actually free?", a: "Yes — you can build, preview and export up to 2 resumes for free. Pro unlocks unlimited resumes, all templates, and AI credits." },
  { q: "Will my resume pass Applicant Tracking Systems?", a: "Every template is engineered against ATS rules. We also run a real-time ATS score check and flag issues in plain English." },
  { q: "Do I need to write anything myself?", a: "No. Our AI writes summaries, rewrites experience bullets, and suggests skills based on your target role. You always stay in control." },
  { q: "Can I switch templates without losing content?", a: "Yes. Content is stored separately from styling, so you can preview any template instantly." },
  { q: "Is my data private?", a: "Your data lives on your device by default. We never sell your information and never share your resume without permission." },
  { q: "Do you support cover letters?", a: "Yes — you can generate a cover letter tailored to a specific job description in a single click." },
];

export const popularSkills = [
  "React","TypeScript","Node.js","Python","AWS","GraphQL","SQL","PostgreSQL","MongoDB","Docker",
  "Kubernetes","Figma","Product Strategy","User Research","A/B Testing","SEO","Copywriting",
  "Data Analysis","Machine Learning","TensorFlow","PyTorch","Rust","Go","Java","Spring Boot",
  "Tailwind CSS","Next.js","Vue","Svelte","Redis","Kafka","CI/CD","Terraform","Notion","Slack API"
];

export const templates = [
  { id: "modern", name: "Modern", category: "Modern", description: "Clean sans-serif, generous whitespace, accent line-work. Ideal for tech, product, design." , accent: "#007AFF" },
  { id: "professional", name: "Executive", category: "Professional", description: "Classic serif headings and confident hierarchy — built for senior roles.", accent: "#0F172A" },
  { id: "minimal", name: "Minimal", category: "Minimal", description: "Extreme reduction. Only what matters. Beautiful when your work speaks for itself.", accent: "#111827" },
  { id: "creative", name: "Creative", category: "Creative", description: "Color-blocked layout with sidebar accent. Great for designers and marketers.", accent: "#FF3B30" },
  { id: "ats", name: "ATS Optimized", category: "ATS Friendly", description: "Single-column, keyword-forward, bulletproof for parsers.", accent: "#059669" },
  { id: "modern-sidebar", name: "Sidebar Pro", category: "Modern", description: "Two-column with a fixed sidebar for contact and skills.", accent: "#0EA5E9" },
  { id: "compact", name: "Compact", category: "Minimal", description: "Every millimeter of the page working. Great for career changers.", accent: "#6366F1" },
  { id: "editorial", name: "Editorial", category: "Creative", description: "Magazine-style typography with big display headings.", accent: "#DB2777" },
];

export const templateCategories = ["All","Modern","Professional","Minimal","Creative","ATS Friendly"];

export const featureCards = [
  { key: "writer", title: "AI Resume Writer", desc: "Turns bullet notes into recruiter-ready accomplishments in seconds.", icon: "sparkles" },
  { key: "ats", title: "ATS Optimization", desc: "Real-time scoring against 200+ ATS rules with actionable fixes.", icon: "shield-check" },
  { key: "templates", title: "Professional Templates", desc: "Hand-crafted layouts across Modern, Minimal, Creative and Executive.", icon: "layout-template" },
  { key: "skills", title: "Skill Suggestions", desc: "Smart skill recommendations tailored to your target role and level.", icon: "brain" },
  { key: "preview", title: "Live Resume Preview", desc: "Sticky A4 preview updates as you type — WYSIWYG down to kerning.", icon: "eye" },
  { key: "pdf", title: "PDF & Print Export", desc: "Pixel-perfect PDF export, high-DPI print and shareable public link.", icon: "download" },
];

export const aiFeatureCards = [
  { key: "summary", title: "Generate Summary", desc: "A crisp 3-line summary crafted around your best signals.", icon: "wand-2" },
  { key: "rewrite", title: "Rewrite Experience", desc: "Rewrites weak bullets into quantified, active-voice wins.", icon: "pencil-line" },
  { key: "skills", title: "Suggest Skills", desc: "Skills a hiring manager expects to see for your target role.", icon: "list-checks" },
  { key: "cover", title: "Generate Cover Letter", desc: "A tailored one-pager tuned to a specific job description.", icon: "mail" },
  { key: "review", title: "ATS Resume Review", desc: "Deep scoring with specific line-level suggestions.", icon: "scan-line" },
  { key: "objective", title: "Career Objective", desc: "Punchy, focused objective for early-career applications.", icon: "target" },
];

export const howItWorks = [
  { step: 1, title: "Create your account", desc: "60 seconds, no card. Your progress is autosaved on the device." },
  { step: 2, title: "Complete your profile", desc: "Answer a 7-step wizard — the AI does the heavy lifting from your notes." },
  { step: 3, title: "Generate your resume", desc: "Pick a template and let the AI write summaries and bullets." },
  { step: 4, title: "Download your PDF", desc: "Export a pixel-perfect PDF or share a public link with recruiters." },
];

export const defaultResumeData = {
  personal: {
    fullName: "Alex Morgan",
    profession: "Senior Product Designer",
    email: "alex.morgan@example.com",
    phone: "+1 (415) 555-0123",
    location: "San Francisco, CA",
    website: "alexmorgan.design",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
  },
  summary: "Senior product designer with 7+ years shipping consumer software used by millions. I lead 0→1 product bets, coach junior designers, and turn ambiguous problems into small, testable experiments.",
  experience: [
    { id: "e1", role: "Senior Product Designer", company: "Loop Inc.", location: "Remote", start: "2022", end: "Present", bullets: [
      "Led redesign of onboarding, lifting week-1 retention 34% (+$1.4M ARR).",
      "Built a shared design system now used by 6 squads and 22 engineers.",
      "Mentored 3 junior designers; two promoted within 12 months.",
    ]},
    { id: "e2", role: "Product Designer", company: "Stripe", location: "San Francisco, CA", start: "2019", end: "2022", bullets: [
      "Shipped subscription checkout serving 40k+ merchants globally.",
      "Reduced form drop-off 22% via progressive disclosure and inline validation.",
      "Collaborated with legal + engineering to ship SCA-ready flows in 9 markets.",
    ]},
  ],
  education: [
    { id: "ed1", degree: "B.S. Human-Computer Interaction", school: "Carnegie Mellon University", location: "Pittsburgh, PA", start: "2013", end: "2017", gpa: "3.8/4.0" },
  ],
  skills: ["Product Design","Design Systems","Figma","Prototyping","User Research","A/B Testing","Facilitation","Copywriting","HTML/CSS","Motion Design"],
  projects: [
    { id: "p1", name: "Bloom — meditation app", tech: "React Native, Firebase", github: "github.com/alexmorgan/bloom", live: "bloomapp.io", desc: "A calm, offline-first meditation companion with adaptive session length." },
    { id: "p2", name: "Palette — color tools", tech: "Next.js, Tailwind", github: "github.com/alexmorgan/palette", live: "palette.tools", desc: "Accessible color palette generator with WCAG scoring baked in." },
  ],
  certificates: [
    { id: "c1", name: "Nielsen Norman UX Certification", issuer: "NN/g", year: "2021" },
  ],
  achievements: [
    { id: "a1", title: "Speaker — Config 2023", desc: "Talk on shipping design systems in startups (11k live viewers)." },
  ],
  languages: [ { id: "l1", name: "English", level: "Native" }, { id: "l2", name: "Spanish", level: "Professional" } ],
  socials: {
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    portfolio: "alexmorgan.design",
    leetcode: "",
    codechef: "",
    codeforces: "",
    hackerrank: "",
  },
  references: [ { id: "r1", name: "Jordan Lee", role: "VP Design at Loop", contact: "jordan@loop.inc" } ],
  careerGoals: {
    desiredRole: "Design Lead",
    industry: "Consumer SaaS",
    workPreference: "Remote / Hybrid",
    expectedSalary: "$210k–$240k",
    intro: "Aiming to lead a small design org where craft, research, and product strategy meet.",
  },
};

export const seedResumes = [
  { id: "r_seed_1", title: "Senior Designer — Loop", template: "modern", atsScore: 82, createdAt: "2025-11-04T10:00:00.000Z", updatedAt: "2026-02-12T10:00:00.000Z", data: defaultResumeData },
  { id: "r_seed_2", title: "Design Lead — Faang draft", template: "professional", atsScore: 74, createdAt: "2025-12-16T10:00:00.000Z", updatedAt: "2026-02-05T10:00:00.000Z", data: { ...defaultResumeData, personal: { ...defaultResumeData.personal, profession: "Design Lead" } } },
  { id: "r_seed_3", title: "Freelance Portfolio Version", template: "creative", atsScore: 66, createdAt: "2026-01-10T10:00:00.000Z", updatedAt: "2026-01-30T10:00:00.000Z", data: { ...defaultResumeData, personal: { ...defaultResumeData.personal, profession: "Independent Product Designer" } } },
];

// Fake AI outputs
export const aiMockOutputs = {
  summary: [
    "Senior product designer with 7+ years shipping consumer software at Stripe and Loop. I turn ambiguous 0→1 problems into shippable experiments, own end-to-end craft, and coach growing design teams.",
    "Design leader who blends systems thinking with sharp visual craft. Recent work lifted week-1 retention 34% and unlocked $1.4M in ARR at Loop.",
    "Multi-disciplinary designer focused on the intersection of research, product strategy and interface craft. I love simple systems that survive scale.",
  ],
  skills: ["Design Systems","Figma","Prototyping","User Research","A/B Testing","Facilitation","Motion Design","Copywriting","Design Ops","Accessibility"],
  rewrite: [
    "Led redesign of onboarding at Loop, lifting week-1 retention 34% and unlocking an incremental $1.4M in ARR.",
    "Shipped subscription checkout serving 40k+ merchants globally; reduced form drop-off 22% with progressive disclosure and inline validation.",
    "Built a shared design system adopted by 6 squads and 22 engineers, cutting handoff time by roughly one-third.",
  ],
  cover: `Dear Hiring Manager,

I'm applying for the Design Lead role at Northwind. After seven years at Stripe and Loop shipping consumer software used by millions, I'm ready to lead a design org where craft, research and product strategy converge.

At Loop, I led the redesign of onboarding, lifting week-1 retention 34% (+$1.4M ARR) and shipped a design system now used by 22 engineers. I'd love to bring the same combination of taste and rigor to Northwind.

Thank you for your time,
Alex Morgan`,
  objective: "Aspiring product designer eager to apply strong visual craft and user-research skills to consumer software where scale and speed both matter.",
  review: {
    score: 82,
    strengths: ["Strong quantified impact", "Consistent verb tense", "Cover letter aligned to JD"],
    issues: ["Consider trimming Projects section to 2 items", "Add 1–2 keywords from the JD (e.g. 'design ops')", "Increase spacing between Experience and Education"],
  }
};

export const languagesLibrary = ["English","Spanish","French","German","Mandarin","Hindi","Japanese","Portuguese","Arabic","Korean","Russian","Italian"];

export const industries = ["Consumer SaaS","Fintech","Healthcare","EdTech","Gaming","E-commerce","B2B","Devtools","AI/ML","Non-profit"];
export const workPrefs = ["Remote","Hybrid","On-site"];
