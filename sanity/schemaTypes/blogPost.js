import { defineField, defineType } from "sanity";

/**
 * Blog post schema
 */
export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",

  // ─── Studio preview ───────────────────────────────────────────────
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, subtitle, media, publishedAt }) {
      return {
        title: title ?? "Untitled post",
        subtitle: [
          subtitle,
          publishedAt ? new Date(publishedAt).toLocaleDateString() : null,
        ]
          .filter(Boolean)
          .join(" — "),
        media,
      };
    },
  },

  // ─── Field groups (Studio sidebar tabs) ───────────────────────────
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO & Meta" },
  ],

  fields: [
    // ── BASICS ──────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basics",
      validation: (Rule) => Rule.required().max(120),
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      group: "basics",
      description: "Longer summary shown in the post header.",
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 2,
      group: "basics",
      description:
        "Short summary shown in blog post lists. If blank, description will be used.",
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "basics",
      description: "Single high-level topic, shown as post metadata.",
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      group: "basics",
      options: { layout: "tags" },
      description:
        "Used for filtering on the journal page and finding related posts.",
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "basics",
    }),

    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number",
      group: "basics",
      validation: (Rule) => Rule.min(1).max(120),
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "basics",
      description: "Show on the homepage journal preview.",
      initialValue: false,
    }),

    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "basics",
      description: "Leave empty to keep this post as an unpublished draft.",
    }),

    // ── MEDIA ────────────────────────────────────────────────────────
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ── CONTENT ──────────────────────────────────────────────────────
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      group: "content",
    }),

    // ── SEO ──────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
  ],
});
