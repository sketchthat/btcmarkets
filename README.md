# BTCMarkets - Typescript Wrapper

Usage

```typescript
// Import Class
import { BTCMarkets } from '../src/index';

// Initalise Class with Public & Private API Key
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
