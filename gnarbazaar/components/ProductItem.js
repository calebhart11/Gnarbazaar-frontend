import Link from "next/link";
import React from "react";
// import products from "@/utils/data";
// import {addToCartHandler} from '../pages/index'

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow object-scale-down"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-lrg">{product.name}</h2>
        </Link>
          <p className="mb-2">{product.brand}</p>
          <p>${product.price}</p>
          {/* </Link> */}
          <button className="primary-button" type="button" onClick={() => addToCartHandler(product)}>
            Add to cart
          </button>
        
      </div>
    </div>
  );
}
