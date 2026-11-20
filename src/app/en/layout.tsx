import type { Metadata, Viewport } from "next";
import RootShell from "@/components/RootShell";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "yamada — Azure / Web Engineer",
  description: "Portfolio of yamada: experience and skills across web, cloud, and IoT development, certifications, and projects.",
  openGraph: {
    title: "yamada — Azure / Web Engineer",
    description: "Portfolio of yamada: experience and skills across web, cloud, and IoT development, certifications, and projects.",
    type: "website",
    locale: "en_US",
    url: "https://lv20koji.github.io/portfolio-site/en/",
    images: ["https://lv20koji.github.io/portfolio-site/avatar.png"],
  },
  twitter: {
    card: "summary",
    title: "yamada — Azure / Web Engineer",
    description: "Portfolio of yamada: experience and skills across web, cloud, and IoT development, certifications, and projects.",
    images: ["https://lv20koji.github.io/portfolio-site/avatar.png"],
  },
};

export const viewport: Viewport = {
  // Base follows the system (light dark); the toggle rewrites the meta at runtime
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1420" },
  ],
};

export default function EnLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
