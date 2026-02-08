import React from "react";
import styles from "./Marquee.module.scss";
import TheSLabLogo from "@/app/components/TheSLabLogo";
interface MarqueeProps {
  className?: string;
  dataAos?: string;
}

const Marquee = ({ className, dataAos = "fade-up" }: MarqueeProps) => {
  return (
    <div className={`${styles.marqueeStrip} ${className || ""}`} data-aos={dataAos}>
      <div className={styles.marqueeContent}>
        {Array(20).fill("THE S-LAB").map((text, i) => (
          <div key={i} className={styles.marqueeItem}>
            <TheSLabLogo />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
