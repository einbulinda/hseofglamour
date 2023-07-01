"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const HOGLogo = (props) => {
  const { height } = props;
  const { theme } = useTheme;
  const width = (height * 500) / 312;

  return (
    <Image
      src="/hseofgla.svg"
      alt="House of Glamour brand logo"
      width={width}
      height={height}
      {...props}
    />
  );
};

export default HOGLogo;
