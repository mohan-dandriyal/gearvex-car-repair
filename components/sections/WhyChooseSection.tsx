
"use client";

import Image from "next/image";
import {
  HardHat,
  Wrench,
  Tag,
  Trophy,
  SquareCheck,
  type LucideIcon,
} from "lucide-react";

import { landingData } from "@/types/templates.types";
import {
  SectionDescription,
  SectionEyebrow,
  SectionTitle,
} from "../ui/layout";
import MainContainer from "@/components/common/MainContainer";

// ========================================
// ICON MAPPING
// ========================================

const reasonIcons: Record<string, LucideIcon> = {
  "hard-hat": HardHat,
  wrench: Wrench,
  tag: Tag,
  trophy: Trophy,
};

// ========================================
// WHY CHOOSE US SECTION
// ========================================

export default function WhyChooseSection() {
  const {
    eyebrow,
    title,
    titleHighlight,
    paragraphs,
    reasons,
    image,
    additionalServices,
  } = landingData.WhyChoose;

  return (
    <section
      id="why-choose-us"
      className="scroll-mt-20 bg-white pb-16 lg:pb-20"
    >
      <MainContainer className="">

        {/* ========================================
            MAIN THREE COLUMN LAYOUT
        ======================================== */}

        <div
          className="
            grid grid-cols-1
            items-stretch gap-8
            md:grid-cols-2
            lg:grid-cols-[1.45fr_0.9fr_1fr]
            lg:gap-8
            xl:gap-12
          "
        >
          {/* ========================================
              LEFT COLUMN - WHY CHOOSE US
          ======================================== */}

          <div className="min-w-0">

            {/* Eyebrow */}
            <SectionEyebrow className="" align={"right"}>
              {eyebrow}
            </SectionEyebrow>

            {/* Main Heading */}
            <SectionTitle
              className="">
              {title}{" "}
              <em>{titleHighlight}</em>
            </SectionTitle>

            {/* Description */}
            {
              paragraphs &&
              <SectionDescription className="" >
                {paragraphs}
              </SectionDescription>

            }
            {/* ========================================
                REASONS LIST
            ======================================== */}

            <div className="mt-6">
              {reasons.map(
                ({ id, title, description, icon }) => {
                  const Icon =
                    reasonIcons[icon] ?? Wrench;

                  return (
                    <div
                      key={id}
                      className="
                        group flex items-center
                        gap-5 border-b
                        border-[#e0e0e0]
                        py-5
                        first:pt-2
                        last:border-b-0
                        xl:gap-6
                      "
                    >
                      {/* Reason Icon */}
                      <div
                        className="
                          flex w-[75px]
                          shrink-0 items-center
                          justify-center
                          sm:w-[85px]
                        "
                      >
                        <Icon
                          className="
                            h-10 w-10
                            stroke-[1.5]
                            text-[#b84913]
                            transition-transform
                            duration-300
                            group-hover:scale-110
                            sm:h-14
                            sm:w-14
                          "
                        />
                      </div>

                      {/* Vertical Divider */}
                      <div
                        className="
                          h-[55px] w-[2px]
                          shrink-0 bg-[#b84913]
                        "
                      />

                      {/* Reason Content */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className="
                            mb-1 text-[19px]
                            leading-7
                            font-semibold
                            text-[#111111]
                            sm:text-sm
                            lg:text-lg
                          "
                        >
                          {title}
                        </h3>

                        <p
                          className="
                            text-[14px]
                            leading-6
                            text-[#4b4b4b]
                            sm:text-[15px]
                            font-se
                            xl:text-[16px]
                          "
                        >
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* ========================================
              CENTER COLUMN - MECHANIC IMAGE
          ======================================== */}

          <div
            className="
              relative min-h-[450px]
              overflow-hidden
              sm:min-h-[550px]
              md:min-h-[650px]
              lg:min-h-full
            "
          >
            <Image
              src={image.src}
              alt={image.alt || "Professional auto mechanic"}
              fill
              sizes="
                (max-width: 767px) 100vw,
                (max-width: 1023px) 50vw,
                28vw
              "
              quality={90}
              className="
                object-cover
                object-center
                transition-transform
                duration-700
                hover:scale-105
              "
            />
          </div>

          {/* ========================================
              RIGHT COLUMN - ADDITIONAL SERVICES
          ======================================== */}

          <div
            className="
              min-w-0
              md:col-span-2
              lg:col-span-1
            "
          >
            {/* Heading */}
            <div className="mb-7 flex items-center gap-5">
              <h2
                className="
                  whitespace-nowrap
                  text-[19px]
                  font-bold uppercase
                  tracking-[0.3px]
                  text-[#171717]
                  sm:text-base
                  lg:text-lg
                "
              >
                {additionalServices.title}
              </h2>

              <span
                className="
                  h-[4px] w-[60px]
                  shrink-0 bg-[#b84913]
                "
              />
            </div>

            {/* Additional Services List */}
            <ul className="space-y-0">
              {additionalServices.items.map(
                (item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="
                      group flex items-center
                      gap-4 border-b
                      border-[#dedede]
                      py-[11px]
                      last:border-b-0
                      lg:gap-3
                      xl:gap-4
                    "
                  >
                    {/* Check Icon */}
                    <SquareCheck
                      size={23}
                      fill="#b84913"
                      stroke="#ffffff"
                      strokeWidth={2.5}
                      className="
                        shrink-0
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    />

                    {/* Service Name */}
                    <span
                      className="
                        leading-[1.4]
                        font-semibold
                        text-[#161616]
                        text-[14px]
                        lg:text-base
                      "
                    >
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
