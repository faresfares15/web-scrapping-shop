import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractPrice } from "../utils"
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
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "")

    // console.log({title, currentPrice, originalPrice, outOfStock, imageUrl: imagesUrl, currency, discountRate});
    // construct data object with scraped data
    const data = {
        url, 
        currency: currency || '$',
        image: imagesUrl[0],
        title,
        currentPrice: Number(currentPrice),
        originalPrice: Number(originalPrice),
        priceHistory: [],
        discountRate: Number(discountRate),
        category,
        reviewsCount: 100,
        stars: 4.5,
        isOutOfStock: outOfStock,
    }
    console.log(data);
} catch (error:any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
}

}