"use client";

import React from "react";
import Image from "next/image";
import Container from "@/app/components/Container";
import styles from "./BlogBody.module.scss";

interface BlogBodyProps {
  authorName: string;
  authorRole: string;
  authorImage: string;
}

const BlogBody = React.memo(function BlogBody({
  authorName,
  authorRole,
  authorImage,
}: BlogBodyProps) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.leftColumn} /> {/* Spacer to align with date column */}

          <div className={styles.contentColumn}>
            <p className={styles.intro} data-aos="fade-up">
              No jargon. Just practical thoughts from our
              team. Written for designers, marketers, devs—
              and anyone building things online.
            </p>

            <div className={styles.richText} data-aos="fade-up" data-aos-delay="100">
              <p>
                In today’s digital-first economy, organizations of all sizes are investing
                heavily in technology to improve operations, connect with customers, and
                gain a competitive edge. However, the way those digital efforts are
                structured can make a significant difference in their effectiveness.
                Siloed digital strategies are still common in many organizations. Different
                departments may use their own tools, manage their own data, and pursue
                goals that are not aligned with other parts of the business.
              </p>

              <h3>The Limits of Siloed Thinking</h3>
              <p>
                Silos in digital strategy often reflect organizational structure. Marketing
                runs one platform, sales uses another, and IT supports a third. These
                departments may not communicate regularly or share insights.
              </p>

              <h3>The Power of Integration</h3>
              <p>
                An integrated digital strategy brings all parts of the organization together
                under a common vision. It aligns tools, processes, and objectives so that
                digital efforts support one another rather than compete. This type of
                strategy provides a clearer picture of how technology is driving business
                value and creates an environment where teams can move faster, share
                insights, and respond to change more effectively.
              </p>

              <h3>Key advantages of an integrated digital strategy:</h3>
              <ul>
                <li>consistent customer messaging and branding across all digital touchpoints</li>
                <li>improved data quality through unified systems and shared analytics</li>
                <li>better collaboration between teams with clearly aligned goals</li>
                <li>reduced costs due to less duplication of tools and processes</li>
              </ul>
            </div>

            {/* Author Block at Bottom */}
            <div className={styles.authorArea} data-aos="fade-up">
              <div className={styles.authorBlock}>
                <div className={styles.authorImageWrapper}>
                  <Image
                    src={authorImage}
                    alt={authorName}
                    width={28}
                    height={28}
                    className={styles.authorImage}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>/{authorName}</span>
                  <span className={styles.authorRole}>{authorRole}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

BlogBody.displayName = "BlogBody";

export default BlogBody;
