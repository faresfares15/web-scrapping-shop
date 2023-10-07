import React from "react";
import Image from "next/image";
import Searchbar from "@/Components/Searchbar";
import HeroCarousel from "@/Components/HeroCarousel";
export default function Home() {
	return (
		<>
			<section className="px-6 md:px-2' py-24 border-2 ">
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
            <Searchbar />
					</div>

          <HeroCarousel />
				</div>
			</section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['Apple Iphone 15', 'Book', 'Sneakers'].map((product) =>{
            return(
              <div>{product}</div>
            )
          })}
        </div>
      </section>
		</>
	);
}
