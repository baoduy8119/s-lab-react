import Image from "next/image";
import React from "react";
import styles from "./PartnerLogos.module.scss";

interface PartnerLogosProps {
  className?: string;
}

const PartnerLogos = React.memo(function PartnerLogos({ className }: PartnerLogosProps) {
  return (
    <div className={`${styles.partnerLogos} ${className || ""}`}>
      <Image src="/images/partners/logo1.svg" alt="Partner" width={144} height={32} />
      <Image src="/images/partners/logo2.svg" alt="Partner" width={103} height={32} />
      <Image src="/images/partners/logo3.svg" alt="Partner" width={55} height={31} />
      <Image src="/images/partners/logo4.svg" alt="Partner" width={36} height={36} />
      <Image src="/images/partners/logo5.svg" alt="Partner" width={137} height={38} />
      <Image src="/images/partners/logo6.svg" alt="Partner" width={29} height={30} />
      <Image src="/images/partners/logo7.svg" alt="Partner" width={33} height={28} />
      <Image src="/images/partners/logo8.svg" alt="Partner" width={136} height={38} />
    </div>
  );
});
PartnerLogos.displayName = "PartnerLogos";

export default PartnerLogos;
