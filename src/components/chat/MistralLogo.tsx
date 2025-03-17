import React from "react";

/**
 * Component representing the Mistral logo.
 * @param size The size of the logo
 * @param className className to apply to the logo
 */
function MistralLogo({
  size = 125,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="a"
      width={size}
      height={size / 1.4}
      viewBox="0 0 212.121 151.515"
      version="1.1"
      className={className}
    >
      <defs id="defs10"></defs>
      <rect
        x="30.303001"
        y="0"
        width="30.302999"
        height="30.302999"
        fill="#ffd700"
        strokeWidth="0"
        id="rect1"
      ></rect>
      <rect
        x="151.515"
        y="0"
        width="30.302999"
        height="30.302999"
        fill="#ffd700"
        strokeWidth="0"
        id="rect2"
      ></rect>
      <rect
        x="30.303001"
        y="30.303001"
        width="60.605999"
        height="30.302999"
        fill="#ffaf00"
        strokeWidth="0"
        id="rect3"
      ></rect>
      <rect
        x="121.21201"
        y="30.303001"
        width="60.605999"
        height="30.302999"
        fill="#ffaf00"
        strokeWidth="0"
        id="rect4"
      ></rect>
      <rect
        x="30.303001"
        y="60.606003"
        width="151.515"
        height="30.302999"
        fill="#ff8205"
        strokeWidth="0"
        id="rect5"
      ></rect>
      <rect
        x="30.303001"
        y="90.908997"
        width="30.302999"
        height="30.302999"
        fill="#fa500f"
        strokeWidth="0"
        id="rect6"
      ></rect>
      <rect
        x="90.908997"
        y="90.908997"
        width="30.302999"
        height="30.302999"
        fill="#fa500f"
        strokeWidth="0"
        id="rect7"
      ></rect>
      <rect
        x="151.515"
        y="90.908997"
        width="30.302999"
        height="30.302999"
        fill="#fa500f"
        strokeWidth="0"
        id="rect8"
      ></rect>
      <rect
        x="0"
        y="121.21201"
        width="90.908997"
        height="30.302999"
        fill="#e10500"
        strokeWidth="0"
        id="rect9"
      ></rect>
      <rect
        x="121.21201"
        y="121.21201"
        width="90.908997"
        height="30.302999"
        fill="#e10500"
        strokeWidth="0"
        id="rect10"
      ></rect>
    </svg>
  );
}

export default MistralLogo;
