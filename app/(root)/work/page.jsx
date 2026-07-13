import { Suspense } from "react";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import PageHeading from "@/components/ui/PageHeading";
import WorkFilters from "@/features/work/WorkFilters";
import { getProjects } from "@/lib/sanity";

export const metadata = {
  title: "Work",
  description:
    "A collection of things I've designed and built — from production apps to experiments I couldn't stop thinking about.",
};

const WorkContent = async () => {
  const projects = await getProjects();

  console.log("projects", projects);

  return <WorkFilters projects={projects} />;
};

const WorkPage = () => {
  return (
    <section className="pt-8 sm:pt-16 md:pt-24">
      <PageHeading
        label="All Work"
        title="Projects"
        description="A collection of things I've designed and built - from production apps to experiments I couldn't stop thinking about."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-monograph px-6 lg:px-10">
          <Suspense fallback={<SkeletonLoader variant="project" count={3} />}>
            <WorkContent />
          </Suspense>
        </div>
      </section>
    </section>
  );
};
export default WorkPage;
