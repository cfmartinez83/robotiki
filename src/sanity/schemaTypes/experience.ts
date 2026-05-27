import {defineField, defineType} from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experiencia",
  type: "document",
  fields: [
    defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}}),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          {title: "Competencia", value: "competition"},
          {title: "Evento", value: "event"},
          {title: "Escuela", value: "school"},
          {title: "Empresa", value: "company"},
          {title: "Cumple Robotiki", value: "birthday"},
          {title: "Fecha especial", value: "seasonal"},
        ],
      },
    }),
    defineField({name: "summary", title: "Resumen", type: "text", rows: 3}),
    defineField({name: "body", title: "Contenido", type: "array", of: [{type: "block"}]}),
    defineField({name: "image", title: "Imagen principal", type: "image", options: {hotspot: true}}),
    defineField({name: "gallery", title: "Galería", type: "array", of: [{type: "image", options: {hotspot: true}}]}),
    defineField({name: "eventDate", title: "Fecha", type: "date"}),
    defineField({name: "isFeatured", title: "Destacar", type: "boolean", initialValue: false}),
    defineField({name: "isPublished", title: "Publicado", type: "boolean", initialValue: true}),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
