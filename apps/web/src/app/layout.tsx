import { Urbanist } from "next/font/google";
import { ThemeProvider, Toaster } from "@icat/ui";
import "@icat/ui/globals.css";

const urbansist = Urbanist({
  weight: "500",
  preload: true,
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
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
