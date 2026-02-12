"use client";

import React, { useState } from 'react';
import styles from './EventRegistration.module.scss';
import Image from 'next/image';

const EventRegistration = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.container} data-aos="fade-up">
      <button className={styles.closeParams} onClick={() => setIsVisible(false)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <h3 className={styles.title} data-aos="fade-up" data-aos-delay="100">FILL FOR REGISTRATION</h3>

      <form className={styles.form} data-aos="fade-up" data-aos-delay="200">
        <div className={styles.inputGroup}>
          <input type="text" className={styles.input} placeholder="Your career *" />
        </div>

        <div className={styles.inputGroup}>
          <input type="email" className={styles.input} placeholder="Email *" />
        </div>

        <div className={styles.inputGroup}>
          <input type="tel" className={styles.input} placeholder="Phone number *" />
        </div>

        <div className={styles.inputGroup}>
          <textarea className={styles.textarea} placeholder="Questions for the Organizers and Speakers"></textarea>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Register
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11L11 1M11 1H1M11 1V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default React.memo(EventRegistration);
