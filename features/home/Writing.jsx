import Link from "next/link";
import BlogRow from "@/features/blog/BlogRow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

const Writing = () => {
  const posts = [
    {
      id: "1",
      title: "The power of a good design system",
      slug: "the-power-of-a-good-design-system",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      readingTime: "5 min",
      publishedAt: "2022-01-01",
      tags: ["design", "ux"],
    },
    {
      id: "2",
      title: "The power of a good design system",
      slug: "the-power-of-a-good-design-system",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
      readingTime: "5 min",
      publishedAt: "2022-01-01",
      tags: ["design", "ux"],
    },
  ];
  const loading = false;

  return (
    <section id="blog" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-monograph px-6 lg:px-10">
        <ScrollReveal className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-meta mb-4">Writing</p>
            <h2 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
              From the journal
            </h2>
          </div>
          <Link
            href="/blog"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        {loading ? (
          <div className="space-y-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse border-t border-border"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">
            No posts yet — check back soon.
          </p>
        ) : (
          <ScrollReveal delay={80}>
            <div>
              {posts.map((post) => (
                <BlogRow key={post.id} post={post} />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default Writing;
