"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import { landingData } from "@/types/templates.types";
import "swiper/css";
import "swiper/css/pagination";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";
import MainContainer from "../common/MainContainer";

const subscribe = () => () => { };
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function TestimonialsSection() {
  const { items, eyebrow, paragraph, title, titleHighlight, autoplayMs } = landingData.testimonials;
  const swiperRef = useRef<SwiperInstance | null>(null);
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;
    else swiper.autoplay.start();
  }, [focused, reduceMotion]);

  return (
    <section id="testimonials" className="py-20 scroll-mt-2.5">

      <MainContainer className="">

        <motion.div
          className="mb-6 text-center "
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
        >

          {/* Eyebrow */}
          <SectionEyebrow className="" align={"center"}>
            {eyebrow}
          </SectionEyebrow>

          <SectionTitle className="">
            {title} {" "} <em>{titleHighlight}</em>
          </SectionTitle>

          {/* Description */}
          {
            paragraph &&
            <SectionDescription className="" >
              {paragraph}
            </SectionDescription>

          }
        </motion.div>

        <div
          className="relative mx-[15px] sm:mx-[27px]"
          role="region"
          aria-label="Customer testimonials"
          aria-roledescription="carousel"
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setFocused(false);
          }}
        >
          <button
            className="absolute top-[calc(50%-35px)] z-2 grid size-[29px] place-items-center rounded-full bg-[#1b1c24] text-white sm:size-[37px] -left-[31px] sm:-left-[49px]"
            aria-label="Previous testimonials"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute top-[calc(50%-35px)] z-2 grid size-[29px] place-items-center rounded-full bg-[#1b1c24] text-white sm:size-[37px] -right-[31px] sm:-right-[49px]"
            aria-label="Next testimonials"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight />
          </button>
          {mounted ? (
            <Swiper
              className="testimonials-swiper px-0.5! pt-2! pb-[46px]! [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:flex [&_.swiper-slide]:h-auto"
              modules={[A11y, Autoplay, Pagination]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                if (reduceMotion || focused) swiper.autoplay.stop();
              }}
              slidesPerView={1}
              spaceBetween={22}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              speed={reduceMotion ? 0 : 650}
              rewind
              autoplay={
                reduceMotion
                  ? false
                  : {
                    delay: autoplayMs,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
              }
              pagination={{ clickable: true, bulletElement: "button" }}
              a11y={{
                enabled: true,
                containerMessage: "Customer reviews",
                paginationBulletMessage: "Show testimonial {{index}}",
              }}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  swiperRef.current?.slidePrev();
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  swiperRef.current?.slideNext();
                }
              }}
            >
              {items.map((item) => (
                <SwiperSlide key={item.name}>
                  <motion.article
                    className="flex h-full min-h-[285px] w-full flex-col rounded-lg border border-[#cdced2] border-t-4 border-t-accent bg-white p-6 sm:min-h-[310px] sm:p-[17px] min-[951px]:min-h-[284px] min-[951px]:px-[25px] min-[951px]:py-[22px] [&>p]:min-h-[100px] [&>p]:flex-1 [&>p]:text-[15px] [&>p]:leading-normal [&>p]:text-foreground sm:[&>p]:min-h-[120px] sm:[&>p]:text-sm min-[951px]:[&>p]:min-h-[112px] min-[951px]:[&>p]:text-[15px]"
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Quote
                      className="mb-[9px] size-[30px] rotate-180 text-accent"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                    <p>{item.quote}</p>
                    <div
                      className="my-[18px] flex gap-[3px] text-[#b74613]"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {Array.from({ length: item.rating }, (_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div className="mt-auto flex items-center gap-[18px] border-t border-[#dedee1] pt-[15px] sm:gap-2.5 min-[951px]:gap-5 [&>img]:size-[58px] [&>img]:rounded-full [&>img]:object-cover sm:[&>img]:size-[42px] min-[951px]:[&>img]:size-[61px] [&>div]:border-l-2 [&>div]:border-accent [&>div]:pl-[18px] sm:[&>div]:pl-[13px] min-[951px]:[&>div]:pl-[18px] [&_h3]:mb-[5px] [&_h3]:text-lg [&_h3]:tracking-[-0.4px] sm:[&_h3]:text-sm min-[951px]:[&_h3]:text-lg [&_span]:text-sm [&_span]:text-[#4a4a4f] sm:[&_span]:text-xs min-[951px]:[&_span]:text-sm">
                      <img src={item.avatar} alt="" loading="lazy" />
                      <div>
                        <h3>{item.name}</h3>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </motion.article>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3 max-sm:[&>article:not(:first-child)]:hidden sm:max-lg:[&>article:nth-child(3)]:hidden pt-2 pb-[46px]">
              {items.slice(0, 3).map((item) => (
                <article
                  className="flex h-full min-h-[280px] w-full flex-col rounded-lg border border-[#cdced2] border-t-4 border-t-accent bg-white p-6 sm:min-h-[310px] sm:p-[17px] min-[951px]:min-h-[280px] min-[951px]:px-[25px] min-[951px]:py-[22px] [&>p]:min-h-[100px] [&>p]:flex-1 [&>p]:text-[15px] [&>p]:leading-normal [&>p]:text-foreground sm:[&>p]:min-h-[120px] sm:[&>p]:text-sm min-[951px]:[&>p]:min-h-[112px] min-[951px]:[&>p]:text-[16px]"
                  key={item.name}
                >
                  <Quote
                    className="mb-[9px] size-[30px] rotate-180 text-accent"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  <p>{item.quote}</p>
                  <div
                    className="my-[18px] flex gap-[3px] text-[#b74613]"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }, (_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-[18px] border-t border-[#dedee1] pt-[15px] sm:gap-2.5 min-[951px]:gap-5 [&>img]:size-[58px] [&>img]:rounded-full [&>img]:object-cover sm:[&>img]:size-[42px] min-[951px]:[&>img]:size-[61px] [&>div]:border-l-2 [&>div]:border-accent [&>div]:pl-[18px] sm:[&>div]:pl-[13px] min-[951px]:[&>div]:pl-[18px] [&_h3]:mb-[5px] [&_h3]:text-lg [&_h3]:tracking-[-0.4px] sm:[&_h3]:text-sm min-[951px]:[&_h3]:text-lg [&_span]:text-sm [&_span]:text-[#4a4a4f] sm:[&_span]:text-xs min-[951px]:[&_span]:text-sm">
                    <img src={item.avatar} alt="" loading="lazy" />
                    <div>
                      <h3>{item.name}</h3>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

      </MainContainer>
    </section>
  );
}
