// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Cancel Single Order
 *
 * Order Ids: [11]
 */
btcm.trading().cancel([11])
  .then(resp => {
    console.log(resp);
  });

/**
 * Cancel Multiple Orders
 *
 * Order Ids: [11, 22, 33]
 */
btcm.trading().cancel([11, 22, 33])
  .then(resp => {
    console.log(resp);
  });
