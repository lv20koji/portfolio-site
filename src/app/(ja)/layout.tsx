import type { Metadata, Viewport } from "next";
import RootShell from "@/components/RootShell";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "yamada — Azure / Web Engineer",
  description: "yamada のポートフォリオ。Web・クラウド・IoT の開発経験とスキル、資格、プロジェクトを紹介します。",
  openGraph: {
    title: "yamada — Azure / Web Engineer",
    description: "yamada のポートフォリオ。Web・クラウド・IoT の開発経験とスキル、資格、プロジェクトを紹介します。",
    type: "website",
    locale: "ja_JP",
    url: "https://lv20koji.github.io/portfolio-site/",
    images: ["https://lv20koji.github.io/portfolio-site/avatar.png"],
  },
  twitter: {
    card: "summary",
    title: "yamada — Azure / Web Engineer",
    description: "yamada のポートフォリオ。Web・クラウド・IoT の開発経験とスキル、資格、プロジェクトを紹介します。",
    images: ["https://lv20koji.github.io/portfolio-site/avatar.png"],
  },
};

export const viewport: Viewport = {
  // 基底はシステム追従（light dark）。手動切り替えは ThemeToggle が meta を書き換える
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1420" },
  ],
};

export default function JaLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="ja">{children}</RootShell>;
}
