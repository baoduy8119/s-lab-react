import Image from "next/image";
import React from "react";
import PartnerLogos from "./PartnerLogos";

const HeroSection = React.memo(function HeroSection() {
  return (
    <section className="relative w-full h-[829px] overflow-hidden bg-white">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/images/background-pattern.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      ></div>

      {/* 3D Logo Background */}
      <div className="absolute right-[-54px] top-[-103px] w-[1080px] h-[829px]">
        <Image
          src="/images/3d-logo-41976a.png"
          alt="3D Logo"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Theory Badge */}
      <div className="absolute right-[140px] top-[510px] bg-[#FDE68A] px-2.5 py-2.5 inline-flex items-center justify-center rotate-[7deg]">
        <p className="text-[#111827] text-2xl font-bold leading-[30px] tracking-[-0.15px]">
          Theory is where you practice
        </p>
      </div>

      {/* Main Content */}
      <div className="absolute left-[75px] top-[82px] w-[595px] flex flex-col gap-[30px]">
        {/* Headline */}
        <h1 className="text-xl font-bold text-[#111827] w-[347px] leading-[27.5px] tracking-[-0.225px]">
          A sturdy backpack on your journey to conquer business knowledge and practical experience
        </h1>

        {/* Decorative SVG - Group 11 */}
        <div className="w-[595px] h-[279px]">
          <Image src="/images/hero-graphic.svg" alt="Hero Graphic" width={595} height={280} />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="bg-[#EF4444] text-white font-bold text-base leading-[22px] tracking-[-0.18px] px-6 py-[13px] hover:bg-[#DC2626] transition-colors">
            Start coaching now
          </button>
          <button className="bg-white text-[#111827] font-bold text-base leading-[22px] tracking-[-0.18px] px-6 py-[13px] border border-[#D1D5DB] hover:bg-gray-50 transition-colors">
            See our work
          </button>
        </div>

        {/* Feedback Section */}
        <div className="w-[269px] flex flex-col">
          <div className="flex items-center gap-2">
            {/* Star Rating */}
            <Image src="/images/star-rating.svg" alt="5 stars" width={56} height={8} />
            <span className="text-[#111827] text-xs font-bold leading-[16px] tracking-[-0.12px]">
              4.9 / 5
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-bold leading-[16px] tracking-[-0.12px]">
            We have helped over 950+ students
            <br />
            achieve their goals — you could be the next one.
          </p>
        </div>
      </div>

      {/* Partner Logos */}
      <div className="absolute bottom-0 left-0 w-full">
        <PartnerLogos />
      </div>

      {/* Small Hero Image */}
      <div className="absolute right-[357px] top-[6px] w-[259px] h-[240px] rounded-lg overflow-hidden">
        <Image src="/images/hero-image-76f7dd.png" alt="Hero" fill style={{ objectFit: "cover" }} />
      </div>
    </section>
  );
});
HeroSection.displayName = "HeroSection";

export default HeroSection;
