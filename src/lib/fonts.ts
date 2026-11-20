import { Space_Grotesk, IBM_Plex_Mono, Noto_Sans_JP } from "next/font/google";

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontSans = Noto_Sans_JP({
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});
