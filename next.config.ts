import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages に載せられるよう、完全な静的サイトとして書き出す
  output: "export",
  // プロジェクトサイト（lv20koji.github.io/portfolio-site）として公開するため
  basePath: "/portfolio-site",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/portfolio-site",
  },
  // 静的書き出しでは画像最適化 API が使えないため無効化する
  images: { unoptimized: true },
  // 出力先が /en/ のようなディレクトリ構成になり、静的ホスティングと相性がよい
  trailingSlash: true,
};

export default nextConfig;
