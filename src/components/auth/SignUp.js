"use client";
import { useState } from "react";
import DarkModeSwitch from "../DarkModeSwitch";
import Link from "next/link";
import HOGLogo from "../HOGLogo";
import clsx from "clsx";
import Button from "@/base-components/Button";
import { FormInput } from "@/base-components/Form";
import { Field, Form, Formik } from "formik";
import formValidations from "@/validations";
import { VIEWS, useAuth } from "../AuthProvider";
import supabase from "@/lib/supabase-browser";

const SignUp = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  const registerUser = async (formData) => {
    const { error } = await supabase.auth.signUp({
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      password: formData?.password,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

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

          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                Sign Up
              </h2>
              <div className="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
                Create an access account for House of Glamour admin space.
              </div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={formValidations.signUpSchema}
                onSubmit={registerUser}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mt-8 intro-x">
                      <Field
                        as={FormInput}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="block px-4 py-3 min-w-full xl:min-w-[350px] intro-x"
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="pt-1 pl-2 italic text-red-600">
                          {errors.firstName}
                        </div>
                      ) : null}
                      <Field
                        as={FormInput}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="block px-4 py-3 min-w-full xl:min-w-[350px] mt-4 intro-x"
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className="pt-1 pl-2 italic text-red-600">
                          {errors.lastName}
                        </div>
                      ) : null}
                      <Field
                        as={FormInput}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="block px-4 py-3 min-w-full xl:min-w-[350px] mt-4 intro-x"
                      />
                      {errors.email && touched.email ? (
                        <div className="pt-1 pl-2 italic text-red-600">
                          {errors.email}
                        </div>
                      ) : null}
                      <Field
                        as={FormInput}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="block px-4 py-3 min-w-full xl:min-w-[350px] mt-4 intro-x"
                      />
                      {errors.password && touched.password ? (
                        <div className="pt-1 pl-2 italic text-red-600">
                          {errors.password}
                        </div>
                      ) : null}
                      <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
                        <div className="h-full col-span-3 rounded bg-success"></div>
                        <div className="h-full col-span-3 rounded bg-success"></div>
                        <div className="h-full col-span-3 rounded bg-success"></div>
                        <div className="h-full col-span-3 rounded bg-slate-100 dark:bg-darkmode-800"></div>
                      </div>

                      <Field
                        as={FormInput}
                        type="password"
                        name="confirmPassword"
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
                        placeholder="Password Confirmation"
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="pt-1 pl-2 italic text-red-600">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                      >
                        Register
                      </Button>

                      <Button
                        onClick={() => setView(VIEWS.SIGN_IN)}
                        variant="outline-secondary"
                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                      >
                        Sign in
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              {errorMsg && (
                <div className="text-red-600 mt-2 italic">{errorMsg}</div>
              )}
            </div>
          </div>

          {/* END: Register Form */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
