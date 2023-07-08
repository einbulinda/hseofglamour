"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { createRef, useEffect, useState } from "react";
import HOGLogo from "../HOGLogo";
import Lucide from "@/base-components/Lucide";
import clsx from "clsx";
import SimpleBar from "simplebar";
import { toRaw } from "@/utils/helper";
import { menus } from "@/lib";
import { enter, leave, linkTo, nestedMenu } from "./side-menu";
import { Transition } from "react-transition-group";

const MobileMenu = () => {
  const pathname = usePathname();
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [formattedMenu, setFormattedMenu] = useState([]);
  const mobileMenu = () => nestedMenu(toRaw(menus.sideMenu), pathname);
  const scrollableRef = createRef();

  useEffect(() => {
    if (scrollableRef.current) {
      new SimpleBar(scrollableRef.current);
    }
    setFormattedMenu(mobileMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menus]);

  return (
    <>
      {/* BEGIN: Mobile Menu @einbulinda_28.06.2023 */}
      <div
        className={clsx([
          "w-full fixed bg-primary/90 z-[60] border-b border-white/[0.08] -mt-5 -mx-3 sm:-mx-8 mb-6 dark:bg-darkmode-700 md:hidden",
          "before: content-[''] before: absolute before:inset-0 before:z-[-1] before:w-full before:h-full before:bg-black/[0.15]",
          "after:content-[''] after:w-full after:h-screen after:z-10 after:fixed after:inset-0 after:bg-black/90 after:transition-opacity after:duration-200 after:ease-in-out",
          !activeMobileMenu && "after:invisible after:opacity-0",
          activeMobileMenu && "after:visible after:opacity-100",
        ])}
      >
        <div className="h-[70px] px-3 sm:px-8 flex items-center">
          <Link href="/" className="flex mr-auto">
            <HOGLogo height={70} />
          </Link>

          <Link href="#" onClick={(e) => e.preventDefault()}>
            <Lucide
              icon="BarChart2"
              className="w-8 h-8 text-white transform -rotate-90"
              onClick={() => setActiveMobileMenu(!activeMobileMenu)}
            />
          </Link>
        </div>
        <div
          ref={scrollableRef}
          className={clsx([
            "h-screen z-20 top-0 left-0 w-[270px] -ml-[100%] bg-primary transition-all duration-300 ease-in-out dark:bg-darkmode-800",
            "[&[data-simplebar]]:fixed [&_.simplebar-scrollbar]:before:bg-black/50",
            activeMobileMenu && "ml-0",
          ])}
        >
          <Link
            href="#"
            className={clsx([
              "fixed top-0 right-0 mt-4 transition-opacity duration-200 ease-in-out",
              !activeMobileMenu && "invisible opacity-0",
              activeMobileMenu && "visible opacity-100",
            ])}
          >
            <Lucide
              icon="XCircle"
              className="w-8 h-8 text-white transform -rotate-90"
              onClick={() => setActiveMobileMenu(!activeMobileMenu)}
            />
          </Link>
          <ul className="py-2">
            {/* BEGIN:First Child */}
            {formattedMenu.map((menu, menuKey) =>
              menu == "divider" ? (
                <Divider as="li" className="my-6" key={menuKey} />
              ) : (
                <li key={menuKey}>
                  <Menu
                    menu={menu}
                    formattedMenuState={[formattedMenu, setFormattedMenu]}
                    level="first"
                    setActiveMobileMenu={setActiveMobileMenu}
                  />

                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={clsx([
                          "bg-black/10 rounded-lg mx-4 my-1 dark:bg-darkmode-700",
                          !menu.activeDropdown && "hidden",
                          menu.activeDropdown && "block",
                        ])}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li
                            className="max-w-[1280px] w-full mx-auto"
                            key={subMenuKey}
                          >
                            <Menu
                              menu={subMenu}
                              formattedMenuState={[
                                formattedMenu,
                                setFormattedMenu,
                              ]}
                              level="second"
                              setActiveMobileMenu={setActiveMobileMenu}
                            />

                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <Transition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={clsx([
                                    "bg-black/10 rounded-lg my-1 dark:bg-darkmode-600",
                                    !subMenu.activeDropdown && "hidden",
                                    subMenu.activeDropdown && "block",
                                  ])}
                                >
                                  {subMenu.subMenu.map(
                                    (lastSubMenu, lastSubMenuKey) => (
                                      <li
                                        className="max-w-[1280px] w-full mx-auto"
                                        key={lastSubMenuKey}
                                      >
                                        <Menu
                                          menu={lastSubMenu}
                                          formattedMenuState={[
                                            formattedMenu,
                                            setFormattedMenu,
                                          ]}
                                          level="third"
                                          setActiveMobileMenu={
                                            setActiveMobileMenu
                                          }
                                        ></Menu>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}

                  {/* END: Second Child */}
                </li>
              )
            )}
            {/* END:First Child */}
          </ul>
        </div>
      </div>
    </>
  );
};

const Menu = (props) => {
  const router = useRouter();
  const [formattedMenu, setFormattedMenu] = props.formattedMenuState;

  return (
    <Link
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "h-[50px] flex items-center text-white",
        props.level == "first" && "px-6",
        props.level != "first" && "px-4",
      ])}
      onClick={() => {
        linkTo(props.menu, router, props.setActiveMobileMenu);
        setFormattedMenu(toRaw(formattedMenu));
      }}
    >
      <div>
        <Lucide icon={props.menu.icon} />
      </div>
      <div className="flex items-center w-full ml-3">
        {props.menu.title}
        {props.menu.subMenu && (
          <div
            className={clsx([
              "transition ease-in duration-100 ml-auto",
              props.menu.activeDropdown && "transform rotate-180",
            ])}
          >
            <Lucide icon="ChevronDown" className="w-5 h-5" />
          </div>
        )}
      </div>
    </Link>
  );
};

const Divider = (props) => {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([
        props.className,
        "w-full h-px bg-white/[0.08] relative",
      ])}
    />
  );
};

export default MobileMenu;
