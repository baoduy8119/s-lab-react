"use client";

import Image from "next/image";
import React, { useRef, useEffect, useCallback } from "react";
import styles from "./PartnerLogos.module.scss";

interface PartnerLogosProps {
  className?: string;
  speed?: number; // pixels per frame (~60fps)
}

const logos = [
  { src: "/images/partners/logo1.svg", width: 144, height: 32 },
  { src: "/images/partners/logo2.svg", width: 103, height: 32 },
  { src: "/images/partners/logo3.svg", width: 55, height: 31 },
  { src: "/images/partners/logo4.svg", width: 36, height: 36 },
  { src: "/images/partners/logo5.svg", width: 137, height: 38 },
  { src: "/images/partners/logo6.svg", width: 29, height: 30 },
  { src: "/images/partners/logo7.svg", width: 33, height: 28 },
  { src: "/images/partners/logo8.svg", width: 136, height: 38 },
];

const PartnerLogos = React.memo(function PartnerLogos({
  className,
  speed = 0.5,
}: PartnerLogosProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef<number>(0);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    posRef.current -= speed;

    // Each logoSet is exactly half the track width
    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(posRef.current) >= halfWidth) {
      posRef.current += halfWidth;
    }

    track.style.transform = `translateX(${posRef.current}px)`;
    animRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <div className={`${styles.partnerLogos} ${className || ""}`}>
      <div className={styles.slideTrack} ref={trackRef}>
        {/* Render 3 sets for seamless wrapping */}
        {[0, 1, 2].map((setIndex) => (
          <div className={styles.logoSet} key={setIndex}>
            {logos.map((logo, i) => (
              <Image
                key={`${setIndex}-${i}`}
                src={logo.src}
                alt="Partner"
                width={logo.width}
                height={logo.height}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
PartnerLogos.displayName = "PartnerLogos";

export default PartnerLogos;
