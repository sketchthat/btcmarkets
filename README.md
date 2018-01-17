# BTCMarkets - Typescript Wrapper

Typescript wrapper for [BTC Markets API](https://github.com/BTCMarkets/API).

Once finalised the wrapper will have a function for each API end-point and also web socket support.

If you're looking for a specific end-point support or want to contribute just [add an issue](https://github.com/sketchthat/btcmarkets/issues/new) or [open a PR](https://github.com/sketchthat/btcmarkets/pulls).

Plan is to work through the API in the following order; ~Authentication~, ~Market Data~, ~Account Management~, Trading, Fund Transfer, Web Socket.


Build

`npm run build`

Usage

```typescript
// Import Class
import { BTCMarkets } from '../src/index';

// Initalise Class
const btcmarkets = new BTCMarkets();

// Request
btcmarkets.marketOrderBook()
  .then(marketOrderBook => {
    console.log(marketOrderBook);
  })
  .catch(err => {
    // Handle Error
    console.error(err);
  });
```

More examples can be found in the [/examples](https://github.com/sketchthat/btcmarkets/tree/master/examples) folder.
