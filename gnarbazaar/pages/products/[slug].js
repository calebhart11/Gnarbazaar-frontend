import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useContext } from "react";
// import data from "@/utils/data";
import Link from "next/link";
import Image from "next/image";
import { Store } from "@/utils/Store";
import Product from '@/models/Product';
import db from '@/utils/db';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductShow(props) {
  const {product} = props
  const { state, dispatch } = useContext(Store);
  const router = useRouter()
  
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`)

    if (data.stockAmount < quantity) {
      return toast.error(`${product.slug} is out of stock`)
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart')
  };
  return (
    <>
      <Layout title={product.name}>
        <div className="py-2">
          <Link href="/">Back To Products</Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Catergory: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>
                {product.rating} out of {product.numReviews} reviews{" "}
              </li>
              <li>description: {product.description}</li>
            </ul>
          </div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.stockAmount > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  const {params} = context
  const {slug} = params
  await db.connect()
  const product = await Product.findOne({slug}).lean()
  await db.disconnect()
  return {
    props: {
      product: product ? db.convertDocToObject(product) : null,
    }
  }
}