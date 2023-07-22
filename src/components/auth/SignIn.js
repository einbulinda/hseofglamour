"use client";
import clsx from "clsx";
import { useState } from "react";
import DarkModeSwitch from "../DarkModeSwitch";
import Link from "next/link";
import Image from "next/image";
import HOGLogo from "../HOGLogo";
import { Field, Form, Formik } from "formik";
import formValidations from "@/validations";
import { FormCheck, FormInput } from "@/base-components/Form";
import Button from "@/base-components/Button";
import { useAuth, VIEWS } from "../AuthProvider";
import supabase from "@/lib/supabase-browser";

const SignIn = () => {
  const { setView } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  const signInUser = async (formData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) setErrorMsg(error.message);
  };

  return (
    <div
      className={clsx([
        //-m-3 sm:-mx-8 sm:px-8 --> Cause x and Y scrollbars. removed 12.7.23 @einbulinda
        "p-3 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600",
        "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
        "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
      ])}
    >
      <DarkModeSwitch />
      <div className="container relative z-10 sm:px-10">
        <div className="block grid-cols-2 gap-4 xl:grid">
          {/* BEGIN: Login Info */}
          <div className="flex-col hidden min-h-screen xl:flex">
            <Link href="/" className="flex items-center pt-5 -intro-x">
              <HOGLogo height={140} />
            </Link>
            <div className="my-auto">
              <Image
                src="/illustration.svg"
                alt="Illustrator Image"
                width={200}
                height={300}
                className="-mt-16 -intro-x w-auto h-auto"
              />
              <div className="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                A few more clicks to <br />
                sign in to your account.
              </div>
              <div className="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                Welcome to House of Glamour admin.
              </div>
            </div>
          </div>
          {/* END:Login Info */}
          {/* BEGIN:Login Form */}
          <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                Sign In
              </h2>
              <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                A few clicks to sign in to your account.
              </div>
              {/* BEGIN:Login Form */}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={formValidations.signInSchema}
                onSubmit={signInUser}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mt-8 intro-x">
                      <Field
                        as={FormInput}
                        className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                        id="email"
                        type="text"
                        name="email"
                        placeholder="example@email.com"
                      />
                      {errors.email && touched.email ? (
                        <div className="pt-1 pl-2 italic text-red-600">
                          {errors.email}
                        </div>
                      ) : null}

                      <Field
                        as={FormInput}
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w[350px]"
                      />
                      {errors.password && touched.password ? (
                        <div className="pt-1 pl-2 italic text-red-600">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                      <div className="flex items-center mr-auto">
                        <FormCheck.Input
                          id="remember-me"
                          type="checkbox"
                          className="mr-2 border"
                        />
                        <FormCheck.Label className="cursor-pointer select-none">
                          Remember me
                        </FormCheck.Label>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}
                      >
                        Forgot Password?
                      </div>
                    </div>
                    <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                      <Button
                        variant="primary"
                        type="submit"
                        className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                      >
                        Login
                      </Button>

                      <Button
                        variant="outline-secondary"
                        className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                        onClick={() => setView(VIEWS.SIGN_UP)}
                      >
                        Register
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              {errorMsg && (
                <div className="text-red-600 mt-2 italic">{errorMsg}</div>
              )}

              {/* END:Login Form */}
              <div className="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left">
                By signin up, you agree to our{" "}
                <Link className="text-primary dark:text-slate-200" href="#">
                  Terms and Conditions
                </Link>{" "}
                &{" "}
                <Link className="text-primary dark:text-slate-200" href="#">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
          {/* END:Login Form */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
