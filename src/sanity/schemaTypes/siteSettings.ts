import {defineField, defineType} from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  initialValue: {
    title: "Robotiki",
    tagline: "Robotiki - imagina tu futuro",
    whatsapp: "5491133917070",
    whatsappLabel: "+54 9 11 3391-7070",
    email: "info@robotiki.com.ar",
    secondaryEmail: "robotikiar@gmail.com",
    address: "Av. Libertador 747, Vicente López",
    businessHours: "Lunes a viernes de 9:00 a 20:00 hs.",
    primaryCtaLabel: "¡Quiero probar!",
    copyright: "© 2026 Robotiki. Hecho con imaginación, código y robots.",
    workshopsSection: {
      isEnabled: true,
      eyebrow: "Talleres Robotiki",
      title: "Talleres ocasionales",
      intro: "Acá tiene que ir una descripción.",
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Nombre del sitio",
      type: "string",
      fieldset: "identity",
    }),
    defineField({
      name: "tagline",
      title: "Frase del sitio",
      type: "string",
      fieldset: "identity",
    }),
    defineField({
      name: "copyright",
      title: "Texto de copyright",
      type: "string",
      fieldset: "identity",
    }),
    defineField({
      name: "whatsappLabel",
      title: "WhatsApp visible",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp para links",
      description: "Usar solo números, por ejemplo 5491133917070.",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "email",
      title: "Email principal",
      type: "email",
      fieldset: "contact",
    }),
    defineField({
      name: "secondaryEmail",
      title: "Email secundario",
      type: "email",
      fieldset: "contact",
    }),
    defineField({
      name: "address",
      title: "Dirección principal",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "businessHours",
      title: "Horario de atención",
      type: "string",
      fieldset: "contact",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      fieldset: "social",
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      fieldset: "social",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Texto del botón principal",
      type: "string",
      fieldset: "buttons",
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Título SEO por defecto",
      type: "string",
      fieldset: "seo",
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Descripción SEO por defecto",
      type: "text",
      rows: 2,
      fieldset: "seo",
    }),
    defineField({
      name: "workshopsSection",
      title: "Sección de talleres",
      type: "object",
      fieldset: "sections",
      fields: [
        defineField({name: "isEnabled", title: "Mostrar sección", type: "boolean", initialValue: true}),
        defineField({name: "eyebrow", title: "Etiqueta superior", type: "string"}),
        defineField({name: "title", title: "Título de sección", type: "string"}),
        defineField({name: "intro", title: "Texto introductorio", type: "text", rows: 2}),
      ],
    }),
  ],
  fieldsets: [
    {name: "identity", title: "Identidad"},
    {name: "contact", title: "Contacto"},
    {name: "social", title: "Redes"},
    {name: "buttons", title: "Botones"},
    {name: "seo", title: "SEO"},
    {name: "sections", title: "Secciones"},
  ],
  preview: {
    prepare() {
      return {
        title: "Configuración del sitio",
      };
    },
  },
});
