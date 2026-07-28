import type {
  Project,
  FullProject,
  ProjectNavigation,
  ProjectCategory,
  ProjectType,
  BlogPost,
  FullBlogPost,
  RelatedBlogPost,
  BlogNavigation,
  About,
  Toolkit,
} from "../types";
import { client } from "./client";

/**
 * ─────────────────────────────────────────────────────────────────
 * QUERY FRAGMENTS (Reusable query parts)
 * ─────────────────────────────────────────────────────────────────
 */

const projectFields = `
  _id,
  title,
  slug,
  projectType,
  projectNumber,
  year,
  category,
  description,
  thumbnail {
    asset,
    alt,
  },
  appIcon {
    asset,
    alt,
  },
  techStack,
  links[] {
    type,
    label,
    url,
    primary,
  },
  featured,
  publishedAt,
`;

const fullProjectFields = `
  _id,
  title,
  slug,
  projectType,
  projectNumber,
  year,
  category,
  description,
  thumbnail {
    asset,
    alt,
  },
  coverImage {
    asset,
    alt,
  },
  appIcon {
    asset,
    alt,
  },
  techStack,
  links[] {
    type,
    label,
    url,
    primary,
  },
  overview,
  brief,
  approach,
  result,
  role,
  client,
  duration,
  processImages[] {
    image {
      asset,
      alt,
      caption,
    },
    alt,
    caption,
  },
  gallery[] {
    image {
      asset,
      alt,
      caption,
      span,
    },
    alt,
    caption,
    span,
  },
  relatedProjects[]-> {
    _id,
    title,
    slug,
    thumbnail {
      asset,
      alt,
    },
    projectNumber,
    year,
    projectType,
  },
  publishedAt,
  seoTitle,
  seoDescription,
  ogImage,
`;

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECTS
 * ─────────────────────────────────────────────────────────────────
 * Get all projects with optional filtering by category or type
 */

