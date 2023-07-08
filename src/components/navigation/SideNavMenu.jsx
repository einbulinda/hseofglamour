"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HOGLogo from "../HOGLogo";
import { enter, leave, nestedMenu, linkTo } from "./side-menu";
import { menus } from "@/lib";
import { usePathname, useRouter } from "next/navigation"; //importing from next/router will cause error on mounting
import SideMenuTooltip from "./SideMenuTooltip";
import Lucide from "@/base-components/Lucide";
import { Transition } from "react-transition-group";

const SideNavMenu = () => {
  const [formattedMenu, setFormattedMenu] = useState([]);
  const pathname = usePathname();

  const sideMenu = () => nestedMenu(menus.sideMenu, pathname);

  useEffect(() => {
    setFormattedMenu(sideMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus]);

  return (
    <nav className="hidden md:block md:w-[105px] xl:w-[250px] px-5 pb-16 overflow-x-hidden z-10">
      <Link href="/" className="flex items-center pt-4 pl-5 mt-3 intro-x">
        <HOGLogo height={75} />
        {/* <span className="hidden ml-3 text-lg text-white xl:block">
          House of Gla
        </span> */}
      </Link>

      <Divider type="div" className="my-6" />
      <ul>
        {/* BEGIN: First Child */}
        {formattedMenu.map((menu, menuKey) =>
          menu === "divider" ? (
            <Divider
              key={menuKey}
              type="li"
              className={clsx([
                "my-6",

                //Animation
                `opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay-${
                  (menuKey + 1) * 10
                }`,
              ])}
            />
          ) : (
            <li key={menuKey}>
              <Menu
                className={clsx({
                  //Animation
                  [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                    (menuKey + 1) * 10
                  }`]: !menu.active,
                })}
                menu={menu}
                formattedMenuState={[formattedMenu, setFormattedMenu]}
                level="first"
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
                      "bg-white/[0.04] rounded-xl relative dark:bg-transparent",
                      "before:content-[''] before:block before:inset-0 before:bg-primary/60 before:rounded-xl before:absolute before:z-[-1] before:dark:bg-darkmode-900/30",
                      { block: menu.activeDropdown },
                      { hidden: !menu.activeDropdown },
                    ])}
                  >
                    {menu.subMenu.map((subMenu, subMenuKey) => (
                      <li key={subMenuKey}>
                        <Menu
                          className={clsx({
                            // Animation
                            [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                              (subMenuKey + 1) * 10
                            }`]: !subMenu.active,
                          })}
                          menu={subMenu}
                          formattedMenuState={[formattedMenu, setFormattedMenu]}
                          level="second"
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
                                "bg-white/[0.04] rounded-xl relative dark:bg-transparent",
                                "before:content-[''] before:block before:inset-0 before:bg-primary/60 before:rounded-xl before:absolute before:z-[-1] before:dark:bg-darkmode-900/30",
                                { block: subMenu.activeDropdown },
                                { hidden: !subMenu.activeDropdown },
                              ])}
                            >
                              {subMenu.subMenu.map(
                                (lastSubmenu, lastSubMenuKey) => (
                                  <li key={lastSubMenuKey}>
                                    <Menu
                                      className={clsx({
                                        // Animation
                                        [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                          (lastSubMenuKey + 1) * 10
                                        }`]: !lastSubmenu.active,
                                      })}
                                      menu={lastSubmenu}
                                      formattedMenuState={[
                                        formattedMenu,
                                        setFormattedMenu,
                                      ]}
                                      level="third"
                                    />
                                  </li>
                                )
                              )}
                            </ul>
                          </Transition>
                        )}
                        {/* END: THird Child */}
                      </li>
                    ))}
                  </ul>
                </Transition>
              )}
              {/* END: Second Child */}
            </li>
          )
        )}
        {/* END: First Child */}
      </ul>
    </nav>
  );
};

function Menu(props) {
  const router = useRouter();
  const [formattedMenu, setFormattedMenu] = props.formattedMenuState;

  return (
    <SideMenuTooltip
      as={Link}
      content={props.menu.title}
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "h-[50px] flex items-center pl-5 text-white mb-1 relative rounded-xl dark:text-slate-300",
        {
          "text-white/70 dark:text-slate-400":
            !props.menu.active && props.level != "first",
          "bg-primary dark:bg-transparent":
            props.menu.active && props.level == "first",
          "before:content-[''] before:block before:inset-0 before:bg-white/0.08 before:rounded-xl before:absolute before:border-b-[3px] before:border-solid before:border-black/10 before:dark:border-black/10 before:dark:bg-darkmode-700":
            props.menu.active && props.level == "first",
          "hover:bg-primary/60 hover:dark:bg-transparent hover:before:block hover:before:inset-0 hover:before:bg-white/[0.04] hover:before:rounded-xl hover:before:absolute hover:before:z-[-1] hover:before:dark:bg-darkmode-700":
            !props.menu.active &&
            !props.menu.activeDropdown &&
            props.level == "first",
        },
        props.className,
      ])}
      onClick={(e) => {
        linkTo(props.menu, router);
        setFormattedMenu([...formattedMenu]);
      }}
    >
      <div
        className={clsx({
          "z-10 dark:text-slate-300":
            props.menu.active && props.level == "first",
          "dark:text-slate-400": !props.menu.active && props.level == "first",
        })}
      >
        <Lucide icon={props.menu.icon} />
      </div>
      <div
        className={clsx([
          "hidden xl:flex w-full ml-3 items-center",
          { "font-medium": props.menu.active && props.level != "first" },
          {
            "font-medium z-10 dark:test-slate-300":
              props.menu.active && props.level == "first",
          },
          {
            "dark:text-slate-400": !props.menu.active && props.level == "first",
          },
        ])}
      >
        {props.menu.title}

        {props.menu.subMenu && (
          <div
            className={clsx([
              "transition ease-in duration-100 ml-auto mr-5 hidden xl:block",
              { "transform rotate-180": props.menu.activeDropdown },
            ])}
          >
            <Lucide className="w-4 h-4" icon="ChevronDown" />
          </div>
        )}
      </div>
    </SideMenuTooltip>
  );
}

function Divider(props) {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([
        props.className,
        "w-full h-px bg-white/[0.08] z-10 relative dark:bg-white/[0.07]",
      ])}
    ></Component>
  );
}

export default SideNavMenu;
