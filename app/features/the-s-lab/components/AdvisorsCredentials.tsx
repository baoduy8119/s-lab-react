"use client";

import React, { useState, useEffect, useRef } from "react";
import StickyBox from "react-sticky-box";
import QuoteIcon from "@/app/components/icons/QuoteIcon";
import { useTheSlabContentStore } from "@/app/features/dashboard/stores/useTheSlabContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";
import styles from "./AdvisorsCredentials.module.scss";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import Container from "@/app/components/Container";

const LINE_ANIMATION_MS = 600; // Must match CSS transition duration

const AdvisorsCredentials = React.memo(function AdvisorsCredentials() {
  const c = useLocalizedContent(useTheSlabContentStore((s) => s.content.slabAdvisors));
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const credentials = [
    {
      number: "/001/",
      title: c.item1Title,
      description: c.item1Description,
    },
    {
      number: "/002/",
      title: c.item2Title,
      description: c.item2Description,
    },
    {
      number: "/003/",
      title: c.item3Title,
      description: c.item3Description,
    },
    {
      number: "/004/",
      title: c.item4Title,
      description: c.item4Description,
    },
    {
      number: "/005/",
      title: c.item5Title,
      description: c.item5Description,
    },
  ];

  // IntersectionObserver sets the scroll-based target
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-120px 0px -70% 0px",
      }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Step visualIndex toward activeIndex one-by-one, enforcing min 800ms between steps
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const lastStepTimeRef = useRef(0);

  // When at the last or second-to-last item, extend target by 1
  // so the last visible connector line also fills sequentially
  const effectiveTarget =
    activeIndex >= credentials.length - 2
      ? Math.min(activeIndex + 1, credentials.length)
      : activeIndex;

  useEffect(() => {
    if (visualIndex === effectiveTarget) return;

    const now = Date.now();
    const elapsed = now - lastStepTimeRef.current;
    const delay = Math.max(0, LINE_ANIMATION_MS - elapsed);

    const timer = setTimeout(() => {
      lastStepTimeRef.current = Date.now();
      setVisualIndex((prev) => {
        const target = activeIndexRef.current;
        const effective =
          target >= credentials.length - 2
            ? Math.min(target + 1, credentials.length)
            : target;
        if (prev < effective) return prev + 1;
        if (prev > effective) return prev - 1;
        return prev;
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [visualIndex, effectiveTarget]);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.container}>
          {isMobile ? (
            <div className={styles.leftContent}>
              <h2 className={styles.title}>{c.title}</h2>

              <div className={styles.quoteIcon}>
                <QuoteIcon />
              </div>

              <p className={styles.subtitle}>{c.subtitle}</p>
            </div>
          ) : (
            <StickyBox className={styles.leftContent} offsetTop={120} offsetBottom={20}>
              <h2 className={styles.title}>{c.title}</h2>

              <div className={styles.quoteIcon}>
                <QuoteIcon />
              </div>

              <p className={styles.subtitle}>{c.subtitle}</p>
            </StickyBox>
          )}

          <div className={styles.timeline}>
            {credentials.map((item, index) => (
              <div
                key={index}
                className={styles.timelineItem}
                ref={(el) => { observerRefs.current[index] = el; }}
                data-index={index}
              >
                <div className={styles.timelineMarker}>
                  <div
                    className={`${styles.circle} ${index <= visualIndex ? styles.circleActive : ""}`}
                  />
                  <div
                    className={`${styles.line} ${index === credentials.length - 1 && styles.lastLine} ${index < visualIndex ? styles.lineActive : ""
                      }`}
                  />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.itemNumber}>{item.number}</div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});
AdvisorsCredentials.displayName = "AdvisorsCredentials";

export default AdvisorsCredentials;

