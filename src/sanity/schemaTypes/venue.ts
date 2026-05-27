import {defineField, defineType} from "sanity";

export const venue = defineType({
  name: "venue",
  title: "Sede",
  type: "document",
  fields: [
    defineField({name: "name", title: "Nombre", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "zone", title: "Zona", type: "string"}),
    defineField({name: "address", title: "Dirección", type: "string"}),
    defineField({name: "mapUrl", title: "Link de Google Maps", type: "url"}),
    defineField({name: "whatsapp", title: "WhatsApp", type: "string"}),
    defineField({name: "isPublished", title: "Publicado", type: "boolean", initialValue: true}),
  ],
});
