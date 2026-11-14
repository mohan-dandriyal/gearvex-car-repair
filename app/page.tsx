
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";

import WhyChooseSection from "@/components/sections/WhyChooseSection";
import Gallery from "@/components/sections/Gallery";
import TestimonialsSection from "@/components/sections/Testimonialssection";
import ContactSection from "@/components/sections/Contactsection";
import FaqSection from "@/components/sections/FaqSection";
import Reveal from "@/components/ui/Reveal";
import { Suspense } from "react";

function HomePageSection() {
  return (
    <main>
      <div id="home">
        <HeroSection />
      </div>
      <Reveal><AboutSection /></Reveal>
      <ServicesSection />
      <Reveal><WhyChooseSection /></Reveal>
      <Reveal><Gallery /></Reveal>

      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><ContactSection /></Reveal>
      <Reveal ><FaqSection /> </Reveal>
    </main>
  );
}


export default function HomePage() {
  return (
    <Suspense>
      <HomePageSection />
    </Suspense>
  );
}
