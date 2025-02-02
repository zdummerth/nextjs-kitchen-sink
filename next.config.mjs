import createMDX from "@next/mdx";
import rehypeKatex from "rehype-katex";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax, rehypeKatex],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
