import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { ThemeProvider } from "@icat/ui/components/theme-provider";
import { Toaster } from "@icat/ui/components/sonner";
import { CarCartProvider } from "@icat/web/store";
import "@icat/ui/globals.css";
import { Suspense } from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Irfan Cars & Tours",
  description: "Premium car rental and tours service",
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
              <CarCartProvider>{children}</CarCartProvider>
            </Suspense>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
