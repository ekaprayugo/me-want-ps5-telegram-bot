import got from 'got';
import jsdom from 'jsdom'

const URL = 'https://www.thewarehouse.co.nz/p/ps5-console/R2695122.html';
const VENDOR_NAME = 'The Warehouse'

// test URL:
// const URL = 'https://www.thewarehouse.co.nz/p/ps5-playstation-5-digital-edition/R2695123.html';

export default async () => {
  console.log(` - Checking ${VENDOR_NAME}`);
  const response = await got(URL);
  const document = new jsdom.JSDOM(response.body).window.document;
  const alertBody = document.getElementsByClassName('alert-body')[0];

  // The alert body either says 'In Stock' or 'Out of stock'
  if (alertBody.innerHTML.includes('Out of stock')) {
    return undefined;
  }

  return `In stock at ${VENDOR_NAME}:
${URL}`;
}
