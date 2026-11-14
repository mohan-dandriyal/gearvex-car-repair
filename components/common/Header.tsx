"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { headerData } from "@/types/templates.types";
import Brand from "../ui/Brand";
import MainContainer from "@/components/common/MainContainer";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const links = new Set([
      ...headerData.header.navigation.navItems.map((item) => item.href),
      "#contact",
    ]);
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main [id]"),
    ).filter((section) => links.has(`#${section.id}`));
    let frame = 0;
    let headerHeight = 0;
    const updateActive = () => {
      frame = 0;
      const activationLine = headerHeight + 80;
      let current: HTMLElement | undefined = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine)
          current = section;
      }
      // Keep the last section selected when the page ends before it reaches the header.
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      )
        current = sections.at(-1);
      if (current) setActive(`#${current.id}`);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    const measureHeader = () => {
      headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      document.documentElement.style.setProperty(
        "--header-height",
        `${headerHeight}px`,
      );
      scheduleUpdate();
    };
    const observer = new ResizeObserver(measureHeader);
    if (headerRef.current) observer.observe(headerRef.current);
    measureHeader();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measureHeader);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measureHeader);
      window.removeEventListener("hashchange", scheduleUpdate);
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        headerRef.current
          ?.querySelector<HTMLButtonElement>("button[aria-controls]")
          ?.focus();
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    if (open) window.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-t-2 border-[#a94d27] bg-white shadow-[0_1px_4px_#0000000d]"
    >
      <MainContainer className="mx-auto">
        <div className="relative flex min-h-18 items-center gap-2.5 py-1 min-[641px]:min-h-20.5 min-[641px]:gap-4.5 min-[641px]:py-2 xl:min-h-25.5 xl:gap-3.75 2xl:gap-5.5 2xl:py-2">
          <div className="min-w-0 shrink-0" onClick={() => setOpen(false)}>
            <Brand
              src={headerData.header.logo.src}
              alt={headerData.header.logo.alt}
              className={""}
              linkTo={headerData.header.logo.linkTo}
            />
          </div>

          <button
            className={`group relative order-3 ml-auto flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 active:scale-95 motion-reduce:transform-none sm:ml-0 xl:hidden ${open ? "border-accent bg-accent text-white shadow-[0_6px_18px_#b64e2030]" : "border-[#b64e2026] bg-[#fff6f0] text-accent shadow-[0_3px_10px_#b64e2010] hover:border-accent"}`}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span aria-hidden="true" className="relative block h-5 w-6">
              <span
                className={`absolute left-0 top-0.5 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 rounded-full bg-current transition-all duration-300 ${open ? "w-0 opacity-0" : "w-4 group-hover:w-6"}`}
              />
              <span
                className={`absolute left-0 top-4.5 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>

          <nav
            id="main-navigation"
            aria-label="Main navigation"
            data-open={open}
            className="header-navigation absolute inset-x-0 top-full z-10 rounded-b-2xl bg-white shadow-[0_16px_30px_#17181c14] xl:static xl:flex xl:flex-1 xl:items-center xl:justify-center xl:gap-5 xl:rounded-none xl:shadow-none 2xl:gap-8"
          >
            <div className="min-h-0 overflow-hidden xl:contents">
              <div className="flex max-h-[calc(100dvh-var(--header-height,102px)-16px)] flex-col gap-1 overflow-y-auto border-t border-[#eee] px-5 py-4 sm:px-8 xl:contents">
                {headerData.header.navigation.navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative py-3 font-semibold whitespace-nowrap transition-colors hover:text-accent aria-[current=location]:text-accent text-sm lg:text-[15px]"
                    aria-current={active === item.href ? "location" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    {active === item.href && (
                      <motion.span
                        className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-[35px] bg-accent xl:-inset-x-1.5 xl:w-auto"
                        layoutId="active-navigation"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                  </a>
                ))}
                <a
                  href={headerData.header.cta.btnLink}
                  className="mt-3 rounded bg-accent px-4 py-3 text-center font-semibold text-white sm:hidden"
                  onClick={() => setOpen(false)}
                >
                  {headerData.header.cta.btnText}
                </a>
              </div>
            </div>
          </nav>

          <a
            className="button ml-auto xl:ml-0 sm:inline-flex hidden items-center justify-center bg-linear-to-br from-[#bb531f] to-[#a83c09] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:from-[#973b14] hover:to-[#973b14] motion-reduce:transform-none shrink-0 rounded-none px-3.5 py-3 whitespace-nowrap [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)] gap-1.5 [&>svg]:w-3.5 sm:gap-3.75 sm:px-5 sm:py-3.5 sm:[&>svg]:w-4.75 2xl:px-6.75 2xl:py-3.75 aria-[current=location]:from-[#88300a] aria-[current=location]:to-[#88300a]"
            href={headerData.header.cta.btnLink}
            aria-current={active === "#contact" ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            <CalendarDays size={22} />
            {headerData.header.cta.btnText}
          </a>
        </div>
      </MainContainer>
    </header>
  );
}
