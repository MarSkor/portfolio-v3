"use client";

import BlogRow from "@/features/blog/components/BlogRow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { BlogPost } from "@/lib/types";
 
interface BlogPostListProps {
  posts?: BlogPost[];
  emptyMessage?: string;
}

const BlogPostList = ({
  posts,
  emptyMessage = "No posts yet — check back soon.",
}: BlogPostListProps) => {
  if (!posts || posts.length === 0) {
    return <p className="text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <ScrollReveal>
      <section>
        {posts.map((post) => (
          <BlogRow key={post._id} post={post} />
        ))}
      </section>
    </ScrollReveal>
  );
};

export default BlogPostList;
