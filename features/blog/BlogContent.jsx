import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedPosts from "@/features/blog/RelatedPosts";
import ReadingProgress from "@/features/blog/ReadingProgress";
import PortableText from "@/components/ui/PortableText";
import {
  getBlogPost,
  getBlogNavigation,
  getRelatedBlogPosts,
  urlFor,
} from "@/lib/sanity";

const BlogContent = async ({ slug }) => {
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const [navigation, related] = await Promise.all([
    getBlogNavigation(post.publishedAt),
    getRelatedBlogPosts(post),
  ]);

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const cover = post.coverImage || post.thumbnail;

  return (
    <article>
      <ReadingProgress />

      <section className="border-b border-border py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {publishedDate}
              </span>
              {post.readingTime && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {post.readingTime} min read
                  </span>
                </>
              )}
            </div>

            <h1 className="mb-6 font-heading text-4xl font-medium leading-tight text-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {post.coverImage && (
        <section className="container-x py-12">
          <div className="grain-exempt mx-auto max-w-3xl overflow-hidden">
            <Image
              src={urlFor(cover).width(1200).height(600).url()}
              alt={cover.alt || post.title}
              width={1200}
              height={600}
              className="h-auto w-full"
              priority
            />
          </div>
        </section>
      )}

      {post.description && (
        <section className="container-x py-12">
          <div className="mx-auto max-w-prose-col text-center">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              {post.description}
            </p>
          </div>
        </section>
      )}

      {post.content && (
        <section className="container-x pb-16 md:pb-20">
          <div className="mx-auto max-w-prose-col">
            <PortableText value={post.content} />
          </div>
        </section>
      )}

      <RelatedPosts posts={related} />
    </article>
  );
};

export default BlogContent;
