import ProductCard from "@/Components/ProductCard";
import { getProductById } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
	params: {
		id: string;
	};
};

export default async function ProductDetails({ params: { id } }: Props) {
	const product = await getProductById(id);

	if (!product) redirect("/");
	return <div className="productContainer">{product.title}</div>;
}
