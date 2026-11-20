import jaProfile from "@/content/ja/profile.json";
import jaSkills from "@/content/ja/skills.json";
import jaCareer from "@/content/ja/career.json";
import jaCertifications from "@/content/ja/certifications.json";
import jaProjects from "@/content/ja/projects.json";
import enProfile from "@/content/en/profile.json";
import enSkills from "@/content/en/skills.json";
import enCareer from "@/content/en/career.json";
import enCertifications from "@/content/en/certifications.json";
import enProjects from "@/content/en/projects.json";
import {
  profileSchema,
  skillsSchema,
  careerSchema,
  certificationsSchema,
  projectsSchema,
} from "./schema";
import type { Locale, PortfolioContent } from "./types";

const raw = {
  ja: {
    profile: jaProfile,
    skills: jaSkills,
    career: jaCareer,
    certifications: jaCertifications,
    projects: jaProjects,
  },
  en: {
    profile: enProfile,
    skills: enSkills,
    career: enCareer,
    certifications: enCertifications,
    projects: enProjects,
  },
} as const;

/** ロケールのコンテンツを読み込み、スキーマで検証して返す。検証に失敗したら例外になる。 */
export function getContent(locale: Locale): PortfolioContent {
  const data = raw[locale];
  return {
    profile: profileSchema.parse(data.profile),
    skills: skillsSchema.parse(data.skills).categories,
    career: sortCareerByYears(careerSchema.parse(data.career).entries),
    certifications: certificationsSchema.parse(data.certifications).items,
    projects: projectsSchema.parse(data.projects).items,
  };
}

/** 経歴は経験年数の長い順に並べる。 */
export function sortCareerByYears<T extends { years: number }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.years - a.years);
}

export const locales: Locale[] = ["ja", "en"];
export const defaultLocale: Locale = "ja";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** ロケールに対応するトップページのパス。日本語がルート、英語は /en（basePath 前提）。 */
export function localePath(locale: Locale): string {
  return locale === "ja" ? `${BASE_PATH}/` : `${BASE_PATH}/en/`;
}
