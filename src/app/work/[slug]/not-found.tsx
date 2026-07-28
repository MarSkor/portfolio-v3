import Link from "next/link";

const ProjectNotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 pt-16">
      <p className="font-heading text-3xl text-foreground">Project not found</p>
      <Link
        href="/work"
        className="link-underline text-sm font-medium text-foreground"
      >
        Back to work
      </Link>
    </div>
  );
};

export default ProjectNotFound;
