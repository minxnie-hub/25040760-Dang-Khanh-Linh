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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><ScrollProgress />{children}</body></html>;
}
