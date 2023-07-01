"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { createContext, useContext } from "react";

const breadcrumbContext = createContext({ light: undefined });

function Breadcrumb({ className, light, children }) {
  const breadcrumb = useContext(breadcrumbContext);

  return (
    <breadcrumbContext.Provider value={{ light: light }}>
      <nav className={clsx(["flex", className])} aria-label="breadcrumb">
        <ol
          className={clsx([
            "flex items-center text-primary dark:text-slate-300",
            { "text-white/90": light },
          ])}
        >
          {Array.isArray(children)
            ? children.map((item, key) => {
                const { props } = item;

                return (
                  <li
                    key={key}
                    className={clsx([
                      className,
                      key > 0 && "relative ml-5 pl-0.5",
                      !breadcrumb.light &&
                        key > 0 &&
                        "before:content-[''] before:w-[14px] before:h-[14px] before:bg-breadcrumb-chevron-dark before:bg-[length:100%] before:-ml-[1.125rem] before:absolute before:my-auto before:inset-y-0",
                      breadcrumb.light &&
                        key > 0 &&
                        "before:content-[''] before:w-[14px] before:h-[14px] before:bg-breadcrumb-chevron-light before:bg-[length:100%] before:-ml-[1.125rem] before:absolute before:my-auto before:inset-y-0",
                      key > 0 && "dark:before:bg-breadcrumb-chevron-darkmode",
                      !breadcrumb.light &&
                        props.active &&
                        "text-slate-800 cursor-text dark:text-slate-400",
                      breadcrumb.light && active && "text-white/70",
                    ])}
                  >
                    <Link href={props.href}>{props.children}</Link>
                  </li>
                );
              })
            : children}
        </ol>
      </nav>
    </breadcrumbContext.Provider>
  );
}

export default Breadcrumb;
