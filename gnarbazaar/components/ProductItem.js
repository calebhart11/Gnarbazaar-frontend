import Link from "next/link";
import React from "react";
import products from "@/utils/data";

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow object-scale-down"
        />
      </Link>
      <div className="flex flex-column items-center justify-center">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lrg">{product.name}</h2>

          <p className="mb-2">{product.brand}</p>
          <p>${product.price}</p>
          <button className="primary-button" type="button">
            Add to cart
          </button>
        </Link>
      </div>
    </div>
  );
}
