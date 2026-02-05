import React, { useId } from 'react';

interface GlowEffectSvgProps {
  color: string;
  className?: string;
}

const GlowEffectSvg: React.FC<GlowEffectSvgProps> = ({ color, className }) => {
  const filterId = useId();
  const filterUrl = `filter-${filterId.replace(/:/g, '')}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="466" height="406" viewBox="0 0 466 406" fill="none">
      <g filter="url(#filter0_fn_15385_5057)">
        <circle cx="233" cy="173" r="83" fill="#AFFF9A" />
      </g>
      <defs>
        <filter id="filter0_fn_15385_5057" x="0" y="-60" width="466" height="466" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_15385_5057" />
          <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="1312" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
          </feComponentTransfer>
          <feComposite operator="in" in2="effect1_foregroundBlur_15385_5057" in="coloredNoise1" result="noise1Clipped" />
          <feFlood flood-color="rgba(0, 0, 0, 0.6)" result="color1Flood" />
          <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
          <feMerge result="effect2_noise_15385_5057">
            <feMergeNode in="effect1_foregroundBlur_15385_5057" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default React.memo(GlowEffectSvg);
