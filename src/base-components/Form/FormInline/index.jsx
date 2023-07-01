"use client";

import { createContext } from "react";
import { twMerge } from "tailwind-merge";

export const formInlineContext = createContext(false);

function FormInline(props) {
  return (
    <formInlineContext.Provider value={true}>
      <div
        {...props}
        className={twMerge(["block sm:flex items-center", props.className])}
      >
        {props.children}
      </div>
    </formInlineContext.Provider>
  );
}

export default FormInline;
