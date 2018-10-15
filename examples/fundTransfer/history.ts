// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Get Paginated Withdraw History
 */
btcm.fundTransfer().history(2)
  .then(async withdrawHistory => {
    console.log(withdrawHistory);

    // Paging
    if (withdrawHistory.paging) {
      const newer = withdrawHistory.paging.newer;
      // const older = withdrawHistory.paging.older;

      const newerResponse = await btcm.fundTransfer().history(newer.limit, newer.since, newer.indexForward);

      console.log(newerResponse);
    }
  });

/**
 * Get Withdraw History
 *
 * Limit: 5
 * Since: 565 (Order ID)
 * Index Forward: true
 */
btcm.fundTransfer().history(5)
  .then(withdrawHistory => {
    console.log(withdrawHistory);
  });
