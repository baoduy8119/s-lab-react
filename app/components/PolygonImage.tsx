"use client";

import React from "react";
import Image from "next/image";

interface PolygonImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  clipPath?: string;
  topLeftCut?: number;
  topRightCut?: number;
  bottomRightCut?: number;
  bottomLeftCut?: number;
  // Mobile specific cuts
  topLeftCutMobile?: number;
  topRightCutMobile?: number;
  bottomRightCutMobile?: number;
  bottomLeftCutMobile?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PolygonImage = React.memo(function PolygonImage({
  src,
  alt,
  width,
  height,
  clipPath,
  // Destructure with default values
  topLeftCut = 0,
  topRightCut = 0,
  bottomRightCut = 0,
  bottomLeftCut = 0,
  // Mobile props (optional)
  topLeftCutMobile,
  topRightCutMobile,
  bottomRightCutMobile,
  bottomLeftCutMobile,
  className,
  style,
  fill = false,
  ...props
}: PolygonImageProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">) {
  // function body start, no vars needed

  // Helper to generate polygon string
  const getPolygon = (tl: number, tr: number, br: number, bl: number) => {
    if (!tl && !tr && !br && !bl) return "none";

    const points = [];
    // Top-left
    points.push(tl > 0 ? `${tl}px 0` : "0 0");
    // Top-right
    points.push(tr > 0 ? `calc(100% - ${tr}px) 0, 100% ${tr}px` : "100% 0");
    // Bottom-right
    points.push(br > 0 ? `100% calc(100% - ${br}px), calc(100% - ${br}px) 100%` : "100% 100%");
    // Bottom-left
    points.push(bl > 0 ? `${bl}px 100%, 0 calc(100% - ${bl}px)` : "0 100%");
    // Close top-left if cut
    if (tl > 0) points.push(`0 ${tl}px`);

    return `polygon(${points.join(", ")})`;
  };

  const desktopClip = clipPath || getPolygon(topLeftCut, topRightCut, bottomRightCut, bottomLeftCut);
  const mobileClip = getPolygon(
    topLeftCutMobile ?? topLeftCut,
    topRightCutMobile ?? topRightCut,
    bottomRightCutMobile ?? bottomRightCut,
    bottomLeftCutMobile ?? bottomLeftCut
  );

  return (
    <>
      <style jsx global>{`
        .polygon-image {
          clip-path: var(--desktop-clip);
        }
        @media (max-width: 768px) {
          .polygon-image {
            clip-path: var(--mobile-clip);
          }
        }
      `}</style>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        style={{
          ...style,
          objectFit: "cover",
          display: "block",
          // @ts-ignore
          "--desktop-clip": desktopClip,
          "--mobile-clip": mobileClip,
        }}
        className={`polygon-image ${className || ""}`}
        {...props}
      />
    </>
  );
});
PolygonImage.displayName = "PolygonImage";

export default PolygonImage;
