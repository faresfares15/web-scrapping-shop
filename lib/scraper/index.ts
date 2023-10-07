import axios from "axios"
import * as cheerio from "cheerio"
import { log } from "console"
import { extractPrice } from "../utils"
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
        $
    )
    console.log(title, currentPrice);
} catch (error:any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
}

}