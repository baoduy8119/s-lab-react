"use client";

import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import PolygonImage from "@/app/components/PolygonImage";
import styles from "./TestimonialSlider.module.scss";
import Container from "@/app/components/Container";
import {
  detailSectionId,
  useCourseDetailContentStore,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

function getTestimonialIndices(section: Record<string, unknown>): number[] {
  const indices = new Set<number>();
  for (const k of Object.keys(section)) {
    const m = /^t(\d+)(Name|Role|Quote|Image)$/.exec(k);
    if (!m) continue;
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > 0) indices.add(n);
  }
  return Array.from(indices).sort((a, b) => a - b);
}

// Internal component to access Swiper context
const NavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className={styles.navigation}>
      <button
        onClick={() => swiper.slidePrev()}
        className={styles.navBtnPrev}
        aria-label="Previous"
        type="button"
      >
        <div className={styles.circleBg}></div>
        <svg className={styles.arrowIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={() => swiper.slideNext()}
        className={styles.navBtnNext}
        aria-label="Next"
        type="button"
      >
        <div className={styles.circleBg}></div>
        <svg className={styles.arrowIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

interface TestimonialSliderProps {
  courseId: string;
}

const TestimonialSlider = React.memo(function TestimonialSlider({
  courseId,
}: TestimonialSliderProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) =>
      s.getSection(detailSectionId(courseId, "testimonialSlider"))
    )
  );
  const indices = getTestimonialIndices(section);
  const testimonials: Testimonial[] = indices
    .map((n) => ({
      id: n,
      name: (section[`t${n}Name`] as string) || "",
      role: (section[`t${n}Role`] as string) || "",
      quote: (section[`t${n}Quote`] as string) || "",
      image: (section[`t${n}Image`] as string) || "",
    }))
    .filter((t) => t.name || t.role || t.quote || t.image);

  return (
    <section className={styles.section}>
      <Container>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          autoplay={false}
          className={styles.swiper}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={styles.slideContent}>
                {/* Visual Side (Image) */}
                <div className={styles.imageWrapper}>
                  <PolygonImage
                    src={item.image || "/images/courses/jacob.jpg"}
                    alt={item.name}
                    width={297}
                    height={350}
                    topLeftCut={30}
                    className={styles.profileImage}
                  />
                </div>

                {/* Text Side */}
                <div className={styles.textContent}>
                  <div className={styles.topSection}>
                    <div className={styles.header}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <p className={styles.role}>{item.role}</p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className={styles.navWrapper}>
                      <NavButtons />
                    </div>
                  </div>

                  <blockquote className={styles.quote}>
                    {item.quote}
                  </blockquote>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
});

TestimonialSlider.displayName = "TestimonialSlider";

export default TestimonialSlider;
