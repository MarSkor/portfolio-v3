import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

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

export async function getProjects(category, projectType) {
  const categoryFilter = category ? ` && "${category}" in category` : "";
  const typeFilter = projectType ? ` && projectType == "${projectType}"` : "";

  return client.fetch(
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
export async function getProject(slug) {
  return client.fetch(
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
export async function getFeaturedProjects(limit = 6) {
  return client.fetch(
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
export async function getCategories() {
  return client.fetch(
    `*[_type == "project" && !archived].category[] | unique() | sort()`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECT TYPES
 * ─────────────────────────────────────────────────────────────────
 * Get all project types used
 */
export async function getProjectTypes() {
  return client.fetch(
    `*[_type == "project" && !archived].projectType | unique() | sort()`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECT NAVIGATION
 * ─────────────────────────────────────────────────────────────────
 * Get previous and next project for navigation
 */
export async function getProjectNavigation(projectNumber) {
  return client.fetch(
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
export async function getProjectsByType(projectType) {
  return client.fetch(
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
export async function getProjectsByCategories(categories) {
  const filters = categories.map((cat) => `"${cat}" in category`).join(" || ");
  return client.fetch(
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
export async function searchProjects(searchTerm) {
  return client.fetch(
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
export async function getProjectsWithLinkType(linkType) {
  return client.fetch(
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
export async function getRecentProjects(limit = 3) {
  return client.fetch(
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
export async function getAllProjectsAdmin() {
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
export async function getProjectCount() {
  return client.fetch(`count(*[_type == "project" && !archived])`);
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET PROJECTS BY YEAR
 * ─────────────────────────────────────────────────────────────────
 * Get projects from a specific year
 */
export async function getProjectsByYear(year) {
  return client.fetch(
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
export async function getProjectsByTech(tech) {
  return client.fetch(
    `*[_type == "project" && !archived && $tech in techStack] | order(projectNumber asc) {
      ${projectFields}
    }`,
    { tech },
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * GET TESTIMONIALS
 * ─────────────────────────────────────────────────────────────────
 * Get all testimonials (if using)
 */
export async function getTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      text,
      author,
      title,
      image {
        asset,
        alt,
      },
    }`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * HELPER: Get all unique tech stack items
 * ─────────────────────────────────────────────────────────────────
 */
export async function getAllTechStack() {
  return client.fetch(
    `*[_type == "project" && !archived].techStack[] | unique() | sort()`,
  );
}

/**
 * ─────────────────────────────────────────────────────────────────
 * HELPER: Get all unique years
 * ─────────────────────────────────────────────────────────────────
 */
export async function getAllYears() {
  return client.fetch(
    `*[_type == "project" && !archived].year | unique() | sort()`,
  );
}
