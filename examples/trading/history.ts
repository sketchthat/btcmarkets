// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

btcm.trading().history('BTC', 'AUD', true, 5, 1)
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.error(err.message);
  });
