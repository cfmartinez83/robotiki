import {defineField, defineType} from "sanity";

export const price = defineType({
  name: "price",
  title: "Valor",
  type: "document",
  fields: [
    defineField({name: "title", title: "Título", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "amount", title: "Valor", type: "string"}),
    defineField({name: "description", title: "Descripción", type: "text", rows: 3}),
    defineField({
      name: "appliesTo",
      title: "Aplica a",
      type: "string",
      options: {
        list: ["Taller semanal", "Clase de prueba", "Taller ocasional", "Cumple Robotiki", "Evento"],
      },
    }),
    defineField({name: "isPublished", title: "Publicado", type: "boolean", initialValue: true}),
  ],
});
