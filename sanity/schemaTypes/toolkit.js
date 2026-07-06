import { defineField, defineType } from "sanity";

// Keep in sync with CATEGORY_META in features/home/Toolkit.jsx, which maps
// each of these names to an icon + accent color in code (not stored here —
// you can't store a React icon component in a CMS field).
const CATEGORY_OPTIONS = ["Languages", "Frameworks", "Tools", "Design"];

export const toolkit = defineType({
  name: "toolkit",
  title: "Toolkit Section",
  type: "document",
  __experimental_actions: ["update", "publish"],

  fields: [
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineField({
          name: "category",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Category",
              type: "string",
              options: { list: CATEGORY_OPTIONS },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "skills",
              title: "Skills",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "skills" },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: Array.isArray(subtitle)
                  ? subtitle.join(", ")
                  : undefined,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(CATEGORY_OPTIONS.length),
    }),
  ],

  preview: {
    prepare() {
      return { title: "Toolkit Section" };
    },
  },
});
