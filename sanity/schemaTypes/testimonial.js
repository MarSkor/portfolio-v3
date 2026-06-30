import { defineField, defineType } from "sanity";

/**
 * Testimonial schema
 * Optional social proof — can be referenced from project documents
 * or displayed standalone on the homepage / about page.
 */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",

  preview: {
    select: {
      title: "authorName",
      subtitle: "quote",
      media: "authorPhoto",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Unnamed",
        subtitle: subtitle ? `"${subtitle.slice(0, 80)}…"` : "",
        media,
      };
    },
  },

  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      description: "The testimonial text — leave out surrounding quotes.",
      validation: (Rule) => Rule.required().max(500),
    }),

    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "authorRole",
      title: "Author role / title",
      type: "string",
      description: 'e.g. "CEO at Acme Corp" or "Lead Engineer, FAANG"',
    }),

    defineField({
      name: "authorPhoto",
      title: "Author photo",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "project",
      title: "Related project",
      type: "reference",
      to: [{ type: "project" }],
      description: "Optionally link this testimonial to a specific project.",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on homepage or prominent sections.",
      initialValue: false,
    }),
  ],
});
