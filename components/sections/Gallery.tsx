"use client";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { landingData } from "@/types/templates.types";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";
import MainContainer from "@/components/common/MainContainer";

const { items, title, titleHighlight, eyebrow, paragraphs } = landingData?.gallery;

export default function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const gallseryImages = items.slice(0, 6);
  return (
    <section id="gallery" className=" scroll-mt-2.5">
      <MainContainer className="">
        <div className="mb-6 sm:text-center">

          {/* Eyebrow */}
          <SectionEyebrow className="" align={"center"}>
            {eyebrow}
          </SectionEyebrow>

          <SectionTitle className="">
            {title} <em> {titleHighlight}</em>
          </SectionTitle>

          {/* Description */}
          {
            paragraphs &&
            <SectionDescription className="" >
              {paragraphs}
            </SectionDescription>

          }
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-[17px]">
          {gallseryImages.map((item, i) => (
            <button
              key={item.image}
              className="group relative aspect-[1.1] overflow-hidden bg-[#eee] p-0 sm:aspect-[1.48] [&>img]:size-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-300 hover:[&>img]:scale-[1.04] [&>span]:absolute [&>span]:inset-0 [&>span]:grid [&>span]:place-items-center [&>span]:bg-black/25 [&>span]:text-white [&>span]:opacity-0 [&>span]:transition-opacity hover:[&>span]:opacity-100 focus-visible:[&>span]:opacity-100"
              aria-label={`View ${item.alt}`}
              onClick={() => {
                setSelected(i);
                dialog.current?.showModal();
              }}
            >
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span>
                <ZoomIn />
              </span>
            </button>
          ))}
        </div>
        <dialog
          ref={dialog}
          className="m-auto max-h-[90vh] max-w-[min(1000px,90vw)] rounded-lg border-0 bg-white p-[18px] backdrop:bg-black/80 [&>button]:absolute [&>button]:top-6 [&>button]:right-6 [&>button]:rounded-full [&>button]:bg-foreground [&>button]:p-[9px] [&>button]:text-white [&>img]:max-h-[75vh] [&>img]:object-contain [&>p]:pt-3"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <button
            autoFocus
            aria-label="Close image"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
          <img src={items[selected].image} alt={items[selected].alt} />
          <p>{items[selected].alt}</p>
        </dialog>
      </MainContainer>
    </section>
  );
}
