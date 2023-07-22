import DarkModeSwitch from "@/components/DarkModeSwitch";
import HOGLogo from "@/components/HOGLogo";
import Link from "next/link";
import React from "react";
import RegisterForm from "./RegisterForm";
import clsx from "clsx";
import SigninForm from "../signin/SigninForm";

function Register() {
  return (
    <div
      className={clsx([
        "p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
        "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
        "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
      ])}
    >
      <DarkModeSwitch />
      <div className="container relative z-10 sm:px-10">
        <div className="block grid-cols-2 gap-4 xl:grid">
          {/* BEGIN: Register Info */}
          <div className="flex-col hidden min-h-screen xl:flex">
            <Link href="/" className="flex items-center pt-5 -intro-x">
              <HOGLogo height={140} />
            </Link>
            <div className="my-auto">
              {/* Image */}
              <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                Become part of the journey.
              </div>
            </div>
          </div>
          {/* END: Register Info */}
          {/* BEGIN: Register Form */}
          <RegisterForm />
          {/* END: Register Form */}
        </div>
      </div>
    </div>
  );
}

export default Register;
