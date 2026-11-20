"use client";

import type { MouseEvent } from "react";
import { localePath } from "@/lib/content";
import type { Locale } from "@/lib/types";

// 言語切り替え。表示中のセクション（URLハッシュ）を保ったまま遷移する。
export default function LocaleSwitch({ current }: { current: Locale }) {
  const keepHash = (e: MouseEvent<HTMLAnchorElement>, locale: Locale) => {
    e.preventDefault();
    window.location.href = localePath(locale) + window.location.hash;
  };

  return (
    <nav className="locale-switch" aria-label="Language">
      <a
        href={localePath("ja")}
        onClick={(e) => keepHash(e, "ja")}
        aria-current={current === "ja" ? "true" : undefined}
        className={current === "ja" ? "is-active" : undefined}
      >
        JA
      </a>
      <span aria-hidden="true">/</span>
      <a
        href={localePath("en")}
        onClick={(e) => keepHash(e, "en")}
        aria-current={current === "en" ? "true" : undefined}
        className={current === "en" ? "is-active" : undefined}
      >
        EN
      </a>
    </nav>
  );
}
