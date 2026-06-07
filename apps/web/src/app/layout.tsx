import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { ThemeProvider } from "@icat/ui/components/theme-provider";
import { Toaster } from "@icat/ui/components/sonner";
import { CarCartProvider, TourCartProvider } from "@icat/web/store";
import "@icat/ui/globals.css";
import { Suspense } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Irfan Cars & Tours Pakistan",
    default: "Irfan Cars & Tours | Premium Car Rental & Tours in Pakistan",
  },
  description: "Explore Pakistan with Irfan Cars & Tours. We offer premium car rentals (including SUVs/4x4s) and curated tour packages to the Northern Areas, Hunza, and Skardu.",
  keywords: ["rent a car Pakistan", "car rental Islamabad", "Pakistan tour packages", "Hunza valley tours", "Prado rental Pakistan", "Northern areas tours"],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://irfancarsandtours.com",
    title: "Irfan Cars & Tours | Premium Car Rental & Tours in Pakistan",
    description: "Explore Pakistan with Irfan Cars & Tours. Premium car rentals and curated tour packages to the Northern Areas.",
    siteName: "Irfan Cars & Tours",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irfan Cars & Tours Pakistan",
    description: "Explore Pakistan with Irfan Cars & Tours. Premium car rentals and curated tour packages to the Northern Areas.",
  },
};

const urbansist = Urbanist({
  weight: "500",
  preload: true,
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={urbansist?.className}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={null}>
              <CarCartProvider>
                <TourCartProvider>{children}</TourCartProvider>
              </CarCartProvider>
            </Suspense>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
