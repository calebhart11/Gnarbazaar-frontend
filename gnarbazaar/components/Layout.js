import Head from "next/head";
import Link from "next/link";
import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "@/utils/Store";
import { signOut, useSession } from "next-auth/react";
import DropdownLink from './DropdownLink';
// import { IonIcon } from '@ionic/react';
// import { cartOutline } from "ionicons"

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart')
    dispatch({type: 'CART_RESET'})
    signOut({ callbackUrl: '/login'})
  }
  return (
    <>
      <Head>
        <title>{title ? title + " - Gnarbazaar" : "Gnarbazaar"}</title>
        <meta
          name="description"
          content="A marketplace to share your awesome designs!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              <img
                className="h-11 w-22"
                src="https://i.imgur.com/gDkedEM.png"
              />
            </Link>
            <div>
              <Link href="/cart" className="p-2">
              Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-emerald-400 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === "loading" ? (
                "loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-emerald-400 hover:text-emerald-700">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className='absolute right-0 w-56 origin-top-right bg-white shadow-lg'>
                  <Menu.Item>
                    <DropdownLink className='dropdown-link' href='/profile'>Profile</DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className='dropdown-link' href='/order-history'>Order History</DropdownLink>
                  </Menu.Item>
                  {
                      session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink className='dropdown-link' href='/admin/dashboard'>Admin Dashboard</DropdownLink>
                        </Menu.Item>
                      )
                    }
                  <Menu.Item>
                    <DropdownLink className='dropdown-link' href='#' onClick={logoutClickHandler}>Logout</DropdownLink>
                  </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-3">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          {/* Copyright @ 2023 Gnarbazaar */}
        </footer>
      </div>
    </>
  );
}
