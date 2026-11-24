import type { Metadata } from "next";
import "./globals.css";
import { landingData } from "@/types/templates.types";
import { poppins } from "@/fonts/poppins";
const { meta } = landingData;

export const metadata: Metadata = { title: meta.title.default, description: meta.description, keywords: meta.keywords, authors: meta.authors };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return <html lang="en" className={poppins.variable}>
        <body className={`${poppins.variable}`}>
            {children}
        </body></html>;
}
