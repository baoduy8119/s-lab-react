"use client";

import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import PolygonImage from "@/app/components/PolygonImage";
import styles from "./TestimonialSlider.module.scss";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jacob B.",
    role: "HR Manager Bank Central Indo",
    quote: "“We’re a boundary-pushing creative agency from Yogyakarta — crafting innovative design, strategic narratives, and unforgettable brand journeys for those who dare to dream big.”",
    image: "/images/courses/mar-4.jpg"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "CMO TechFlow",
    quote: "“The strategic insights from this course transformed our marketing approach. We moved from guessing to precision targeting in just weeks.”",
    image: "/images/courses/mar-1.png"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder StartupX",
    quote: "“Excellent curriculum that balances theory with real-world application. The templates alone are worth the investment.”",
    image: "/images/courses/mar-2.png"
  }
];

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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const TestimonialSlider = React.memo(function TestimonialSlider() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className={styles.swiper}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={styles.slideContent}>
                {/* Visual Side (Image) */}
                <div className={styles.imageWrapper}>
                  <PolygonImage
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={600}
                    topLeftCut={40}
                    className={styles.profileImage}
                  />
                </div>

                {/* Text Side */}
                <div className={styles.textContent}>
                  <div className={styles.header}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.role}>{item.role}</p>
                  </div>

                  <blockquote className={styles.quote}>
                    {item.quote}
                  </blockquote>

                  {/* Navigation Buttons using internal component context */}
                  <NavButtons />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
});

TestimonialSlider.displayName = "TestimonialSlider";

export default TestimonialSlider;
