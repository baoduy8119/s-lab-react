"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCards, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import styles from "./BestForYou.module.scss";

const BestForYou = React.memo(function BestForYou() {
  const [activeIndex, setActiveIndex] = useState(0);
  const courses = [
    {
      id: 1,
      image: "/images/slib/lib-card-1.png",
      label: "Marketing\nPlanning",
      title: "Marketing Planning",
      instructor: "Kira Dinh",
      duration: "20H",
      documents: "15 documents",
      originalPrice: "899.000",
      price: "399.000",
    },
    {
      id: 3,
      image: "/images/slib/lib-card-3.png",
      label: "Content\nStrategy",
      title: "Content Strategy",
      instructor: "Sarah Lee",
      duration: "18H",
      documents: "12 documents",
      originalPrice: "799.000",
      price: "349.000",
    },
    {
      id: 2,
      image: "/images/slib/lib-card-2.png",
      label: "Digital\nMarketing",
      title: "Digital Marketing",
      instructor: "John Smith",
      duration: "25H",
      documents: "20 documents",
      originalPrice: "999.000",
      price: "499.000",
    },
    {
      id: 4,
      image: "/images/slib/lib-card-4.png",
      label: "Content\nStrategy",
      title: "Content Strategy",
      instructor: "Sarah Lee",
      duration: "18H",
      documents: "12 documents",
      originalPrice: "799.000",
      price: "349.000",
    },
    {
      id: 5,
      image: "/images/slib/lib-card-5.png",
      label: "Content\nStrategy",
      title: "Content Strategy",
      instructor: "Sarah Lee",
      duration: "18H",
      documents: "12 documents",
      originalPrice: "799.000",
      price: "349.000",
    },
  ];

  return (
    <section className={styles.section}>
      {/* Decorative Images */}
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

      <div className={styles.header}>
        <h2 className={styles.title}>/Best for you. </h2>
        <p className={styles.subtitle}>Suit you best</p>
      </div>

      <div className={styles.carouselContainer}>
        {/* Navigation Arrows */}
        <button className={`${styles.navButton} ${styles.navPrev} swiper-button-prev-custom`}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M10.5 13.5L5.5 8.5L10.5 3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className={`${styles.navButton} ${styles.navNext} swiper-button-next-custom`}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path
              d="M6.5 3.5L11.5 8.5L6.5 13.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Swiper Cards */}
        <Swiper
          effect="cards"
          grabCursor={true}
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
                  />
                  {/* <div className={styles.courseLabel}>
                    {course.label.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Course Info Bar - Full Width Outside Container */}
      <div className={styles.courseInfo}>
        <div className={styles.infoContent}>
          <div className={styles.infoLeft}>
            <span className={styles.duration}>{courses[activeIndex].duration}</span>
            <span className={styles.documents}>{courses[activeIndex].documents}</span>
          </div>
          <div className={styles.infoCenter}>
            <h3 className={styles.courseTitle}> {courses[activeIndex].title}</h3>
            <p className={styles.instructor}>{courses[activeIndex].instructor}</p>
          </div>
          <div className={styles.infoRight}>
            <span className={styles.originalPrice}>{courses[activeIndex].originalPrice}</span>
            <span className={styles.price}>{courses[activeIndex].price}</span>
          </div>
        </div>
      </div>
    </section>
  );
});
BestForYou.displayName = "BestForYou";

export default BestForYou;
