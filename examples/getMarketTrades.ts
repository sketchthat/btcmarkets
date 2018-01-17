import { BTCMarkets } from '../src/index';

import { IMarketTrade } from '../src/interfaces/marketTrades.interface';

const btcmarkets = new BTCMarkets(null, null);

btcmarkets.marketTrades('BTC', 'AUD')
  .then((marketTrades: IMarketTrades[]) => {
    marketTrades.forEach(marketTrade => {
      console.log(marketTrade);
    });
  });
