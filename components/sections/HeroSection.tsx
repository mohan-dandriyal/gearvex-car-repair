
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

import { landingData } from "@/types/templates.types";

// ========================================
// HERO DATA
// ========================================

const { slides, brand } = landingData.hero;

// ========================================
// SLIDER CONFIGURATION
// ========================================

const SLIDE_DURATION = 1.4;
const SLIDE_INTERVAL = 5400;
const SWIPE_THRESHOLD = 55;

const EASE = [0.25, 0.1, 0.25, 1] as const;

// ========================================
// SLIDE VARIANTS
// ========================================

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: `${direction * 100}%`,
    opacity: 1,
  }),

  center: {
    x: "0%",
    opacity: 1,
  },

  exit: (direction: number) => ({
    x: `${direction * -100}%`,
    opacity: 1,
  }),
};

// ========================================
// HERO SECTION
// ========================================

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const transitionTimer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);
  const transitioning = useRef(false);

  const reduceMotion = useReducedMotion();

  // ========================================
  // SLIDER STATE
  // ========================================

  const [{ index, direction }, setSlide] = useState({
    index: 0,
    direction: 1,
  });

  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const hasMultipleSlides = slides.length > 1;

  const slide = slides[index];

  // ========================================
  // SCROLL ANIMATION
  // ========================================

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const watermarkX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 200]
  );

  // ========================================
  // NAVIGATION
  // ========================================

  const navigate = useCallback(
    (nextDirection: number) => {
      if (
        !hasMultipleSlides ||
        transitioning.current
      ) {
        return;
      }

      transitioning.current = true;

      setSlide((current) => ({
        index:
          (current.index +
            nextDirection +
            slides.length) %
          slides.length,

        direction: nextDirection,
      }));

      // Unlock after slide animation.
      // Also works if animation is interrupted.
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }

      transitionTimer.current = setTimeout(
        () => {
          transitioning.current = false;
        },
        reduceMotion
          ? 0
          : SLIDE_DURATION * 1000
      );
    },
    [hasMultipleSlides, reduceMotion]
  );

  // ========================================
  // CLEANUP
  // ========================================

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  // ========================================
  // AUTOPLAY
  // ========================================

  useEffect(() => {
    if (
      !hasMultipleSlides ||
      paused ||
      hovered ||
      focused ||
      reduceMotion
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!document.hidden) {
        navigate(1);
      }
    }, SLIDE_INTERVAL);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    index,
    paused,
    hovered,
    focused,
    reduceMotion,
    hasMultipleSlides,
    navigate,
  ]);

  // ========================================
  // CONTENT REVEAL
  // ========================================

  const reveal = (delay: number) => ({
    duration: reduceMotion ? 0 : 0.55,
    delay: reduceMotion ? 0 : delay,
    ease: "easeOut" as const,
  });

  // ========================================
  // TOUCH HANDLERS
  // ========================================

  const handleTouchStart = (
    event: React.TouchEvent<HTMLElement>
  ) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLElement>
  ) => {
    if (touchStartX.current === null) {
      return;
    }

    const endX =
      event.changedTouches[0]?.clientX;

    if (endX === undefined) {
      touchStartX.current = null;
      return;
    }

    const distance =
      touchStartX.current - endX;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      navigate(distance > 0 ? 1 : -1);
    }

    touchStartX.current = null;
  };

  // ========================================
  // NO SLIDES FALLBACK
  // ========================================

  if (!slide) {
    return null;
  }

  // ========================================
  // JSX
  // ========================================

  return (
    <section
      ref={sectionRef}
      className="
        relative flex min-h-[60vh]
        items-center overflow-hidden
        bg-[#191b1c] text-white
        lg:min-h-[88vh]
      "
      aria-roledescription="carousel"
      aria-label="Our workshop"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null
          )
        ) {
          setFocused(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
      {/* ========================================
          SLIDER
      ======================================== */}

      <AnimatePresence
        initial={false}
        custom={direction}
      >
        <motion.div
          key={index}
          custom={direction}
          variants={
            reduceMotion
              ? {
                  enter: { opacity: 0 },
                  center: { opacity: 1 },
                  exit: { opacity: 0 },
                }
              : slideVariants
          }
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reduceMotion
              ? 0
              : SLIDE_DURATION,
            ease: EASE,
          }}
          className="
            absolute inset-0 flex
            touch-pan-y items-center
            overflow-hidden px-5
            lg:px-0
          "
        >
          {/* BACKGROUND IMAGE */}
          <div
            className="
              absolute inset-0
              bg-cover
              bg-[position:62%_center]
              sm:bg-[position:center_48%]
            "
            style={{
              backgroundImage: `url("${slide.image}")`,
            }}
          />

          {/* DARK OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-[linear-gradient(90deg,#111315e8,#111315b3_55%,#11131550)]
              sm:bg-[linear-gradient(90deg,#111315f7_0%,#141517e8_30%,#1113156e_58%,#11131505_100%)]
            "
          />

          {/* DECORATIVE SHAPE */}
          <div
            aria-hidden="true"
            className="
              absolute top-0 -left-[45px]
              h-[180px] w-[100px]
              -skew-x-[34deg]
              bg-linear-to-b
              from-[#cb784c] to-[#a64416]
              opacity-90
              after:absolute
              after:inset-y-0
              after:right-[65px]
              after:-left-[30px]
              after:bg-[#53291970]
              after:content-['']
            "
          />

          {/* ========================================
              SLIDE CONTENT
          ======================================== */}

          <div
            className="
              relative z-2 mx-auto
              min-h-[370px]
              w-[calc(100%-2.5rem)]
              max-w-[1200px]
              px-[18px] pt-[55px] pb-20
              sm:min-h-[390px]
              sm:w-[calc(100%-4rem)]
              sm:px-[30px]
              sm:pt-[70px]
              sm:pb-[85px]
              xl:w-[calc(100%-6rem)]
              min-[1191px]:px-[45px]
            "
          >
            {/* TAGLINE */}
            <motion.p
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={reveal(0.35)}
              className="
                flex items-center gap-3
                text-xs font-semibold
                leading-snug tracking-[2px]
                text-white
                before:h-[3px]
                before:w-[30px]
                before:shrink-0
                before:bg-accent
                before:content-['']
                sm:gap-[19px]
                sm:text-base
                sm:tracking-[3px]
                sm:before:w-12
              "
            >
              {slide.tagline}
            </motion.p>

            {/* TITLE */}
            <motion.h1
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={reveal(0.55)}
              className="
                mt-[26px] mb-[22px]
                max-w-[700px]
                text-[35px]
                leading-[1.15]
                font-semibold
                sm:text-[60px]
                sm:font-bold
                sm:tracking-[-2px]
                lg:text-[70px]
              "
            >
              {slide.first}
              <br />
              {slide.second}{" "}
              <em className="text-[#c66a3c]">
                {slide.accent}
              </em>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={reveal(0.8)}
              className="
                max-w-[320px]
                text-[15px] text-[#eee]
                sm:max-w-[470px]
                sm:text-lg
              "
            >
              {slide.description}
            </motion.p>

            {/* CTA BUTTON */}
            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={reveal(1)}
              className="mt-[26px]"
            >
              <a
                href={slide.cta.href}
                className="
                  inline-flex items-center
                  justify-center gap-[15px]
                  rounded-[5px]
                  bg-linear-to-br
                  from-[#bb531f]
                  to-[#a83c09]
                  px-[19px] py-3.5
                  text-[11px]
                  font-semibold
                  tracking-[0.5px]
                  text-white
                  transition duration-200
                  hover:-translate-y-0.5
                  hover:from-[#973b14]
                  hover:to-[#973b14]
                  motion-reduce:transform-none
                  sm:px-[25px]
                  sm:py-[17px]
                  sm:text-[13px]
                "
              >
                {slide.cta.label}
                <ArrowRight size={19} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ========================================
          WATERMARK
      ======================================== */}

      <motion.span
        aria-hidden="true"
        style={{
          x: reduceMotion ? 0 : watermarkX,
        }}
        className="
          pointer-events-none
          absolute -bottom-4 left-[4%]
          z-1
          text-[85px] font-black
          italic tracking-[-5px]
          text-transparent
          [-webkit-text-stroke:1px_#ffffff26]
          sm:-bottom-[35px]
          sm:text-[140px]
        "
      >
        {brand}
      </motion.span>

      {/* ========================================
          NAVIGATION BUTTONS
      ======================================== */}

      {hasMultipleSlides && (
        <>
          {/* PREVIOUS */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => navigate(-1)}
            className="
              absolute top-[52%] left-[7px]
              z-3 grid size-[29px]
              place-items-center
              rounded-full
              border border-white/55
              bg-black/30 text-white
              transition
              hover:scale-110
              motion-reduce:transform-none
              sm:top-[48%]
              sm:left-[25px]
              sm:size-[42px]
            "
          >
            <ChevronLeft className="size-[18px] sm:size-6" />
          </button>

          {/* NEXT */}
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => navigate(1)}
            className="
              absolute top-[52%] right-[7px]
              z-3 grid size-[29px]
              place-items-center
              rounded-full
              border border-white/55
              bg-black/30 text-white
              transition
              hover:scale-110
              motion-reduce:transform-none
              sm:top-[48%]
              sm:right-[25px]
              sm:size-[42px]
            "
          >
            <ChevronRight className="size-[18px] sm:size-6" />
          </button>

          {/* PLAY / PAUSE */}
          <button
            type="button"
            disabled={Boolean(reduceMotion)}
            aria-label={
              paused
                ? "Resume banner slideshow"
                : "Pause banner slideshow"
            }
            aria-pressed={paused}
            onClick={() => setPaused((prev) => !prev)}
            className="
              absolute right-5 bottom-3.5
              z-3 inline-flex
              items-center gap-[7px]
              rounded-[20px]
              border border-white/30
              bg-[#15171985]
              px-[11px] py-[7px]
              text-[11px] text-white
              transition-colors
              hover:bg-accent
              disabled:cursor-default
              sm:right-8
              sm:bottom-5
            "
          >
            {paused || reduceMotion ? (
              <Play size={15} />
            ) : (
              <Pause size={15} />
            )}

            <span>
              {reduceMotion
                ? "Autoplay off"
                : paused
                  ? "Play"
                  : "Pause"}
            </span>
          </button>
        </>
      )}
    </section>
  );
}
