import { Suspense } from "react";
import type { Metadata } from "next";
import { getProject } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import BackLink from "@/components/ui/BackLink";
import ProjectContent from "@/features/work/components/ProjectContent";


interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };
 
  return {
    title: `${project.seoTitle || project.title}`,
    description: project.seoDescription || project.description,
    openGraph: {
      images: project.ogImage
        ? [urlFor(project.ogImage).width(1200).height(630).url()]
        : project.thumbnail
          ? [urlFor(project.thumbnail).width(1200).height(630).url()]
          : [],
    },
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug } = await params;

  return (
    <section className="pt-8 sm:pt-16 md:pt-24">
      <BackLink href="/work" label="Back to work" />

      <Suspense fallback={<SkeletonLoader variant="article" />}>
        <ProjectContent slug={slug} />
      </Suspense>
    </section>
  );
};

export default ProjectDetailPage;
