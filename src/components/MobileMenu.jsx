"use client";
import Link from "next/link";
import React, { createRef, useEffect, useState } from "react";
import HOGLogo from "./HOGLogo";
import Lucide from "@/base-components/Lucide";
import clsx from "clsx";
import SimpleBar from "simplebar";

const MobileMenu = () => {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [formattedMenu, setFormattedMenu] = useState([]);
  const scrollableRef = createRef();

  useEffect(() => {
    if (scrollableRef.current) {
      new SimpleBar(scrollableRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            />
          </Link>
        </div>
        <div ref={scrollableRef}></div>
      </div>
    </>
  );
};

export default MobileMenu;
