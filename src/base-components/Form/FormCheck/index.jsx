/* eslint-disable react/display-name */
import React from "react";
import { twMerge } from "tailwind-merge";

const FormCheck = (props) => {
  return (
    <div {...props} className={twMerge(["flex items-center", props.className])}>
      {props.children}
    </div>
  );
};

FormCheck.Label = (props) => {
  return (
    <label
      {...props}
      className={twMerge(["cursor-pointer ml-2", props.className])}
    >
      {props.children}
    </label>
  );
};

FormCheck.Input = (props) => {
  return (
    <input
      {...props}
      className={twMerge([
        //   default class
        "transition-all duration-100 ease-in-out",
        //   Input Type Radio
        props.type === "radio" &&
          "shadow-sm border-slate-200 cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50",

        // Input type checkbox
        props.type === "checkbox" &&
          "shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50",

        //   On Checked
        "[&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10",
        "[&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10",

        //   On Checked and NOT Disabled
        "[&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50",

        //   On Checked and disabled
        "[&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50",
        props.className,
      ])}
    />
  );
};

export default FormCheck;
