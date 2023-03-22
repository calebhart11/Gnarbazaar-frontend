import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React from "react";
import data from '@/utils/data';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductShow() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find(x => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <>
    <Layout title={product.name}>
        <div className="py-2">
            <Link href='/'>Back To Products</Link>
        </div>
        <div className='grid md:grid-cols-4 md:gap-3'>
            <div className='md:col-span-2'>
                { <Image
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                layout= 'responsive'
                ></Image>}
                
            </div>
        </div>
    </Layout>
    </>
  );
}
