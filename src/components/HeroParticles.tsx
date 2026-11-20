"use client";

import { useEffect, useRef } from "react";

// Hero のドットグリッドをマウスに反応させる演出。
// 参考: lp.openrec.jp のイベント LP の物理（ドットがカーソルから逃げ、バネで戻り、速く動くと光る）。
// 色はこのサイトのアクセント（Azure ブルー）に置き換え、反発は弱めにして控えめにしている。
// - タッチでも pointermove で追従する
// - Hero が画面外のときとタブ非表示時はループを止める
// - prefers-reduced-motion では静止画として1フレームだけ描く

type Pt = { x: number; y: number; hx: number; hy: number; vx: number; vy: number };

const SPACING = 26;
const RAD = 110;
const FORCE = 1.7;

function effectiveDark(): boolean {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const content = meta?.getAttribute("content");
  if (content === "dark") return true;
  if (content === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts: Pt[] = [];
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };
    let dark = effectiveDark();

    const build = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      const cols = Math.floor(rect.width / SPACING);
      const rows = Math.floor(rect.height / SPACING);
      const ox = (rect.width - cols * SPACING) / 2;
      const oy = (rect.height - rows * SPACING) / 2;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = ox + i * SPACING;
          const y = oy + j * SPACING;
          pts.push({ x, y, hx: x, hy: y, vx: 0, vy: 0 });
        }
      }
    };

    const drawFrame = () => {
      const rect = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const [r, g, b] = dark ? [94, 162, 239] : [29, 111, 209];
      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < RAD * RAD && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((RAD - d) / RAD) * FORCE;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.hx - p.x) * 0.02;
        p.vy += (p.hy - p.y) * 0.02;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        const sp = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) * 0.25);
        ctx.fillStyle = `rgba(${r},${g},${b},${(0.22 + sp * 0.55).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 + sp * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible && !document.hidden) drawFrame();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    if (reduced) {
      drawFrame();
      return;
    }

    const ro = new ResizeObserver(() => build());
    ro.observe(parent);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(parent);
    const metaObserver = new MutationObserver(() => {
      dark = effectiveDark();
    });
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) metaObserver.observe(meta, { attributes: true, attributeFilter: ["content"] });

    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      metaObserver.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-fx" aria-hidden="true" />;
}
