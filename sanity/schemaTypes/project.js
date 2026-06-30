import { defineField, defineType } from "sanity";

/**
 * Project schema
 * Supports design, web, mobile, and full-stack portfolio projects.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",

  // ─── Studio preview ───────────────────────────────────────────────
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "thumbnail",
      projectNumber: "projectNumber",
      archived: "archived",
    },
    prepare({ title, subtitle, media, projectNumber, archived }) {
      const num = projectNumber ? String(projectNumber).padStart(2, "0") : "??";
      return {
        title: `${num} — ${title ?? "Untitled project"}${archived ? " (archived)" : ""}`,
        subtitle,
        media,
      };
    },
  },

  // ─── Field groups (Studio sidebar tabs) ───────────────────────────
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "links", title: "Links" },
    { name: "seo", title: "SEO & Meta" },
  ],

  fields: [
    // ── BASICS ──────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basics",
      description:
        'Project name as displayed on the site (e.g. "Lumen — Finance Dashboard")',
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basics",
      description: "URL-safe identifier — auto-generated from the title.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "projectType",
      title: "Project type",
      type: "string",
      group: "basics",
      description: "Primary type — drives icon and default link options.",
      options: {
        list: [
          { title: "🎨  Design work", value: "design" },
          { title: "🌐  Web development", value: "web" },
          { title: "📱  Mobile app", value: "mobile" },
          { title: "⚙️  Full stack", value: "fullstack" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "projectNumber",
      title: "Project number",
      type: "number",
      group: "basics",
      description: "Display order on the work page (01, 02, 03 …).",
      validation: (Rule) => Rule.required().integer().positive(),
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "basics",
      description: "Year the project was completed or shipped.",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(2000)
          .max(new Date().getFullYear() + 1),
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "basics",
      description: "Controls sort order when project numbers are equal.",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "basics",
      description:
        "One-liner shown on cards and in search results (~150 chars).",
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: "category",
      title: "Categories",
      type: "array",
      group: "basics",
      description:
        "Select 1–5 categories. These power the filter on the work page.",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Web Development", value: "web-development" },
          { title: "UI Design", value: "ui-design" },
          { title: "UX Research", value: "ux-research" },
          { title: "Mobile", value: "mobile" },
          { title: "Product Design", value: "product-design" },
          { title: "Branding", value: "branding" },
          { title: "Illustration", value: "illustration" },
          { title: "Motion", value: "motion" },
          { title: "Frontend", value: "frontend" },
          { title: "Full Stack", value: "full-stack" },
          { title: "Backend", value: "backend" },
        ],
        layout: "grid",
      },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    defineField({
      name: "techStack",
      title: "Tech stack / tools",
      type: "array",
      group: "basics",
      description:
        "Technologies, tools, or software used (e.g. React, Figma, TypeScript).",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      group: "basics",
      description:
        "Toggle on to show this project in the homepage featured grid.",
      initialValue: false,
    }),

    defineField({
      name: "archived",
      title: "Archived",
      type: "boolean",
      group: "basics",
      description: "Archived projects are hidden from all public listings.",
      initialValue: false,
    }),

    // ── CONTENT ─────────────────────────────────────────────────────
    defineField({
      name: "overview",
      title: "Overview",
      type: "blockContent",
      group: "content",
      description: "High-level context shown at the top of the project page.",
    }),

    defineField({
      name: "brief",
      title: "The Brief",
      type: "blockContent",
      group: "content",
      description: "What was the problem or brief you were given?",
    }),

    defineField({
      name: "approach",
      title: "The Approach",
      type: "blockContent",
      group: "content",
      description: "How did you tackle it? Process, decisions, methodology.",
    }),

    defineField({
      name: "result",
      title: "The Result",
      type: "blockContent",
      group: "content",
      description: "Outcomes, metrics, and impact.",
    }),

    defineField({
      name: "role",
      title: "My role",
      type: "string",
      group: "content",
      description:
        'e.g. "Lead product designer", "Frontend developer", "Solo founder"',
    }),

    defineField({
      name: "client",
      title: "Client / Company",
      type: "string",
      group: "content",
      description:
        "Who was this made for? Leave blank for personal/open-source projects.",
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "content",
      description: 'e.g. "3 months", "6 weeks", "Ongoing"',
    }),

    defineField({
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      group: "content",
      description:
        "Link up to 3 related projects shown at the bottom of the page.",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
          options: {
            filter: "archived != true",
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    // ── MEDIA ───────────────────────────────────────────────────────
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      group: "media",
      description:
        "Used on project cards and social previews. 16:9 ratio recommended.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) =>
            Rule.required().warning("Alt text is required for accessibility."),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "media",
      description:
        "Full-width hero image on the project detail page. Falls back to thumbnail if empty.",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "processImages",
      title: "Process images",
      type: "array",
      group: "media",
      description:
        "Sketches, wireframes, iterations — shown in the process section.",
      of: [
        {
          type: "object",
          name: "processImage",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) =>
                Rule.required().warning(
                  "Alt text is required for accessibility.",
                ),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption shown beneath the image.",
            },
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return { title: title ?? "Process image", media };
            },
          },
        },
      ],
    }),

    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      description: "Final deliverables, screenshots, or polished shots.",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) =>
                Rule.required().warning(
                  "Alt text is required for accessibility.",
                ),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "span",
              title: "Grid span",
              type: "string",
              description:
                "How many columns this image should span in the gallery grid.",
              options: {
                list: [
                  { title: "Normal (1 col)", value: "1" },
                  { title: "Wide (2 col)", value: "2" },
                  { title: "Full width (3 col)", value: "3" },
                ],
                layout: "radio",
              },
              initialValue: "1",
            },
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return { title: title ?? "Gallery image", media };
            },
          },
        },
      ],
    }),

    // ── LINKS ───────────────────────────────────────────────────────
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      group: "links",
      description:
        "Add any number of external links (live site, GitHub, App Store, Figma, etc.)",
      of: [
        {
          type: "object",
          name: "projectLink",
          fields: [
            {
              name: "type",
              title: "Link type",
              type: "string",
              options: {
                list: [
                  { title: "🌐  Live website", value: "website" },
                  { title: "⚙️  GitHub repository", value: "github" },
                  { title: "🍎  App Store (iOS)", value: "appstore" },
                  { title: "🤖  Play Store (Android)", value: "playstore" },
                  { title: "📋  Case study", value: "casestudy" },
                  { title: "🎨  Figma file", value: "figma" },
                  { title: "▶️  Demo", value: "demo" },
                  { title: "📖  Documentation", value: "docs" },
                  { title: "🔗  Other", value: "other" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label",
              title: "Button label",
              type: "string",
              description:
                'e.g. "View live site", "Open in Figma", "Download on App Store"',
              validation: (Rule) => Rule.required().max(50),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["https", "http"] }),
            },
            {
              name: "primary",
              title: "Primary CTA",
              type: "boolean",
              description:
                "Mark as the main call-to-action button (styled differently).",
              initialValue: false,
            },
          ],
          preview: {
            select: { title: "label", subtitle: "url", type: "type" },
            prepare({ title, subtitle, type }) {
              const icons = {
                website: "🌐",
                github: "⚙️",
                appstore: "🍎",
                playstore: "🤖",
                casestudy: "📋",
                figma: "🎨",
                demo: "▶️",
                docs: "📖",
                other: "🔗",
              };
              return {
                title: `${icons[type] ?? "🔗"} ${title ?? "Untitled link"}`,
                subtitle,
              };
            },
          },
        },
      ],
    }),

    // ── SEO & META ──────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Shown in browser tab and Google results. ~60 chars max.",
      validation: (Rule) => Rule.max(70),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Shown in Google snippets and social card previews. ~155 chars max.",
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      group: "seo",
      description:
        "Social share image (1200×630 px recommended). Falls back to thumbnail if empty.",
      options: { hotspot: true },
    }),
  ],

  // ─── Sanity Studio ordering ────────────────────────────────────────
  orderings: [
    {
      title: "Project number (asc)",
      name: "projectNumberAsc",
      by: [{ field: "projectNumber", direction: "asc" }],
    },
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [
        { field: "year", direction: "desc" },
        { field: "projectNumber", direction: "asc" },
      ],
    },
    {
      title: "Title (A–Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