export async function getProjects(
  category?: ProjectCategory | string,
  projectType?: ProjectType | string,
): Promise<Project[]> {
  const categoryFilter = category ? ` && "${category}" in category` : "";
  const typeFilter = projectType ? ` && projectType == "${projectType}"` : "";

  return client.fetch<Project[]>(
    `*[_type == "project" && !archived${categoryFilter}${typeFilter}] | order(projectNumber asc) {
      ${projectFields}
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET SINGLE PROJECT
 * ─────────────────────────────────────────────────────────────────
 * Get a single project by slug with all details
 */
export async function getProject(slug: string): Promise<FullProject | null> {
  return client.fetch<FullProject | null>(
    `*[_type == "project" && slug.current == $slug && !archived][0] {
      ${fullProjectFields}
    }`,
    { slug },
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET FEATURED PROJECTS
 * ─────────────────────────────────────────────────────────────────
 * Get featured projects for homepage
 */
export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  return client.fetch<Project[]>(
    `*[_type == "project" && featured && !archived] | order(projectNumber asc)[0...${limit}] {
      ${projectFields}
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET CATEGORIES
 * ─────────────────────────────────────────────────────────────────
 * Get all available categories used in projects
 */
export async function getCategories(): Promise<ProjectCategory[]> {
  return client.fetch<ProjectCategory[]>(
    `*[_type == "project" && !archived].category[] | unique() | sort()`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECT TYPES
 * ─────────────────────────────────────────────────────────────────
 * Get all project types used
 */
export async function getProjectTypes(): Promise<ProjectType[]> {
  return client.fetch<ProjectType[]>(
    `*[_type == "project" && !archived].projectType | unique() | sort()`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECT NAVIGATION
 * ─────────────────────────────────────────────────────────────────
 * Get previous and next project for navigation
 */
export async function getProjectNavigation(
  projectNumber: number,
): Promise<ProjectNavigation> {
  return client.fetch<ProjectNavigation>(
    `{
      "prev": *[_type == "project" && projectNumber < $num && !archived] | order(projectNumber desc)[0] {
        title,
        slug,
        projectNumber,
      },
      "next": *[_type == "project" && projectNumber > $num && !archived] | order(projectNumber asc)[0] {
        title,
        slug,
        projectNumber,
      }
    }`,
    { num: projectNumber },
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECTS BY TYPE
 * ─────────────────────────────────────────────────────────────────
 * Filter projects by type (design, web, mobile, fullstack)
 */
export async function getProjectsByType(
  projectType: ProjectType | string,
): Promise<Project[]> {
  return client.fetch<Project[]>(
    `*[_type == "project" && projectType == $type && !archived] | order(projectNumber asc) {
      ${projectFields}
    }`,
    { type: projectType },
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECTS BY MULTIPLE CATEGORIES
 * ─────────────────────────────────────────────────────────────────
 * Filter projects by multiple categories
 */
export async function getProjectsByCategories(
  categories: (ProjectCategory | string)[],
): Promise<Project[]> {
  const filters = categories.map((cat) => `"${cat}" in category`).join(" || ");
  return client.fetch<Project[]>(
    `*[_type == "project" && !archived && (${filters})] | order(projectNumber asc) {
      ${projectFields}
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * SEARCH PROJECTS
 * ─────────────────────────────────────────────────────────────────
 * Search projects by title or description
 */
export async function searchProjects(searchTerm: string): Promise<Project[]> {
  return client.fetch<Project[]>(
    `*[_type == "project" && !archived && (
      title match $search || 
      description match $search
    )] | order(projectNumber asc) {
      ${projectFields}
    }`,
    { search: `*${searchTerm}*` },
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECTS WITH SPECIFIC LINK TYPE
 * ─────────────────────────────────────────────────────────────────
 * Find projects with specific link types (github, website, etc.)
 */
export async function getProjectsWithLinkType(
  linkType: string,
): Promise<Project[]> {
  return client.fetch<Project[]>(
    `*[_type == "project" && !archived && (links[].type match "${linkType}")] | order(projectNumber asc) {
      ${projectFields}
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET RECENT PROJECTS
 * ─────────────────────────────────────────────────────────────────
 * Get the most recently published projects
 */
export async function getRecentProjects(limit = 3): Promise<Project[]> {
  return client.fetch<Project[]>(
    `*[_type == "project" && !archived] | order(publishedAt desc)[0...${limit}] {
      ${projectFields}
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET ALL PROJECTS (INCLUDING DRAFTS)
 * ─────────────────────────────────────────────────────────────────
 * Admin/Studio only - gets all projects including drafts
 */
export async function getAllProjectsAdmin(): Promise<
  (Project & { _updatedAt: string; archived?: boolean })[]
> {
  return client.fetch(
    `*[_type == "project"] | order(projectNumber asc) {
      _id,
      title,
      _updatedAt,
      archived,
      ${projectFields}
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECT COUNT
 * ─────────────────────────────────────────────────────────────────
 * Get total count of published projects
 */
export async function getProjectCount(): Promise<number> {
  return client.fetch<number>(`count(*[_type == "project" && !archived])`);
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECTS BY YEAR
 * ─────────────────────────────────────────────────────────────────
 * Get projects from a specific year
 */
export async function getProjectsByYear(year: number): Promise<Project[]> {
  return client.fetch<Project[]>(
    `*[_type == "project" && year == $year && !archived] | order(projectNumber asc) {
      ${projectFields}
    }`,
    { year },
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECTS BY TECH
 * ─────────────────────────────────────────────────────────────────
 * Find all projects using a specific technology
 */
export async function getProjectsByTech(tech: string): Promise<Project[]> {
  return client.fetch<Project[]>(
    `*[_type == "project" && !archived && $tech in techStack] | order(projectNumber asc) {
      ${projectFields}
    }`,
    { tech },
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * HELPER: Get all unique tech stack items
 * ─────────────────────────────────────────────────────────────────
 */
export async function getAllTechStack(): Promise<string[]> {
  return client.fetch<string[]>(
    `*[_type == "project" && !archived].techStack[] | unique() | sort()`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * HELPER: Get all unique years
 * ─────────────────────────────────────────────────────────────────
 */
export async function getAllYears(): Promise<number[]> {
  return client.fetch<number[]>(
    `*[_type == "project" && !archived].year | unique() | sort()`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * BLOG POST QUERIES (Updated for new schema)
 * ─────────────────────────────────────────────────────────────────
 */

const blogFields = `
  _id,
  title,
  slug,
  description,
  excerpt,
  publishedAt,
  featured,
  category,
  tags,
  author,
  readingTime,
  seoTitle,
  seoDescription,
`;

const fullBlogFields = `
  _id,
  title,
  slug,
  description,
  excerpt,
  publishedAt,
  featured,
  category,
  tags,
  author,
  readingTime,
  coverImage {
    asset,
    alt,
  },
  content,
  seoTitle,
  seoDescription,
`;

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && publishedAt != null] | order(publishedAt desc) {
      ${blogFields}
    }`,
  );
}

/**
 * Get featured blog posts (for homepage)
 */
export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && featured && publishedAt != null] | order(publishedAt desc)[0...${limit}] {
      ${blogFields}
    }`,
  );
}

/**
 * Get single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<FullBlogPost | null> {
  return client.fetch<FullBlogPost | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      ${fullBlogFields}
    }`,
    { slug },
  );
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && category == $category && publishedAt != null] | order(publishedAt desc) {
      ${blogFields}
    }`,
    { category },
  );
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(searchTerm: string): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && publishedAt != null && (
      title match $search || 
      description match $search
    )] | order(publishedAt desc) {
      ${blogFields}
    }`,
    { search: `*${searchTerm}*` },
  );
}

/**
 * Get blog post navigation (prev/next)
 */
export async function getBlogNavigation(
  publishedAt: string | null,
): Promise<BlogNavigation> {
  return client.fetch<BlogNavigation>(
    `{
      "prev": *[_type == "blogPost" && publishedAt < $date && publishedAt != null] | order(publishedAt desc)[0] {
        title,
        slug,
      },
      "next": *[_type == "blogPost" && publishedAt > $date && publishedAt != null] | order(publishedAt asc)[0] {
        title,
        slug,
      }
    }`,
    { date: publishedAt },
  );
}

/**
 * Get all blog categories
 */
export async function getBlogCategories(): Promise<string[]> {
  return client.fetch<string[]>(
    `*[_type == "blogPost" && publishedAt != null].category | unique() | sort()`,
  );
}

/**
 * Get blog post count
 */
export async function getBlogPostCount(): Promise<number> {
  return client.fetch<number>(
    `count(*[_type == "blogPost" && publishedAt != null])`,
  );
}

/**
 * Get related posts for a given post, scored by number of shared tags
 * (highest overlap first). Returns [] if the post has no tags.
 */
export async function getRelatedBlogPosts(
  post: Pick<BlogPost, "_id" | "tags"> | null | undefined,
  limit = 3,
): Promise<RelatedBlogPost[]> {
  if (!post?.tags?.length) return [];

  const candidates = await client.fetch<BlogPost[]>(
    `*[_type == "blogPost" && publishedAt != null && _id != $id] {
      ${blogFields}
    }`,
    { id: post._id },
  );

  return candidates
    .map((p) => ({
      ...p,
      overlap: (p.tags || []).filter((t) => post.tags!.includes(t)).length,
    }))
    .filter((p) => p.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit);
}

/**
 * ─────────────────────────────────────────────────────────────────
 * ABOUT SECTION (singleton)
 * ─────────────────────────────────────────────────────────────────
 */
export async function getAboutContent(): Promise<About | null> {
  return client.fetch<About | null>(
    `*[_type == "about"][1] {
      headingMain,
      headingAccent,
      bio,
      stats,
      currentlyItems,
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * TOOLKIT SECTION (singleton)
 * ─────────────────────────────────────────────────────────────────
 */
export async function getToolkitContent(): Promise<Toolkit | null> {
  return client.fetch<Toolkit | null>(
    `*[_type == "toolkit"][1] {
      categories,
    }`,
  );
}
