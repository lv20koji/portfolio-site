"use client";

import { useEffect } from "react";

// ダークモード切り替え。
// 仕組み: <meta name="color-scheme"> の内容を書き換え、CSS 側の color-scheme と
// light-dark() がそれに追従する（modern-web-guidance の dark-mode-toggle の作法）。
// 状態は3値（システム／ライト／ダーク）。保存値がない = システム追従。
function systemScheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyScheme() {
  const stored = localStorage.getItem("color-scheme");
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute("content", stored ?? "light dark");
}

export default function ThemeToggle({
  labelToDark,
  labelToLight,
}: {
  labelToDark: string;
  labelToLight: string;
}) {
  useEffect(() => {
    // 他タブでの変更に追従する
    const onStorage = (e: StorageEvent) => {
      if (e.key === "color-scheme") applyScheme();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = () => {
    try {
      const stored = localStorage.getItem("color-scheme");
      const rendered = (stored as "light" | "dark" | null) ?? systemScheme();
      const target = rendered === "dark" ? "light" : "dark";
      // 切り替え先がシステム設定と一致するなら保存値を消してシステム追従に戻す
      if (target === systemScheme()) {
        localStorage.removeItem("color-scheme");
      } else {
        localStorage.setItem("color-scheme", target);
      }
    } catch {
      // localStorage が使えない環境でも切り替え自体は効かせる
    }
    applyScheme();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={`${labelToDark} / ${labelToLight}`}
      title={`${labelToDark} / ${labelToLight}`}
    >
      <svg className="icon-sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
