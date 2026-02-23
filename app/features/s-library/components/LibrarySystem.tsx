"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./LibrarySystem.module.scss";

const LibrarySystem = React.memo(function LibrarySystem() {
  const categories = [
    {
      id: 1,
      name: "Design and Media",
      image: "/images/slib/design-media.png",
    },
    {
      id: 2,
      name: "Content Writing",
      image: "/images/slib/content-writing.png",
    },
    {
      id: 3,
      name: "Data Analytics",
      image: "/images/slib/data-analytics.png",
    },
    {
      id: 4,
      name: "Marketing Planning",
      image: "/images/slib/marketing-planning-lib.png",
    },
  ];

  const libraryCardsData = [
    {
      id: 1,
      title: "Data Analytics",
      image: "/images/slib/data-analytics.png",
    },
    {
      id: 2,
      title: "Content Writing",
      image: "/images/slib/content-writing.png",
    },
    {
      id: 3,
      title: "Marketing Planning",
      image: "/images/slib/marketing-planning-lib.png",
    },
    {
      id: 4,
      title: "Design and Media",
      image: "/images/slib/design-media.png",
    },
    {
      id: 5,
      title: "Logo/Illustration",
      image: "/images/slib/lib-card-5.svg",
    },
  ];

  const [isReady, setIsReady] = React.useState(false);
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title} data-aos="fade-up">/The S-Lab library system.</h2>

      {/* Library Cards Display */}
      {isReady && (
        <div className={styles.cardsContainerOuter}>
          <Swiper
            onSwiper={setSwiperInstance}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: -20,
              depth: 150,
              modifier: 1,
              slideShadows: false,
              scale: 0.9,
            }}
            modules={[EffectCoverflow, Autoplay]}
            className={styles.swiperContainer}
          >
            {[...libraryCardsData, ...libraryCardsData].map((card, index) => (
              <SwiperSlide key={`${card.id}-${index}`} className={styles.swiperSlide}>
                <div className={styles.card}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.cardLabel}>
                    {card.title.split("/").map((part, i) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < card.title.split("/").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* View All Button */}
      <div className={styles.viewAllContainer} data-aos="fade-up" data-aos-delay="600">
        <button
          className={styles.viewAllButton}
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Category Tags */}
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={styles.categoryTag}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className={styles.categoryImage}>
              <Image src={category.image} alt={category.name} fill style={{ objectFit: "cover" }} />
            </div>
            <span className={styles.categoryName}>{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
});
LibrarySystem.displayName = "LibrarySystem";

export default LibrarySystem;
