import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractPrice } from "../utils"
export async function scrapeAmazonProduct(url: string) {
  if(!url) return


//   BrightData proxy configuration
const username= String(process.env.BRIGHT_DATA_USERNAME)
const password= String(process.env.BRIGHT_DATA_USERNAME)

const port = 22225
const session_id = (1000000 * Math.random())|0

const options = {
    auth:{
        username: `${username}-session-${session_id}`,
        password
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
}
try {
    // fetch the product page
    const response = await axios.get(url, options)
    const $ = cheerio.load(response.data)

    // extract the product title
    const title = $("#productTitle").text().trim()
    const currentPrice = extractPrice(
        $('.priceToPay span.a-price-whole'),
        $('a.size.base.a-color-price'),
        $('.a-button-selected .a-color-base'),
        $('.a-price.a-text-price')
    )

    const originalPrice = extractPrice(
        $('#priceblock_ourprice'),
        $('.a-price.a-text-price span.a-offscreen'),
        $('#listPrice'),
        $('#priceblock_dealprice'),
        $('.a-size-base.a-color-price')
    )
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable.'
        const images =  $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || '{}'
        const imagesUrl = Object.keys(JSON.parse(images))
        const category = $('#wayfinding-breadcrumbs_feature_div ul li:last-child a').text().trim();

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage #text').text().replace(/[-%]/g, "")
        const stars = Number($(".a-size-medium .a-color-base .a-text-beside-button .a-text-bold").text().trim().split(" ")[0]);
        const reviewsCount = Number($(".a-size-base #acrCustomerReviewText").text().trim().split(" ")[0].replace(/,/g, ""));
        const description = extractDescription($);
    // console.log({title, currentPrice, originalPrice, outOfStock, imageUrl: imagesUrl, currency, discountRate});
    // construct data object with scraped data
    const data = {
			url,
			currency: currency || "$",
			image: imagesUrl[0],
			title,
			currentPrice: Number(currentPrice) || Number(originalPrice),
			originalPrice: Number(originalPrice) || Number(currentPrice),
			priceHistory: [],
			discountRate: Number(discountRate),
			category,
			reviewsCount,
			stars,
			isOutOfStock: outOfStock,
			description,
			lowestPrice: Number(currentPrice) || Number(originalPrice),
			highestPrice: Number(originalPrice) || Number(currentPrice),
			averagePrice: Number(currentPrice) || Number(originalPrice),
		};
    return data;
} catch (error:any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
}

}