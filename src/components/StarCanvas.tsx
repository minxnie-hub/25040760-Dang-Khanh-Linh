"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  phase: number;
  layer: number;
};

type ShootingStar = {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function StarCanvas({ density = 1, quiet = false }: { density?: number; quiet?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const cnv = canvas;
    const ctx = context;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const random = seededRandom(25040760 + Math.round(density * 100));
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let paused = document.hidden;
    let reduced = media.matches;
    let pointerX = 0;
    let pointerY = 0;
    let nextShot = performance.now() + 7000 + random() * 7000;
    const stars: Star[] = [];
    const shooter: ShootingStar = { active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0 };

    function rebuild() {
      const rect = cnv.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      cnv.width = Math.round(width * dpr);
      cnv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.min(180, Math.max(42, Math.round((width * height) / 11500 * density)));
      for (let index = 0; index < count; index += 1) {
        const layer = random() > 0.84 ? 2 : random() > 0.5 ? 1 : 0;
        stars.push({
          x: random() * width,
          y: random() * height,
          radius: 0.45 + random() * (layer === 2 ? 1.75 : 1.05),
          alpha: 0.18 + random() * 0.68,
          speed: 0.00045 + random() * 0.0016,
          phase: random() * Math.PI * 2,
          layer,
        });
      }
    }

    function draw(timestamp: number) {
      frame = window.requestAnimationFrame(draw);
      if (paused) return;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = reduced ? 1 : 0.72 + Math.sin(timestamp * star.speed + star.phase) * 0.28;
        const parallaxX = reduced ? 0 : pointerX * star.layer * 5;
        const parallaxY = reduced ? 0 : pointerY * star.layer * 4;
        const glow = star.layer === 2 ? 6 : 2.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(224, 246, 255, ${Math.max(0.08, star.alpha * twinkle)})`;
        ctx.shadowBlur = glow;
        ctx.shadowColor = "rgba(113, 198, 255, .72)";
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!quiet && !reduced && timestamp >= nextShot && !shooter.active) {
        shooter.active = true;
        shooter.x = width * (0.18 + random() * 0.46);
        shooter.y = height * (0.04 + random() * 0.2);
        shooter.vx = 9 + random() * 4;
        shooter.vy = 4.4 + random() * 2;
        shooter.life = 0;
        shooter.maxLife = 44 + Math.round(random() * 24);
        nextShot = timestamp + 10000 + random() * 7000;
      }

      if (shooter.active) {
        shooter.life += 1;
        shooter.x += shooter.vx;
        shooter.y += shooter.vy;
        const fade = Math.sin((shooter.life / shooter.maxLife) * Math.PI);
        const length = 92;
        const gradient = ctx.createLinearGradient(
          shooter.x - shooter.vx * length / 10,
          shooter.y - shooter.vy * length / 10,
          shooter.x,
          shooter.y,
        );
        gradient.addColorStop(0, "rgba(121, 204, 255, 0)");
        gradient.addColorStop(1, `rgba(239, 250, 255, ${0.88 * fade})`);
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.4;
        ctx.moveTo(shooter.x - shooter.vx * length / 10, shooter.y - shooter.vy * length / 10);
        ctx.lineTo(shooter.x, shooter.y);
        ctx.stroke();
        if (shooter.life > shooter.maxLife || shooter.x > width + 120 || shooter.y > height + 120) shooter.active = false;
      }
    }

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(cnv);
    const onVisibility = () => { paused = document.hidden; };
    const onMotion = () => { reduced = media.matches; };
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      pointerY = event.clientY / Math.max(1, window.innerHeight) - 0.5;
    };

    rebuild();
    frame = window.requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotion);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotion);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density, quiet]);

  return <canvas ref={canvasRef} className="star-canvas" aria-hidden="true" />;
}
