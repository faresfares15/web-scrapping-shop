"use client";

import { scrapeAndStoreProducts } from "@/lib/actions";
import { log } from "console";
import { FormEvent, useState } from "react";
const isValidAmazonProductURL = (url:string) => {
	  try{
		const parsedURL = new URL(url);
		const hostname = parsedURL.hostname;

		if (hostname.includes("amazon") || hostname.includes("amazon") || hostname.endsWith("amazon")) {
		  return true;
		}
	  } catch (error) {
		return false;
	  }
	  return false;
}

export default function Searchbar() {
	const [searchPrompt, setSearchPrompt] = useState("");
const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault(); //prevent the browser from reloading
		const isValidLink = isValidAmazonProductURL(searchPrompt)

		if(!isValidLink) alert("Please provide a valid Amazon product link")
		try {
			setIsLoading(true)

			//scrape the product
			const product = await scrapeAndStoreProducts(searchPrompt)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
}
	return (
		<form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
			<input 
			type="text" 
			placeholder="Enter product link" 
			className="searchbar-input" 
			value={searchPrompt} 
			onChange={(e) => setSearchPrompt(e.target.value)}
			 />

			<button type="submit" className="searchbar-btn"
			disabled={searchPrompt === ""}
			>
				{isLoading ? "Searching..." : "Search"}
			</button>
		</form>
	);
}
