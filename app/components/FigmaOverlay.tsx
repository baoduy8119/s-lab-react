"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface FigmaOverlayProps {
  src: string;
}

const FigmaOverlay: React.FC<FigmaOverlayProps> = ({ src }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0.5);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Toggle on Option + O (or Alt + O)
    if (e.altKey && e.code === "KeyO") {
      e.preventDefault();
      setIsVisible((prev) => !prev);
    }
    // Adjust opacity on Option + Up/Down
    if (e.altKey && isVisible) {
      if (e.code === "ArrowUp") {
        e.preventDefault();
        setOpacity((prev) => Math.min(prev + 0.1, 1));
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        setOpacity((prev) => Math.max(prev - 0.1, 0));
      }
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: opacity
      }}
    >
      {/* 
        Using Next.js Image might optimize, but for overlay we want raw image.
        Using <img> to avoid layout shifts or complex fitting if height is huge.
        Assuming the design is 1440px wide usually. 
        We center it horizontally if window > 1440? Or just top-left?
        Let's assume top-left match for now, or use margin auto for centering.
      */}
      <img
        src={src}
        alt="Figma Overlay"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          // Assuming design is desktop 1440px centered? 
          // If the user wants exact overlay, usually simple top:0 left:0 is best 
          // if development matches design width.
        }}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: 8,
          fontSize: 12,
          fontFamily: 'monospace',
          pointerEvents: 'auto'
        }}
      >
        Opacity: {Math.round(opacity * 100)}% <br />
        (Opt+↑/↓ to adjust)
      </div>
    </div>
  );
};

export default FigmaOverlay;
