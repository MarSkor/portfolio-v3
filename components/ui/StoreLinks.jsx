import {
  Globe,
  PlayCircle,
  FileText,
  BookOpen,
  Link as LinkIcon,
  ArrowUpRight,
} from "lucide-react";
import {
  GithubLogo,
  AppStoreLogo,
  GoogleStoreLogo,
  FigmaLogo,
} from "../icons/BrandIcons";

const ICONS = {
  website: Globe,
  github: GithubLogo,
  appstore: AppStoreLogo,
  playstore: GoogleStoreLogo,
  casestudy: FileText,
  figma: FigmaLogo,
  demo: PlayCircle,
  docs: BookOpen,
  other: LinkIcon,
};

const StoreLinks = ({ project, variant = "buttons" }) => {
  const links = project.links || [];

  if (variant === "badges") {
    const badges = links.filter(
      (l) => l.type === "appstore" || l.type === "playstore",
    );
    if (!badges.length) return null;
    return (
      <div className="mt-4 flex flex-col sm:flex-row items-stretch justify-center gap-2">
        {badges.map((link) => {
          const Logo =
            link.type === "appstore" ? AppStoreLogo : GoogleStoreLogo;
          const top =
            link.type === "appstore" ? "Download on the" : "GET IT ON";
          const bottom = link.type === "appstore" ? "App Store" : "Google Play";
          return (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-md bg-foreground px-3 py-1.5 text-background transition-opacity hover:opacity-85"
            >
              <Logo className="h-6 w-6 shrink-0" />
              <span className="flex flex-col leading-none text-left">
                <span className="text-[8px] font-medium uppercase tracking-wide opacity-80">
                  {top}
                </span>
                <span className="text-xs font-semibold">{bottom}</span>
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  if (!links.length) return null;

  const sorted = [...links].sort(
    (a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0),
  );

  return (
    <>
      {sorted.map((link, i) => {
        const Icon = ICONS[link.type] || LinkIcon;
        const isPrimary = i === 0;
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full sm:w-auto justify-center h-11 items-center gap-2 px-6 text-base font-medium text-foreground transition-colors ${
              isPrimary
                ? "border border-foreground hover:bg-foreground hover:text-background"
                : "border border-border hover:border-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {link.label}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        );
      })}
    </>
  );
};

export default StoreLinks;
