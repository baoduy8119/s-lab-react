"use client";

import React from 'react';
import styles from './HeroSection.module.scss';
import Image from 'next/image';

const MouseTracker3D = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className={`${styles.tracker} ${styles[`tr-${i + 1}`]}`}></div>
        ))}
        <div className={styles.item}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MouseTracker3D;
