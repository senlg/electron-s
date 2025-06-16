import puppeteer from 'puppeteer'

export const testPuppeteer = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 0,
      height: 0
    }
  })

  let page = await browser.newPage()
  page.goto('https://baidu.com')
}
