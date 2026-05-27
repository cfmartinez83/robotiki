import {defineField, defineType} from "sanity";

export const schedule = defineType({
  name: "schedule",
  title: "Horario disponible",
  type: "document",
  fields: [
    defineField({
      name: "level",
      title: "Nivel",
      type: "string",
      options: {
        list: ["Exploradores", "Constructores", "Inventores", "Genios"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: "venue", title: "Sede", type: "reference", to: [{type: "venue"}]}),
    defineField({name: "day", title: "Día", type: "string"}),
    defineField({name: "time", title: "Horario", type: "string"}),
    defineField({name: "notes", title: "Notas", type: "text", rows: 2}),
    defineField({name: "isPublished", title: "Publicado", type: "boolean", initialValue: true}),
  ],
  preview: {
    select: {
      title: "level",
      venue: "venue.name",
      day: "day",
      time: "time",
    },
    prepare({title, venue, day, time}) {
      return {
        title,
        subtitle: [venue, day, time].filter(Boolean).join(" · "),
      };
    },
  },
});
