import Image from "next/image";
import React from "react";
import SLabLogoWhite from "./SLabLogoWhite";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import PolygonSection from "./PolygonSection";
import { SocialIcons } from "./SocialIcons";

const Footer = React.memo(function Footer() {
  return (

    <footer className="w-full">
      {/* Top Section - Newsletter - 565px height */}
      <PolygonSection topLeftCut={60}>
        <div className="relative w-full h-[565px] bg-[#DC2626] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <Image
              src="/images/footer-red-bg.jpg"
              alt="Background"
              fill
              className="object-cover object-left-top"
              priority
            />
          </div>

          {/* Title - Top Left */}
          <h2 className="absolute left-20 top-[94px] text-[#450A0A] text-[72px] font-bold leading-[88px] tracking-[-0.8px] w-[552px]">
            /Stay in <span className="text-white">the loop.</span>
          </h2>

          {/* Logo - Top Right */}
          <div className="absolute top-[73px] right-20">
            <SLabLogoWhite />
          </div>

          {/* Subtitle */}
          <p className="absolute left-[116px] top-[229px] text-[#450A0A] text-2xl font-bold leading-[30px] tracking-[-0.15px] w-[193px]">
            Smart updates for smart people.
          </p>

          {/* Email Input - Positioned at x:369, y:225 */}
          <div className="absolute left-[369px] top-[225px] w-[650px]">
            <div className="relative flex items-center border-b border-white pb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none text-white text-xl font-medium leading-[24px] placeholder-white placeholder-opacity-100 flex-1"
              />
              <button className="w-[48px] h-[48px] bg-[#450A0A] rounded-full flex items-center justify-center hover:bg-[#7C2D12] transition-colors shrink-0 ml-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Email Icon - Left of input at x:80, y:229 */}
          <div className="absolute left-20 top-[235px]">
            <ArrowRightIcon color="#fff" />
          </div>
        </div>
      </PolygonSection>

      {/* Bottom Section - Using Grid Layout */}
      <PolygonSection topLeftCut={60}>
        <div className="relative w-full bg-[#171717] overflow-hidden px-20 py-11 mt-[-80px]">
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

          {/* Content Grid */}
          <div className="relative grid grid-cols-[1fr_2fr_1fr] gap-x-20">
            {/* Left Column - Company Info */}
            <div className="flex flex-col gap-[85px]">
              {/* Year */}
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
                20©
                <br />
                26
              </p>

              {/* Description */}
              <p className="text-[#D1D5DB] text-sm font-medium leading-[20px] tracking-[-0.16px] w-[237px]">
                A sturdy backpack on your journey to conquer business knowledge and practical
                experience
              </p>
            </div>

            {/* Middle Column - Contact Info */}
            <div className="flex flex-col gap-6">
              {/* Phone and Email */}
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
                  (312) 555-2468
                </p>
                <p className="text-white text-[32px] font-bold leading-[38px] tracking-[-0.2px]">
                  hello@theslab.agency
                </p>
              </div>

              {/* Social Icons */}
              <SocialIcons />

              {/* Location */}
              <p className="text-white text-sm font-bold leading-[20px] tracking-[-0.16px]">
                Lorem ipsum Location is here. Danang
              </p>
            </div>

            {/* Right Column - Navigation */}
            <div className="flex flex-col gap-1.5">
              <p className="text-[#6B7280] text-sm font-medium leading-[20px] tracking-[-0.16px] mb-1">
                /Navigation
              </p>
              <a
                href="#"
                className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
              >
                The S-Lab
              </a>
              <a
                href="#"
                className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
              >
                Course
              </a>
              <a
                href="#"
                className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-white text-base font-bold leading-[22px] tracking-[-0.18px] hover:text-[#EF4444] transition-colors"
              >
                Event
              </a>

            </div>
          </div>
        </div>
      </PolygonSection>
    </footer >
  );
});
Footer.displayName = "Footer";

export default Footer;
