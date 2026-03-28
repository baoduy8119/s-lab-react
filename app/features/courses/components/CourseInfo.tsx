"use client";

import React from "react";
import styles from "./CourseInfo.module.scss";

const CourseInfo = React.memo(function CourseInfo() {
  return (
    <section className={styles.infoSection}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.label}>Contact</span>
            <a href="mailto:info@slab-edu.com" className={styles.email}>
              info@slab-edu.com
            </a>
          </div>
          <div className={styles.divider} />
          <div className={styles.contactItem}>
            <span className={styles.label}>If you have any questions</span>
            <span className={styles.phone}>All rights reserved</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.contactItem}>
            <span className={styles.label}>2 Courses</span>
          </div>
        </div>
      </div>
    </section>
  );
});

CourseInfo.displayName = "CourseInfo";

export default CourseInfo;
