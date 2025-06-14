import puppeteer from 'puppeteer'

export const testPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: false })

  let page = await browser.newPage()
  page.goto('https://baidu.com')
}
