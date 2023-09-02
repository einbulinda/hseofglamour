"use client";
import clsx from "clsx";
import { setValue, init, updateValue } from "./tom-select";
import { createRef, useEffect, useMemo, useRef } from "react";

const TomSelect = (props) => {
  const initialRender = useRef(true);
  const tomSelectRef = createRef();

  // Compute all default options
  const computedOptions = useMemo(() => {
    let options = {
      ...props.options,
      plugins: {
        dropdown_input: {},
        ...props.options.plugins,
      },
    };

    if (Array.isArray(props.value)) {
      options = {
        persist: false,
        create: true,
        onDelete: function (values) {
          return confirm(
            values.length > 1
              ? "Are you sure you want to remove these " +
                  values.length +
                  " items?"
              : 'Are you sure you want to remove "' + values[0] + '"?'
          );
        },
        ...options,
        plugins: {
          remove_button: {
            title: "Remove this item",
          },
          ...options.plugins,
        },
      };
    }

    return options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.options]);

  useEffect(() => {
    if (tomSelectRef.current) {
      // props.getRef(tomSelectRef.current); //props.getRef encounters an error __@einbulinda#20.08.2023

      if (initialRender.current) {
        // Unique attribute
        tomSelectRef.current.setAttribute(
          "data-id",
          "_" + Math.random().toString(36).substr(2, 9)
        );

        // Clone the select element to prevent tom select remove the original element
        const clonedEl = tomSelectRef.current.cloneNode(true);

        // Save initial classnames
        const classNames = tomSelectRef.current?.getAttribute("class");
        classNames && clonedEl.setAttribute("data-initial-class", classNames);

        // Hide original element
        tomSelectRef.current?.parentNode &&
          tomSelectRef.current?.parentNode.appendChild(clonedEl);
        tomSelectRef.current.setAttribute("hidden", "true");

        // Initialize tom select
        setValue(clonedEl, props);
        init(tomSelectRef.current, clonedEl, props, computedOptions);

        initialRender.current = false;
      } else {
        const clonedEl = document.querySelectorAll(
          `[data-id='${tomSelectRef.current.getAttribute(
            "data-id"
          )}'][data-initial-class]`
        )[0];

        const value = props.value;
        updateValue(
          tomSelectRef.current,
          clonedEl,
          value,
          props,
          computedOptions
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tomSelectRef, props.value, props.className]);

  const { options, value, onOptionAdd, onChange, getRef, ...computedProps } =
    props;

  return (
    <select
      {...computedProps}
      ref={tomSelectRef}
      value={props.value}
      onChange={(event) => {
        props.onChange(event.target.value);
      }}
      className={clsx(["tom-select", props.className])}
    >
      {props.children}
    </select>
  );
};

export default TomSelect;
