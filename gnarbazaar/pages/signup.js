import Layout from "@/components/Layout";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// import { redirect } from 'next/dist/server/api-utils';

export default function SignupPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);
  console.log(session);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="w-full"
            id="name"
            autoFocus
            {...register("name", {
              required: "Please enter name",
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Enter valid email",
              },
            })}
            className="w-full"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Enter password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 2,
                message: "Confirm password is at least 6 characters",
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className="text-red-500">Password does not match</div>
            )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
          No Account? &nbsp;
          <Link href={`/signup${redirect || '/'}`}>Signup</Link>
        </div>
      </form>
    </Layout>
  );
}
