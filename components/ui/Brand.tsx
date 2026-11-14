import Image from "next/image";
import { headerData } from "@/types/templates.types";

type BrandProps = {
  src?: string;
  alt?: string;
  className?: string;
  linkTo?: string;
};

export default function Brand({
  src = headerData.header.logo.src,
  alt = headerData.header.logo.alt,
  className = "",
  linkTo = headerData.header.logo.linkTo,
}: BrandProps) {
  return (
    <a
      href={linkTo}
      className="relative block h-14 w-45 shrink-0 sm:h-18 sm:w-55 xl:h-20 xl:w-60"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 240px, (min-width: 640px) 220px, 180px"
        className={`object-contain object-left ${className}`}
      />
    </a>
  );
}
