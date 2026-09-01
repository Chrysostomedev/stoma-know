import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { generateThemeCSS } from "@/styles/colors";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "KnowStoma - Sondages & Rapports",
  description: "Plateforme premium de sondages et rapports d'activité",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${fraunces.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: generateThemeCSS(),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
