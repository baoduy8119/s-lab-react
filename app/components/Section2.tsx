"use client";

import Image from "next/image";
import React from "react";
import PolygonImage from "./PolygonImage";
import { useHomeContentStore } from "@/app/features/dashboard/stores/useHomeContentStore";

const Section2 = React.memo(function Section2() {
  const c = useHomeContentStore((s) => s.content.section2);

  const FeatureBlockMobile = ({
    number,
    title,
    desc,
    bgImage,
    bgColor,
    illustration,
    advisorGraphic,
    index,
  }: {
    number: string;
    title: string;
    desc: string;
    bgImage?: string;
    bgColor?: string;
    illustration?: string;
    advisorGraphic?: boolean;
    index: number;
  }) => (
    <div
      className={`relative w-full h-[206px] overflow-hidden ${bgColor || "bg-black"}`}
      data-aos="fade-up"
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image src={bgImage} alt="" fill className="object-cover" priority={index === 0} />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}
      {illustration && (
        <div className="absolute left-[4px] bottom-0 w-[202px] h-[151px] z-10">
          <Image src={illustration} alt="" fill className="object-contain" />
        </div>
      )}
      {advisorGraphic && (
        <div className="absolute left-[8px] bottom-[-50px] z-20 flex items-center justify-center">
          <div className="relative w-[195px] h-[195px]">
            <Image src="/images/section2/section2-advisor.png" alt="" fill className="object-contain" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-[#111827] text-[16px] font-bold leading-[20px] tracking-[-0.24px] text-center w-[120px] rotate-[-6.15deg]">
                {title}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="relative z-30 h-full flex flex-col justify-between p-4">
        <div className="flex flex-col items-end">
          <div className="text-white text-[12px] font-bold">{number}</div>
          <h3 className="text-white text-[16px] font-bold leading-[22px] max-w-[280px] text-right mt-2">
            {title}
          </h3>
        </div>
        <div className="flex justify-end">
          <p className="text-white text-[12px] font-medium leading-[16px] w-[200px] text-right">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full flex flex-col">
      {/* MOBILE UI */}
      <div className="block lg:hidden">
        <h2 className="px-4 lg:px-6 py-6 text-[#111827] text-[24px] font-bold leading-[30px] tracking-[-0.15px]">
          {c.sectionTitle}
        </h2>
        <FeatureBlockMobile index={0} number="/001/" title={c.feature1Title} desc={c.feature1Desc} bgImage="/images/section2/section2-bg1.png" />
        <FeatureBlockMobile index={1} number="/002/" title={c.feature2Title} desc={c.feature2Desc} bgColor="bg-[#8B5CF6]" illustration="/images/section2/frame6-decorative.svg" />
        <FeatureBlockMobile index={2} number="/003/" title={c.feature3Title} desc={c.feature3Desc} bgImage="/images/section2/section2-bg2-m.jpg" />
        <FeatureBlockMobile index={3} number="/004/" title={c.feature4Title} desc={c.feature4Desc} bgImage="/images/section2/section2-bg3.png" />
        <FeatureBlockMobile index={4} number="/005/" title={c.feature5Title} desc={c.feature5Desc} bgColor="bg-black" advisorGraphic={true} />
        <FeatureBlockMobile index={5} number="/006/" title={c.feature6Title} desc={c.feature6Desc} bgImage="/images/section2/section2-bg4-482c9c.jpg" />
      </div>

      {/* DESKTOP UI (Original structure restored from Step 15) */}
      <div className="hidden lg:flex flex-col w-full">
        {/* Card 1 */}
        <div className="relative w-full h-[565px] bg-black overflow-hidden group" data-aos="fade-up">
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
              className="w-full h-full"
              innerClassName="transition-transform duration-700 group-hover:scale-110"
              style={{ objectPosition: "center -73px" }}
              topLeftCut={60}
              topLeftCutMobile={30}
            />
          </div>
          <div className="absolute top-[40px] right-[40px] w-[108px] h-[74px]">
            <Image src="/images/s-lab-white-logo.svg" alt="The S-Lab" fill className="object-contain" />
          </div>
          <h2 className="absolute left-[86px] top-[48px] text-white text-[32px] font-bold leading-[38px] tracking-[-0.2px]">
            {c.sectionTitle}
          </h2>
          <div className="absolute right-[60px] bottom-[40px] text-white text-2xl font-bold leading-[30px] tracking-[-0.15px]">
            /001/
          </div>
          <h3 className="absolute left-[78px] top-[426px] text-white text-2xl font-bold leading-[30px] w-[500px]">
            {c.feature1Title}
          </h3>
          <p className="absolute left-[78px] top-[471px] text-white text-base font-medium leading-[22px] w-[352px]">
            {c.feature1Desc}
          </p>
        </div>

        {/* Card 2 & 3 */}
        <div className="relative w-full flex flex-row h-[565px] overflow-hidden" data-aos="fade-up">
          <div className="relative w-1/2 h-full flex flex-col justify-between px-20 py-[41px] bg-black overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image src="/images/section2/section2-bg2.png" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 z-10">
              <Image src="/images/section2/frame6-decorative.svg" alt="" fill className="object-cover" />
            </div>
            <div className="relative z-20 flex flex-col h-full justify-between">
              <div className="flex flex-col gap-[24px]">
                <h3 className="text-white text-2xl font-bold leading-[30px] w-full">
                  {c.feature2Title}
                </h3>
                <p className="text-white text-base font-medium leading-[22px] w-[400px]">
                  {c.feature2Desc}
                </p>
              </div>
              <div className="text-white text-2xl font-bold leading-[30px] tracking-[-0.15px]">
                /002/
              </div>
            </div>
          </div>

          <div className="relative w-1/2 h-full flex flex-col items-end justify-between bg-black overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image src="/images/section2/section2-bg2.png" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative z-20 text-white text-2xl font-bold mr-[60px] mt-[40px]">
              /003/
            </div>
            <div className="relative z-20 w-full h-[239px] bg-white/10 backdrop-blur-sm rounded-[8px] flex flex-col px-[80px] py-[40px]">
              <h3 className="text-white text-2xl font-bold leading-[30px] w-[295px]">
                {c.feature3Title}
              </h3>
              <p className="text-white text-base font-medium leading-[22px] w-[332px] mt-[20px]">
                {c.feature3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 & 5 */}
        <div className="relative w-full flex flex-row h-[565px] overflow-hidden" data-aos="fade-up">
          <div className="relative w-1/2 h-full flex flex-col justify-between bg-black overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Image src="/images/section2/section2-bg3.png" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="relative z-20 text-white text-2xl font-bold px-[80px] py-[40px]">
              /004/
            </div>
            <div className="relative z-20 w-full bg-white/10 backdrop-blur-sm rounded-[8px] flex flex-col px-[80px] py-[50px] mb-0">
              <h3 className="text-white text-2xl font-bold leading-[30px]">
                {c.feature4Title}
              </h3>
              <p className="text-white text-base font-medium leading-[22px] mt-[20px]">
                {c.feature4Desc}
              </p>
            </div>
          </div>

          <div className="relative w-1/2 h-full flex flex-col justify-between bg-black overflow-hidden px-[80px] py-[29px]">
            <div className="absolute inset-0 z-0 bg-black" />
            <div className="relative z-20 flex flex-col">
              <h3 className="text-white text-2xl font-bold leading-[30px] w-[378px]">
                {c.feature5Title}
              </h3>
              <p className="text-white text-base font-medium leading-[22px] w-[332px] mt-[20px]">
                {c.feature5Desc}
              </p>
            </div>
            <div className="relative z-20 flex flex-col items-end">
              <div className="relative w-[358px] h-[358px] mr-[41px]">
                <Image src="/images/section2/section2-advisor.png" alt="" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[#111827] text-[38px] font-bold leading-[48px] tracking-[-0.24px] text-center w-[212px]">
                    {c.feature5Title}
                  </div>
                </div>
              </div>
              <div className="text-white text-2xl font-bold mt-0 mr-[-28px] self-end">
                /005/
              </div>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="relative w-full h-[565px] bg-black overflow-hidden group" data-aos="fade-up">
          <div className="absolute left-0 top-[-172px] w-full h-[760px] z-0">
            <Image src="/images/section2/systems-thinking.jpg" alt="" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-110" />
          </div>
          {/* <div className="absolute left-0 top-[-172px] w-[1104px] h-[737px] z-10 pointer-events-none">
            <Image src="/images/section2/section2-bg4-482c9c.png" alt="" width={1104} height={737} className="object-cover" />
          </div> */}
          <div className="absolute right-[65px] top-[489px] text-white text-2xl font-bold z-30">
            /006/
          </div>
          <div className="absolute left-0 bottom-0 w-[586px] bg-white/10 backdrop-blur-sm z-20 flex flex-col pl-[80px] py-[40px]">
            <h3 className="text-white text-2xl font-bold leading-[30px] w-[452px]">
              {c.feature6Title}
            </h3>
            <p className="text-white text-base font-medium leading-[22px] w-[435px] mt-[15px]">
              {c.feature6Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

Section2.displayName = "Section2";

export default Section2;
