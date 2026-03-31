import React from "react";

interface TheSlabMobileProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const TheSlabMobile = React.memo(function TheSlabMobile({
  className,
}: TheSlabMobileProps) {
  return (
    <img src="/images/TheSLabM.svg" alt="TheSlabMobile" className={className} />
  );
});
TheSlabMobile.displayName = "TheSlabMobile";

export default TheSlabMobile;
