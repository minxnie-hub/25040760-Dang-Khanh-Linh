"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function DocumentMotion() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [".paper-sheet h2", ".paper-sheet h3", ".evidence-grid figure", ".table-shell"];

    if (reduced) {
      gsap.set(targets, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        clipPath: "inset(0 0 0 0)",
      });
      return;
    }

    gsap.utils.toArray<HTMLElement>(".paper-sheet h2, .paper-sheet h3").forEach((heading) => {
      gsap.fromTo(
        heading,
        { autoAlpha: 0, x: -26 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>(".evidence-grid figure").forEach((figure) => {
      gsap.fromTo(
        figure,
        {
          autoAlpha: 0,
          y: 30,
          scale: 0.97,
          clipPath: "inset(9% 0 9% 0 round 10px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0 0 0 0 round 10px)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: figure,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>(".table-shell").forEach((table) => {
      gsap.fromTo(
        table,
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: table,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    void document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return null;
}
