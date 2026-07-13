import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackLink = ({ href = "/blog", label = "Back to journal" }) => {
  return (
    <nav className="container-x pb-8 pt-12">
      <Link
        href={href}
        className="link-underline inline-flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {label}
      </Link>
    </nav>
  );
};

export default BackLink;
