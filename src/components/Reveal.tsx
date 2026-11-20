"use client";

import { useEffect, useRef, type ReactNode } from "react";

// スクロールでふわりと出すだけの控えめな出現演出。
// 一度だけ発火し、prefers-reduced-motion の場合は CSS 側で無効化される。
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // JS が動いた場合だけ初期の隠し状態を有効にする（JS 無効でも内容は見える）
    el.classList.add("is-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
