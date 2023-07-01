"use client";

import * as lucideIcons from "lucide-react";
import clsx from "clsx";

export const { createReactComponent, ...icons } = lucideIcons;

const Lucide = (props) => {
  const { icon, className, ...computedProps } = props;
  const Component = lucideIcons[props.icon];

  return (
    <Component
      {...computedProps}
      className={clsx(["stroke-1.5", props.className])}
    />
  );
};

export default Lucide;
