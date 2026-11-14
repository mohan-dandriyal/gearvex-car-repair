import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    { path: "../public/fonts/poppins-400.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/poppins-500.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/poppins-600.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/poppins-700.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/poppins-800.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/poppins-900.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});
