import got from 'got';
import jsdom from 'jsdom'

const URL = 'https://www.mightyape.co.nz/product/sony-playstation-5-digital-edition-console/33505481';
const VENDOR_NAME = 'Mighty Ape'

// test URL:
// const URL = 'https://www.mightyape.co.nz/product/playstation-5-dualsense-wireless-controller-ps5/33466476';

export default async () => {
  console.log(` - Checking ${VENDOR_NAME}`);
  const response = await got(URL);
  const document = new jsdom.JSDOM(response.body).window.document;
  const inactiveTrolleyButton = document.getElementsByClassName('trolley-button-inactive')[0];

  // If we have innactive trolley button, it means it's not in stock
  if (inactiveTrolleyButton) {
    return undefined;
  }

  return `In stock at ${VENDOR_NAME}:
${URL}`;
}
