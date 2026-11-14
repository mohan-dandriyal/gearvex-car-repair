
"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

import MainContainer from "@/components/common/MainContainer";
import {
  SectionDescription,
  SectionEyebrow,
  SectionTitle,
} from "../ui/layout";

import { landingData } from "@/types/templates.types";

const {
  eyebrow,
  title,
  titleHighlight,
  paragraph,
  questions,
  sectionBgIMage,
} = landingData.faqs;

export default function FaqSection() {
  // First FAQ open by default
  const [activeIndex, setActiveIndex] = useState<number | null>(
    questions.length > 0 ? 0 : null
  );

  const reduceMotion = useReducedMotion();

  const toggleFaq = (index: number) => {
    setActiveIndex((prev) =>
      prev === index ? null : index
    );
  };

  return (
    <section
      id="faq"
      className="
        relative mt-8 mb-16 overflow-hidden py-8
        lg:mt-10 lg:mb-20 lg:py-10
      "
      style={{
        backgroundImage: `url(${sectionBgIMage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
    >
      <MainContainer className="">
        <div
          className="
            grid grid-cols-1 gap-[30px]
            sm:grid-cols-[0.8fr_1.2fr]
            min-[951px]:grid-cols-[0.8fr_1.4fr]
            min-[951px]:gap-[45px]
          "
        >
          {/* LEFT SIDE - SECTION CONTENT */}
          <div>
            <SectionEyebrow className="" align="left">
              {eyebrow}
            </SectionEyebrow>

            <SectionTitle className="">
              {title}
              <br />
              <em>{titleHighlight}</em>
            </SectionTitle>

            {paragraph && (
              <SectionDescription className="max-w-[340px] text-[15px] sm:text-[17px]">
                {paragraph}
              </SectionDescription>
            )}
          </div>

          {/* RIGHT SIDE - FAQ ACCORDION */}
          <div className="space-y-3.5">
            {questions.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <div
                  key={item.q}
                  className="
                    overflow-hidden rounded-lg
                    border border-[#d4d4db]
                    bg-white
                    shadow-[0_2px_4px_#00000009]
                  "
                >
                  {/* FAQ QUESTION BUTTON */}
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => toggleFaq(index)}
                    className={`
                      flex w-full cursor-pointer
                      items-center justify-between gap-5
                      p-4 text-left text-[15px]
                      font-bold tracking-[-0.3px]
                      transition-colors duration-300
                      sm:text-base
                      min-[951px]:px-[23px]
                      min-[951px]:py-[18px]
                      min-[951px]:text-lg
                      ${
                        isOpen
                          ? "bg-linear-to-br from-[#bd4b12] to-[#aa3e0c] text-white"
                          : "bg-white text-black"
                      }
                    `}
                  >
                    <span>{item.q}</span>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: "easeInOut",
                      }}
                      className="shrink-0"
                    >
                      <ChevronDown size={22} />
                    </motion.span>
                  </button>

                  {/* ANIMATED FAQ ANSWER */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: reduceMotion ? 0 : 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          opacity: {
                            duration: reduceMotion ? 0 : 0.25,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#f7f7f7] p-4 sm:px-[23px] sm:py-[19px]">
                          <p className="text-sm leading-relaxed text-[#34343c] sm:text-[15px]">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
