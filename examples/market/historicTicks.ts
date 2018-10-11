import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

btcm.market().historicTicks('BCH', 'AUD', 'hour')
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.error(err.message);
  });
