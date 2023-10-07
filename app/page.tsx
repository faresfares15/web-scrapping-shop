import React from "react";
import Image from "next/image";
export default function Home() {
	return (
		<>
			<section className="px-6 md:px-2' py-24 border-2 border-red-500">
				<div className="flex max-xl:flex-col">
					<div className="flex flex-col justify-center">
						<p className="small-text">
							<Image src={"assets/icons/arrow-right.svg"} alt="arrow" width={16} height={16} />
						</p>
						<h1 className="head-text">
							Unleash the power of
							<span className="text-primary"> PriceWise</span>
						</h1>
						<p className="mt-6">Powerful, self-serve product and growth analytics to help you convert, engage and retain more</p>
					</div>
				</div>
			</section>
		</>
	);
}
