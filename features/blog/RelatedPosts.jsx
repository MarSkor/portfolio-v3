import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import ScrollReveal from "@/components/ui/ScrollReveal";

const RelatedPosts = ({ posts }) => {
  if (!posts?.length) return null;

  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="container-x">
        <ScrollReveal className="mb-10">
          <p className="label-meta mb-4">Keep reading</p>
          <h2 className="font-heading text-3xl font-medium leading-tight text-foreground md:text-4xl">
            Related posts
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post, i) => {
            const date = post.publishedAt
              ? format(new Date(post.publishedAt), "MMM d, yyyy")
              : "";
            return (
              <ScrollReveal key={post._id} delay={i * 60}>
                <Link
                  href={`/blog/${post.slug?.current}`}
                  className="group flex h-full flex-col gap-4 border border-border bg-card p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-foreground/40 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="label-meta">{date}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-medium leading-tight text-foreground">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                  {post.tags?.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
