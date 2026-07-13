import Link from "next/link";

const BlogRow = ({ post }) => {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group grid grid-cols-1 gap-2 py-8 transition-colors duration-300 sm:grid-cols-12 sm:gap-6"
    >
      <div className="sm:col-span-3">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {date}
        </p>
        {post.readingTime ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {post.readingTime} min read
          </p>
        ) : null}
      </div>
      <div className="sm:col-span-9">
        <h3 className="link-underline inline font-heading text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : post.description ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {post.description}
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
