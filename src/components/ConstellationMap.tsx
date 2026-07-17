"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { assignments } from "@/lib/assignments";
import { ArrowIcon, SparkIcon } from "./Icons";
import { gsap, useGSAP } from "@/lib/gsap";

const points = [
  { x: 12, y: 25, align: "right" },
  { x: 32, y: 12, align: "right" },
  { x: 51, y: 34, align: "left" },
  { x: 75, y: 17, align: "left" },
  { x: 88, y: 47, align: "left" },
  { x: 67, y: 76, align: "right" },
] as const;

export function ConstellationMap() {
  const scope = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [active, setActive] = useState<number | null>(null);
  const [navigating, setNavigating] = useState(false);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set([".constellation-path", ".constellation-node"], { autoAlpha: 1 });
      return;
    }
    gsap.set(".constellation-path", { strokeDasharray: 1500, strokeDashoffset: 1500 });
    gsap.set(".constellation-node", { autoAlpha: 0, scale: 0.7 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "top 68%",
        end: "bottom 74%",
        scrub: 0.75,
      },
    });
    timeline
      .to(".constellation-path", { strokeDashoffset: 0, duration: 1, ease: "none" })
      .to(".constellation-node", { autoAlpha: 1, scale: 1, stagger: 0.11, duration: 0.55, ease: "back.out(1.65)" }, 0.12);
  }, { scope });

  function openAssignment(event: React.MouseEvent<HTMLAnchorElement>, slug: string, index: number) {
    if (navigating || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    setNavigating(true);
    const node = scope.current?.querySelector<HTMLElement>(`[data-node="${index}"]`);
    const paths = scope.current?.querySelectorAll<SVGPathElement>(".constellation-path");
    const timeline = gsap.timeline({ onComplete: () => router.push(`/${slug}`) });
    if (paths) timeline.to(paths, { opacity: 0.12, duration: 0.2 });
    if (node) timeline.to(node, { scale: 1.12, filter: "drop-shadow(0 0 22px rgba(140,220,255,.95))", duration: 0.24 }, 0).to(node, { scale: 0.92, autoAlpha: 0, duration: 0.22 });
  }

  return <div ref={scope} className="constellation-map" onPointerLeave={() => setActive(null)}>
    <svg className="constellation-lines" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true">
      <path className="constellation-path" d="M144 190 C235 123 304 88 384 91 C462 94 532 204 612 258 C696 315 804 90 900 129 C997 169 1061 282 1056 357 C1050 461 916 581 804 578" />
      <path className="constellation-path constellation-path-secondary" d="M612 258 C628 378 706 480 804 578" />
      <path className="constellation-path constellation-path-secondary" d="M384 91 C487 67 597 79 700 104" />
    </svg>
    <div className="constellation-center-note" aria-hidden="true"><SparkIcon /><span>đi theo đường sáng</span></div>
    {assignments.map((assignment, index) => {
      const point = points[index];
      return <Link
        href={`/${assignment.slug}`}
        key={assignment.slug}
        data-node={index}
        className={`constellation-node align-${point.align} ${active !== null && active !== index ? "is-muted" : ""} ${active === index ? "is-active" : ""}`}
        style={{ left: `${point.x}%`, top: `${point.y}%` }}
        onPointerEnter={() => setActive(index)}
        onFocus={() => setActive(index)}
        onBlur={() => setActive(null)}
        onClick={(event) => openAssignment(event, assignment.slug, index)}
      >
        <span className="constellation-star"><span /></span>
        <span className="constellation-label">
          <small>Chương 0{assignment.number}</small>
          <strong>{assignment.title}</strong>
          <span className="constellation-open">Mở bài <ArrowIcon /></span>
        </span>
      </Link>;
    })}
    <div className="constellation-mobile-list">
      {assignments.map((assignment) => <Link href={`/${assignment.slug}`} key={`mobile-${assignment.slug}`}>
        <span>0{assignment.number}</span><strong>{assignment.title}</strong><ArrowIcon />
      </Link>)}
    </div>
  </div>;
}
