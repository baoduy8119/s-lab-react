"use client";

import Image from "next/image";
import React from "react";
import PolygonImage from "./PolygonImage";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";

const Section2 = React.memo(function Section2() {
  const c = useHomeContentStore((s) => s.content.section2);

  return (
    <section className="w-full flex flex-col">
      {/* Card 1: Structured curriculum */}
      <div
        className="relative w-full h-[565px] bg-black overflow-hidden group"
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-white">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "url(/images/background-pattern.png)",
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
            }}
          ></div>
          <PolygonImage
            src="/images/section2/section2-bg1.png"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "center -73px" }}
            topLeftCut={60}
            topLeftCutMobile={30}
          />
        </div>

        <div className="absolute top-[40px] right-[24px] lg:top-[40px] lg:right-[40px] w-[80px] h-[55px] lg:w-[108px] lg:h-[74px]">
          <Image src="/images/s-lab-white-logo.svg" alt="The S-Lab" fill className="object-contain" />
        </div>

        <h2 className="absolute left-[24px] top-[40px] w-[250px] lg:w-auto lg:left-[86px] lg:top-[48px] text-white text-[24px] lg:text-[32px] font-bold leading-[30px] lg:leading-[38px] tracking-[-0.2px]">
          {c.sectionTitle}
        </h2>

        <div className="block lg:hidden absolute left-[24px] top-[260px] text-white text-xl font-bold">/001/</div>
        <div className="hidden lg:block absolute right-[60px] bottom-[40px] text-white text-2xl font-bold leading-[30px] tracking-[-0.15px]">
          /001/
        </div>

        <h3 className="absolute left-[24px] bottom-[100px] lg:w-auto lg:left-[78px] lg:top-[426px] lg:bottom-auto text-white text-[20px] lg:text-2xl font-bold leading-[26px] lg:leading-[30px] w-[300px] lg:w-[406px]">
          {c.feature1Title}
        </h3>

        <p className="absolute left-[24px] bottom-[40px] lg:w-auto lg:left-[78px] lg:top-[471px] lg:bottom-auto text-white text-sm lg:text-base font-medium leading-[20px] lg:leading-[22px] w-[300px] lg:w-[302px]">
          {c.feature1Desc}
        </p>
      </div>

      {/* Card 2: Outcome-driven & Flexible learning */}
      <div
        className="relative w-full flex flex-col lg:flex-row lg:h-[565px] overflow-hidden"
        data-aos="fade-up"
      >
        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-full flex flex-col justify-between px-6 py-10 lg:px-20 lg:py-[41px] bg-black overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/section2/section2-bg2.png" alt="" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 z-10">
            <Image src="/images/section2/frame6-decorative.svg" alt="" fill className="object-cover" />
          </div>
          <div className="relative z-20 flex flex-col gap-6 lg:gap-[84px] lg:h-full lg:justify-between">
            <div className="flex flex-col gap-[24px] lg:gap-[24px]">
              <h3 className="text-white text-[20px] lg:text-2xl font-bold leading-[26px] lg:leading-[30px] w-full">
                {c.feature2Title}
              </h3>
              <p className="text-white text-sm lg:text-base font-medium leading-[20px] lg:leading-[22px] w-full lg:w-[400px]">
                {c.feature2Desc}
              </p>
            </div>
            <div className="text-white text-xl lg:text-2xl font-bold leading-[30px] tracking-[-0.15px]">
              /002/
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-full flex flex-col items-start lg:items-end justify-between bg-black overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/section2/section2-bg2.png" alt="" fill className="object-cover" />
          </div>
          <div className="relative z-20 text-white text-xl lg:text-2xl font-bold p-6 lg:p-0 lg:self-end lg:mr-[60px] lg:mt-[40px]">
            /003/
          </div>
          <div className="relative z-20 w-full lg:h-[239px] bg-white/10 backdrop-blur-sm rounded-[8px] flex flex-col px-6 py-6 lg:px-[80px] lg:py-[40px]">
            <h3 className="text-white text-[20px] lg:text-2xl font-bold leading-[26px] lg:leading-[30px] lg:w-[295px]">
              {c.feature3Title}
            </h3>
            <p className="text-white text-sm lg:text-base font-medium leading-[20px] lg:leading-[22px] lg:w-[332px] mt-4 lg:mt-[20px]">
              {c.feature3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: Project-first & High-touch advisor */}
      <div
        className="relative w-full flex flex-col lg:flex-row lg:h-[565px] overflow-hidden"
        data-aos="fade-up"
      >
        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-full flex flex-col justify-between bg-black overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/section2/section2-bg3.png" alt="" fill className="object-cover" />
          </div>
          <div className="relative z-20 text-white text-xl lg:text-2xl font-bold px-6 py-6 lg:px-[80px] lg:py-[40px]">
            /004/
          </div>
          <div className="relative z-20 w-full bg-white/10 backdrop-blur-sm rounded-[8px] flex flex-col px-6 py-6 lg:px-[80px] lg:py-[50px] mb-0">
            <h3 className="text-white text-[20px] lg:text-2xl font-bold leading-[26px] lg:leading-[30px]">
              {c.feature4Title}
            </h3>
            <p className="text-white text-sm lg:text-base font-medium leading-[20px] lg:leading-[22px] mt-4 lg:mt-[20px]">
              {c.feature4Desc}
            </p>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 lg:h-full flex flex-col justify-between bg-black overflow-hidden px-6 py-10 lg:px-[80px] lg:py-[29px]">
          <div className="absolute inset-0 z-0 bg-black" />
          <div className="relative z-20 flex flex-col">
            <h3 className="text-white text-[20px] lg:text-2xl font-bold leading-[26px] lg:leading-[30px] w-full lg:w-[378px]">
              {c.feature5Title}
            </h3>
            <p className="text-white text-sm lg:text-base font-medium leading-[20px] lg:leading-[22px] w-full lg:w-[332px] mt-4 lg:mt-[20px]">
              {c.feature5Desc}
            </p>
          </div>
          <div className="relative z-20 flex flex-col items-center lg:items-end mt-10 lg:mt-0">
            <div className="relative w-[300px] h-[300px] lg:w-[358px] lg:h-[358px] lg:mr-[41px]">
              <Image src="/images/section2/section2-advisor.png" alt="" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[#111827] text-[28px] lg:text-[38px] font-bold leading-[36px] lg:leading-[48px] tracking-[-0.24px] text-center w-[180px] lg:w-[212px]">
                  {c.feature5Title}
                </div>
              </div>
            </div>
            <div className="text-white text-xl lg:text-2xl font-bold mt-4 lg:mt-0 lg:mr-[-28px] self-end">
              /005/
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: AI-enabled workflows */}
      <div
        className="relative w-full h-[565px] bg-black overflow-hidden"
        data-aos="fade-up"
      >
        <div className="absolute left-0 top-[-50px] lg:top-[-172px] w-full h-[500px] lg:h-[760px] z-0">
          <Image src="/images/section2/section2-bg4-482c9c.png" alt="" fill className="object-cover object-top" />
        </div>
        <div className="hidden lg:block absolute left-0 top-[-172px] w-[1104px] h-[737px] z-10 pointer-events-none">
          <Image src="/images/section2/section2-bg5.png" alt="" width={1104} height={737} className="object-cover" />
        </div>
        <div className="absolute right-[24px] top-[40px] lg:right-[65px] lg:top-[489px] text-white text-xl lg:text-2xl font-bold z-30">
          /006/
        </div>
        <div className="absolute left-0 bottom-0 w-full lg:w-[586px] bg-white/10 backdrop-blur-sm z-20 flex flex-col px-6 py-6 lg:pl-[80px] lg:py-[40px]">
          <h3 className="text-white text-[20px] lg:text-2xl font-bold leading-[26px] lg:leading-[30px] w-full lg:w-[452px]">
            {c.feature6Title}
          </h3>
          <p className="text-white text-sm lg:text-base font-medium leading-[20px] lg:leading-[22px] w-full lg:w-[435px] mt-4 lg:mt-[15px]">
            {c.feature6Desc}
          </p>
        </div>
      </div>
    </section>
  );
});
Section2.displayName = "Section2";

export default Section2;
