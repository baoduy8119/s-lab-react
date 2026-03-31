"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./TestimonialsList.module.scss";
import QuoteIcon from "@/app/components/icons/QuoteIcon";
import Container from "@/app/components/Container";
import {
  detailSectionId,
  useCourseDetailContentStore,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

interface TestimonialsListProps {
  courseId: string;
}

function getTestimonialIndices(section: Record<string, unknown>): number[] {
  const indices = new Set<number>();
  for (const k of Object.keys(section)) {
    const m = /^l(\d+)(Text|Name|Role|Image)$/.exec(k);
    if (!m) continue;
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > 0) indices.add(n);
  }
  return Array.from(indices).sort((a, b) => a - b);
}

const TestimonialsList = React.memo(function TestimonialsList({
  courseId,
}: TestimonialsListProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) =>
      s.getSection(detailSectionId(courseId, "testimonialsList"))
    )
  );
  const heading = (section.heading as string) || "/Testimonials.";
  const indices = getTestimonialIndices(section);
  const testimonials = indices
    .map((n) => ({
      id: n,
      text: (section[`l${n}Text`] as string) || "",
      name: (section[`l${n}Name`] as string) || "",
      role: (section[`l${n}Role`] as string) || "",
      image: (section[`l${n}Image`] as string) || "",
    }))
    .filter((t) => t.text || t.name || t.role || t.image);

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>{heading}</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          centeredSlides={false}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className={styles.swiper}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <div className={styles.card}>
                <div className={styles.contentInner}>
                  <div className={styles.quoteIcon}>
                    <QuoteIcon />
                  </div>

                  <div className={styles.textContent}>
                    <p className={styles.text}>{item.text}</p>
                  </div>
                </div>

                <div className={styles.profile}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.image || "/images/avatar.png"}
                      alt={item.name}
                      width={48}
                      height={48}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.name}>/{item.name}</p>
                    <p className={styles.role}>{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
});

TestimonialsList.displayName = "TestimonialsList";

export default TestimonialsList;
