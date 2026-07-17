"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
  const progressRef = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!progressRef.current) return;
    gsap.fromTo(progressRef.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "max", scrub: 0.2 },
    });
    return () => ScrollTrigger.getAll().filter((trigger) => trigger.vars.trigger === document.documentElement).forEach((trigger) => trigger.kill());
  });
  return <div className="scroll-progress" aria-hidden="true"><span ref={progressRef} /></div>;
}
