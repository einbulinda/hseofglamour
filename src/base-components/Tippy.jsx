"use client";
import tippy, { animateFill as animateFillPlugin } from "tippy.js";
import clsx from "clsx";
import React, { createRef, useEffect } from "react";
import { roundArrow } from "tippy.js";

const init = (el, props) => {
  tippy(el, {
    plugins: [animateFillPlugin],
    content: props.content,
    arrow: roundArrow,
    popperOptions: {
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
          },
        },
      ],
    },
    animateFill: false,
    animation: "shift-away",
    ...props.options,
  });
};

const Tippy = (props) => {
  const tippyRef = createRef();
  const Component = props.as || "span";

  useEffect(() => {
    if (props.getRef) {
      props.getRef && props.getRef(tippyRef.current);
    }

    if (tippyRef.current !== null) {
      init(tippyRef.current, props);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current]);

  const { content, as, options, getRef, className, ...computedProps } = props;

  return (
    <Component
      ref={tippyRef}
      className={clsx("cursor-pointer", className)}
      {...computedProps}
    >
      {props.children}
    </Component>
  );
};

export default Tippy;
