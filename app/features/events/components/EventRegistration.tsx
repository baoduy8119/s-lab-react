"use client";

import React, { useState } from 'react';
import styles from './EventRegistration.module.scss';
import Image from 'next/image';

const EventRegistration = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button
        className={`${styles.chatBoxBtn} ${isVisible ? styles.hidden : ''}`}
        onClick={() => setIsVisible(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="white" />
        </svg>
        <span>Chat Box</span>
      </button>

      <div className={`${styles.container} ${!isVisible ? styles.mobileHidden : ''}`}>
        <button className={styles.closeParams} onClick={() => setIsVisible(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h3 className={styles.title}>FILL FOR REGISTRATION</h3>

        <form className={styles.form}>
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
    </>
  );
};

export default React.memo(EventRegistration);
