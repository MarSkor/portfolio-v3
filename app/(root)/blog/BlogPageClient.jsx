"use client";

import { useMemo, useState } from "react";
import PageHeading from "@/components/ui/PageHeading";
import BlogTagsFilter from "@/features/blog/BlogTagsFilter";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BlogRow from "@/features/blog/BlogRow";

const BlogPage = ({ initialPosts }) => {
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
    <section className="pt-8 sm:pt-16 md:pt-24">
      <PageHeading
        label="Writing"
        title="The Journal"
        description="Notes on design, code, and the details in between."
      >
        <div className="mx-auto">
          <BlogTagsFilter
            tags={tags}
            activeTag={activeTag}
            onTagChange={setActiveTag}
          />
        </div>
      </PageHeading>

      <section className="py-16 md:py-12">
        <div className="container-x">
          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground">
              {activeTag
                ? `No posts tagged "${activeTag}" yet.`
                : "No posts yet — check back soon."}
            </p>
          ) : (
            <ScrollReveal>
              <div>
                {filteredPosts.map((post) => (
                  <BlogRow key={post._id} post={post} />
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </section>
  );
};
export default BlogPage;
