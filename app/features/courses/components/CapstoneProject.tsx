"use client";

import React from "react";
import Image from "next/image";
import styles from "./CapstoneProject.module.scss";
import PolygonSection from "@/app/components/PolygonSection";
import Container from "@/app/components/Container";
import {
  detailSectionId,
  useCourseDetailContentStore,
} from "@/app/features/dashboard/stores/useCourseDetailContentStore";
import { useLocalizedContent } from "@/app/hooks/useLocalizedContent";

interface CapstoneProjectProps {
  courseId: string;
}

const CapstoneProject = React.memo(function CapstoneProject({
  courseId,
}: CapstoneProjectProps) {
  const section = useLocalizedContent(
    useCourseDetailContentStore((s) =>
      s.getSection(detailSectionId(courseId, "capstone"))
    )
  );
  const heading =
    (section.heading as string) ||
    "Capstone / Final Output (Deliverables)\nA simple marketing plan: ICP + positioning + channel plan + KPI tracker\nOptional: mini campaign brief + content calendar";
  const image = (section.image as string) || "/images/courses/capstone-project.jpg";
  const headingLines = heading.split("\n");

  return (
    <section className={styles.section}>
      <Container className={styles.customContainer}>
        <PolygonSection topLeftCut={40} topLeftCutMobile={32}>
          <div className={styles.container}>
            <div className={styles.contentWrapper}>
              <div className={styles.leftContent}>
                <div className={styles.textContent}>
                  <h2 className={styles.heading}>
                    {headingLines.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < headingLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
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
                    src={image}
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
