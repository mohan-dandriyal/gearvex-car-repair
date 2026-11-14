import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { footerData } from "@/types/templates.types";
import Brand from "../ui/Brand";
import MainContainer from "./MainContainer";

const socialIcons = {
  Facebook: (
    <path d="M14 22v-9h3l.5-4H14V7c0-1.1.3-2 2-2h2V1.4A24 24 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" />
  ),
  Instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </g>
  ),
  LinkedIn: (
    <>
      <path d="M3 8h4v13H3zM9 8h4v1.8c.7-1.3 2-2.1 3.7-2.1 3.1 0 4.3 2 4.3 5.3v8h-4v-7.1c0-1.9-.4-3-1.9-3-1.6 0-2.1 1.2-2.1 3V21H9z" />
      <circle cx="5" cy="4" r="2.2" />
    </>
  ),
  YouTube: (
    <path
      fillRule="evenodd"
      d="M21.6 5.2C20.9 4 18.5 4 12 4S3.1 4 2.4 5.2C1.5 6.6 1.5 9 1.5 12s0 5.4.9 6.8C3.1 20 5.5 20 12 20s8.9 0 9.6-1.2c.9-1.4.9-3.8.9-6.8s0-5.4-.9-6.8ZM10 8l6 4-6 4z"
      clipRule="evenodd"
    />
  ),
  "X (Twitter)": (
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.7L18.9 2ZM17.8 20h1.7L6.4 4H4.6z" />
  ),
  Pinterest: (
    <path d="M12 1a11 11 0 0 0-4 21c0-.9 0-2 .3-3l1.4-6s-.4-.8-.4-1.9c0-1.8 1-3.1 2.3-3.1 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.4-.3 1.3.7 2.3 2 2.3 2.4 0 4-3 4-6.5 0-2.7-1.8-4.7-5-4.7-3.6 0-5.8 2.7-5.8 5.6 0 1 .3 1.8.8 2.4.2.2.2.3.1.6l-.3 1c-.1.3-.3.4-.6.3-1.6-.6-2.3-2.3-2.3-4.3 0-3.2 2.7-7.1 8.4-7.1 4.5 0 7.4 3.2 7.4 6.7 0 4.6-2.6 8-6.3 8-1.3 0-2.6-.7-3-1.5l-.8 3.2c-.3 1.1-.9 2.2-1.4 3a11 11 0 1 0 2.7-21.6Z" />
  ),
};

export default function Footer() {
  const { brand, quickLinks, contact, copyright, social } = footerData.footer;
  const icons = { phone: Phone, mail: Mail, pin: MapPin };
  const links = [
    ...quickLinks.items,
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <footer className="bg-[radial-gradient(at_95%_10%,#24272c,#101316_60%)] pt-[45px] text-white sm:pt-[65px] [&_.brand-car]:bg-[#131619] [&_.brand_strong]:text-[35px] min-[1191px]:[&_.brand_strong]:text-[46px] [&_.brand_small]:text-[10px] [&_.brand-symbol]:h-[78px] [&_.brand-symbol]:w-[72px] [&_.brand-symbol>svg:first-child]:size-[72px] [&_.brand-car]:top-[18px]! [&_.brand-car]:left-[13px]! [&_.brand-car]:h-[42px]! [&_.brand-car]:w-[52px]! [&_a]:transition-colors [&_a:hover]:text-[#ed9c68] [&_a:focus-visible]:text-[#ed9c68]">
      <MainContainer className="">
        <div className="">
          <div className="flex flex-wrap justify-between min-[951px]:grid grid-cols-1 gap-[34px] pb-8 sm:grid-cols-3 sm:gap-[25px] sm:pb-12 min-[951px]:grid-cols-4 min-[1191px]:gap-10 [&>div:first-child]:col-span-full min-[951px]:[&>div:first-child]:col-auto min-[951px]:[&>div+div]:border-l min-[951px]:[&>div+div]:border-white/20 min-[951px]:[&>div+div]:pl-[25px] min-[1191px]:[&>div+div]:pl-10 [&_p]:mt-[23px] [&_p]:max-w-[330px] [&_p]:text-sm [&_p]:text-[#d6d6d6] sm:[&_p]:text-base [&_h3]:mt-[5px] [&_h3]:mb-6 [&_h3]:text-[23px] [&_h3]:tracking-[-0.5px] sm:[&_h3]:text-[25px] [&_h3]:after:mt-[13px] [&_h3]:after:block [&_h3]:after:h-[3px] [&_h3]:after:w-[55px] [&_h3]:after:bg-[#d56822] [&_h3]:after:content-['']">
            <div>
              <Brand
                src={brand.logo}
                alt={brand.alt}
                className={""}
                linkTo={brand.href}
              />
              <p>{brand.description}</p>
            </div>

            <div>
              <h3>{quickLinks.title}</h3>
              <div className="grid grid-cols-2 gap-x-[15px] gap-y-[17px] [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:text-sm [&>a]:text-[#e3e3e3] [&_svg]:shrink-0 [&_svg]:text-[#ed751b]">
                {links.map((link) => (
                  <a key={link.href} href={link.href}>
                    <ChevronRight size={16} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3>{contact.title}</h3>
              {contact.items.map((item) => {
                const Icon = icons[item.icon as keyof typeof icons];
                return (
                  <a
                    className="mb-[22px] flex items-start gap-[17px] text-[15px] leading-normal text-[#e3e3e3] [&>svg]:shrink-0 [&>svg]:text-[#ed751b]"
                    key={item.icon}
                    href={item.href}
                  >
                    <Icon size={23} />
                    <span>{item.lines.join(", ")}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:items-center  justify-between text-center gap-5 border-t border-white/30 py-[23px] md:flex-row sm:items-center sm:pt-[26px] sm:pb-[30px] [&>p]:text-xs [&>p]:text-[#ddd] sm:[&>p]:text-[13px]">
            <p>
              {"\u00a9"} {copyright.copyYear} {copyright.copyrightText}
            </p>

            <div
              className="flex justify-center flex-wrap gap-3"
              aria-label={social.title}
            >
              {social.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid size-11 place-items-center rounded-full border border-white/25 bg-white/5 text-[#e3e3e3] transition-all! duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white! hover:shadow-[0_6px_18px_#b64e2045] focus-visible:border-accent focus-visible:bg-accent focus-visible:text-white! motion-reduce:transform-none"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="size-5 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none"
                  >
                    {socialIcons[item.label as keyof typeof socialIcons]}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </MainContainer>
    </footer>
  );
}
