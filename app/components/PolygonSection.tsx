import React from "react";

interface PolygonSectionProps {
  children: React.ReactNode;
  clipPath?: string;
  topLeftCut?: number;
  topRightCut?: number;
  bottomRightCut?: number;
  bottomLeftCut?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PolygonSection = React.memo(function PolygonSection({
  children,
  clipPath,
  topLeftCut = 0,
  topRightCut = 0,
  bottomRightCut = 0,
  bottomLeftCut = 0,
  className,
  style,
}: PolygonSectionProps) {
  // Generate clip-path based on corner cuts
  const generateClipPath = () => {
    if (clipPath) return clipPath;

    // If no cuts are specified, return normal rectangle
    if (!topLeftCut && !topRightCut && !bottomRightCut && !bottomLeftCut) {
      return "none";
    }

    // Build polygon points for each corner
    const points = [];

    // Top-left corner
    if (topLeftCut > 0) {
      points.push(`${topLeftCut}px 0`);
    } else {
      points.push("0 0");
    }

    // Top-right corner
    if (topRightCut > 0) {
      points.push(`calc(100% - ${topRightCut}px) 0`);
      points.push(`100% ${topRightCut}px`);
    } else {
      points.push("100% 0");
    }

    // Bottom-right corner
    if (bottomRightCut > 0) {
      points.push(`100% calc(100% - ${bottomRightCut}px)`);
      points.push(`calc(100% - ${bottomRightCut}px) 100%`);
    } else {
      points.push("100% 100%");
    }

    // Bottom-left corner
    if (bottomLeftCut > 0) {
      points.push(`${bottomLeftCut}px 100%`);
      points.push(`0 calc(100% - ${bottomLeftCut}px)`);
    } else {
      points.push("0 100%");
    }

    // Close the polygon back to top-left
    if (topLeftCut > 0) {
      points.push(`0 ${topLeftCut}px`);
    }

    return `polygon(${points.join(", ")})`;
  };

  const combinedStyle: React.CSSProperties = {
    ...style,
    clipPath: generateClipPath(),
  };

  return (
    <div
      style={combinedStyle}
      className={className}
    >
      {children}
    </div>
  );
});

PolygonSection.displayName = "PolygonSection";

export default PolygonSection;
