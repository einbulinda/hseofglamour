/* eslint-disable react/display-name */
"use client";
import { Fragment } from "react";
import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

function Popover({ children, className, ...props }) {
  return (
    <HeadlessPopover
      as="div"
      className={twMerge(["relative", className])}
      {...props}
    >
      {children}
    </HeadlessPopover>
  );
}

Popover.Button = ({ as, children, className, ...props }) => {
  return (
    <HeadlessPopover.Button
      as={as}
      className={twMerge(["cursor-pointer", className])}
      {...props}
    >
      {children}
    </HeadlessPopover.Button>
  );
};

Popover.Panel = ({
  children,
  className,
  placement = "bottom-end",
  ...props
}) => {
  return (
    <Transition
      as={Fragment}
      enter="transition-all ease-linear duration-150"
      enterFrom="mt-5 invisible opacity-0 translate-y-1"
      enterTo="mt-1 visible opacity-100 translate-y-0"
      leave="transition-all ease-linear duration-150"
      leaveFrom="mt-1 visible opacity-100 translate-y-0"
      leaveTo="mt-5 invisible opacity-0 translate-y-1"
    >
      <div>
        <HeadlessPopover.Panel>{children}</HeadlessPopover.Panel>
      </div>
    </Transition>
  );
};

export default Popover;
