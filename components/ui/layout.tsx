"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { title } from "process";

interface PropsType {
    children: ReactNode;
    className: string;
}

export const Paragraph = ({ children, className }: PropsType) => {
    return <p className={`${className}`}>{children}</p>;
};

const ease = [0.22, 1, 0.36, 1] as const;

export const SectionTitle = ({ children, className }: PropsType) => {
    const reduce = useReducedMotion();

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    };
    return (
        <motion.div variants={fadeUp} className="">
            <h2 className={`font-poppins ${className}`}>{children}</h2>
        </motion.div>
    );
};

export const SectionEyebrow = ({
    children,
    className = "",
    align = "center",
}: PropsType & { align?: "left" | "center" | "right" }) => {
    const reduce = useReducedMotion();

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    };

    const lineGrow: Variants = {
        hidden: reduce ? {} : { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.8, ease } },
    };

    const line = "h-[3px] w-10 sm:w-[50px] bg-[#b54c19]";

    return (
        <motion.div
            variants={fadeUp}
            className={`flex items-center gap-3 sm:gap-3 ${align === "center" ? "sm:justify-center" : ""} ${className}`}
        >
            {(align === "center" || align === "left") && (
                <motion.span
                    variants={lineGrow}
                    className={`origin-right ${line} sm:block hidden`}
                />
            )}

            <p className={`font-montserrat font-bold tracking-[0.15em] sm:tracking-[0.2em] text-sm sm:text-base text-[#17181c]`}>
                {children}
            </p>

            {
                (align === "center" || align === "right") && 
                (<motion.span variants={lineGrow} className={`sm:block hidden origin-left ${line}`} />)
            }
            <motion.span variants={lineGrow} className={`block sm:hidden origin-left ${line}`} />
        </motion.div>
    );
};

export const SectionSubTitle = ({ children, className }: PropsType) => {
    const reduce = useReducedMotion();

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    };
    return (
        <motion.p
            variants={fadeUp}
            className={`font-poppins font-semibold text-[#9c5a12] text-base sm:text-2xl leading-snug mt-3 sm:mt-6 ${className}`}
        >
            {children}
        </motion.p>
    );
};

export const SectionDescription = ({ children, className }: PropsType) => {
    const reduce = useReducedMotion();

    const fadeUp: Variants = {
        hidden: reduce ? {} : { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
    };
    return (
        <motion.p variants={fadeUp} className={`font-poppins   ${className}`}>
            {children}
        </motion.p>
    );
};


// title

//                 mb-4
//                 text-[36px] leading-[1.12]
//                 font-extrabold tracking-[-1.5px]
//                 text-[#171717]
//                 sm:text-[44px]
//                 lg:text-[38px]
//                 xl:text-[50px]
//                 2xl:text-[56px]
//                 [&_em]:not-italic
//                 [&_em]:text-[#b84913]
//               "
