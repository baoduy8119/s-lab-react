import React from "react";

interface ArrowRightIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const ArrowRightIcon = React.memo(function ArrowRightIcon({
  width = 18,
  height = 15,
  color = "#0F172A",
  className,
}: ArrowRightIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.749883 0.75V4.647C0.749883 5.70787 1.17131 6.72528 1.92146 7.47543C2.6716 8.22557 3.68902 8.647 4.74988 8.647H16.6289M12.3929 13.504L16.1899 9.707C16.3293 9.56773 16.44 9.40234 16.5155 9.22028C16.591 9.03823 16.6298 8.84309 16.6299 8.646M12.3939 3.789L16.1899 7.587C16.4829 7.88 16.6299 8.264 16.6299 8.648"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
ArrowRightIcon.displayName = "ArrowRightIcon";

export default ArrowRightIcon;
