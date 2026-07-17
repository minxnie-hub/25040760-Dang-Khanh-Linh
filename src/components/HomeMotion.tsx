"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function HomeMotion() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set("[data-reveal]", { autoAlpha: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.12 });
    intro
      .fromTo(".hero-kicker", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.55 })
      .fromTo(".hero-title-line", { yPercent: 112 }, { yPercent: 0, duration: 0.95, stagger: 0.09 }, "-=.22")
      .fromTo(".hero-manifesto", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65 }, "-=.5")
      .fromTo(".hero-actions > *", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=.38")
      .fromTo(".portrait-plate", { autoAlpha: 0, y: 46, rotation: 2.4, scale: 0.94 }, { autoAlpha: 1, y: 0, rotation: -1.4, scale: 1, duration: 1.05 }, "-=.84")
      .fromTo(".portrait-orbit", { strokeDashoffset: 780 }, { strokeDashoffset: 0, duration: 1.35, ease: "power2.inOut" }, "-=.75")
      .fromTo(".hero-sticker", { scale: 0, rotation: -10 }, { scale: 1, rotation: 0, duration: 0.48, stagger: 0.12, ease: "back.out(1.8)" }, "-=.8");

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.fromTo(element,
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%", toggleActions: "play none none reverse" },
        },
      );
    });

    gsap.fromTo(".about-rule", { scaleX: 0 }, {
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: { trigger: ".about-section", start: "top 72%", end: "bottom 65%", scrub: 0.7 },
    });

    gsap.fromTo(".goal-track-fill", { scaleY: 0 }, {
      scaleY: 1,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: { trigger: ".goals-section", start: "top 62%", end: "bottom 70%", scrub: 0.8 },
    });

    gsap.fromTo(".closing-constellation path", { strokeDashoffset: 900 }, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: { trigger: ".closing-section", start: "top 70%", end: "bottom 78%", scrub: 0.75 },
    });
    gsap.fromTo(".closing-constellation circle", { scale: 0, transformOrigin: "center" }, {
      scale: 1,
      stagger: 0.08,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: ".closing-section", start: "top 52%", toggleActions: "play none none reverse" },
    });

    const portrait = document.querySelector<HTMLElement>(".portrait-stage");
    const plate = document.querySelector<HTMLElement>(".portrait-plate");
    if (portrait && plate && window.matchMedia("(pointer:fine)").matches) {
      const xTo = gsap.quickTo(plate, "x", { duration: 0.65, ease: "power3.out" });
      const yTo = gsap.quickTo(plate, "y", { duration: 0.65, ease: "power3.out" });
      const rotateTo = gsap.quickTo(plate, "rotation", { duration: 0.65, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        const rect = portrait.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        xTo(x * 11);
        yTo(y * 8);
        rotateTo(-1.4 + x * 1.8);
      };
      const onLeave = () => { xTo(0); yTo(0); rotateTo(-1.4); };
      portrait.addEventListener("pointermove", onMove);
      portrait.addEventListener("pointerleave", onLeave);
      return () => {
        portrait.removeEventListener("pointermove", onMove);
        portrait.removeEventListener("pointerleave", onLeave);
      };
    }

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return null;
}
