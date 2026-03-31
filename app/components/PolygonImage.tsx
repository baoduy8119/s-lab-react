"use client";

import React from "react";
import Image from "next/image";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

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
  topLeftCutMobile?: number;
  topRightCutMobile?: number;
  bottomRightCutMobile?: number;
  bottomLeftCutMobile?: number;
  className?: string; // Container class
  innerClassName?: string; // Image class (for transitions)
  style?: React.CSSProperties;
  fill?: boolean;
}

const PolygonImage = React.memo(function PolygonImage({
  src,
  alt,
  width,
  height,
  clipPath,
  topLeftCut = 0,
  topRightCut = 0,
  bottomRightCut = 0,
  bottomLeftCut = 0,
  topLeftCutMobile,
  topRightCutMobile,
  bottomRightCutMobile,
  bottomLeftCutMobile,
  className,
  innerClassName,
  style,
  fill = false,
  ...props
}: PolygonImageProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const getPolygon = (tl: number, tr: number, br: number, bl: number) => {
    if (!tl && !tr && !br && !bl) return "none";
    const points = [];
    points.push(tl > 0 ? `${tl}px 0` : "0 0");
    points.push(tr > 0 ? `calc(100% - ${tr}px) 0, 100% ${tr}px` : "100% 0");
    points.push(br > 0 ? `100% calc(100% - ${br}px), calc(100% - ${br}px) 100%` : "100% 100%");
    points.push(bl > 0 ? `${bl}px 100%, 0 calc(100% - ${bl}px)` : "0 100%");
    if (tl > 0) points.push(`0 ${tl}px`);
    return `polygon(${points.join(", ")})`;
  };

  const currentClip = isMobile 
    ? getPolygon(
        topLeftCutMobile ?? topLeftCut,
        topRightCutMobile ?? topRightCut,
        bottomRightCutMobile ?? bottomRightCut,
        bottomLeftCutMobile ?? bottomLeftCut
      )
    : clipPath || getPolygon(topLeftCut, topRightCut, bottomRightCut, bottomLeftCut);

  return (
    <div
      className={`relative overflow-hidden ${className || ""}`}
      style={{
        clipPath: currentClip,
        width: fill ? "100%" : (className ? undefined : width),
        height: fill ? "100%" : (className ? undefined : height),
      }}
    >
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
        }}
        className={innerClassName}
        {...props}
      />
    </div>
  );
});
PolygonImage.displayName = "PolygonImage";

export default PolygonImage;
