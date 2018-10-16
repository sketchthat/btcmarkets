// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Get Order Detail
 *
 * Order IDs: [11, 22, 33]
 */
btcm.trading().detail([11, 22, 33])
  .then(details => {
    console.log(details);
  });
