"use client";

import { useEffect, useState } from "react";
import { BookIcon, StarIcon } from "./Icons";

export function WelcomeOverlay() {
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("khanh-linh-welcome-seen");
    if (!seen) setVisible(true);
  }, []);

  function openBook() {
    setOpening(true);
    window.sessionStorage.setItem("khanh-linh-welcome-seen", "1");
    window.setTimeout(() => setVisible(false), 950);
  }

  if (!visible) return null;
  return <div className={`welcome-overlay ${opening ? "is-opening" : ""}`} role="dialog" aria-modal="true" aria-label="Lời chào mở đầu">
    <div className="welcome-sky" />
    <div className="book-cover book-cover--left" />
    <div className="book-cover book-cover--right" />
    <div className="welcome-content">
      <div className="welcome-mark"><StarIcon /><span>Portfolio · 2026</span></div>
      <p className="eyebrow">Chào cậu đến với bầu trời học tập của tớ</p>
      <h1>Đặng Khánh Linh</h1>
      <p>Mỗi bài tập là một ánh sao nhỏ trong hành trình học Công nghệ số và AI.</p>
      <button type="button" onClick={openBook}><BookIcon /> Mở trang đầu</button>
    </div>
  </div>;
}
