// import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Product from "@/models/Product";
// import data from "@/utils/data";
import db from "@/utils/db";
import { useContext} from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import { toast } from 'react-toastify';

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
// console.log(products)
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stockAmount < quantity) {
      toast.error(`Sorry, ${product.slug} is out of stock`);
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success(`${product.slug} added to cart`)
  };
  return (
    <>
      <Layout title="Home Page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}
            ></ProductItem>
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObject),
    },
  };
}
