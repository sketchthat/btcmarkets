import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

// Get Active Market Snapshot
btcm.market().active()
  .then(activeMarket => {
    console.log(activeMarket);
  });
