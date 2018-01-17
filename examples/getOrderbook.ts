import { BTCMarkets } from '../src/index';

import { IMarketOrderBook } from '../src/interfaces/marketOrderBook.interface';

const btcmarkets = new BTCMarkets(null, null);

btcmarkets.marketOrderBook('BTC', 'AUD')
  .then((marketOrderBook: IMarketOrderBook) => {
    console.log(marketOrderBook);
  });
