import { z } from "zod";

// コンテンツ JSON の検証スキーマ。ビルド時とテスト時に、
// 必須項目の欠けや日英のキー不一致をここで検出する。

export const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  tagline: z.string().min(1),
  about: z.array(z.string().min(1)).min(1),
  githubUrl: z.url(),
  ui: z.object({
    about: z.string().min(1),
    skills: z.string().min(1),
    career: z.string().min(1),
    certifications: z.string().min(1),
    projects: z.string().min(1),
    years: z.string().min(1),
    language: z.string().min(1),
    switchToDark: z.string().min(1),
    switchToLight: z.string().min(1),
    skipToContent: z.string().min(1),
    footerNote: z.string().min(1),
  }),
});

export const skillsSchema = z.object({
  categories: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        items: z
          .array(
            z.object({
              name: z.string().min(1),
              note: z.string().min(1),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

export const careerSchema = z.object({
  entries: z
    .array(
      z.object({
        id: z.string().min(1),
        area: z.string().min(1),
        years: z.number().positive(),
        description: z.string().min(1),
      }),
    )
    .min(1),
});

export const certificationsSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        status: z.string().min(1),
      }),
    )
    .min(1),
});

export const projectsSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        url: z.url().optional(),
        tech: z.array(z.string().min(1)),
      }),
    )
    .min(1),
});
