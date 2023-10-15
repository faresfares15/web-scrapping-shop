import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
interface Props {
	product: Product;
}

export default function ProductCard({ product }: Props) {
	return (
		<Link href={`/products/${product._id}`} className="product-card">
			<div className="product-card_img-container">
				<Image src={product.image} alt={product.title} width={200} height={200} />
			</div>
			<div className="flex flex-col gap-3">
                <h3 className="product-title">{product.title}</h3>
            </div>
            <div className="flex justify-between">
                <p className="text-black opacity-50 text-lg capitalize">
                    {product.category}
                </p>
                <p className="text-black text-lg font-semibold">
                    <span>{product?.currency}</span>
                    <span>{product?.currentPrice}</span>
                </p>
            </div>
		</Link>
	);
}
