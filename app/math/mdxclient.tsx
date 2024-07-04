"use client";
import { MDXRemote } from "next-mdx-remote";
export default function MDXClient({ source }: any) {
  return <MDXRemote {...source} />;
}
