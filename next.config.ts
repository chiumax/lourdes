import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Keep Turbopack scoped to this worktree, even when the parent has a lockfile.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
