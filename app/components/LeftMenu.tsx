import Image from "next/image";
import React from "react";

const LeftMenu = React.memo(function LeftMenu() {
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
          <nav className="flex flex-col gap-2">
            <a
              href="#"
              className="flex items-center gap-1 px-2 text-[#EF4444] font-bold text-base leading-[22px] tracking-[-0.18px]"
            >
              /Home
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-[#111827] font-bold text-base leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
            >
              /The S-Lab
              <svg
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9.21L8 4.42L13 9.21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="/courses"
              className="flex items-center gap-1 text-[#111827] font-bold text-base leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
            >
              /Course
              <span className="text-[#EF4444] font-bold ml-1">/HOT/</span>
            </a>
            <a
              href="/blog"
              className="text-[#111827] font-bold text-base leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
            >
              /Blog
            </a>
            <a
              href="#"
              className="text-[#111827] font-bold text-base leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
            >
              /Event
            </a>
          </nav>

          {/* Bottom Content */}
          <div className="mt-auto mb-8 flex flex-col gap-7">
            {/* Decorative Line */}
            <svg
              width="41"
              height="12"
              viewBox="0 0 41 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="41" height="12" fill="black" />
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
      </div>
    </aside>
  );
});
LeftMenu.displayName = "LeftMenu";

export default LeftMenu;
