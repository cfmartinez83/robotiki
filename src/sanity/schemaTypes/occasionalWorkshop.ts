import {defineField, defineType} from "sanity";

export const occasionalWorkshop = defineType({
  name: "occasionalWorkshop",
  title: "Taller ocasional",
  type: "document",
  fields: [
    defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}}),
    defineField({name: "summary", title: "Resumen", type: "text", rows: 3}),
    defineField({name: "date", title: "Fecha", type: "date"}),
    defineField({name: "ageRange", title: "Edad sugerida", type: "string"}),
    defineField({name: "venue", title: "Sede", type: "reference", to: [{type: "venue"}]}),
    defineField({name: "schedule", title: "Horario", type: "string"}),
    defineField({name: "price", title: "Valor", type: "string"}),
    defineField({name: "image", title: "Imagen", type: "image", options: {hotspot: true}}),
    defineField({name: "isFeatured", title: "Destacar", type: "boolean", initialValue: false}),
    defineField({name: "isPublished", title: "Publicado", type: "boolean", initialValue: true}),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "image",
    },
  },
});
