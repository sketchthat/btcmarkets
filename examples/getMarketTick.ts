import { BTCMarkets } from '../src/index';

import { IMarketTick } from '../src/interfaces/marketTick.interface';

const btcmarkets = new BTCMarkets(null, null);

btcmarkets.marketTick('BTC', 'AUD')
  .then((marketTick: IMarketTick) => {
    console.log(marketTick);
  });
