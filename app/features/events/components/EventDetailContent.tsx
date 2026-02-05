import React from 'react';
import Image from 'next/image';
import styles from './EventDetailContent.module.scss';
import Container from '@/app/components/Container';
import SLabLogoBlack from '@/app/components/SLabLogoBlack';

const EventDetailContent = () => {
  return (
    <section className={styles.section}>
      {/* Top Info - Centered */}
      <Container>
        <div className={styles.topInfo}>
          <div className={styles.infoItem}>
            <h4>8am</h4>
            <p>11/11/2023</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.infoItem}>
            <h4>Muong Thanh</h4>
            <p>Song Han</p>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.leftCol}>
            {/* Small Brand Logo */}
            <div className="mb-12">
              <SLabLogoBlack />
            </div>
          </div>

          <div className={styles.contentCol}>
            <h2 className={styles.heading}>
              We created a dynamic, content-rich website that elevates the brand’s story and connects with its audience on every level.
            </h2>
            <p className={styles.introText}>
              Prepare for an electrifying experience as we unveil The S-LAB Competition. This event promises to ignite your creativity, challenge your problem-solving skills, and set the stage for innovation like never before.
            </p>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.imageBlock}>
            <Image
              src="/images/events/event-2.png"
              alt="Event Main"
              fill
            />
          </div>

          <div className={styles.descriptionContainer}>
            <div className={styles.description}>
              <p>
                Our primary objective was to design a visually captivating website that reflected brand values: creativity, energy, and authenticity. The site needed to feel premium, responsive across all devices, and optimized for content-heavy storytelling — from editorial pieces to product highlights.
              </p>
              <p>
                In today’s digital-first economy, organizations of all sizes are investing heavily in technology to improve operations, connect with customers, and gain a competitive edge. However, the way these digital efforts are structured can make a significant difference in their effectiveness.
                Siloed digital strategies are still common in many organizations. Different departments may use their own tools, manage their own data, and pursue goals that are not aligned with other parts of the business.
              </p>
            </div>
          </div>

          <div className={styles.imageRow}>
            <div className={styles.halfImage}>
              <Image
                src="/images/events/event-3.png"
                alt="Event Detail 1"
                fill
              />
            </div>
            <div className={styles.halfImage}>
              <Image
                src="/images/events/event-4.png"
                alt="Event Detail 2"
                fill
              />
            </div>
          </div>

          <div className={styles.descriptionContainer}>
            <div className={styles.description}>
              <p>
                Our primary objective was to design a visually captivating website that reflected brand values: creativity, energy, and authenticity. The site needed to feel premium, responsive across all devices, and optimized for content-heavy storytelling — from editorial pieces to product highlights.
              </p>
              <p>
                In today’s digital-first economy, organizations of all sizes are investing heavily in technology to improve operations, connect with customers, and gain a competitive edge. However, the way these digital efforts are structured can make a significant difference in their effectiveness.
                Siloed digital strategies are still common in many organizations. Different departments may use their own tools, manage their own data, and pursue goals that are not aligned with other parts of the business.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default React.memo(EventDetailContent);
