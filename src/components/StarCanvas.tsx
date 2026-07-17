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

type BurstParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
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
    let nextShot = performance.now() + 4500 + random() * 6000;

    const stars: Star[] = [];
    const shooter: ShootingStar = { active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0 };
    const bursts: BurstParticle[] = [];

    function rebuild() {
      const rect = cnv.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      cnv.width = Math.round(width * dpr);
      cnv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.length = 0;
      const count = Math.min(340, Math.max(76, Math.round((width * height) / 7600 * density)));
      for (let index = 0; index < count; index += 1) {
        const layer = random() > 0.86 ? 2 : random() > 0.52 ? 1 : 0;
        stars.push({
          x: random() * width,
          y: random() * height,
          radius: 0.5 + random() * (layer === 2 ? 2.15 : 1.35),
          alpha: 0.28 + random() * 0.72,
          speed: 0.0009 + random() * 0.0024,
          phase: random() * Math.PI * 2,
          layer,
        });
      }
    }

    function spawnBurst(clientX: number, clientY: number) {
      if (reduced) return;
      const rect = cnv.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      for (let index = 0; index < 12; index += 1) {
        const angle = (Math.PI * 2 * index) / 12 + random() * 0.45;
        const force = 1.2 + random() * 2.6;
        bursts.push({
          x: localX,
          y: localY,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force - 0.35,
          life: 0,
          maxLife: 20 + Math.round(random() * 12),
          size: 1 + random() * 2.4,
        });
      }
    }

    function draw(timestamp: number) {
      frame = window.requestAnimationFrame(draw);
      if (paused) return;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = reduced ? 1 : 0.7 + Math.sin(timestamp * star.speed + star.phase) * 0.3;
        const shimmer = reduced ? 0 : Math.sin(timestamp * (star.speed * 0.62) + star.phase * 1.8) * 0.04;
        const parallaxX = reduced ? 0 : pointerX * star.layer * 7;
        const parallaxY = reduced ? 0 : pointerY * star.layer * 5;
        const glow = star.layer === 2 ? 13 : star.layer === 1 ? 6.5 : 3.4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(230, 247, 255, ${Math.max(0.08, star.alpha * twinkle + shimmer)})`;
        ctx.shadowBlur = glow;
        ctx.shadowColor = star.layer === 2 ? "rgba(152, 224, 255, .98)" : "rgba(108, 204, 255, .82)";
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (!reduced && star.layer === 2 && twinkle > 0.93) {
          ctx.strokeStyle = `rgba(196, 238, 255, ${0.18 + twinkle * 0.16})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(star.x - 4 + parallaxX, star.y + parallaxY);
          ctx.lineTo(star.x + 4 + parallaxX, star.y + parallaxY);
          ctx.moveTo(star.x + parallaxX, star.y - 4 + parallaxY);
          ctx.lineTo(star.x + parallaxX, star.y + 4 + parallaxY);
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;

      if (!quiet && !reduced && timestamp >= nextShot && !shooter.active) {
        shooter.active = true;
        shooter.x = width * (0.12 + random() * 0.52);
        shooter.y = height * (0.02 + random() * 0.18);
        shooter.vx = 10 + random() * 4.8;
        shooter.vy = 4.4 + random() * 2.4;
        shooter.life = 0;
        shooter.maxLife = 52 + Math.round(random() * 34);
        nextShot = timestamp + 5600 + random() * 6200;
      }

      if (shooter.active) {
        shooter.life += 1;
        shooter.x += shooter.vx;
        shooter.y += shooter.vy;
        const fade = Math.sin((shooter.life / shooter.maxLife) * Math.PI);
        const length = 118;
        const tailX = shooter.x - shooter.vx * length / 10;
        const tailY = shooter.y - shooter.vy * length / 10;
        const gradient = ctx.createLinearGradient(tailX, tailY, shooter.x, shooter.y);
        gradient.addColorStop(0, "rgba(121, 204, 255, 0)");
        gradient.addColorStop(0.55, `rgba(171, 228, 255, ${0.26 * fade})`);
        gradient.addColorStop(1, `rgba(248, 252, 255, ${0.95 * fade})`);
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shooter.x, shooter.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.82 * fade})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(174,229,255,.88)";
        ctx.arc(shooter.x, shooter.y, 1.5 + fade * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (shooter.life > shooter.maxLife || shooter.x > width + 120 || shooter.y > height + 120) shooter.active = false;
      }

      for (let index = bursts.length - 1; index >= 0; index -= 1) {
        const particle = bursts[index];
        particle.life += 1;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy = particle.vy * 0.98 + 0.015;
        const alpha = 1 - particle.life / particle.maxLife;
        ctx.beginPath();
        ctx.fillStyle = `rgba(211, 243, 255, ${Math.max(0, alpha)})`;
        ctx.shadowBlur = 9;
        ctx.shadowColor = "rgba(132, 214, 255, .78)";
        ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (particle.life >= particle.maxLife) bursts.splice(index, 1);
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
    const onPointerDown = (event: PointerEvent) => { spawnBurst(event.clientX, event.clientY); };

    rebuild();
    frame = window.requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotion);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotion);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [density, quiet]);

  return <canvas className="star-canvas" ref={canvasRef} aria-hidden="true" />;
}
