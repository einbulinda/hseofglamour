"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const HOGLogo = (props) => {
  const { height, width } = props;
  const { theme } = useTheme; //for dark mode logo
  const ratio = 500 / 312;

  if (width && height) {
    return (
      <Image
        priority={true}
        src="/hseofgla.svg"
        alt="House of Glamour logo"
        width={width}
        height={height}
        {...props}
      />
    );
  } else if (width) {
    return (
      <Image
        priority={true}
        src="/hseofgla.svg"
        alt="House of Glamour logo"
        width={width}
        height={width / ratio}
        {...props}
      />
    );
  } else {
    return (
      <Image
        priority={true}
        src="/hseofgla.svg"
        alt="House of Glamour logo"
        width={height * ratio}
        height={height}
        {...props}
      />
    );
  }
};

export default HOGLogo;
