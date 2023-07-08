"use client";
import Tippy from "@/base-components/Tippy";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const toggleTooltip = (el) => {
  if (window.innerWidth <= 1260) {
    el._tippy?.enable();
  } else {
    el._tippy.disable();
  }
};

const initTooltipEvent = (tippyRef) => {
  window.addEventListener("resize", () => toggleTooltip(tippyRef));
};

const SideMenuTooltip = (props) => {
  const tippyRef = useRef();
  const Component = props.as || Link;

  useEffect(() => {
    if (tippyRef.current !== undefined) {
      toggleTooltip(tippyRef.current);
      initTooltipEvent(tippyRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tippyRef.current]);

  const { as, ...computedProps } = props;
  return (
    <Tippy
      {...computedProps}
      as={Component}
      content={props.content}
      options={{ placement: "left" }}
      getRef={(el) => {
        if (el !== null) tippyRef.current = el;
      }}
    >
      {props.children}
    </Tippy>
  );
};

export default SideMenuTooltip;
