"use client";
import Button from "@/base-components/Button";
import { useFormik } from "formik";
import { FormInput } from "@/base-components/Form";
import Link from "next/link";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });

      if (data) {
        router.push("/auth/signin");
      }
      if (error) {
        toast.error(error.message, {
          duration: 4000,
          position: "bottom-center",
        });
      }
    },
  });

  return (
    <div className="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
      <div className="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
        <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
          Sign Up
        </h2>
        <div className="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
          Create an access account for House of Glamour admin space.
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-8 intro-x">
            <FormInput
              type="text"
              name="firstName"
              placeholder="First Name"
              className="block px-4 py-3 min-w-full xl:min-w-[350px] intro-x"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <FormInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="block px-4 py-3 min-w-full xl:min-w-[350px] mt-4 intro-x"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              className="block px-4 py-3 min-w-full xl:min-w-[350px] mt-4 intro-x"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              className="block px-4 py-3 min-w-full xl:min-w-[350px] mt-4 intro-x"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
              <div className="h-full col-span-3 rounded bg-success"></div>
              <div className="h-full col-span-3 rounded bg-success"></div>
              <div className="h-full col-span-3 rounded bg-success"></div>
              <div className="h-full col-span-3 rounded bg-slate-100 dark:bg-darkmode-800"></div>
            </div>

            <FormInput
              type="password"
              name="confirmPassword"
              className="block px-4 py-3 mt-4 intro-x min-w-full xl:min-w-[350px]"
              placeholder="Password Confirmation"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mt-5 text-center intro-x xl:mt-8 xl:text-left">
            <Button
              type="submit"
              variant="primary"
              className="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
            >
              Register
            </Button>
            <Link href="/auth/signin">
              <Button
                variant="outline-secondary"
                className="w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
