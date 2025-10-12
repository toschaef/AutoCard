// components/StarfieldCanvas.tsx
"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;      // radius
  a: number;      // base alpha
  p: number;      // phase for twinkle
  s: number;      // drift speed
};

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[] | null>(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const coarseRef = useRef<boolean>(false);
  const reduceRef = useRef<boolean>(false);

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d", { alpha: true })!;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const mmReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mmCoarse = window.matchMedia("(pointer: coarse)");

    reduceRef.current = mmReduce.matches;
    coarseRef.current = mmCoarse.matches;

    const size = () => {
      const { innerWidth: w, innerHeight: h } = window;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedStars = () => {
      const { innerWidth: w, innerHeight: h } = window;
      const count = Math.round((w * h) / 6500); // density
      const arr: Star[] = [];
      const rand = (n = 1) => Math.random() * n;
      for (let i = 0; i < count; i++) {
        arr.push({
          x: rand(w),
          y: rand(h),
          r: 0.4 + rand(1.1),
          a: 0.35 + rand(0.55),
          p: rand(Math.PI * 2),
          s: 0.02 + rand(0.06),
        });
      }
      starsRef.current = arr;
    };

    size();
    seedStars();

    let t = 0;
    const draw = () => {
      if (!starsRef.current) return;
      const stars = starsRef.current;
      const w = c.width / (window.devicePixelRatio || 1);
      const h = c.height / (window.devicePixelRatio || 1);

      // Easing parallax
      const p = parallaxRef.current;
      p.x += (p.tx - p.x) * 0.06;
      p.y += (p.ty - p.y) * 0.06;
      c.style.transform = reduceRef.current ? "translate3d(0,0,0)" : `translate3d(${p.x}px, ${p.y}px, 0)`;

      ctx.clearRect(0, 0, w, h);

      // Slow drift + twinkle
      t += 0.016;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        const twinkle = reduceRef.current ? 1 : 0.75 + 0.25 * Math.sin(t * 1.5 + s.p);
        const alpha = Math.max(0, Math.min(1, s.a * twinkle));

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        // tiny dot
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(40,54,24,0.85)"; // var(--green) tint
        ctx.fill();

        // subtle 4-point twinkle
        const k = s.r * 3;
        ctx.globalAlpha = alpha * 0.35;
        ctx.beginPath();
        ctx.moveTo(s.x - k, s.y);
        ctx.lineTo(s.x + k, s.y);
        ctx.moveTo(s.x, s.y - k);
        ctx.lineTo(s.x, s.y + k);
        ctx.strokeStyle = "rgba(188,108,37,0.55)"; // var(--burnt) glow
        ctx.lineWidth = 0.7;
        ctx.stroke();

        if (!reduceRef.current) {
          s.y += s.s;
          if (s.y - s.r > h) s.y = -s.r;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reduceRef.current) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // One static frame
      draw();
    }

    const onResize = () => {
      size();
      seedStars();
    };

    const onPointer = (ev: PointerEvent) => {
      if (coarseRef.current) return;
      // throttle via RAF — store target and let draw loop ease it
      const { innerWidth: w, innerHeight: h } = window;
      const mx = (ev.clientX / w) * 2 - 1;
      const my = (ev.clientY / h) * 2 - 1;
      const max = 8; // px
      parallaxRef.current.tx = -mx * max;
      parallaxRef.current.ty = -my * max;
    };

    const clearParallaxOnLeave = () => {
      parallaxRef.current.tx = 0;
      parallaxRef.current.ty = 0;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", clearParallaxOnLeave, { passive: true });
    window.addEventListener("blur", clearParallaxOnLeave);

    const onReduceChange = () => {
      reduceRef.current = mmReduce.matches;
      if (reduceRef.current) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        parallaxRef.current = { x: 0, y: 0, tx: 0, ty: 0 };
        c.style.transform = "translate3d(0,0,0)";
        // redraw static
        const prev = starsRef.current;
        if (prev) {
          starsRef.current = prev;
        }
        const ctx2 = c.getContext("2d", { alpha: true })!;
        ctx2 && ctx2.clearRect(0, 0, c.width, c.height);
        // draw once
        const dprNow = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
        ctx2.setTransform(dprNow, 0, 0, dprNow, 0, 0);
        // call draw once
        (function once() {
          // use draw() but without scheduling
          const tmp = rafRef.current;
          rafRef.current = null;
          const localDraw = (function () {
            const stars = starsRef.current!;
            const w = c.width / (window.devicePixelRatio || 1);
            const h = c.height / (window.devicePixelRatio || 1);
            ctx2.clearRect(0, 0, w, h);
            for (let i = 0; i < stars.length; i++) {
              const s = stars[i];
              const alpha = s.a;
              ctx2.globalAlpha = alpha;
              ctx2.beginPath();
              ctx2.arc(s.x, s.y, s.r, 0, Math.PI * 2);
              ctx2.fillStyle = "rgba(40,54,24,0.85)";
              ctx2.fill();
              const k = s.r * 3;
              ctx2.globalAlpha = alpha * 0.35;
              ctx2.beginPath();
              ctx2.moveTo(s.x - k, s.y);
              ctx2.lineTo(s.x + k, s.y);
              ctx2.moveTo(s.x, s.y - k);
              ctx2.lineTo(s.x, s.y + k);
              ctx2.strokeStyle = "rgba(188,108,37,0.55)";
              ctx2.lineWidth = 0.7;
              ctx2.stroke();
            }
          });
          localDraw();
          rafRef.current = tmp;
        })();
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const onCoarseChange = () => {
      coarseRef.current = mmCoarse.matches;
      if (coarseRef.current) {
        parallaxRef.current = { x: 0, y: 0, tx: 0, ty: 0 };
        c.style.transform = "translate3d(0,0,0)";
      }
    };

    mmReduce.addEventListener?.("change", onReduceChange);
    mmCoarse.addEventListener?.("change", onCoarseChange);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", clearParallaxOnLeave);
      window.removeEventListener("blur", clearParallaxOnLeave);
      mmReduce.removeEventListener?.("change", onReduceChange);
      mmCoarse.removeEventListener?.("change", onCoarseChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{
        willChange: "transform",
        filter: "drop-shadow(0 0 0 transparent)", // ensure compositor layer
      }}
    />
  );
}
