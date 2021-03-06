// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Get Paginated Order History
 *
 * Instrument: BTC
 * Currency: AUD
 */
btcm.trading().history('BTC', 'AUD')
  .then(async history => {
    console.log(history);

    // Paging
    if (history.paging) {
      const newer = history.paging.newer;
      // const older = withdrawHistory.paging.older;

      const newerResponse = await btcm.trading().history('BTC', 'AUD', newer.limit, newer.since, newer.indexForward);

      console.log(newerResponse);
    }
  });

/**
 * Get Order History
 *
 * Instrument: BTC
 * Currency: AUD
 * Limit: 5
 * Since: 565 (Order ID)
 * Index Forward: true
 */
btcm.trading().history('BTC', 'AUD', 5, 565, true)
  .then(history => {
    console.log(history);
  });
