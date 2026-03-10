"use client";

import React from "react";
import Image from "next/image";
import styles from "./CapstoneProject.module.scss";
import PolygonSection from "@/app/components/PolygonSection";
import Container from "@/app/components/Container";

const CapstoneProject = React.memo(function CapstoneProject() {
  return (
    <section className={styles.section}>
      <Container className={styles.customContainer}>
        <PolygonSection topLeftCut={40} topLeftCutMobile={32}>
          <div className={styles.container}>
            <div className={styles.contentWrapper}>
              <div className={styles.leftContent}>
                <div className={styles.textContent}>
                  <h2 className={styles.heading}>
                    Capstone / Final Output (Deliverables)<br />
                    A simple marketing plan: ICP + positioning + channel plan + KPI tracker<br />
                    Optional: mini campaign brief + content calendar
                  </h2>
                </div>

                <div className={styles.bottomGroup}>
                  {/* Barcode Pattern Divider */}
                  <div className={styles.barcodeLine}></div>

                  {/* Desktop Logo */}
                  <div className={`${styles.logoWrapper} hidden lg:block`}>
                    <Image
                      src="/images/s-lab-logo-black.svg"
                      alt="THE S-LAB"
                      width={80}
                      height={24}
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className={styles.rightContent}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/images/courses/capstone-project.jpg"
                    alt="Students collaborating on capstone project"
                    fill
                    className={styles.projectImage}
                  />
                  {/* Mobile Logo Overlay */}
                  <div className="absolute bottom-6 left-6 block lg:hidden z-10 w-[72px] h-[24px]">
                    <Image
                      src="/images/s-lab-logo-black.svg"
                      alt="THE S-LAB"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PolygonSection>
      </Container>
    </section>
  );
});

CapstoneProject.displayName = "CapstoneProject";

export default CapstoneProject;
