import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

btcm.market().tick('BTC', 'AUD')
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.error(err.message);
  });
