import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { landingData } from "@/types/templates.types";
import { poppins } from "@/fonts/fonts";
const { meta } = landingData;

export const metadata: Metadata = { title: meta.title.default, description: meta.description, keywords: meta.keywords, authors: meta.authors };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return <html lang="en" className={poppins.variable}>
        <body className={`${poppins.variable}`}>
            <Header />
            {children}
            <Footer />
        </body></html>;
}
