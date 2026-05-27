import {defineField, defineType} from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Imagen de galería",
  type: "document",
  fields: [
    defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "caption", title: "Bajada", type: "string"}),
    defineField({name: "image", title: "Imagen", type: "image", options: {hotspot: true}}),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: ["Talleres", "Competencias", "Eventos", "Cumple Robotiki", "Escuelas", "Empresas"],
      },
    }),
    defineField({name: "order", title: "Orden", type: "number", initialValue: 0}),
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
