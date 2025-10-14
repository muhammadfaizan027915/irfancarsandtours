"use client";

import Link from "next/link";
import { Logo } from "@icat/features/header/logo";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <section className="bg-foreground dark:bg-background">
      <footer className="py-16 container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="text-background dark:text-foreground">
            <Logo />
            <p className="mt-3 text-background/60 dark:text-foreground/60">
              Drive your dream car with confidence. Explore premium rentals,
              tours, and automotive experiences with ICAT.
            </p>
          </div>

          <div className="flex flex-col md:items-center">
            <h3 className="font-semibold mb-3 text-background dark:text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2 text-background/60 dark:text-foreground/60">
              <Link
                href={NavigationUrls.HOME}
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href={NavigationUrls.CARS}
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                Cars
              </Link>
              <Link
                href={NavigationUrls.ABOUT_US}
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href={NavigationUrls.CONTACT}
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="md:text-right">
            <h3 className="font-semibold mb-3 text-background dark:text-foreground">
              Follow Us
            </h3>
            <div className="flex md:justify-end gap-4 text-background/60 dark:text-foreground/60">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-background dark:hover:text-foreground transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2 border-t pt-8 mt-16 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ICAT. All rights reserved.</p>

          <p>
            Developed By:{" "}
            <Link
              href="https://codrison.com"
              className="text-background dark:text-foreground hover:underline"
            >
              Codrison Solutions
            </Link>
          </p>
        </div>
      </footer>
    </section>
  );
}
