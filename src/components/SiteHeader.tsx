"use client";

import Link from "next/link";
import { useState } from "react";
import { assetPath } from "@/lib/assets";
import { MenuIcon } from "./Icons";

const navItems = [
  ["Giới thiệu", "/#gioi-thieu"],
  ["Mục lục", "/#muc-luc"],
  ["Tổng kết", "/#tong-ket"],
  ["Liên hệ", "/#lien-he"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="school-brand" aria-label="Về trang chủ">
        <span className="school-logo"><img src={assetPath("/ulis-logo.png")} alt="Logo Trường Đại học Ngoại ngữ - ULIS" /></span>
        <span><strong>ULIS</strong><small>University of Languages and International Studies</small></span>
      </Link>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav"><MenuIcon /></button>
      <nav id="main-nav" className={open ? "is-open" : ""} aria-label="Điều hướng chính">
        {navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
