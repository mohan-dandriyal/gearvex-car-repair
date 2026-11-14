import { Settings, ShieldCheck, CarFront, Timer } from "lucide-react";
import { landingData } from "@/types/templates.types";
import { SectionTitle, SectionDescription, SectionEyebrow } from "../ui/layout";
import MainContainer from "@/components/common/MainContainer";

const featureIcons = {
  settings: Settings,
  "shield-check": ShieldCheck,
  "car-front": CarFront,
  timer: Timer,
};

export default function AboutSection() {
  const { eyebrow, title, titleHighlight, paragraphs, features } =
    landingData.about;

  return (
    <section
      id="about"
      className="py-20 scroll-mt-2.5 relative overflow-hidden before:absolute before:top-0 before:-right-1.5 before:h-[86px] before:w-[115px] before:-skew-x-[33deg] before:bg-linear-to-br before:from-[#c06e454d] before:to-[#ad4b2621] before:shadow-[-85px_0_#b9542814,-38px_42px_#b9542810] before:content-[''] after:absolute after:bottom-0 after:-left-3.5 after:h-[70px] after:w-[110px] after:-skew-x-[33deg] after:bg-[#b954282b] after:shadow-[75px_25px_#b95428b3] after:content-['']"
    >
      <MainContainer className="">
        <div className="">
          {/* Eyebrow */}
            <SectionEyebrow className="" align={"left"}>
              {eyebrow}
            </SectionEyebrow>

          <div className="mt-5 mb-[35px] grid grid-cols-1 items-center gap-[22px] sm:mt-[18px] sm:mb-[62px] sm:grid-cols-2 sm:gap-7 min-[951px]:gap-[45px] [&>h2]:m-0 [&>.about-description]:border-l [&>.about-description]:border-[#c875535e] [&>.about-description]:pl-[17px] [&>.about-description]:text-[15px] sm:[&>.about-description]:pl-6 sm:[&>.about-description]:text-base min-[951px]:[&>.about-description]:pl-[30px] min-[951px]:[&>.about-description]:text-[19px]">
            <SectionTitle className="">
              {title}
              <br />
              <em>{titleHighlight}</em>
            </SectionTitle>

            <div className="about-description space-y-3">
              {paragraphs.map((paragraph, index) => (
                <SectionDescription key={index + 1} className="">
                  {paragraph}
                </SectionDescription>
              ))}
            </div>
          </div>

          <div className="grid mb-10 grid-cols-2 gap-x-5 gap-y-[25px] sm:grid-cols-4 sm:gap-[26px] min-[1191px]:gap-[35px]">
            {features.map(({ icon, label }) => {
              const Icon =
                featureIcons[icon as keyof typeof featureIcons] ?? Settings;

              return (
                <div
                  key={label}
                  className="group relative flex items-center gap-[13px] sm:[&+div]:before:absolute sm:[&+div]:before:-left-5 sm:[&+div]:before:h-[65px] sm:[&+div]:before:w-px sm:[&+div]:before:bg-[#bd6e494d] sm:[&+div]:before:content-[''] [&>svg]:size-[43px] [&>svg]:shrink-0 [&>svg]:text-accent [&>svg]:transition-transform hover:[&>svg]:-translate-y-1 hover:[&>svg]:-rotate-4 min-[951px]:[&>svg]:size-[51px] min-[1191px]:gap-[19px] min-[1191px]:[&>svg]:size-[65px] [&>h3]:max-w-[155px] [&>h3]:text-[17px] min-[951px]:[&>h3]:text-xl min-[1191px]:[&>h3]:text-[24px]"
                >
                  <Icon strokeWidth={1.8} aria-hidden="true" />
                  <h3 className="font-bold text-xl leading-7 font-poppins">
                    {label}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
