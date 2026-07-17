"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function HomeMotion() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set("[data-reveal]", { autoAlpha: 1, clearProps: "transform" });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.06 });
    intro
      .fromTo(".hero-kicker", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42, clearProps: "transform" })
      .fromTo(".hero-title-line", { yPercent: 108 }, { yPercent: 0, duration: 0.72, stagger: 0.07, clearProps: "transform" }, "-=.18")
      .fromTo(".hero-manifesto", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.48, clearProps: "transform" }, "-=.4")
      .fromTo(".hero-actions > *", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.06, clearProps: "transform" }, "-=.3")
      .fromTo(".portrait-plate", { autoAlpha: 0, y: 30, rotation: 1.2, scale: 0.97 }, { autoAlpha: 1, y: 0, rotation: -1.4, scale: 1, duration: 0.72 }, "-=.62")
      .fromTo(".portrait-orbit", { strokeDashoffset: 780 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=.58")
      .fromTo(".hero-sticker", { scale: 0, rotation: -7 }, { scale: 1, rotation: 0, duration: 0.34, stagger: 0.08, ease: "back.out(1.55)", clearProps: "transform" }, "-=.58");

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    gsap.fromTo(".about-rule", { scaleX: 0 }, {
      scaleX: 1,
      transformOrigin: "left center",
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: ".about-section", start: "top 72%", once: true },
    });

    gsap.fromTo(".goal-track-fill", { scaleY: 0 }, {
      scaleY: 1,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: { trigger: ".goals-section", start: "top 68%", end: "bottom 76%", scrub: 0.5 },
    });

    gsap.fromTo(".closing-constellation path", { strokeDashoffset: 900 }, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: "power2.out",
      scrollTrigger: { trigger: ".closing-section", start: "top 72%", once: true },
    });
    gsap.fromTo(".closing-constellation circle", { scale: 0, transformOrigin: "center" }, {
      scale: 1,
      stagger: 0.06,
      ease: "back.out(1.45)",
      scrollTrigger: { trigger: ".closing-section", start: "top 62%", once: true },
    });

    const portrait = document.querySelector<HTMLElement>(".portrait-stage");
    const plate = document.querySelector<HTMLElement>(".portrait-plate");
    let cleanupPortrait: (() => void) | undefined;

    if (portrait && plate && window.matchMedia("(pointer:fine) and (min-width:1200px)").matches) {
      const xTo = gsap.quickTo(plate, "x", { duration: 0.48, ease: "power3.out" });
      const yTo = gsap.quickTo(plate, "y", { duration: 0.48, ease: "power3.out" });
      const rotateTo = gsap.quickTo(plate, "rotation", { duration: 0.48, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        const rect = portrait.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        xTo(x * 7);
        yTo(y * 5);
        rotateTo(-1.4 + x * 1.1);
      };
      const onLeave = () => { xTo(0); yTo(0); rotateTo(-1.4); };
      portrait.addEventListener("pointermove", onMove, { passive: true });
      portrait.addEventListener("pointerleave", onLeave);
      cleanupPortrait = () => {
        portrait.removeEventListener("pointermove", onMove);
        portrait.removeEventListener("pointerleave", onLeave);
      };
    }

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => cleanupPortrait?.();
  });

  return null;
}
