"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assets";
import { CloseIcon, MenuIcon } from "./Icons";

const navItems = [
  ["Trang chủ", "/#trang-chu"],
  ["Giới thiệu", "/#gioi-thieu"],
  ["Mục lục sao", "/#muc-luc"],
  ["Tổng kết", "/#tong-ket"],
  ["Liên hệ", "/#lien-he"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="school-brand" aria-label="Về trang chủ Portfolio Đặng Khánh Linh">
        <span className="school-logo"><img src={assetPath("/ulis-logo.png")} alt="Logo Trường Đại học Ngoại ngữ - ULIS" /></span>
        <span className="school-wordmark"><strong>ULIS</strong><small>University of Languages and International Studies</small></span>
      </Link>
      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Đóng menu" : "Mở menu"}>{open ? <CloseIcon /> : <MenuIcon />}</button>
      <nav id="main-nav" className={open ? "is-open" : ""} aria-label="Điều hướng chính">
        {navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
