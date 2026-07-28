/**
 * ─────────────────────────────────────────────────────────────────
 * SANITY PRIMITIVES
 * ─────────────────────────────────────────────────────────────────
 */

export interface SanityImageAsset {
  _ref?: string;
  _type?: "reference" | "image";
  url?: string;
}

export interface SanityImage {
  _type?: "image";
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
  /** Only present on gallery images */
  span?: "1" | "2" | "3";
}

export interface SanitySlug {
  _type?: "slug";
  current: string;
}

/**
 * Loose Portable Text type. Swap for `PortableTextBlock[]` from
 * `@portabletext/types` if you decide to add that dependency —
 * kept as `any[]` here so this compiles without a new install.
 */
export type BlockContent = any[];

/**
 * ─────────────────────────────────────────────────────────────────
 * PROJECT
 * ─────────────────────────────────────────────────────────────────
 */

export type ProjectType = "design" | "web" | "mobile" | "fullstack";

export type ProjectCategory =
  | "web-development"
  | "ui-design"
  | "ux-research"
  | "mobile"
  | "product-design"
  | "branding"
  | "illustration"
  | "motion"
  | "frontend"
  | "full-stack"
  | "backend";

export type ProjectLinkType =
  | "website"
  | "github"
  | "appstore"
  | "playstore"
  | "casestudy"
  | "figma"
  | "demo"
  | "docs"
  | "other";

export interface ProjectLink {
  type: ProjectLinkType;
  label: string;
  url: string;
  primary?: boolean;
}

export interface ProcessImageItem {
  image: SanityImage;
  alt?: string;
  caption?: string;
}

export interface GalleryImageItem {
  image: SanityImage;
  alt?: string;
  caption?: string;
  span?: "1" | "2" | "3";
}

export interface RelatedProjectRef {
  _id: string;
  title: string;
  slug: SanitySlug;
  thumbnail?: SanityImage;
  projectNumber?: number;
  year?: number;
  projectType?: ProjectType;
}

/** Fields returned by `projectFields` (list/card views) */
export interface Project {
  _id: string;
  title: string;
  slug: SanitySlug;
  projectType: ProjectType;
  projectNumber: number;
  year: number;
  category: ProjectCategory[];
  description: string;
  shortDescription?: string;
  thumbnail?: SanityImage;
  appIcon?: SanityImage;
  techStack?: string[];
  links?: ProjectLink[];
  featured?: boolean;
  archived?: boolean;
  publishedAt?: string;
}

/** Fields returned by `fullProjectFields` (project detail page) */
export interface FullProject extends Project {
  coverImage?: SanityImage;
  overview?: BlockContent;
  brief?: BlockContent;
  approach?: BlockContent;
  result?: BlockContent;
  role?: string;
  client?: string;
  duration?: string;
  processImages?: ProcessImageItem[];
  gallery?: GalleryImageItem[];
  relatedProjects?: RelatedProjectRef[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
}

export interface ProjectNavigationEntry {
  title: string;
  slug: SanitySlug;
  projectNumber: number;
}

export interface ProjectNavigation {
  prev: ProjectNavigationEntry | null;
  next: ProjectNavigationEntry | null;
}

/**
 * ─────────────────────────────────────────────────────────────────
 * BLOG POST
 * ─────────────────────────────────────────────────────────────────
 */

/** Fields returned by `blogFields` (list views) */
export interface BlogPost {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  excerpt?: string;
  publishedAt: string | null;
  featured?: boolean;
  category?: string;
  tags?: string[];
  author?: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
}

/** Fields returned by `fullBlogFields` (blog post detail page) */
export interface FullBlogPost extends BlogPost {
  coverImage?: SanityImage;
  thumbnail?: SanityImage;
  content?: BlockContent;
}

export interface RelatedBlogPost extends BlogPost {
  overlap: number;
}

export interface BlogNavigationEntry {
  title: string;
  slug: SanitySlug;
}

export interface BlogNavigation {
  prev: BlogNavigationEntry | null;
  next: BlogNavigationEntry | null;
}

/**
 * ─────────────────────────────────────────────────────────────────
 * ABOUT (singleton)
 * ─────────────────────────────────────────────────────────────────
 */

export interface AboutStat {
  value: string;
  label: string;
}

export interface CurrentlyItem {
  label: string;
  value: string;
}

export interface About {
  headingMain: string;
  headingAccent?: string;
  bio?: BlockContent;
  stats?: AboutStat[];
  currentlyItems?: CurrentlyItem[];
}

/**
 * ─────────────────────────────────────────────────────────────────
 * TOOLKIT (singleton)
 * ─────────────────────────────────────────────────────────────────
 */

export type ToolkitCategoryName =
  | "Languages & Frameworks"
  | "Tools"
  | "Design"
  | "Development";

export interface ToolkitCategory {
  name: ToolkitCategoryName;
  skills: string[];
}

export interface Toolkit {
  categories: ToolkitCategory[];
}

/**
 * ─────────────────────────────────────────────────────────────────
 * TESTIMONIAL
 * ─────────────────────────────────────────────────────────────────
 */

export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: SanityImage;
  project?: { _ref: string };
  featured?: boolean;
}