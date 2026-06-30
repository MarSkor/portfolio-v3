import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

// ─── Client ───────────────────────────────────────────────────────────────────

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  // Token only needed for mutations / draft previews
  token: process.env.SANITY_AUTH_TOKEN,
});

// ─── Image URL builder ────────────────────────────────────────────────────────

const builder = createImageUrlBuilder({
  projectId: client.projectId,
  dataset: client.dataset,
});

export function urlFor(source) {
  return builder.image(source);
}

// ─── GROQ fragments ───────────────────────────────────────────────────────────

/**
 * Portable Text block fields
 */
const BLOCK_CONTENT_FIELDS = `
  ...,
  markDefs[] {
    ...,
    _type == "link" => {
      href,
      blank
    }
  }
`;

/**
 * Image with asset URL resolved
 */
const IMAGE_FIELDS = `
  ...,
  asset-> { url, metadata { dimensions, lqip } }
`;

/**
 * Minimal project stub used in cards and listings
 */
const PROJECT_STUB_FRAGMENT = `
  _id,
  title,
  slug,
  projectType,
  projectNumber,
  year,
  description,
  category,
  techStack,
  featured,
  thumbnail { ${IMAGE_FIELDS} },
  links[] {
    _key,
    type,
    label,
    url,
    primary
  }
`;

/**
 * Full project — all fields
 */
const PROJECT_FULL_FRAGMENT = `
  ${PROJECT_STUB_FRAGMENT},
  _createdAt,
  _updatedAt,
  publishedAt,
  archived,
  role,
  client,
  duration,

  // Rich text
  overview[] { ${BLOCK_CONTENT_FIELDS} },
  brief[] { ${BLOCK_CONTENT_FIELDS} },
  approach[] { ${BLOCK_CONTENT_FIELDS} },
  result[] { ${BLOCK_CONTENT_FIELDS} },

  // Media
  coverImage { ${IMAGE_FIELDS} },
  processImages[] {
    _key,
    image { ${IMAGE_FIELDS} },
    alt,
    caption
  },
  gallery[] {
    _key,
    image { ${IMAGE_FIELDS} },
    alt,
    caption,
    span
  },

  // Relations
  relatedProjects[]-> { ${PROJECT_STUB_FRAGMENT} },

  // SEO
  seoTitle,
  seoDescription,
  ogImage { ${IMAGE_FIELDS} }
`;

// ─── Query helpers ────────────────────────────────────────────────────────────

const ACTIVE_FILTER = `archived != true`;

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * All projects, optionally filtered by category.
 * Sorted by projectNumber, then publishedAt descending.
 */
export async function getProjects(category) {
  const filter = category
    ? `${ACTIVE_FILTER} && $category in category`
    : ACTIVE_FILTER;

  return client.fetch(
    `*[_type == "project" && ${filter}]
    | order(projectNumber asc, publishedAt desc) {
      ${PROJECT_STUB_FRAGMENT}
    }`,
    category ? { category } : {},
    { next: { revalidate: 60, tags: ["projects"] } },
  );
}

/**
 * Single project by slug — returns null when not found.
 */
export async function getProject(slug) {
  return (
    (client.fetch < Project) |
    (null >
      (`*[_type == "project" && slug.current == $slug && ${ACTIVE_FILTER}][0] {
      ${PROJECT_FULL_FRAGMENT}
    }`,
      { slug },
      { next: { revalidate: 60, tags: [`project:${slug}`] } }))
  );
}

/**
 * Featured projects for homepage, up to `limit` (default 6).
 */
export async function getFeaturedProjects(limit = 6) {
  return client.fetch(
    `*[_type == "project" && ${ACTIVE_FILTER} && featured == true]
    | order(projectNumber asc) [0...$limit] {
      ${PROJECT_STUB_FRAGMENT}
    }`,
    { limit },
    { next: { revalidate: 60, tags: ["projects"] } },
  );
}

/**
 * Projects filtered by projectType.
 */
export async function getProjectsByType(projectType) {
  return client.fetch(
    `*[_type == "project" && ${ACTIVE_FILTER} && projectType == $projectType]
    | order(projectNumber asc, publishedAt desc) {
      ${PROJECT_STUB_FRAGMENT}
    }`,
    { projectType },
    { next: { revalidate: 60, tags: ["projects"] } },
  );
}

/**
 * Projects that match ANY of the given categories.
 */
export async function getProjectsByCategories(categories) {
  return client.fetch(
    `*[_type == "project" && ${ACTIVE_FILTER} && count((category[])[@ in $categories]) > 0]
    | order(projectNumber asc) {
      ${PROJECT_STUB_FRAGMENT}
    }`,
    { categories },
    { next: { revalidate: 60, tags: ["projects"] } },
  );
}

/**
 * Full-text search across title and description.
 */
export async function searchProjects(query) {
  return client.fetch(
    `*[_type == "project" && ${ACTIVE_FILTER} &&
      (title match $q || description match $q)]
    | order(projectNumber asc) {
      ${PROJECT_STUB_FRAGMENT}
    }`,
    { q: `*${query}*` },
    { next: { revalidate: 30 } },
  );
}

/**
 * All distinct categories that have at least one active project.
 */
export async function getCategories() {
  const result = await client.fetch(category)(
    `*[_type == "project" && ${ACTIVE_FILTER}] { category }`,
    {},
    { next: { revalidate: 60, tags: ["projects"] } },
  );
  const all = result.flatMap((p) => p.category ?? []);
  return [...new Set(all)].sort();
}

/**
 * Previous / next project by projectNumber for in-page navigation.
 */
export async function getProjectNavigation(projectNumber) {
  const [prev, next] = await Promise.all([
    client.fetch(slug)(
      `*[_type == "project" && ${ACTIVE_FILTER} && projectNumber < $num]
      | order(projectNumber desc)[0] { title, slug }`,
      { num: projectNumber },
    ),
    client.fetch(slug)(
      `*[_type == "project" && ${ACTIVE_FILTER} && projectNumber > $num]
      | order(projectNumber asc)[0] { title, slug }`,
      { num: projectNumber },
    ),
  ]);
  return { prev, next };
}

/**
 * Projects that have a specific link type (e.g. find all with an App Store link).
 */
export async function getProjectsWithLinkType(linkType) {
  return client.fetch(
    `*[_type == "project" && ${ACTIVE_FILTER} && $linkType in links[].type]
    | order(projectNumber asc) {
      ${PROJECT_STUB_FRAGMENT}
    }`,
    { linkType },
    { next: { revalidate: 60, tags: ["projects"] } },
  );
}

/**
 * All active testimonials; featured ones first.
 */
export async function getTestimonials(featuredOnly = false) {
  const filter = featuredOnly
    ? `_type == "testimonial" && featured == true`
    : `_type == "testimonial"`;

  return client.fetch(
    `*[${filter}] | order(featured desc, _createdAt desc) {
      _id,
      quote,
      authorName,
      authorRole,
      authorPhoto { ${IMAGE_FIELDS} },
      featured,
      project-> { ${PROJECT_STUB_FRAGMENT} }
    }`,
    {},
    { next: { revalidate: 60, tags: ["testimonials"] } },
  );
}

/**
 * All project slugs — used for generateStaticParams in Next.js.
 */
export async function getAllProjectSlugs() {
  const result = await client.fetch(slug)(
    `*[_type == "project" && ${ACTIVE_FILTER}] { slug }`,
    {},
    { next: { revalidate: 3600 } },
  );
  return result.map((p) => p.slug.current);
}
