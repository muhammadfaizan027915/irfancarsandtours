"use client";

import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { Logo } from "@icat/features/common/header/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-foreground dark:bg-background">
      <footer className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <Logo />
              <p className="mt-4 text-background/70 dark:text-foreground/70 leading-relaxed text-sm">
                Experience premium car rentals and curated tours. We deliver excellence with every journey.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-background dark:text-foreground mb-6 text-sm uppercase tracking-wider">
                Explore
              </h4>
              <nav className="flex flex-col gap-3">
                <Link
                  href={NavigationUrls.HOME}
                  className="text-background/60 dark:text-foreground/60 hover:text-background dark:hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
                <Link
                  href={NavigationUrls.CARS}
                  className="text-background/60 dark:text-foreground/60 hover:text-background dark:hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Cars
                </Link>
                <Link
                  href={NavigationUrls.ABOUT_US}
                  className="text-background/60 dark:text-foreground/60 hover:text-background dark:hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
                <Link
                  href={NavigationUrls.COMPLAINTS}
                  className="text-background/60 dark:text-foreground/60 hover:text-background dark:hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  Complaints
                </Link>
              </nav>
            </div>

            {/* Contact & Follow Us */}
            <div>
              <div className="mb-8">
                <h4 className="font-semibold text-background dark:text-foreground mb-4 text-sm uppercase tracking-wider">
                  Contact
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-start">
                    <MapPin size={18} className="text-background/60 dark:text-foreground/60 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-background/60 dark:text-foreground/60 text-sm">
                        Shop, 01, plot, 92/13, Block A, NPF, Islamabad
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Phone size={18} className="text-background/60 dark:text-foreground/60 mt-0.5 flex-shrink-0" />
                    <div>
                      <a href="tel:+923315757081" className="text-background/60 dark:text-foreground/60 text-sm hover:text-background dark:hover:text-foreground transition-colors">
                        +92 331 5757081
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Mail size={18} className="text-background/60 dark:text-foreground/60 mt-0.5 flex-shrink-0" />
                    <div>
                      <a href="mailto:contact@irfancarsandtours.com" className="text-background/60 dark:text-foreground/60 text-sm hover:text-background dark:hover:text-foreground transition-colors">
                        contact@irfancarsandtours.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-background dark:text-foreground mb-4 text-sm uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-lg bg-background/10 dark:bg-foreground/10 flex items-center justify-center text-background/60 dark:text-foreground/60 hover:bg-background/20 dark:hover:bg-foreground/20 hover:text-background dark:hover:text-foreground transition-all duration-300"
                  >
                    <Facebook size={18} />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-lg bg-background/10 dark:bg-foreground/10 flex items-center justify-center text-background/60 dark:text-foreground/60 hover:bg-background/20 dark:hover:bg-foreground/20 hover:text-background dark:hover:text-foreground transition-all duration-300"
                  >
                    <Twitter size={18} />
                  </Link>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-lg bg-background/10 dark:bg-foreground/10 flex items-center justify-center text-background/60 dark:text-foreground/60 hover:bg-background/20 dark:hover:bg-foreground/20 hover:text-background dark:hover:text-foreground transition-all duration-300"
                  >
                    <Instagram size={18} />
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-lg bg-background/10 dark:bg-foreground/10 flex items-center justify-center text-background/60 dark:text-foreground/60 hover:bg-background/20 dark:hover:bg-foreground/20 hover:text-background dark:hover:text-foreground transition-all duration-300"
                  >
                    <Linkedin size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 dark:border-foreground/10" />

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center">
            <p className="text-background/60 dark:text-foreground/60 text-xs md:text-sm">
              © {currentYear} Irfan Cars And Tours. All rights reserved.
            </p>

            <div className="flex justify-start md:justify-end items-center gap-2">
              <p className="text-background/60 dark:text-foreground/60 text-xs md:text-sm">
                Powered By{" "}
                <Link
                  href="https://codrison.com"
                  target="_blank"
                  className="text-background dark:text-foreground hover:underline font-medium"
                >
                  Codrison Solutions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
