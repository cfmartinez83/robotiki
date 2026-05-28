import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  initialValue: {
    title: "Robotiki",
    whatsapp: "+5491133917070",
    email: "info@robotiki.com.ar",
    secondaryEmail: "robotikiar@gmail.com",
    businessHours: "Lunes a viernes de 9:00 a 20:00 hs.",
    workshopsSection: {
      isEnabled: true,
      eyebrow: "Talleres Robotiki",
      title: "Nuestros talleres",
      intro: "Conocé las propuestas que pueden configurarse desde el administrador.",
    },
  },
  fields: [
    defineField({name: "title", title: "Título", type: "string"}),
    defineField({name: "whatsapp", title: "WhatsApp", type: "string"}),
    defineField({name: "email", title: "Email principal", type: "email"}),
    defineField({name: "secondaryEmail", title: "Email secundario", type: "email"}),
    defineField({name: "instagram", title: "Instagram", type: "url"}),
    defineField({name: "facebook", title: "Facebook", type: "url"}),
    defineField({name: "businessHours", title: "Horario de atención", type: "string"}),
    defineField({
      name: "workshopsSection",
      title: "Sección de talleres",
      type: "object",
      fields: [
        defineField({name: "isEnabled", title: "Mostrar sección", type: "boolean", initialValue: true}),
        defineField({name: "eyebrow", title: "Etiqueta superior", type: "string"}),
        defineField({name: "title", title: "Título de sección", type: "string"}),
        defineField({name: "intro", title: "Texto introductorio", type: "text", rows: 2}),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Configuración del sitio",
      };
    },
  },
});
