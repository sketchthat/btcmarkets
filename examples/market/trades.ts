import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

btcm.market().trades('BCH', 'AUD', false, 10)
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.error(err.message);
  });
