import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Video posters come straight from YouTube.
  images: { remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }] },
  // Keep Turbopack scoped to this worktree, even when the parent has a lockfile.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
