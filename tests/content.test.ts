import { describe, it, expect } from "vitest";
import { getContent, sortCareerByYears } from "@/lib/content";
import type { Locale } from "@/lib/types";

const LOCALES: Locale[] = ["ja", "en"];

describe("コンテンツの検証", () => {
  it.each(LOCALES)("%s: スキーマを通り、主要セクションが揃っている", (locale) => {
    const content = getContent(locale);
    expect(content.profile.name).toBe("yamada");
    expect(content.skills.length).toBeGreaterThan(0);
    expect(content.career.length).toBeGreaterThan(0);
    expect(content.certifications.length).toBeGreaterThan(0);
    expect(content.projects.length).toBeGreaterThan(0);
  });

  it("日英でセクション構成（ID集合）が一致する", () => {
    const ja = getContent("ja");
    const en = getContent("en");
    expect(en.skills.map((c) => c.id)).toEqual(ja.skills.map((c) => c.id));
    expect(en.career.map((e) => e.id).sort()).toEqual(ja.career.map((e) => e.id).sort());
    expect(en.certifications.map((c) => c.id)).toEqual(ja.certifications.map((c) => c.id));
    expect(en.projects.map((p) => p.id)).toEqual(ja.projects.map((p) => p.id));
  });

  it("経歴は年数の降順で、年数は日英で一致する", () => {
    const ja = getContent("ja");
    const en = getContent("en");
    const years = ja.career.map((e) => e.years);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    const byId = Object.fromEntries(en.career.map((e) => [e.id, e.years]));
    for (const entry of ja.career) {
      expect(byId[entry.id]).toBe(entry.years);
    }
  });
});

describe("sortCareerByYears", () => {
  it("元の配列を変更せず降順に並べる", () => {
    const input = [{ years: 2 }, { years: 5 }, { years: 3 }];
    const result = sortCareerByYears(input);
    expect(result.map((e) => e.years)).toEqual([5, 3, 2]);
    expect(input.map((e) => e.years)).toEqual([2, 5, 3]);
  });
});
