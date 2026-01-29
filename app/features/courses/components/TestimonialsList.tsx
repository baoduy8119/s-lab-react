"use client";

import React from "react";
import Image from "next/image";
import styles from "./TestimonialsList.module.scss";
import QuoteIcon from "@/app/components/icons/QuoteIcon";
import Container from "@/app/components/Container";

// Reusing same image for demo as per screenshot repetition
const testimonials = [
  {
    id: 1,
    text: "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
    name: "Lora K.",
    role: "Student, InnovateHealth",
    image: "/images/avatar.png"
  },
  {
    id: 2,
    text: "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
    name: "Lora K.",
    role: "Student, InnovateHealth",
    image: "/images/avatar.png"
  },
  {
    id: 3,
    text: "The S-Lab agency delivered a complete rebrand and website that perfectly captured our vision. The integrated approach saved us months of back-and-forth with multiple vendors.",
    name: "Lora K.",
    role: "Student, InnovateHealth",
    image: "/images/avatar.png"
  }
];

const TestimonialsList = React.memo(function TestimonialsList() {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.heading}>/Testimonials.</h2>

        <div className={styles.grid}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.contentInner}>
                <div className={styles.quoteIcon}>
                  <QuoteIcon />
                </div>

                <div className={styles.textContent}>
                  <p className={styles.text}>{item.text}</p>
                </div>
              </div>

              <div className={styles.profile}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>/{item.name}</p>
                  <p className={styles.role}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});

TestimonialsList.displayName = "TestimonialsList";

export default TestimonialsList;
