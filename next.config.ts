import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPage = Boolean(
  process.env.GITHUB_ACTIONS === "true" &&
    repositoryName &&
    !repositoryName.endsWith(".github.io"),
);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProjectPage ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
