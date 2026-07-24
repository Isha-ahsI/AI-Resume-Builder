export const HOME = {
  emergentLink: "home-emergent-link",
};

export const NAV = {
  logo: "nav-logo",
  themeToggle: "nav-theme-toggle",
  loginBtn: "nav-login-btn",
  registerBtn: "nav-register-btn",
  mobileMenuBtn: "nav-mobile-menu-btn",
};

export const LANDING = {
  heroGenerateBtn: "hero-generate-resume-btn",
  heroTemplatesBtn: "hero-browse-templates-btn",
  featuresSection: "features-section",
  templatesSection: "templates-section",
  aiFeaturesSection: "ai-features-section",
  howItWorksSection: "how-it-works-section",
  testimonialsSection: "testimonials-section",
  faqSection: "faq-section",
};

export const AUTH = {
  loginEmail: "login-email-input",
  loginPassword: "login-password-input",
  loginRemember: "login-remember-checkbox",
  loginSubmit: "login-submit-btn",
  loginGoogle: "login-google-btn",
  loginForgot: "login-forgot-link",
  registerName: "register-name-input",
  registerEmail: "register-email-input",
  registerPassword: "register-password-input",
  registerConfirm: "register-confirm-input",
  registerSubmit: "register-submit-btn",
  forgotEmail: "forgot-email-input",
  forgotSubmit: "forgot-submit-btn",
  resetPassword: "reset-password-input",
  resetConfirm: "reset-confirm-input",
  resetSubmit: "reset-submit-btn",
};

export const WIZARD = {
  step: (n) => `wizard-step-${n}`,
  nextBtn: "wizard-next-btn",
  prevBtn: "wizard-prev-btn",
  finishBtn: "wizard-finish-btn",
  progressBar: "wizard-progress-bar",
};

export const DASHBOARD = {
  createResumeBtn: "dashboard-create-resume-btn",
  statCard: (k) => `dashboard-stat-${k}`,
  resumeRow: (id) => `dashboard-resume-row-${id}`,
  editResume: (id) => `dashboard-edit-${id}`,
  deleteResume: (id) => `dashboard-delete-${id}`,
  duplicateResume: (id) => `dashboard-duplicate-${id}`,
};

export const BUILDER = {
  sidebarSection: (k) => `builder-nav-${k}`,
  saveBtn: "builder-save-btn",
  previewBtn: "builder-preview-btn",
  downloadBtn: "builder-download-btn",
  aiSummaryBtn: "builder-ai-summary-btn",
  aiSkillsBtn: "builder-ai-skills-btn",
  aiImproveBtn: "builder-ai-improve-btn",
  aiCoverBtn: "builder-ai-cover-btn",
  addExperienceBtn: "builder-add-experience-btn",
  addEducationBtn: "builder-add-education-btn",
  addProjectBtn: "builder-add-project-btn",
  addSkillBtn: "builder-add-skill-btn",
  addCertificateBtn: "builder-add-certificate-btn",
};

export const PREVIEW = {
  zoomIn: "preview-zoom-in-btn",
  zoomOut: "preview-zoom-out-btn",
  fullscreen: "preview-fullscreen-btn",
  darkToggle: "preview-dark-toggle-btn",
  templateSelect: "preview-template-select",
  downloadPdf: "preview-download-pdf-btn",
  print: "preview-print-btn",
  share: "preview-share-btn",
  copyLink: "preview-copy-link-btn",
};

export const TEMPLATES = {
  filter: (k) => `templates-filter-${k}`,
  card: (id) => `templates-card-${id}`,
  useTemplate: (id) => `templates-use-${id}`,
  previewBtn: (id) => `templates-preview-${id}`,
};

export const PROFILE = {
  updateBtn: "profile-update-btn",
  themeSelect: "profile-theme-select",
  notifSwitch: "profile-notif-switch",
  changePwdBtn: "profile-change-pwd-btn",
  logoutBtn: "profile-logout-btn",
};

export const AI_DIALOG = {
  generateBtn: "ai-generate-btn",
  acceptBtn: "ai-accept-btn",
  regenerateBtn: "ai-regenerate-btn",
  editBtn: "ai-edit-btn",
};
