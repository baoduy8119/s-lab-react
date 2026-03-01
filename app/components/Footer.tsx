"use client";

import Image from "next/image";
import React from "react";
import SLabLogoWhite from "./SLabLogoWhite";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import PolygonSection from "./PolygonSection";
import { SocialIcons } from "./SocialIcons";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";

const Footer = React.memo(function Footer() {
  const c = useHomeContentStore((s) => s.content.footer);

  return (
    <footer className="w-full">
      {/* Top Section - Newsletter */}
      <PolygonSection topLeftCut={60}>
        <div className="relative w-full lg:h-[465px] bg-[#DC2626] overflow-hidden pb-[80px] lg:pb-0">
          <div className="absolute inset-0">
            <Image
              src="/images/footer-red-bg.jpg"
              alt="Background"
              fill
              className="object-cover object-left-top"
              priority
            />
          </div>

          <div className="relative flex flex-col h-full px-6 py-10 lg:p-0">
            <div className="absolute top-6 right-6 lg:top-[73px] lg:right-20">
              <SLabLogoWhite />
            </div>

            <h2
              className="mt-16 lg:mt-0 lg:absolute lg:left-20 lg:top-[94px] text-[#450A0A] text-[56px] lg:text-[72px] font-bold leading-[64px] lg:leading-[88px] tracking-[-0.8px] w-full lg:w-[552px] mb-4 lg:mb-0"
              data-aos="fade-up"
            >
              {c.newsletterHeading.includes("the loop.") ? (
                <>
                  {c.newsletterHeading.split("the loop.")[0]}
                  <br className="lg:hidden" />
                  <span className="text-white">the loop.</span>
                </>
              ) : (
                c.newsletterHeading
              )}
            </h2>

            <div
              className="flex items-start gap-3 lg:absolute lg:left-[116px] lg:top-[229px] mb-12 lg:mb-0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="mt-1 lg:hidden">
                <ArrowRightIcon color="#fff" />
              </div>
              <div className="hidden lg:block absolute left-[-36px] top-[6px]">
                <ArrowRightIcon color="#fff" />
              </div>

              <p className="text-[#450A0A] text-lg lg:text-2xl font-bold leading-normal lg:leading-[30px] tracking-[-0.15px] w-full lg:w-[193px]">
                {c.newsletterSubtitle}
              </p>
            </div>

            <div
              className="lg:absolute lg:left-[369px] lg:top-[225px] lg:right-[80px]"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="relative flex items-center border-b border-[#450A0A] lg:border-white pb-4 lg:pb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none outline-none text-white text-lg lg:text-xl font-medium leading-[24px] placeholder-white placeholder-opacity-100 flex-1"
                />
                <button className="w-[48px] h-[48px] bg-[#450A0A] rounded-full flex items-center justify-center hover:bg-[#7C2D12] transition-colors shrink-0 ml-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </PolygonSection>

      {/* Bottom Section */}
      <PolygonSection topLeftCut={60}>
        <div className="relative w-full bg-[#171717] overflow-hidden px-6 pb-12 pt-16 lg:px-20 lg:py-11 mt-[-80px] lg:mt-[-80px] -mt-[1px]">
          <div className="absolute inset-0">
            <Image src="/images/footer-black-bg.jpg" alt="Background" fill className="object-cover object-left-top" priority />
          </div>

          {/* Desktop Content Grid */}
          <div className="hidden lg:grid relative grid-cols-[1fr_2fr_1fr] gap-x-20" data-aos="fade-up">
            <div className="flex flex-col gap-[85px]">
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
                20©<br />26
              </p>
              <p className="text-[#D1D5DB] text-sm font-medium leading-[20px] tracking-[-0.16px] w-[237px]">
                {c.description}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">{c.phone}</p>
                <p className="text-white text-[32px] font-bold leading-[38px] tracking-[-0.2px]">{c.email}</p>
              </div>
              <SocialIcons />
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
                {c.location}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-[#6B7280] text-sm font-medium leading-[20px] tracking-[-0.16px] mb-1">/Navigation</p>
              <div className="flex flex-col gap-1.5">
                <a href="#" className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors">Home</a>
                <a href="#" className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors">The S-Lab</a>
                <a href="#" className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors">Course</a>
                <a href="#" className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors">Blog</a>
                <a href="#" className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors">Event</a>
              </div>
            </div>
          </div>

          {/* Mobile Content Stack */}
          <div className="flex lg:hidden relative flex-col gap-8" data-aos="fade-up">
            <div className="flex flex-col gap-1">
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">{c.phone}</p>
              <p className="text-white text-[32px] font-bold leading-[40px] tracking-[-0.2px] break-all">{c.email}</p>
            </div>
            <SocialIcons />
            <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
              {c.location}
            </p>
            <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px] mt-4">
              20©<br />26
            </p>
            <p className="text-[#D1D5DB] text-sm font-medium leading-[20px] tracking-[-0.16px] w-full">
              {c.description}
            </p>
          </div>
        </div>
      </PolygonSection>
    </footer>
  );
});
Footer.displayName = "Footer";

export default Footer;
