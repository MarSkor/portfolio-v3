"use client";
import { useMemo, useState } from "react";
import BlogTagsFilter from "@/features/blog/BlogTagsFilter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BlogRow from "@/features/blog/BlogRow";

const BlogPageClient = ({ initialPosts }) => {
  const [activeTag, setActiveTag] = useState(null);

  const tags = useMemo(
    () => Array.from(new Set(initialPosts.flatMap((p) => p.tags || []))).sort(),
    [initialPosts],
  );

  const filteredPosts = useMemo(
    () =>
      activeTag
        ? initialPosts.filter((p) => p.tags?.includes(activeTag))
        : initialPosts,
    [initialPosts, activeTag],
  );

  return (
    <>
      <div className="mb-12">
        <BlogTagsFilter
          tags={tags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground">
          {activeTag
            ? `No posts tagged "${activeTag}" yet.`
            : "No posts yet — check back soon."}
        </p>
      ) : (
        <ScrollReveal>
          <div className="divide-y divide-border">
            {filteredPosts.map((post) => (
              <BlogRow key={post._id} post={post} />
            ))}
          </div>
        </ScrollReveal>
      )}
    </>
  );
};

export default BlogPageClient;
