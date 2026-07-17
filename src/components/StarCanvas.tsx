"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  phase: number;
  layer: 0 | 1 | 2;
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

function createStarSprite(size: number, core: string, glow: string) {
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const context = sprite.getContext("2d");
  if (!context) return sprite;

  const center = size / 2;
  const radius = size * 0.07;
  const gradient = context.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, core);
  gradient.addColorStop(0.12, core);
  gradient.addColorStop(0.34, glow);
  gradient.addColorStop(1, "rgba(120, 205, 255, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  context.fillStyle = "rgba(255,255,255,.96)";
  context.beginPath();
  context.arc(center, center, radius, 0, Math.PI * 2);
  context.fill();
  return sprite;
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
    const sprites = [
      createStarSprite(22, "rgba(245,252,255,1)", "rgba(118,199,255,.4)"),
      createStarSprite(30, "rgba(249,253,255,1)", "rgba(113,205,255,.58)"),
      createStarSprite(42, "rgba(255,255,255,1)", "rgba(143,220,255,.72)"),
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let paused = document.hidden;
    let inView = true;
    let reduced = media.matches;
    let pointerX = 0;
    let pointerY = 0;
    let lastFrameTime = 0;
    let frameInterval = 1000 / 36;
    let quietDrawn = false;
    let nextShot = performance.now() + 4400 + random() * 5400;

    const stars: Star[] = [];
    const shooter: ShootingStar = { active: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0 };
    const bursts: BurstParticle[] = [];

    function rebuild() {
      const rect = cnv.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const area = width * height;
      dpr = Math.min(window.devicePixelRatio || 1, area > 1_600_000 ? 1 : width < 700 ? 1.05 : 1.25);
      frameInterval = area > 1_600_000 ? 1000 / 24 : 1000 / 36;
      quietDrawn = false;
      cnv.width = Math.round(width * dpr);
      cnv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.length = 0;
      const count = Math.min(220, Math.max(72, Math.round((width * height) / 9400 * density)));
      for (let index = 0; index < count; index += 1) {
        const roll = random();
        const layer: 0 | 1 | 2 = roll > 0.9 ? 2 : roll > 0.56 ? 1 : 0;
        stars.push({
          x: random() * width,
          y: random() * height,
          size: 0.72 + random() * (layer === 2 ? 0.78 : layer === 1 ? 0.52 : 0.34),
          alpha: 0.33 + random() * 0.67,
          speed: 0.0008 + random() * 0.002,
          phase: random() * Math.PI * 2,
          layer,
        });
      }
    }

    function spawnBurst(clientX: number, clientY: number) {
      if (reduced || !inView) return;
      const rect = cnv.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      for (let index = 0; index < 9; index += 1) {
        const angle = (Math.PI * 2 * index) / 9 + random() * 0.38;
        const force = 1.1 + random() * 2.1;
        bursts.push({
          x: localX,
          y: localY,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force - 0.28,
          life: 0,
          maxLife: 18 + Math.round(random() * 10),
          size: 1 + random() * 1.7,
        });
      }
    }

    function render(timestamp: number) {
      frame = window.requestAnimationFrame(render);
      if (paused || !inView) return;
      if (quiet && quietDrawn) return;
      if (timestamp - lastFrameTime < frameInterval) return;
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const star of stars) {
        const twinkle = reduced ? 1 : 0.72 + Math.sin(timestamp * star.speed + star.phase) * 0.28;
        const parallaxX = reduced ? 0 : pointerX * star.layer * 5;
        const parallaxY = reduced ? 0 : pointerY * star.layer * 4;
        const sprite = sprites[star.layer];
        const spriteSize = (star.layer === 2 ? 15 : star.layer === 1 ? 10 : 6.5) * star.size;
        ctx.globalAlpha = Math.max(0.16, star.alpha * twinkle);
        ctx.drawImage(
          sprite,
          star.x + parallaxX - spriteSize / 2,
          star.y + parallaxY - spriteSize / 2,
          spriteSize,
          spriteSize,
        );

        if (!reduced && star.layer === 2 && twinkle > 0.94) {
          const cross = 3.2 + twinkle * 1.4;
          ctx.globalAlpha = 0.32;
          ctx.strokeStyle = "rgba(220,246,255,.9)";
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          ctx.moveTo(star.x - cross + parallaxX, star.y + parallaxY);
          ctx.lineTo(star.x + cross + parallaxX, star.y + parallaxY);
          ctx.moveTo(star.x + parallaxX, star.y - cross + parallaxY);
          ctx.lineTo(star.x + parallaxX, star.y + cross + parallaxY);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (!quiet && !reduced && timestamp >= nextShot && !shooter.active) {
        shooter.active = true;
        shooter.x = width * (0.1 + random() * 0.5);
        shooter.y = height * (0.02 + random() * 0.16);
        shooter.vx = 10 + random() * 4;
        shooter.vy = 4.2 + random() * 2.2;
        shooter.life = 0;
        shooter.maxLife = 44 + Math.round(random() * 26);
        nextShot = timestamp + 6200 + random() * 6600;
      }

      if (shooter.active) {
        shooter.life += 1;
        shooter.x += shooter.vx;
        shooter.y += shooter.vy;
        const fade = Math.sin((shooter.life / shooter.maxLife) * Math.PI);
        const tailX = shooter.x - shooter.vx * 10;
        const tailY = shooter.y - shooter.vy * 10;
        const gradient = ctx.createLinearGradient(tailX, tailY, shooter.x, shooter.y);
        gradient.addColorStop(0, "rgba(121,204,255,0)");
        gradient.addColorStop(0.55, `rgba(171,228,255,${0.24 * fade})`);
        gradient.addColorStop(1, `rgba(250,253,255,${0.94 * fade})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shooter.x, shooter.y);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${0.88 * fade})`;
        ctx.beginPath();
        ctx.arc(shooter.x, shooter.y, 1.5 + fade, 0, Math.PI * 2);
        ctx.fill();
        if (shooter.life > shooter.maxLife || shooter.x > width + 120 || shooter.y > height + 120) shooter.active = false;
      }

      for (let index = bursts.length - 1; index >= 0; index -= 1) {
        const particle = bursts[index];
        particle.life += 1;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.97;
        particle.vy = particle.vy * 0.97 + 0.012;
        const alpha = 1 - particle.life / particle.maxLife;
        ctx.fillStyle = `rgba(218,246,255,${Math.max(0, alpha)})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        if (particle.life >= particle.maxLife) bursts.splice(index, 1);
      }

      if (quiet) quietDrawn = true;
    }

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(cnv);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && quiet) quietDrawn = false;
      },
      { rootMargin: "240px 0px" },
    );
    intersectionObserver.observe(cnv);

    const onVisibility = () => { paused = document.hidden; };
    const onMotion = () => { reduced = media.matches; };
    const onPointer = (event: PointerEvent) => {
      if (!inView) return;
      pointerX = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      pointerY = event.clientY / Math.max(1, window.innerHeight) - 0.5;
    };
    const onPointerDown = (event: PointerEvent) => { spawnBurst(event.clientX, event.clientY); };

    rebuild();
    frame = window.requestAnimationFrame(render);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotion);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotion);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [density, quiet]);

  return <canvas className="star-canvas" ref={canvasRef} aria-hidden="true" />;
}
