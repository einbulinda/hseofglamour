import { Transition, Dialog as HeadlessDialog } from "@headlessui/react";
import React, {
  Fragment,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

const dialogContext = createContext({ open: false, zoom: false, size: "md" });
const Dialog = ({
  children,
  className,
  as = "div",
  open = false,
  onClose,
  staticBackdrop,
  size = "md",
  ...props
}) => {
  const focusElement = useRef(null);
  const [zoom, setZoom] = useState(false);
  return (
    <dialogContext.Provider value={{ open: open, zoom: zoom, size: size }}>
      <Transition appear as={Fragment} show={open}>
        <HeadlessDialog
          as={as}
          onClose={(value) => {
            if (!staticBackdrop) {
              return onClose(value);
            } else {
              setZoom(true);
              setTimeout(() => setZoom(false), 300);
            }
          }}
          initialFocus={focusElement}
          className={twMerge(["relative z-[60]", className])}
          {...props}
        >
          {children}
        </HeadlessDialog>
      </Transition>
    </dialogContext.Provider>
  );
};

const Panel = ({ children, className, as = "div", ...props }) => {
  const dialog = useContext(dialogContext);

  return (
    <>
      <Transition.Child
        as="div"
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-[400ms]"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 bg-black/60"
        aria-hidden="true"
      />

      <Transition.Child
        as="div"
        enter="ease-in-out duration-500"
        enterFrom="opacity-0 -mt-16"
        enterTo="opacity-100 mt-0 pt-16"
        leave="ease-in-out duration-[400ms]"
        leaveFrom="opacity-100 pt-16"
        leaveTo="opacity-0 -mt-16 pt-0"
        className="fixed inset-0 pb-16 overflow-y-auto"
      >
        <HeadlessDialog.Panel
          as={as}
          className={twMerge([
            "w-[90%] mx-auto bg-white relative rounded-md shadow-md transition-transform dark:bg-darkmode-600",
            dialog.size == "md" && "sm:w-[460px]",
            dialog.size == "sm" && "sm:w-[300px]",
            dialog.size == "lg" && "sm:w-[600px]",
            dialog.size == "xl" && "sm:w-[600px] lg:w-[900px]",
            dialog.zoom && "scale-105",
            className,
          ])}
          {...props}
        >
          {children}
        </HeadlessDialog.Panel>
      </Transition.Child>
    </>
  );
};

export { Dialog, Panel };
