import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({name: "title", title: "Título", type: "string", initialValue: "Robotiki"}),
    defineField({name: "whatsapp", title: "WhatsApp", type: "string"}),
    defineField({name: "email", title: "Email principal", type: "email"}),
    defineField({name: "secondaryEmail", title: "Email secundario", type: "email"}),
    defineField({name: "instagram", title: "Instagram", type: "url"}),
    defineField({name: "facebook", title: "Facebook", type: "url"}),
    defineField({name: "businessHours", title: "Horario de atención", type: "string"}),
  ],
});
