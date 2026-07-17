"use client";

import { useEffect, useRef, useState } from "react";
import { BookIcon, SparkIcon } from "./Icons";
import { gsap, useGSAP } from "@/lib/gsap";

const STORAGE_KEY = "khanh-linh-celestial-intro-seen";

export function WelcomeOverlay() {
  const scope = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    setVisible(!seen);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss(true);
      if (event.key === "Enter" && !opening) openBook();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible, opening]);

  useGSAP(() => {
    if (!visible || !scope.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (reduced) {
      timeline.fromTo(".welcome-shell", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
      return;
    }
    timeline
      .fromTo(".welcome-book", { autoAlpha: 0, y: 36, rotationX: -8, scale: 0.94 }, { autoAlpha: 1, y: 0, rotationX: 0, scale: 1, duration: 0.8 })
      .fromTo(".welcome-title > *", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.09, duration: 0.55 }, "-=.42")
      .fromTo(".welcome-spark", { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, stagger: 0.08, duration: 0.45 }, "-=.36");
  }, { scope, dependencies: [visible] });

  function dismiss(markSeen: boolean) {
    if (markSeen) window.sessionStorage.setItem(STORAGE_KEY, "1");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(scope.current, {
      autoAlpha: 0,
      duration: reduced ? 0.2 : 0.48,
      ease: "power2.inOut",
      onComplete: () => setVisible(false),
    });
  }

  function openBook() {
    if (opening || !scope.current) return;
    setOpening(true);
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      dismiss(false);
      return;
    }
    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => setVisible(false),
    });
    timeline
      .to(".welcome-book-cover", { rotationY: -158, duration: 1.05, transformOrigin: "left center" })
      .to(".welcome-page-front", { rotationY: -143, duration: 0.82, transformOrigin: "left center" }, "-=.72")
      .to(".welcome-glow", { scaleX: 2.8, autoAlpha: 1, duration: 0.72 }, "-=.8")
      .to(".welcome-title", { autoAlpha: 0, y: -16, duration: 0.3 }, "-=.54")
      .to(".welcome-shell", { clipPath: "inset(0 0 0 100%)", duration: 0.82, ease: "power4.inOut" }, "-=.22");
  }

  if (!ready || !visible) return null;

  return <div ref={scope} className="welcome-shell" role="dialog" aria-modal="true" aria-labelledby="welcome-heading">
    <div className="welcome-night" aria-hidden="true">
      <span className="welcome-spark spark-one"><SparkIcon /></span>
      <span className="welcome-spark spark-two"><SparkIcon /></span>
      <span className="welcome-spark spark-three"><SparkIcon /></span>
    </div>
    <button type="button" className="welcome-skip" onClick={() => dismiss(true)}>Bỏ qua lời chào</button>
    <div className="welcome-book" aria-hidden="true">
      <div className="welcome-book-back" />
      <div className="welcome-page-stack" />
      <div className="welcome-page-front" />
      <div className="welcome-book-cover">
        <SparkIcon />
        <span>Celestial field notes</span>
        <strong>Đặng Khánh Linh</strong>
        <small>ULIS · QH2025</small>
      </div>
      <div className="welcome-glow" />
    </div>
    <div className="welcome-title">
      <p>Chào cậu, cuốn sổ sao của tớ đã sẵn sàng.</p>
      <h1 id="welcome-heading">Mỗi chương là một dấu mốc nhỏ trên hành trình học tập.</h1>
      <button type="button" onClick={openBook}><BookIcon /> Mở cuốn sổ</button>
      <small>Nhấn Enter để bắt đầu · Esc để bỏ qua</small>
    </div>
  </div>;
}
