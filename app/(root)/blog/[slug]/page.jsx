import { Suspense } from "react";
import { getBlogPost } from "@/lib/sanity";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import BackLink from "@/components/ui/BackLink";
import BlogContent from "@/features/blog/BlogContent";

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

  return (
    <section className="pt-8 sm:pt-16 md:pt-24">
      <BackLink href="/blog" label="Back to journal" />

      <Suspense fallback={<SkeletonLoader variant="blog-post" />}>
        <BlogContent slug={slug} />
      </Suspense>
    </section>
  );
};

export default BlogPostPage;
