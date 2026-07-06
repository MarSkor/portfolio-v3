import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  __experimental_actions: ["update", "publish"],

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "stats", title: "Stats" },
    { name: "currently", title: "Currently" },
  ],

  fields: [
    defineField({
      name: "headingMain",
      title: "Heading (main)",
      type: "string",
      group: "content",
      description: 'e.g. "Engineering meets aesthetics —"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "headingAccent",
      title: "Heading (accent)",
      type: "string",
      group: "content",
      description: 'Styled differently — e.g. "that\'s where I live."',
    }),

    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
      group: "content",
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      description: 'Small stat grid, e.g. "6 / Years building".',
      of: [
        defineField({
          name: "stat",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),

    defineField({
      name: "currentlyItems",
      title: "Currently",
      type: "array",
      group: "currently",
      description:
        'e.g. "Listening: Lo-fi beats and the occasional podcast about type".',
      of: [
        defineField({
          name: "currentlyItem",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. Listening, Reading, Obsessing over",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "About Section" };
    },
  },
});
