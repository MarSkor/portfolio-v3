import { Suspense } from "react";
import { getBlogPosts } from "@/lib/sanity";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import PageHeading from "@/components/ui/PageHeading";
import BlogPageClient from "@/features/blog/BlogPageClient";

export const metadata = {
  title: "The Journal - Blog",
  description: "Notes on design, code, and the details in between.",
};

const BlogContent = async () => {
  const posts = await getBlogPosts();
  return <BlogPageClient initialPosts={posts} />;
};

const BlogPage = () => {
  return (
    <section className="pt-8 sm:pt-16 md:pt-24">
      <PageHeading
        label="Writing"
        title="The Journal"
        description="Notes on design, code, and the details in between."
      />

      <section className="py-16 md:py-12">
        <div className="container-x">
          <Suspense fallback={<SkeletonLoader variant="blog" count={5} />}>
            <BlogContent />
          </Suspense>
        </div>
      </section>
    </section>
  );
};
export default BlogPage;
