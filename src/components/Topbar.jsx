"use client";
import Breadcrumb from "@/base-components/Breadcrumb";
import Lucide from "@/base-components/Lucide";
import FormInput from "@/base-components/Form/FormInput";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import Popover from "@/base-components/Headless/Popover";
import Menu from "@/base-components/Headless/Menu";
import Image from "next/image";
import { menus } from "@/lib";

const Topbar = () => {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => setSearchDropdown(true);
  const hideSearchDropdown = () => setSearchDropdown(false);

  return (
    <>
      {/* BEGIN: Top Bar @einbulinda_28.06.2023 */}
      <div className="h-[67px] z-[51] flex items-center relative border-b border-slate-200">
        {/* BEGIN: Breadcrumb  @einbulinda_29.06.2023*/}
        <Breadcrumb className="hidden mr-auto -intro-x sm:flex">
          <Link href="/">Application</Link>
          <Link href="/" active={true}>
            Dashboard
          </Link>
        </Breadcrumb>
        {/* END: Breadcrumb @einbulinda_29.06.2023 */}

        {/* BEGIN: Search @einbulinda_01.07.2023 */}
        <div className="relative mr-3 intro-x sm:mr-6">
          <div className="relative hidden sm:block">
            <FormInput
              type="text"
              placeholder="Search..."
              onFocus={showSearchDropdown}
              onBlur={hideSearchDropdown}
              className="border-transparent w-56 shadow-none rounded-full bg-slate-300/50 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400/70"
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 dark:text-slate-500"
            />
          </div>
          <Link href="" className="relative text-slate-600 sm:hidden">
            <Lucide icon="Search" className="w-5 h-5 dark:text-slate-500" />
          </Link>

          <Transition
            as={Fragment}
            show={searchDropdown}
            enter="transition-all ease-linear duration-150"
            enterFrom="mt-5 invisible opacity-0 translate-y-1"
            enterTo="mt-[3px] visible opacity-100 translate-y-0"
            leave="transition-all ease-linear duration-150"
            leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
            leaveTo="mt-5 invisible opacity-0 translate-y-1"
          >
            {/* Redesign of dropdown required -->logic */}
            <div className="absolute right-0 z-10 mt-[3px]">
              <div className="w-[450px] p-5 box">
                <div className="mb-2 font-medium">Pages</div>
                <div className="mb-5">
                  <Link href="" className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success">
                      <Lucide icon="Inbox" className="w-4h-4"></Lucide>
                    </div>
                    <div className="ml-3">Mail Settings</div>
                  </Link>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        {/* END:Search */}

        {/* BEGIN: Notifications @einbulinda_01.07.2023 */}
        <Popover className="mr-auto intro-x sm:mr-6">
          <Popover.Button className="relative text-slate-600 outline-none block before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger">
            <Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
          </Popover.Button>
          <Popover.Panel>
            <div></div>
          </Popover.Panel>
        </Popover>
        {/* END: Notifications */}

        {/* BEGIN:Account Menu @einbulinda_01.07.2023 */}
        <Menu>
          <Menu.Button className="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
            <Image
              src="/avatar.png"
              alt="profile image"
              height={32}
              width={32}
            />
          </Menu.Button>
          <Menu.Items className="w-56 mt-px text-white bg-primary">
            <Menu.Header className="font-normal">
              {/*!!! Use data from DB for logged in user */}
              <div className="font-medium">Einstein Bulinda</div>
              <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                Job Title
              </div>
            </Menu.Header>
            <Menu.Divider className="bg-white/[0.08]" />

            {/* The menu items to be transformed to links to related pages */}
            {menus.userProfile.map((item) => (
              <Menu.Item key={item.id} className="hover:bg-white/5">
                <Lucide icon={item.icon} className="w-4 h-4 mr-2" />{" "}
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
        {/* END:Account Menu */}
      </div>
      {/* END: Top Bar */}
    </>
  );
};

export default Topbar;
