"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import styles from "./LibrarySystem.module.scss";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";

const LibrarySystem = React.memo(function LibrarySystem() {
  const c = useSLibraryContentStore((s) => s.content.slibLibrarySystem);

  const categories = useMemo(
    () => [
      { id: 1, name: c.cat1Name, image: c.cat1Image },
      { id: 2, name: c.cat2Name, image: c.cat2Image },
      { id: 3, name: c.cat3Name, image: c.cat3Image },
      { id: 4, name: c.cat4Name, image: c.cat4Image },
    ],
    [c]
  );

  const libraryCardsData = useMemo(
    () => [
      { id: 1, title: c.card1Title, image: c.card1Image },
      { id: 2, title: c.card2Title, image: c.card2Image },
      { id: 3, title: c.card3Title, image: c.card3Image },
      { id: 4, title: c.card4Title, image: c.card4Image },
      { id: 5, title: c.card5Title, image: c.card5Image },
    ],
    [c]
  );

  const [isReady, setIsReady] = React.useState(false);
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title} data-aos="fade-up">{c.heading}</h2>

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
                    unoptimized={card.image.startsWith("data:")}
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

      <div className={styles.categories}>
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={styles.categoryTag}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className={styles.categoryImage}>
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{ objectFit: "cover" }}
                unoptimized={category.image.startsWith("data:")}
              />
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
