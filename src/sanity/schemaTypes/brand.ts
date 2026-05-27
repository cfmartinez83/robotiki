import {defineField, defineType} from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Marca que confía",
  type: "document",
  fields: [
    defineField({name: "name", title: "Nombre", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "logo", title: "Logo", type: "image"}),
    defineField({name: "website", title: "Sitio web", type: "url"}),
    defineField({name: "order", title: "Orden", type: "number", initialValue: 0}),
    defineField({name: "isPublished", title: "Publicado", type: "boolean", initialValue: true}),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
