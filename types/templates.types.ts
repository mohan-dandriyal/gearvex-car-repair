import templates from "@/data/templates.json";

export const templateData = templates.categories.GearvexAutomotiveService;
const sections = templateData.sections;

export const headerData = {
  header: sections.Header.variants.GearvexAutomotiveServiceHeader2,
};
export const footerData = { footer: templates.common.Footer };
export const landingData = {
  meta: templateData.meta,
  hero: sections.Hero.variants.GearvexAutomotiveServiceHero2,
  about: sections.AboutUs.variants.GearvexAutomotiveServiceAboutUs2,
  Services: sections.Services.variants.GearvexAutomotiveServiceServices2,
  gallery: sections.Gallery.variants.GearvexAutomotiveServiceGallery2,
  WhyChoose: sections.WhyChoose.variants.GearvexAutomotiveServiceWhyChoose2,
  testimonials: sections.Testimonials.variants.GearvexAutomotiveServiceTestimonials2,
  contact: sections.Contact.variants.GearvexAutomotiveServiceContact2,
  faqs: sections.FAQs.variants.GearvexAutomotiveServiceFAQs2,
};

export type HeaderData = typeof headerData.header;
export type FooterData = typeof footerData.footer;
export type HeroData = typeof landingData.hero;
export type AboutData = typeof landingData.about;
export type ServicesData = typeof landingData.Services;
export type WhyChooseData = typeof landingData.WhyChoose;

export type GalleryData = typeof landingData.gallery;
export type TestimonialsData = typeof landingData.testimonials;
export type ContactData = typeof landingData.contact;
export type FAQsData = typeof landingData.faqs;

