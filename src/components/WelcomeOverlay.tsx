"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assets";
import { BookIcon, SparkIcon } from "./Icons";
import { gsap, useGSAP } from "@/lib/gsap";

const STORAGE_KEY = "khanh-linh-celestial-intro-seen";

export function WelcomeOverlay() {
  const scope = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (seen) {
      document.documentElement.dataset.introSeen = "true";
      setVisible(false);
      return;
    }

    document.documentElement.dataset.introSeen = "false";
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
      timeline.fromTo(".welcome-shell", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24 });
      return;
    }

    timeline
      .fromTo(".welcome-book", { xPercent: -50, yPercent: -50, y: 24, scale: 0.97, autoAlpha: 0 }, { xPercent: -50, yPercent: -50, y: 0, scale: 1, autoAlpha: 1, duration: 0.62, clearProps: "filter" })
      .fromTo(".welcome-title", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.46, clearProps: "opacity,visibility" }, "-=.32")
      .fromTo(".welcome-spark", { scale: 0, rotation: -18, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, stagger: 0.07, duration: 0.42 }, "-=.28")
      .fromTo(".welcome-book-badge", { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42, clearProps: "transform" }, "-=.3");
  }, { scope, dependencies: [visible] });

  function revealPage() {
    document.documentElement.dataset.introOpening = "true";
  }

  function finishIntro() {
    document.documentElement.dataset.introSeen = "true";
    delete document.documentElement.dataset.introOpening;
    setVisible(false);
  }

  function dismiss(markSeen: boolean) {
    if (markSeen) window.sessionStorage.setItem(STORAGE_KEY, "1");
    revealPage();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(scope.current, {
      autoAlpha: 0,
      duration: reduced ? 0.18 : 0.36,
      ease: "power2.inOut",
      onComplete: finishIntro,
    });
  }

  function openBook() {
    if (opening || !scope.current) return;
    setOpening(true);
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    revealPage();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      dismiss(false);
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: finishIntro,
    });

    timeline
      .to(".welcome-book-cover", {
        x: -10,
        rotation: -1.4,
        scale: 0.99,
        boxShadow: "0 46px 110px rgba(0,0,0,.54)",
        duration: 0.18,
      })
      .to(".welcome-book", {
        x: -64,
        y: -6,
        scale: 0.92,
        rotation: -3,
        autoAlpha: 0,
        duration: 0.32,
      }, 0.04)
      .to(".welcome-title", {
        x: 20,
        autoAlpha: 0,
        duration: 0.26,
      }, 0.06)
      .to(".welcome-shell", {
        autoAlpha: 0,
        duration: 0.28,
      }, 0.12);
  }

  if (!visible) return null;

  return (
    <div ref={scope} className="welcome-shell" role="dialog" aria-modal="true" aria-labelledby="welcome-heading">
      <div className="welcome-night" aria-hidden="true">
        <span className="welcome-spark spark-one"><SparkIcon /></span>
        <span className="welcome-spark spark-two"><SparkIcon /></span>
        <span className="welcome-spark spark-three"><SparkIcon /></span>
      </div>

      <button type="button" className="welcome-skip" onClick={() => dismiss(true)}>Bỏ qua lời chào</button>

      <div className="welcome-book" aria-hidden="true">
        <div className="welcome-book-shadow" />
        <div className="welcome-book-cover">
          <div className="welcome-book-logo-wrap">
            <img src={assetPath("/ulis-logo.png")} alt="" className="welcome-book-logo" />
            <span className="welcome-book-badge">ULIS constellation edition</span>
          </div>
          <div className="welcome-book-stars">
            <SparkIcon />
            <SparkIcon />
          </div>
          <span>Celestial field notes</span>
          <strong className="welcome-book-name"><span>Đặng Khánh</span><span>Linh</span></strong>
          <small>Student portfolio · QH2025</small>
          <div className="welcome-book-meta">
            <em>University of Languages and International Studies</em>
            <b>6 chapters · 1 journey</b>
          </div>
        </div>
        <div className="welcome-glow" />
      </div>

      <div className="welcome-title">
        <p>Chào cậu, cuốn sổ sao của tớ đã sẵn sàng.</p>
        <h1 id="welcome-heading">
          <span>Mỗi chương là một dấu mốc nhỏ</span>
          <span>trên hành trình học tập.</span>
        </h1>
        <button type="button" onClick={openBook}><BookIcon /> Mở cuốn sổ</button>
        <small>Nhấn Enter để bắt đầu · Esc để bỏ qua</small>
      </div>
    </div>
  );
}
