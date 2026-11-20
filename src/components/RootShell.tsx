import type { ReactNode } from "react";
import { fontDisplay, fontMono, fontSans } from "@/lib/fonts";
import "@/app/globals.css";

// テーマのチラつき（FOUC）防止：保存済みのカラースキームを描画前に meta へ反映する。
// このスクリプトの役割はそれだけで、最小限に保つ（dark-mode-toggle ガイドの作法）。
// meta がまだ無い場合は作る（描画順に依存しないように）。
const themeInitScript = `try{var m=document.querySelector('meta[name="color-scheme"]');if(!m){m=document.createElement("meta");m.name="color-scheme";document.head.appendChild(m)}m.content=localStorage.getItem("color-scheme")??"light dark"}catch(e){}`;

export default function RootShell({
  lang,
  children,
}: {
  lang: "ja" | "en";
  children: ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${fontDisplay.variable} ${fontMono.variable} ${fontSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
