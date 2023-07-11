"use client";
import Button from "@/base-components/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="py-2">
      {/*bg-primary dark:bg-inherit*/}
      <div className="container">
        {/* BEGIN:Error Page */}
        <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
          <div className="-intro-x lg:mr-20">
            <Image
              src="/error-illustration.svg"
              alt="Error Illustration"
              width={450}
              height={48}
              className="lg:h-auto"
            />
          </div>
          <div className="mt-10 text-white lg:mt-0">
            <div className="font-medium intro-x text-8xl">404</div>
            <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
              Oops. This page has gone missing
            </div>
            <div className="mt-3 text-lg intro-x">
              You may have mistyped the address or the page may have been moved.
            </div>
            <Button className="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
        {/* END:Error Page */}
      </div>
    </div>
  );
}

export default NotFound;
