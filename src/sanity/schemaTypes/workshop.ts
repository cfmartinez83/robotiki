import {defineField, defineType} from "sanity";

export const workshop = defineType({
  name: "workshop",
  title: "Taller",
  type: "document",
  fields: [
    defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "text", title: "Texto", type: "text", rows: 3}),
    defineField({name: "image", title: "Foto", type: "image", options: {hotspot: true}}),
    defineField({name: "imageAlt", title: "Texto alternativo de la foto", type: "string"}),
    defineField({name: "order", title: "Orden", type: "number", initialValue: 0}),
    defineField({name: "isPublished", title: "Publicado", type: "boolean", initialValue: true}),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "text",
      media: "image",
    },
  },
});
