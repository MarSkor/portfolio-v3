import Link from "next/link";
import { format } from "date-fns";

const BlogRow = ({ post }) => {
  const date = post.publishedAt
    ? format(new Date(post.publishedAt), "MMM d, yyyy")
    : "";
  return (
    <Link
      href={`/blog/${post.id}`}
      className="group grid grid-cols-1 gap-2 border-t border-border py-8 transition-colors duration-300 first:border-t-0 sm:grid-cols-12 sm:gap-6"
    >
      <div className="sm:col-span-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-teal">
          {date}
        </p>
        {post.readingTime ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {post.readingTime} min read
          </p>
        ) : null}
      </div>
      <div className="sm:col-span-9">
        <h3 className="link-underline inline font-heading text-2xl font-medium leading-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
        {post.tags?.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default BlogRow;
