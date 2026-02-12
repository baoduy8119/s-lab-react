import React from 'react';
import Image from 'next/image';
import styles from './EventDetailHero.module.scss';

const EventDetailHero = () => {
  return (
    <section className={styles.hero}>
      {/* Top Bar inside Hero */}
      <div className={styles.topBar} data-aos="fade-down">
        <div className={styles.brand}>THE S-LAB</div>
        <div className={styles.iconArrow}>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <Image
        src="/images/events/event-1.png"
        alt="Event Detail Hero"
        fill
        className={styles.heroImage}
        priority
        data-aos="zoom-out"
      />

      <div className={styles.overlay}>
        <h1 className={styles.title} data-aos="fade-up" data-aos-delay="200">
          <span>The S-LAB</span>
          <span>Competition Reveal</span>
        </h1>
      </div>
    </section>
  );
};

export default React.memo(EventDetailHero);
