
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { landingData } from "@/types/templates.types";
import Reveal from "../ui/Reveal";
import MainContainer from "../common/MainContainer";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="lg:pb-20 lg:pt-16 py-16"
    >
      <MainContainer className="">
        <div className="">
          {/* Section Header */}
          <Reveal
            className="
            mb-8 text-center
          "
          >
            {/* Eyebrow */}
            <SectionEyebrow className="" align={"center"}>
              {landingData.Services.eyebrow}
            </SectionEyebrow>

            <SectionTitle className="">
              {landingData.Services.title}{" "}
              <em>{landingData.Services.titleHighlight}</em>
            </SectionTitle>

              {/* Description */}
            {
              landingData.Services.paragraphs &&
              <SectionDescription className="" >
                {landingData.Services.paragraphs}
              </SectionDescription>

            }
          </Reveal>

          {/* Services Grid */}
          <div
            className="
            grid grid-cols-1 gap-[25px]
            sm:grid-cols-3 sm:gap-5
            min-[1191px]:gap-7
          "
          >
            {landingData.Services.items
              .slice(0, 6)
              .map((item, i) => (
                <motion.article
                  key={item.title}
                  className="
                  group overflow-hidden rounded-[9px]
                  border border-[#e5e5e5]
                  bg-[#fafafa]
                  shadow-[0_4px_6px_#00000021]
                "
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 30 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion
                      ? 0
                      : (i % 3) * 0.09,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                        y: -6,
                        transition: {
                          duration: 0.2,
                        },
                      }
                  }
                >
                  {/* Service Image */}
                  <div
                    className="
                    relative h-[250px] overflow-hidden
                    sm:h-[195px]
                    min-[951px]:h-[204px]
                  "
                  >
                    <Image
                      src={item.image}
                      alt={item.alt || item.title}
                      fill
                      sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1190px) 33vw,
                      380px
                    "
                      quality={85}
                      loading="lazy"
                      className="
                      object-cover
                      transition-transform duration-500
                      group-hover:scale-[1.045]
                    "
                    />

                    {/* Decorative Shape */}
                    <span
                      aria-hidden="true"
                      className="
                      absolute top-0 -right-3.5
                      h-[95px] w-12
                      -skew-x-[38deg]
                      bg-linear-to-b
                      from-[#d6814bce]
                      to-[#a6421670]
                    "
                    />
                  </div>

                  {/* Service Content */}
                  <div
                    className="
                    relative px-5 pt-6 pb-[23px]
                    sm:px-[15px] sm:pt-[22px]
                    sm:pb-[18px]
                    
                  "
                  >
                    {/* Service Number */}
                    <span
                      className="
                      absolute -top-4 left-5
                      -skew-x-[20deg]
                      border-4 border-[#fafafa]
                      bg-[#151618]
                      px-2.5 py-[3px]
                      text-xs font-bold text-white
                    "
                    >
                      SERVICE 0{i + 1}
                    </span>

                    {/* Book Service Button */}
                    <a
                      href={`?service=${encodeURIComponent(
                        item.title
                      )}#contact`}
                      aria-label={`Book ${item.title}`}
                      className="
                      float-right ml-1.5 rounded
                      bg-accent p-1.5 text-white
                      transition-colors duration-300
                      hover:bg-[#151618]
                    "
                    >
                      <ArrowRight size={20} />
                    </a>

                    {/* Service Title */}
                    <h3 className="font-semibold text-base lg:text-xl mb-2">{item.title}</h3>

                    {/* Service Description */}
                    <p className="text-sm lg:text-[15px]">{item.description}</p>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
