"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LeftMenu = React.memo(function LeftMenu() {
  const pathname = usePathname();
  const [isSLabOpen, setIsSLabOpen] = useState(false);

  // Automatically open S-Lab menu if on a relevant path
  useEffect(() => {
    if (pathname && (pathname.includes("/the-s-lab") || pathname.includes("/s-library"))) {
      setIsSLabOpen(true);
    }
  }, [pathname]);

  const isActive = (path: string) => pathname === path;
  const isSLabActive = pathname?.startsWith("/the-s-lab") || pathname === "/s-library";

  return (
    <aside className="fixed left-0 top-0 w-[360px] h-screen bg-white flex z-50">
      {/* Left Section - Decorative Pattern */}
      <div className="w-14 flex flex-col">
        {/* Icon at top */}
        <div className="w-14 h-14 bg-[#D1D5DB] flex items-center justify-center shrink-0">
          <Image src="/images/logo-left-menu.svg" alt="Logo" width={38} height={43} />
        </div>

        {/* Decorative vertical pattern */}
        <div className="flex-1 relative">
          {/* Grid pattern - 3x3 dots repeated vertically */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="dotPattern"
              x="0"
              y="0"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2.67" cy="2.67" r="1.3" fill="black" />
              <circle cx="2.67" cy="9.33" r="1.3" fill="black" />
              <circle cx="2.67" cy="16" r="1.3" fill="black" />
              <circle cx="9.33" cy="2.67" r="1.3" fill="black" />
              <circle cx="9.33" cy="9.33" r="1.3" fill="black" />
              <circle cx="9.33" cy="16" r="1.3" fill="black" />
            </pattern>
          </svg>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-px bg-[#CBD5E1]"></div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Large Logo - Aligned with top icon */}
        <div className="h-14 flex items-center shrink-0">
          <Image
            src="/images/logo-main.svg"
            alt="The S-Lab"
            width={156}
            height={19}
            className="w-auto h-auto"
          />
        </div>

        {/* Main content area with padding */}
        <div className="flex-1 flex flex-col px-6 pt-12">
          {/* Navigation Menu */}
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className={`flex items-center gap-1 font-bold text-base leading-[22px] tracking-[-0.18px] transition-colors ${isActive("/") ? "text-[#EF4444]" : "text-[#111827] hover:text-[#EF4444]"
                }`}
            >
              /Home
            </Link>

            {/* The S-Lab Group */}
            <div className="flex flex-col gap-2">
              <Link
                href="/the-s-lab"
                onClick={() => setIsSLabOpen(!isSLabOpen)}
                className={`flex items-center text-left gap-1 font-bold text-base leading-[22px] tracking-[-0.18px] transition-all ${isSLabActive
                  ? "text-[#EF4444] ml-[10px]"
                  : "text-[#111827] hover:text-[#EF4444]"
                  }`}
              >
                /The S-Lab

                <svg xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${isSLabOpen ? "" : "rotate-180"}`}
                  width="12" height="7" viewBox="0 0 12 7" fill="none" >
                  <path d="M11 5.79167L6 1L1 5.79167" stroke={isSLabActive ? "#EF4444" : "#111827"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Submenu */}
              {isSLabOpen && (
                <div className="pl-4 flex flex-col gap-2">
                  <Link
                    href="/s-library"
                    className={`flex items-center gap-2 font-medium text-base leading-[22px] tracking-[-0.18px] transition-colors ${isActive("/s-library")
                      ? "text-[#EF4444]"
                      : "text-[#4B5563] hover:text-[#EF4444]"
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    The S-Library
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/courses"
              className={`flex items-center gap-1 font-bold text-base leading-[22px] tracking-[-0.18px] transition-colors ${isActive("/courses") ? "text-[#EF4444]" : "text-[#111827] hover:text-[#EF4444]"
                }`}
            >
              /Course
              <span className="text-[#EF4444] ml-1 text-[12px] relative -top-1.5">/HOT/</span>
            </Link>

            <Link
              href="/blog"
              className={`font-bold text-base leading-[22px] tracking-[-0.18px] transition-colors ${isActive("/blog") ? "text-[#EF4444]" : "text-[#111827] hover:text-[#EF4444]"
                }`}
            >
              /Blog
            </Link>

            <Link
              href="/event"
              className={`font-bold text-base leading-[22px] tracking-[-0.18px] transition-colors ${isActive("/event") ? "text-[#EF4444]" : "text-[#111827] hover:text-[#EF4444]"
                }`}
            >
              /Event
            </Link>
          </nav>

          {/* Bottom Content */}
          <div className="mt-auto mb-8 flex flex-col gap-7">
            {/* Decorative Line */}
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="12" viewBox="0 0 41 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H2.05V12H0V0ZM4.1 0H8.2V12H4.1V0ZM12.3 0H14.35V12H12.3V0ZM16.4 0H22.55V12H16.4V0ZM24.6 0H26.65V12H24.6V0ZM30.75 0H32.8V12H30.75V0ZM34.85 0H36.9V12H34.85V0ZM38.95 0H41V12H38.95V0Z" fill="black" />
            </svg>

            {/* Contact Info */}
            <div className="flex flex-col gap-1">
              <p className="text-[#6B7280] text-sm font-bold leading-[20px] tracking-[-0.16px]">
                (312) 555-2468
              </p>
              <p className="text-[#111827] text-xl font-bold leading-[24px]">
                hello@theslab.agency
              </p>
            </div>

            {/* Copyright */}
            <p className="text-[#6B7280] text-sm font-medium leading-[20px] tracking-[-0.16px]">
              © 2026 the s-lab.
              <br />
              All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <Image src="/images/social-icons.svg" alt="Social Media" width={104} height={20} />
            </div>

            {/* Year */}
            <p className="text-[#111827] text-sm font-bold leading-[20px] tracking-[-0.16px]">
              20©
              <br />
              26
            </p>
          </div>
        </div>
      </div >
    </aside >
  );
});
LeftMenu.displayName = "LeftMenu";

export default LeftMenu;
