/* eslint-disable react/display-name */
import React, { createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

const tableContext = createContext({
  dark: false,
  bordered: false,
  hover: false,
  striped: false,
  sm: false,
});

const Table = ({ className, dark, bordered, hover, striped, sm, ...props }) => {
  return (
    <tableContext.Provider
      value={{
        dark: dark,
        bordered: bordered,
        hover: hover,
        striped: striped,
        sm: sm,
      }}
    >
      <table
        className={twMerge([
          "w-full text-left",
          dark && "bg-dark text-white dark:bg-black/30",
          className,
        ])}
        {...props}
      >
        {props.children}
      </table>
    </tableContext.Provider>
  );
};

const theadContext = createContext({ variant: "default" });

const TableHeader = ({ className, ...props }) => {
  return (
    <theadContext.Provider value={{ variant: props.variant }}>
      <thead
        className={twMerge([
          props.variant === "light" && "bg-slate-200/60 dark:bg-slate-200",
          props.variant === "dark" && "bg-dark text-white dark:bg-black/30",
          className,
        ])}
        {...props}
      >
        {props.children}
      </thead>
    </theadContext.Provider>
  );
};

const TableBody = ({ className, ...props }) => {
  return <thead className={className}>{props.children}</thead>;
};

const TableRow = ({ className, ...props }) => {
  const table = useContext(tableContext);

  return (
    <tr
      className={twMerge([
        table.hover &&
          "[&:hover_td]:bg-slate-100 [&:hover_td]:dark:bg-darkmode-300 [&:hover_td]:dark:bg-opacity-50",
        table.striped &&
          "[&:nth-of-type(odd)_td]:bg-slate-100 [&:nth-of-type(odd)_td]:dark:bg-darkmode-300 [&:nth-of-type(odd)_td]:dark:bg-opacity-50",
        className,
      ])}
      {...props}
    >
      {props.children}
    </tr>
  );
};

const TableHead = ({ className, ...props }) => {
  const table = useContext(tableContext);
  const thead = useContext(theadContext);

  return (
    <th
      className={twMerge([
        "font-medium px-5 py-3 border-b-2 dark:border-darkmode-300",
        thead.variant === "light" && "border-b-0 text-slate-700",
        thead.variant === "dark" && "border-b-0",
        table.dark && "border-slate-600 dark:border-darkmode-300",
        table.bordered && "border-l border-r border-t",
        table.sm && "px-4 py-2",
        className,
      ])}
      {...props}
    >
      {props.children}
    </th>
  );
};

const TableData = ({ className, ...props }) => {
  const table = useContext(tableContext);

  return (
    <td
      className={twMerge([
        "px-5 py-3 border-b dark:border-darkmode-300",
        table.dark && "border-slate-600 dark:border-darkmode-300",
        table.bordered && "border-l border-r border-t",
        table.sm && "px-4 py-2",
        className,
      ])}
      {...props}
    >
      {props.children}
    </td>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableHead, TableData };
