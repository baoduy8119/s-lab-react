"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Container from "@/app/components/Container";
import styles from "./HomeTestimonial.module.scss";
import PolygonSection from "@/app/components/PolygonSection";

const testimonials = [
  {
    id: 1,
    text: "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
    name: "Lora K.",
    role: "Student, InnovateHealth",
    image: "/images/avatar.png"
  },
  {
    id: 2,
    text: "Working with The S-Lab was a game-changer. Their strategic insights helping us navigate complex market shifts with confidence gave us a clear competitive advantage.",
    name: "Michael C.",
    role: "Founder, TechFlow",
    image: "/images/avatar.png"
  },
  {
    id: 3,
    text: "They don't just execute; they think. The team challenged our assumptions and delivered a product that exceeded our expectations in every measurable way.",
    name: "Sarah J.",
    role: "Marketing Director, OmniGroup",
    image: "/images/avatar.png"
  }
];

const NavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navButtons}>
        <button onClick={() => swiper.slidePrev()} className={styles.navBtn} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={() => swiper.slideNext()} className={styles.navBtn} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className={styles.navText}>
        Our clients don't just hire us for our skills — they stay with us because we consistently deliver clarity, speed, and measurable outcomes.
      </p>
    </div>
  );
};

const HomeTestimonial = React.memo(function HomeTestimonial() {
  return (
    <PolygonSection topLeftCut={60}>
      <section className={styles.section}>
        {/* Background */}
        <div className={styles.bgOverlay}>
          <Image
            src="/images/courses/course-includes-bg.jpg"
            alt="Background"
            fill
            className={styles.bgImage}
            priority
          />
          <div className={styles.bgGradient}></div>
        </div>

        <Container className={styles.innerContainer}>
          <div className={styles.header}>
            <h2 className={styles.heading}>/Our Testimonials.</h2>
          </div>

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={40}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            className={styles.swiper}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.slideContent}>
                  <div className={styles.quoteIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="130" height="97" viewBox="0 0 130 97" fill="none">
                      <path d="M51.5439 20.2979L50.7285 20.4512C43.2711 21.8535 37.1437 24.7628 32.3037 29.1523C28.1098 33.1528 25.8708 37.7895 25.5332 43.0967C28.3448 42.1887 31.3293 41.7363 34.4814 41.7363C41.1641 41.7363 46.7781 44.1054 51.2539 48.835C56.0022 53.3588 58.3261 59.6039 58.3262 67.4365C58.3262 75.544 55.744 82.2526 50.5381 87.4736L50.5371 87.4727C45.5646 92.6992 38.9889 95.2852 30.9121 95.2852C22.2989 95.2851 15.1243 92.0612 9.45996 85.6396L9.45312 85.6318L9.44727 85.625C3.78295 78.9562 1 70.1137 1 59.2031C1.00003 51.4614 2.20603 44.3024 4.63086 37.7363C7.04964 31.1866 10.4405 25.3552 14.8037 20.25C19.1648 15.1474 24.3727 11.0151 30.4209 7.85645C36.4863 4.44995 43.154 2.26441 50.4111 1.29395L51.5439 1.14258V20.2979ZM122.218 20.2979L121.403 20.4512C113.943 21.8541 107.814 24.7656 102.973 29.1582C98.5861 33.1385 96.2313 37.8451 95.8584 43.3184C98.5163 42.2584 101.502 41.7363 104.799 41.7363C111.48 41.7363 117.201 44.1027 121.907 48.8135L122.347 49.2422C126.814 53.7308 129 59.8369 129 67.4365C129 75.535 126.423 82.2365 121.229 87.4551L121.229 87.4561C116.255 92.6944 109.672 95.2852 101.586 95.2852C92.9728 95.285 85.798 92.0612 80.1338 85.6396L80.1279 85.6318L80.1221 85.625C74.4577 78.9562 71.6738 70.1138 71.6738 59.2031C71.6739 51.4613 72.8808 44.3024 75.3057 37.7363C77.7244 31.1867 81.1143 25.3552 85.4775 20.25C89.8385 15.1474 95.0466 11.0151 101.095 7.85645C107.16 4.44992 113.829 2.26439 121.086 1.29395L122.218 1.14258V20.2979Z" stroke="#EF4444" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className={styles.textContent}>
                    <blockquote className={styles.quoteText}>
                      {item.text}
                    </blockquote>

                    <div className={styles.userInfo}>
                      <div className={styles.avatarWrapper}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className={styles.avatar}
                        />
                      </div>
                      <div className={styles.userDetails}>
                        <p className={styles.userName}>/{item.name}</p>
                        <p className={styles.userRole}>{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation placed inside slide for context access, or use component */}
                <NavButtons />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>

        {/* Marquee Footer */}
        <div className={styles.marqueeStrip}>
          <div className={styles.marqueeContent}>
            {Array(20).fill("THE S-LAB").map((text, i) => (
              <div key={i} className={styles.marqueeItem}>
                <span>{text}</span>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.marqueeIcon}>
                  <path d="M12.5 0L14.0326 1.48869C15.6599 3.06902 17.7962 4.09017 20.0761 4.37688L22.2163 4.64609L22.4437 6.79093C22.6858 9.07222 23.6841 11.1963 25.2679 12.8029L26.759 14.3152H24.634C22.3687 14.3152 20.2185 15.2974 18.7303 16.9691L17.3292 18.5428L15.9281 16.9691C14.4399 15.2974 12.2897 14.3152 10.0244 14.3152H7.89941L9.39053 12.8029C10.9743 11.1963 11.9726 9.07222 12.2147 6.79093L12.4421 4.64609L14.5823 4.37688C16.8622 4.09017 18.9985 3.06902 20.6258 1.48869L22.1584 0H12.5Z" fill="#374151" style={{ display: 'none' }} />
                  {/* Using a simple star/spark shape as placeholder based on standard design */}
                  <path d="M12.5 0L15.5 9.5L25 12.5L15.5 15.5L12.5 25L9.5 15.5L0 12.5L9.5 9.5L12.5 0Z" fill="#374151" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PolygonSection>
  );
});

HomeTestimonial.displayName = "HomeTestimonial";

export default HomeTestimonial;
