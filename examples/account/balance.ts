// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

btcm.account().balance()
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.error(err.message);
  });