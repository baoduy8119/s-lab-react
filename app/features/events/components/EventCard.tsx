import React from 'react';
import styles from './EventCard.module.scss';
import Image from 'next/image';
import PolygonImage from '@/app/components/PolygonImage';

export interface EventCardProps {
  date: string;
  author: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  slug: string;
  isLast?: boolean;
}

import Link from 'next/link';

const EventCard: React.FC<EventCardProps> = ({
  date,
  author,
  title,
  description,
  imageUrl,
  tags,
  slug,
  isLast
}) => {
  return (
    <Link href={`/events/${slug}`} className={`${styles.card} ${isLast ? styles.noBorder : ''}`}>
      <div className={styles.metaCol}>
        <span className={styles.date}>{date}</span>
        <span className={styles.author}>{author}</span>
      </div>

      <div className={styles.contentCol}>
        <div className={styles.gridContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.imageWrapper}>
          <PolygonImage
            src={imageUrl}
            alt={title}
            fill
            topLeftCut={40}
          />
          <div className={styles.logoOverlay}>
            <Image
              src="/images/s-lab-white-logo.svg"
              alt="The S-Lab"
              width={108}
              height={108}
              className={styles.logo}
            />
          </div>
        </div>

        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default React.memo(EventCard);
