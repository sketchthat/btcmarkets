// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Get Paginated Transaction History
 */
btcm.transaction().history()
  .then(async history => {
    console.log(history);

    // Paging
    if (history.paging) {
      const newer = history.paging.newer;
      // const older = withdrawHistory.paging.older;

      const newerResponse = await btcm.transaction().history(null, newer.since, newer.indexForward, newer.sortForward);

      console.log(newerResponse);
    }
  });

/**
 * Get Transaction History
 *
 * Currency: AUD
 * Since: 565 (Order ID)
 * Index Forward: true
 * Sort Forward: false
 */
btcm.transaction().history('AUD', 565, true, false)
  .then(history => {
    console.log(history);
  });
