// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Get Paginated Withdraw History
 */
btcm.fundTransfer().history()
  .then(withdrawHistory => {
    console.log(withdrawHistory);
  });

/**
 * Get Withdraw History
 *
 * Limit: 5
 * Since: 565 (Order ID)
 * Index Forward: true
 */
btcm.fundTransfer().history(5, 565, true)
  .then(withdrawHistory => {
    console.log(withdrawHistory);
  });
