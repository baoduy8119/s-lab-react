"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import styles from "./BestForYou.module.scss";
import Container from "@/app/components/Container";
import { useSLibraryContentStore } from "@/app/features/dashboard/stores/useSLibraryContentStore";

const BestForYou = React.memo(function BestForYou() {
  const [activeIndex, setActiveIndex] = useState(1);
  const c = useSLibraryContentStore((s) => s.content.slibBestForYou);

  const courses = useMemo(
    () => [
      {
        id: 1,
        image: c.c1Image,
        label: c.c1Title.replace(" ", "\n"),
        title: c.c1Title,
        instructor: c.c1Instructor,
        duration: c.c1Duration,
        documents: c.c1Documents,
        originalPrice: c.c1OrigPrice,
        price: c.c1Price,
      },
      {
        id: 4,
        image: c.c2Image,
        label: c.c2Title.replace(" ", "\n"),
        title: c.c2Title,
        instructor: c.c2Instructor,
        duration: c.c2Duration,
        documents: c.c2Documents,
        originalPrice: c.c2OrigPrice,
        price: c.c2Price,
      },
      {
        id: 2,
        image: c.c3Image,
        label: c.c3Title.replace(" ", "\n"),
        title: c.c3Title,
        instructor: c.c3Instructor,
        duration: c.c3Duration,
        documents: c.c3Documents,
        originalPrice: c.c3OrigPrice,
        price: c.c3Price,
      },
      {
        id: 3,
        image: c.c4Image,
        label: c.c4Title.replace(" ", "\n"),
        title: c.c4Title,
        instructor: c.c4Instructor,
        duration: c.c4Duration,
        documents: c.c4Documents,
        originalPrice: c.c4OrigPrice,
        price: c.c4Price,
      },
      {
        id: 5,
        image: c.c5Image,
        label: c.c5Title.replace(" ", "\n"),
        title: c.c5Title,
        instructor: c.c5Instructor,
        duration: c.c5Duration,
        documents: c.c5Documents,
        originalPrice: c.c5OrigPrice,
        price: c.c5Price,
      },
    ],
    [c]
  );

  return (
    <section className={styles.section}>
      <div className={styles.decorativeImages}>
        <Image
          src="/images/slib/smiley.png"
          alt="Smiley"
          width={166}
          height={155}
          className={styles.emoji1}
        />
        <Image
          src="/images/slib/tv.png"
          alt="TV"
          width={147}
          height={135}
          className={styles.emoji2}
        />
      </div>

      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>{c.heading}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>
      </Container>

      <div className={styles.carouselContainer}>
        <button className={`${styles.navButton} ${styles.navPrev} swiper-button-prev-custom`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path d="M27.3869 19.998L14.5408 19.998L20.4414 25.8986L18.9425 27.3869L10.498 18.9425L18.9425 10.498L20.4308 11.9864L14.5408 17.8869L27.3869 17.8869L27.3869 19.998Z" fill="currentColor" />
          </svg>
        </button>

        <button className={`${styles.navButton} ${styles.navNext} swiper-button-next-custom`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M-0.000217853 9.5L12.8459 9.5L6.94534 15.4006L8.44423 16.8889L16.8887 8.44444L8.44423 -3.69118e-07L6.95589 1.48833L12.8459 7.38889L-0.000217761 7.38889L-0.000217853 9.5Z" fill="currentColor" />
          </svg>
        </button>

        <Swiper
          effect="cards"
          grabCursor={true}
          initialSlide={2}
          modules={[EffectCards, Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
          className={styles.swiper}
          cardsEffect={{
            perSlideOffset: 20,
            perSlideRotate: 5,
            rotate: true,
            slideShadows: true,
          }}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id} className={styles.swiperSlide}>
              <div className={styles.courseCard}>
                <div className={styles.courseImage}>
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized={course.image.startsWith("data:")}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.courseInfo}>
        <div className={styles.infoContent}>
          <div className={styles.infoLeft}>
            <span className={styles.duration}>{courses[activeIndex]?.duration}</span>
            <span className={styles.documents}>{courses[activeIndex]?.documents}</span>
          </div>
          <div className={styles.infoCenter}>
            <h3 className={styles.courseTitle}>{courses[activeIndex]?.title}</h3>
            <p className={styles.instructor}>{courses[activeIndex]?.instructor}</p>
          </div>
          <div className={styles.infoRight}>
            <span className={styles.originalPrice}>{courses[activeIndex]?.originalPrice}</span>
            <span className={styles.price}>{courses[activeIndex]?.price}</span>
          </div>
        </div>
      </div>
    </section>
  );
});
BestForYou.displayName = "BestForYou";

export default BestForYou;
