import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedPosts from "@/features/blog/RelatedPosts";
import ReadingProgress from "@/features/blog/ReadingProgress";
import {
  getBlogPost,
  getBlogNavigation,
  getRelatedBlogPosts,
  urlFor,
} from "@/lib/sanity";
import BackLink from "@/components/ui/BackLink";
import PortableText from "@/components/ui/PortableText";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
  };
}

const BlogPostPage = async ({ params }) => {
  const { slug } = await params;
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

  return (
    <article className="pt-16">
      <ReadingProgress />

      <BackLink href="/blog" label="Back to journal" />

      <section className="border-b border-border py-16 md:py-20">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex items-center justify-center gap-3 flex-wrap">
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

            <h1 className="mb-6 max-w-4xl font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground">
              {post.title}
            </h1>

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
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
          <div className="max-w-3xl mx-auto overflow-hidden grain-exempt ">
            <Image
              src={urlFor(post.coverImage).width(1200).height(600).url()}
              alt={post.coverImage.alt || post.title}
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
          <div className="max-w-prose-col mx-auto text-center">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          </div>
        </section>
      )}

      {post.content && (
        <section className="container-x pb-16 md:pb-20">
          <div className="max-w-prose-col mx-auto">
            <PortableText value={post.content} />
          </div>
        </section>
      )}

      <RelatedPosts posts={related} />
    </article>
  );
};

export default BlogPostPage;
