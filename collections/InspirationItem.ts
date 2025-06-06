import type { CollectionConfig } from "payload";

export const InspirationItem: CollectionConfig = {
  slug: "inspiration",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "tags"],
    description: "Inspiration items to showcase various creative works.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description_preview",
      type: "richText",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      type: "select",
      name: "type",
      options: [
        { label: "Web", value: "web" },
        { label: "Design", value: "design" },
        { label: "Music", value: "music" },
        { label: "Art", value: "art" },
        { label: "Movies", value: "movies" },
        { label: "Games", value: "games" },
        { label: "Other", value: "other" },
      ],
      required: true,
      defaultValue: "other",
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
};
