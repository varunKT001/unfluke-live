const puppeteer = require('puppeteer');
const crypto = require('crypto');
const Axios = require('axios');

async function getAccessToken(request_token, user) {
  try {
    const { api_key, secret } = user;
    const input = api_key + request_token + secret;
    const checksum = crypto.createHash('sha256').update(input).digest('hex');
    const body = `api_key=${api_key}&request_token=${request_token}&checksum=${checksum}`;
    const response = await Axios.post(
      process.env.ZERODHA_SESSION_TOKEN_URL,
      body,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

async function init(user) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const loginUrl = `${process.env.ZERODHA_LOGIN_URL}${user.api_key}`;
    await page.goto(loginUrl);
    await page.waitForSelector('input[id=userid]');
    await page.waitForSelector('input[id=password]');
    await page.waitForSelector('button[type=submit]');
    await page.type('input[id=userid]', user.userID);
    await page.type('input[id=password]', user.password);
    await page.click('button[type=submit]');
    await page.waitForSelector('input[id=pin]');
    await page.waitForSelector('button[type=submit]');
    await page.type('input[id=pin]', user.pin);
    await Promise.all([
      page.click('button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);
    const page_url = await page.url();
    await browser.close();
    const query = new URLSearchParams(page_url);
    const request_token = query.get('request_token');
    const access_token = await getAccessToken(request_token, user);
    return access_token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = init;
