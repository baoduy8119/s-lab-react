"use client";

import React from "react";
import styles from "./TheSlabFooter.module.scss";
import PolygonSection from "@/app/components/PolygonSection";
import Image from "next/image";
import { SocialIcons } from "@/app/components/SocialIcons";

const TheSlabFooter = React.memo(function TheSlabFooter() {
  return (
    <footer>
      {/* Bottom Section - Using Grid Layout */}
      <PolygonSection topLeftCut={60}>
        <div
          className="relative w-full bg-[#171717] overflow-hidden px-6 pb-12 pt-16 lg:px-20 lg:py-11 mt-[-80px] lg:mt-[-80px] -mt-[1px]"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <Image
              src="/images/footer-black-bg.jpg"
              alt="Background"
              fill
              className="object-cover object-left-top"
              priority
            />
          </div>

          {/* Desktop Content Grid */}
          <div className="hidden lg:grid relative grid-cols-[1fr_2fr_1fr] gap-x-20" data-aos="fade-up">
            {/* Left Column - Company Info */}
            <div className="flex flex-col gap-[85px]">
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
                20©<br />26
              </p>
              <p className="text-[#D1D5DB] text-sm font-medium leading-[20px] tracking-[-0.16px] w-[237px]">
                A sturdy backpack on your journey to conquer business knowledge and practical experience
              </p>
            </div>

            {/* Middle Column - Contact Info */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">(312) 555-2468</p>
                <p className="text-white text-[32px] font-bold leading-[38px] tracking-[-0.2px]">hello@theslab.agency</p>
              </div>
              <SocialIcons />
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
                Lorem ipsum Location is here. Danang
              </p>
            </div>

            {/* Right Column - Navigation */}
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

          {/* Mobile Content Stack - Ordered per design */}
          <div className="flex lg:hidden relative flex-col gap-8" data-aos="fade-up">
            {/* 1. Contact Info */}
            <div className="flex flex-col gap-1">
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">(312) 555-2468</p>
              <p className="text-white text-[32px] font-bold leading-[40px] tracking-[-0.2px] break-all">hello@<br />theslab.agency</p>
            </div>

            {/* 2. Social Icons */}
            <SocialIcons />

            {/* 3. Location */}
            <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
              Lorem ipsum Location is here. Danang
            </p>

            {/* 4. Year */}
            <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px] mt-4">
              20©<br />26
            </p>

            {/* 5. Description */}
            <p className="text-[#D1D5DB] text-sm font-medium leading-[20px] tracking-[-0.16px] w-full">
              A sturdy backpack on your journey to conquer business knowledge and practical experience
            </p>
          </div>

        </div>
      </PolygonSection>
    </footer>
  );
});
TheSlabFooter.displayName = "TheSlabFooter";

export default TheSlabFooter;
