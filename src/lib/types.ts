export type Locale = "ja" | "en";

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  about: string[];
  githubUrl: string;
  ui: {
    about: string;
    skills: string;
    career: string;
    certifications: string;
    projects: string;
    years: string;
    language: string;
    switchToDark: string;
    switchToLight: string;
    skipToContent: string;
    footerNote: string;
  };
}

export interface SkillItem {
  name: string;
  note: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  items: SkillItem[];
}

export interface CareerEntry {
  id: string;
  area: string;
  years: number;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  status: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  tech: string[];
}

export interface PortfolioContent {
  profile: Profile;
  skills: SkillCategory[];
  career: CareerEntry[];
  certifications: Certification[];
  projects: Project[];
}
