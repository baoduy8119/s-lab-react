import styles from './EventsHeader.module.scss';
import React from 'react';
import Container from '@/app/components/Container';
import Image from 'next/image';
import GlowEffectSvg from './GlowEffectSvg';

const EventsHeader = () => {
  return (
    <section className={styles.header}>
      <div className={styles.gradientBg} />
      <Container>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <Image
              src="/images/events/header-text-1.svg"
              alt="At The S-LAB's Events"
              width={1020}
              height={232}
              className={styles.titleImage}
              priority
            />
          </div>
          <div className={styles.titleWrapper2}>
            <Image
              src="/images/events/header-text-2.svg"
              alt="At The S-LAB's Events"
              width={1020}
              height={232}
              className={styles.titleImage}
              priority
            />
          </div>



          <div className={styles.images}>
            {/* Orange (Top Left) */}
            <div className={`${styles.floatingImage} ${styles.imgOrange}`}>
              <GlowEffectSvg color="#FDBA74" className={styles.svgGlow} />
              <div className={styles.frameTextTop}>the s-lab</div>
              <div className={styles.frameTextStart}>the s-lab</div>
              <div className={styles.frameTextEnd}>the s-lab</div>
              <div className={styles.frameTextBottom}>the s-lab</div>
              <div className={styles.innerImage}>
                <Image
                  src="/images/events/header-orange.png"
                  alt="Event Orange"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            {/* Cyan (Top Right) */}
            <div className={`${styles.floatingImage} ${styles.imgCyan}`}>
              <GlowEffectSvg color="#A5F3FC" className={styles.svgGlow} />
              <div className={styles.frameTextTop}>the s-lab</div>
              <div className={styles.frameTextStart}>the s-lab</div>
              <div className={styles.frameTextEnd}>the s-lab</div>
              <div className={styles.frameTextBottom}>the s-lab</div>
              <div className={styles.innerImage}>
                <Image
                  src="/images/events/header-cyan.png"
                  alt="Event Cyan"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            {/* Blue (Bottom Left) */}
            <div className={`${styles.floatingImage} ${styles.imgBlue}`}>
              <GlowEffectSvg color="#93C5FD" className={styles.svgGlow} />
              <div className={styles.frameTextTop}>the s-lab</div>
              <div className={styles.frameTextStart}>the s-lab</div>
              <div className={styles.frameTextEnd}>the s-lab</div>
              <div className={styles.frameTextBottom}>the s-lab</div>
              <div className={styles.innerImage}>
                <Image
                  src="/images/events/header-blue.png"
                  alt="Event Blue"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            {/* Green (Bottom Right) */}
            <div className={`${styles.floatingImage} ${styles.imgGreen}`}>
              <GlowEffectSvg color="#AFFF9A" className={styles.svgGlow} />
              <div className={styles.frameTextTop}>the s-lab</div>
              <div className={styles.frameTextStart}>the s-lab</div>
              <div className={styles.frameTextEnd}>the s-lab</div>
              <div className={styles.frameTextBottom}>the s-lab</div>
              <div className={styles.innerImage}>
                <Image
                  src="/images/events/header-green.png"
                  alt="Event Green"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default React.memo(EventsHeader);
