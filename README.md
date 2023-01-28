# `createHmac` Polyfill

Okay. I know what you're thinking. I know this is dumb, but a friend of mine wanted to port their
`createHmac` code to work on Cloudflare Workers, and I thought it would be a good idea to make
a polyfill for it.

**I highly recommend you use the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) directly instead**, but this is for the tired souls who are too tired to figure that out. You're free to copy paste this code into your project if you want.

> **Warning**
> This polyfill only supports `UTF-8` strings and `hex` digests. If you need anything else, you're on your own.

## Usage

```js
import { createHmac } from 'createhmac-polyfill';

const hmac = createHmac('sha512', process.env.SECRET);

// acquire data
const data = [...];

hmac.update(data);

const signature = await hmac.digest('hex');
```
