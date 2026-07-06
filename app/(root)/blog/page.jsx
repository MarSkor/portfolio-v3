import { getBlogPosts } from "@/lib/sanity";

import BlogPageClient from "./BlogPageClient";

export const metadata = {
  title: "The Journal - Blog",
  description:
    "Notes on craft, interface design, and the small details that make software feel human.",
};

const BlogPage = async () => {
  const posts = await getBlogPosts();

  return <BlogPageClient initialPosts={posts} />;
};
export default BlogPage;
