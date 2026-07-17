import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const metadataBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.GITHUB_ACTIONS === "true" && repositoryName && !repositoryName.endsWith(".github.io") ? `/${repositoryName}` : "");

export const metadata: Metadata = {
  title: {
    default: "Portfolio Đặng Khánh Linh",
    template: "%s · Đặng Khánh Linh",
  },
  description: "Portfolio học phần Nhập môn Công nghệ số và Ứng dụng Trí tuệ nhân tạo của Đặng Khánh Linh.",
  icons: { icon: `${metadataBasePath}/favicon.svg` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061936",
};

const introStateScript = `
(() => {
  try {
    const seen = window.sessionStorage.getItem("khanh-linh-celestial-intro-seen");
    document.documentElement.dataset.introSeen = seen ? "true" : "false";
  } catch {
    document.documentElement.dataset.introSeen = "false";
  }
})();
`;

const introCriticalCss = `
html[data-intro-seen="false"] body {
  overflow: hidden;
  background: #020817;
}
html[data-intro-seen="false"] #page-root > :not(.welcome-shell),
html[data-intro-seen="false"] .scroll-progress {
  visibility: hidden !important;
}
html[data-intro-seen="false"][data-intro-opening="true"] #page-root > :not(.welcome-shell),
html[data-intro-seen="true"] #page-root > :not(.welcome-shell),
html[data-intro-seen="false"][data-intro-opening="true"] .scroll-progress,
html[data-intro-seen="true"] .scroll-progress {
  visibility: visible !important;
}
html[data-intro-seen="true"] .welcome-shell {
  display: none !important;
}
.welcome-shell {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(circle at 50% 38%, #102e5c 0%, #06152f 42%, #020817 100%);
}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: introCriticalCss }} />
        <script dangerouslySetInnerHTML={{ __html: introStateScript }} />
      </head>
      <body><ScrollProgress />{children}</body>
    </html>
  );
}
