"use client";

import Image from "next/image";
import React from "react";
import PartnerLogos from "./PartnerLogos";
import MouseTracker3D from "./MouseTracker3D";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";

const HeroSection = React.memo(function HeroSection() {
  const c = useHomeContentStore((s) => s.content.hero);

  return (
    <section className="relative w-full lg:h-[860px] overflow-hidden bg-white">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url(/images/background-pattern.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      ></div>

      {/* Mobile-Specific Hero Layout */}
      <div className="block lg:hidden px-4 pt-8 pb-12 flex flex-col gap-6">
        <h1
          className="text-[40px] leading-[48px] font-bold text-[#111827] tracking-[-1.5px] uppercase"
          data-aos="fade-up"
        >
          {c.heading.split(/\s+/).reduce<React.ReactNode[]>((acc, word, i) => {
            if (i > 0) acc.push(<br key={`br-${i}`} />);
            acc.push(word);
            return acc;
          }, [])}
        </h1>

        <p
          className="text-base text-[#111827] font-medium leading-[22px]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {c.tagline}
        </p>

        <div
          className="flex flex-col gap-3 w-full"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <button className="w-full bg-[#EF4444] text-white font-bold text-base py-[13px] hover:bg-[#DC2626] transition-colors">
            Get in touch now
          </button>
          <button className="w-full bg-white text-[#111827] font-bold text-base py-[13px] hover:opacity-60 transition-opacity">
            {c.buttonSecondary}
          </button>
        </div>

        {/* Feedback Section Mobile */}
        <div
          className="flex flex-col gap-1 mt-2"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex items-center gap-2">
            <Image src="/images/star-rating.svg" alt="5 stars" width={56} height={8} />
            <span className="text-[#111827] text-xs font-bold">{c.rating}</span>
          </div>
          <p className="text-[#6B7280] text-xs font-bold leading-[16px]">
            {c.feedbackText}
          </p>
        </div>
      </div>

      {/* Desktop Layout Elements (Hidden on Mobile) */}
      <div
        className="hidden lg:block absolute right-[-54px] top-[-103px] w-[1080px] h-[829px]"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <MouseTracker3D>
          <Image
            src="/images/3d-logo-41976a.png"
            alt="3D Logo"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </MouseTracker3D>
      </div>

      <div
        className="hidden lg:inline-flex absolute right-[140px] top-[510px] bg-[#FDE68A] px-2.5 py-2.5 items-center justify-center rotate-[7deg]"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <p className="text-[#111827] text-2xl font-bold leading-[30px] tracking-[-0.15px]">
          {c.yellowBadge}
        </p>
      </div>

      <div
        className="hidden lg:flex absolute left-[75px] top-[82px] w-[595px] flex-col gap-[30px]"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <h1 className="text-xl font-bold text-[#111827] w-[347px] leading-[27.5px] tracking-[-0.225px]">
          {c.tagline}
        </h1>

        <div className="w-[595px] h-[279px]">
          <Image src="/images/hero-graphic.svg" alt="Hero Graphic" width={595} height={280} />
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-[#EF4444] text-white font-bold text-base leading-[22px] tracking-[-0.18px] px-6 py-[13px] hover:bg-[#DC2626] transition-colors cursor-pointer">
            {c.buttonPrimary}
          </button>
          <button className="bg-white text-[#111827] font-bold text-base leading-[22px] tracking-[-0.18px] px-6 py-[13px] hover:opacity-60 transition-opacity cursor-pointer">
            {c.buttonSecondary}
          </button>
        </div>

        <div className="w-[269px] flex flex-col">
          <div className="flex items-center gap-2">
            <Image src="/images/star-rating.svg" alt="5 stars" width={56} height={8} />
            <span className="text-[#111827] text-xs font-bold leading-[16px] tracking-[-0.12px]">
              {c.rating}
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-bold leading-[16px] tracking-[-0.12px]">
            {c.feedbackText}
          </p>
        </div>
      </div>

      <div className="relative lg:absolute bottom-0 left-0 w-full">
        <PartnerLogos />
      </div>

      <div
        className="hidden lg:block absolute right-[357px] top-[6px] w-[259px] h-[240px] rounded-lg overflow-hidden"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <Image src={c.heroImage} alt="Hero" fill style={{ objectFit: "cover" }} unoptimized={c.heroImage.startsWith("data:")} />
      </div>
    </section>
  );
});
HeroSection.displayName = "HeroSection";

export default HeroSection;
