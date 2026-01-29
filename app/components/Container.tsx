import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Allow extending styles
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
