
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  CalendarDays,
  Clock,
  HardHat,
  CarFront,
  User,
  Phone,
  Mail,
  Settings,
  ArrowRight,
  MapPin,
  MessageSquare,
  Building2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { landingData } from "@/types/templates.types";
import MainContainer from "@/components/common/MainContainer";
import { SectionDescription, SectionEyebrow, SectionTitle } from "../ui/layout";

// ========================================
// DYNAMIC CONTACT DATA
// ========================================

const contactData = landingData.contact;

// ========================================
// ICON MAPPING
// ========================================

const iconMap: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  clock: Clock,
  "hard-hat": HardHat,
  car: CarFront,
  user: User,
  phone: Phone,
  mail: Mail,
  settings: Settings,
  "arrow-right": ArrowRight,
  pin: MapPin,
  message: MessageSquare,
  building: Building2,
  wrench: Wrench,
};

const getIcon = (name: string): LucideIcon =>
  iconMap[name] ?? Settings;

const SubmitIcon = getIcon(contactData.form.submitIcon);

function setMinimumDate(input: HTMLInputElement | null) {
  if (!input) return;

  const now = new Date();
  input.min = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

// ========================================
// FIELD TYPES
// ========================================

type ContactField = {
  name: string;
  type: string;
  placeholder: string;
  icon: string;
  required?: boolean;
  full?: boolean;
  options?: string[];
  pattern?: string;
  patternMessage?: string;
  autoComplete?: string;
  minToday?: boolean;
  min?: string;
  max?: string;
};

// ========================================
// CONTACT SECTION
// ========================================

export default function ContactSection() {
  const data = contactData;
  const { form } = data;

  const serviceRef = useRef<HTMLSelectElement>(null);

  const [status, setStatus] = useState("");

  // ========================================
  // INITIALIZE FORM
  // ========================================

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const selectedService = params.get(
      form.serviceQueryParam
    );

    if (selectedService && serviceRef.current) {
      const exists = Array.from(
        serviceRef.current.options
      ).some((option) => option.value === selectedService);

      if (exists) {
        serviceRef.current.value = selectedService;
      }
    }
  }, [form.serviceQueryParam]);

  // ========================================
  // FORM SUBMISSION
  // ========================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const currentForm = event.currentTarget;

    const values = new FormData(currentForm);

    const body = Array.from(values.entries())
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    setStatus("");

    if (form.submissionMode === "mailto") {
      const mailtoUrl =
        `mailto:${form.emailTo}` +
        `?subject=${encodeURIComponent(form.emailSubject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;

      setStatus(form.successMessage);
      return;
    }

    try {
      const response = await fetch(form.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(values.entries())
        ),
      });

      if (!response.ok) {
        throw new Error(form.errorMessage);
      }

      setStatus(form.successMessage);
      currentForm.reset();
    } catch {
      setStatus(form.errorMessage);
    }
  }

  // ========================================
  // RENDER DYNAMIC FIELD
  // ========================================

  function renderField(field: ContactField) {
    const Icon = getIcon(field.icon);

    const fieldId = `contact-${field.name}`;

    const isFull = field.full || field.type === "textarea";

    const wrapperClass = `
      relative flex min-w-0 items-center gap-[7px]
      rounded-[5px] border border-[#d9d9df]
      px-2.5 shadow-[0_0_2px_#0001]
      transition-colors duration-200
      focus-within:border-accent
      focus-within:outline-2
      focus-within:outline-offset-1
      focus-within:outline-[#c87553]
      min-[951px]:gap-3
      min-[951px]:px-[13px]
      ${isFull ? "col-span-full" : ""}
    `;

    const inputClass = `
      h-[47px] w-full min-w-0
      border-0 bg-transparent
      text-xs text-[#34343c]
      outline-none
      placeholder:text-[#50515a]
      min-[951px]:text-sm
    `;

    const sharedProps = {
      id: fieldId,
      name: field.name,
      required: field.required ?? false,
      "aria-label": field.placeholder,
    };

    return (
      <label
        key={field.name}
        htmlFor={fieldId}
        className={wrapperClass}
      >
        <Icon
          size={21}
          className="w-[18px] shrink-0 text-[#34343c] min-[951px]:w-[21px]"
        />

        {/* SELECT FIELD */}
        {field.type === "select" ? (
          <select
            {...sharedProps}
            ref={serviceRef}
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              {field.placeholder}
            </option>

            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          /* TEXTAREA FIELD */
          <textarea
            {...sharedProps}
            placeholder={field.placeholder}
            rows={4}
            className={`${inputClass} h-auto resize-y py-3`}
          />
        ) : (
          /* INPUT FIELD */
          <input
            {...sharedProps}
            type={field.type}
            placeholder={
              field.type === "date" ||
                field.type === "time"
                ? undefined
                : field.placeholder
            }
            pattern={field.pattern}
            title={field.patternMessage}
            autoComplete={field.autoComplete}
            ref={field.minToday ? setMinimumDate : undefined}
            min={field.minToday ? undefined : field.min}
            max={field.max}
            className={inputClass}
          />
        )}
      </label>
    );
  }

  // ========================================
  // JSX
  // ========================================

  return (
    <section
      id={data.id}
      className="scroll-mt-2.5 "
    >
      <MainContainer className="">
        <div
          className="
            grid grid-cols-1 items-center
            gap-[35px]
            sm:grid-cols-[0.85fr_1.15fr]
            sm:gap-[30px]
            min-[951px]:gap-[45px]
            min-[1191px]:gap-[75px]
          "
        >
          {/* ========================================
              LEFT SIDE - BOOKING STEPS
          ======================================== */}

          <div className="section-header">
            {/* Eyebrow */}
            <SectionEyebrow className="" align={"left"}>
              {data.eyebrow}
            </SectionEyebrow>

            {/* Section Heading */}
            <SectionTitle className="my-[15px]">
              {data.title} {" "}
              <br className="sm:block hidden" />
              <em>{data.titleHighlight}</em>
            </SectionTitle>

            {/* Description */}
            <SectionDescription className="" >
              {data.description}
            </SectionDescription>

            {/* Dynamic Steps */}
            <div className="mt-5">
              {data.info.map((contact, index) => {
                const Icon = getIcon(contact?.icon);

                return (
                  <div
                    key={index + 1}
                    className="
                      group flex items-center
                      gap-[15px]
                      border-b border-[#e3e3e7]
                      py-[15px]
                      last:border-0
                      min-[1191px]:gap-6
                    "
                  >
                    <Icon
                      className="
                        size-[43px] shrink-0
                        stroke-[1.4] text-accent
                        transition-transform duration-300
                        group-hover:scale-110
                        sm:size-[38px]
                      "
                    />

                    <div
                      className="
                        border-l-2 border-[#c66a3c]
                        pl-[15px]
                        min-[1191px]:pl-[22px]
                      "
                    >

                      <p className="mt-1 text-[13px] leading-[1.4]">
                        {contact.label}
                      </p>

                      <h3
                        className="
                          text-[19px] font-semibold
                          tracking-[-0.6px]
                          sm:text-[16px] mt-1
                        "
                      >
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="transition-colors hover:text-accent"
                          >
                            {contact.lines}
                          </a>
                        ) : (
                          contact.lines
                        )}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================
              RIGHT SIDE - DYNAMIC BOOKING FORM
          ======================================== */}

          <form
            onSubmit={handleSubmit}
            className="
              rounded-lg border border-[#d9d9de]
              border-t-[3px] border-t-accent
              px-[17px] py-[22px]
              shadow-[0_4px_10px_#0000001c]
              sm:p-5
              min-[951px]:p-[25px]
            "
          >
            {/* Form Title */}
            <h3
              className="
                mb-[27px] text-center
                text-2xl font-bold
                min-[951px]:text-[28px]
              "
            >
              {form.title}
            </h3>

            {/* Dynamic Form Fields */}
            <div
              className="
                grid grid-cols-2 gap-2.5
                min-[951px]:gap-3.5
              "
            >
              {form.fields.map((field) =>
                renderField(field)
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="
                  col-span-full mt-2
                  inline-flex min-h-[52px]
                  items-center justify-center
                  gap-[15px] rounded-[5px]
                  bg-linear-to-br
                  from-[#bb531f] to-[#a83c09]
                  px-6 py-4
                  text-lg font-semibold text-white
                  transition duration-200
                  hover:-translate-y-0.5
                  hover:from-[#973b14]
                  hover:to-[#973b14]
                  motion-reduce:transform-none
                  sm:text-xl
                "
              >
                {form.submitLabel}
                <SubmitIcon size={22} />
              </button>
            </div>



            {/* Submission Status */}
            {status && (
              <p
                className="mt-[15px] rounded bg-[#fff3eb] p-3 text-sm"
                role="status"
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </MainContainer>
    </section>
  );
}
