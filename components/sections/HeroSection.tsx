"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { landingData } from "@/types/templates.types";

const { slides, brand } = landingData.hero;

// Autorex uses a 1400ms slide, a 4000ms hold, and staggered 500ms reveals.
const slideDuration = 1.4;
const slideInterval = 5400;

export default function HeroSection() {
  const [{ index, direction }, setSlide] = useState({ index: 0, direction: 1 });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const transitioning = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const slide = slides[index];

  const navigate = useCallback((nextDirection: number) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setSlide((current) => ({
      index: (current.index + nextDirection + slides.length) % slides.length,
      direction: nextDirection,
    }));
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || reduceMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) navigate(1);
    }, slideInterval);
    return () => window.clearInterval(timer);
  }, [index, paused, hovered, focused, reduceMotion, navigate]);

  const reveal = (delay: number) => ({
    duration: reduceMotion ? 0 : 0.5,
    delay: reduceMotion ? 0 : delay,
    ease: "easeOut" as const,
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex lg:min-h-[88vh] min-h-[60vh] items-center overflow-hidden bg-[#191b1c] text-white"
      aria-roledescription="carousel"
      aria-label="Our workshop"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          navigate(1);
        }
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          className="absolute px-5 lg:px-0 inset-0 flex touch-pan-y items-center overflow-hidden"
          custom={direction}
          variants={{
            enter: (travel: number) => ({
              x: reduceMotion ? 0 : `${travel * 100}%`,
              opacity: 1,
            }),
            center: { x: "0%", opacity: 1 },
            exit: (travel: number) => ({
              x: reduceMotion ? 0 : `${travel * -100}%`,
              opacity: reduceMotion ? 0 : 1,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reduceMotion ? 0 : slideDuration,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onAnimationComplete={() => {
            transitioning.current = false;
          }}
          onPointerDown={(event) => {
            if (event.pointerType === "touch")
              event.currentTarget.dataset.touchStart = String(event.clientX);
          }}
          onPointerUp={(event) => {
            const start = event.currentTarget.dataset.touchStart;
            if (event.pointerType === "touch" && start !== undefined) {
              const distance = event.clientX - Number(start);
              if (Math.abs(distance) > 55) navigate(distance < 0 ? 1 : -1);
              delete event.currentTarget.dataset.touchStart;
            }
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-[position:62%_center] sm:bg-[position:center_48%]"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,#111315e8,#111315b3_55%,#11131550)] sm:bg-[linear-gradient(90deg,#111315f7_0%,#141517e8_30%,#1113156e_58%,#11131505_100%)]" />
          <div className="absolute top-0 -left-[45px] h-[180px] w-[100px] -skew-x-[34deg] bg-linear-to-b from-[#cb784c] to-[#a64416] opacity-90 after:absolute after:inset-y-0 after:right-[65px] after:-left-[30px] after:bg-[#53291970] after:content-['']" />

          <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1200px] sm:w-[calc(100%-4rem)] xl:w-[calc(100%-6rem)] relative z-2 min-h-[370px] px-[18px] pt-[55px] pb-20 sm:min-h-[390px] sm:px-[30px] sm:pt-[70px] sm:pb-[85px] min-[1191px]:px-[45px] [&_.eyebrow]:gap-2.5 [&_.eyebrow]:text-[10px] [&_.eyebrow]:tracking-[2px] [&_.eyebrow]:text-white [&_.eyebrow]:before:w-[25px] [&_.eyebrow]:before:bg-[#db8355] sm:[&_.eyebrow]:gap-[19px] sm:[&_.eyebrow]:text-sm sm:[&_.eyebrow]:tracking-[4px] sm:[&_.eyebrow]:before:w-12 [&_h1]:mt-[26px] [&_h1]:mb-[22px] [&_h1]:max-w-[700px] [&_h1]:text-[clamp(33px,8.6vw,44px)] [&_h1]:leading-[1.08] [&_h1]:font-bold [&_h1]:tracking-[-1.5px] sm:[&_h1]:text-[clamp(44px,5vw,68px)] sm:[&_h1]:leading-[1.04] sm:[&_h1]:tracking-[-2px] [&_h1_em]:text-[#c66a3c]">
            <div></div>

            <motion.p
              className="eyebrow flex items-center gap-3 text-xs leading-snug font-semibold tracking-[2px] text-foreground before:h-[3px] before:w-[30px] before:shrink-0 before:bg-accent before:content-[''] sm:gap-[19px] sm:text-base sm:tracking-[3px] sm:before:w-12"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(1.2)}
            >
              {slide.tagline}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reveal(0.8)}
            >
              {slide.first}
              <br />
              {slide.second} <em>{slide.accent}</em>
            </motion.h1>

            <motion.p
              className="max-w-[320px] text-[15px] text-[#eee] sm:max-w-[470px] sm:text-lg"
              initial={{ opacity: 0, x: reduceMotion ? 0 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reveal(1.6)}
            >
              {slide.description}
            </motion.p>

            <motion.div
              className="mt-[26px] [&>.button]:px-[19px] [&>.button]:py-3.5 [&>.button]:text-[11px] [&>.button]:tracking-[0.5px] sm:[&>.button]:px-[25px] sm:[&>.button]:py-[17px] sm:[&>.button]:text-[13px]"
              initial={{ scaleY: reduceMotion ? 1 : 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={reveal(2)}
              style={{ originY: 1 }}
            >
              <a
                className="button inline-flex items-center justify-center gap-[15px] rounded-[5px] bg-linear-to-br from-[#bb531f] to-[#a83c09] px-6 py-4 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:from-[#973b14] hover:to-[#973b14] motion-reduce:transform-none"
                href={slide.cta.href}
              >
                {slide.cta.label}
                <ArrowRight size={19} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.span
        className="pointer-events-none absolute -bottom-4 left-[4%] z-1 text-[85px] font-black tracking-[-5px] text-transparent italic [-webkit-text-stroke:1px_#ffffff26] sm:-bottom-[35px] sm:text-[140px]"
        style={{ x: reduceMotion ? 0 : watermarkX }}
        aria-hidden="true"
      >
        {brand}
      </motion.span>

      <button
        className="absolute top-[52%] z-3 grid size-[29px] place-items-center rounded-full border border-white/55 bg-black/30 text-white transition hover:scale-110 motion-reduce:transform-none sm:top-[48%] sm:size-[42px] [&>svg]:w-[18px] sm:[&>svg]:w-6 left-[7px] sm:left-[25px]"
        aria-label="Previous slide"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
      </button>

      <button
        className="absolute top-[52%] z-3 grid size-[29px] place-items-center rounded-full border border-white/55 bg-black/30 text-white transition hover:scale-110 motion-reduce:transform-none sm:top-[48%] sm:size-[42px] [&>svg]:w-[18px] sm:[&>svg]:w-6 right-[7px] sm:right-[25px]"
        aria-label="Next slide"
        onClick={() => navigate(1)}
      >
        <ChevronRight />
      </button>

      <button
        className="absolute right-5 bottom-3.5 z-3 inline-flex items-center gap-[7px] rounded-[20px] border border-white/30 bg-[#15171985] px-[11px] py-[7px] text-[11px] text-white hover:bg-accent disabled:cursor-default sm:right-8 sm:bottom-5"
        onClick={() => setPaused(!paused)}
        disabled={Boolean(reduceMotion)}
        aria-label={
          paused ? "Resume banner slideshow" : "Pause banner slideshow"
        }
      >
        {paused || reduceMotion ? <Play size={15} /> : <Pause size={15} />}
        <span>{reduceMotion ? "Autoplay off" : paused ? "Play" : "Pause"}</span>
      </button>
    </section>
  );
}
