import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";

export default function login() {
  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" className="w-full" id="email" autoFocus></input>
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autoFocus
          ></input>
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          No Account? &nbsp;
          <Link href="signup">Signup</Link>
        </div>
      </form>
    </Layout>
  );
}
