import got from 'got';

const URL = 'https://www.noelleeming.co.nz/prod192879.html';
const VENDOR_NAME = 'Noel Leming'

// test URL:
// const URL = 'https://www.noelleeming.co.nz/prod193208.html';

export default async () => {
  console.log(` - Checking ${VENDOR_NAME}`);

  try {
    await got(URL);

    return `In stock at ${VENDOR_NAME}:
${URL}`;
  } catch (error) {
    // will return 404 error when not available
    return undefined;
  }
}
