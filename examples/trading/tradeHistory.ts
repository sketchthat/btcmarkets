// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Get Paginated Trade History
 *
 * Instrument: BTC
 * Currency: AUD
 */
btcm.trading().tradeHistory('BTC', 'AUD')
  .then(tradeHistory => {
    console.log(tradeHistory);
  });

/**
 * Get Trade History
 *
 * Instrument: BTC
 * Currency: AUD
 * Limit: 5,
 * Since: 565 (Order ID)
 * Index Forward: true
 */
btcm.trading().tradeHistory('BTC', 'AUD', 5, 565, true)
  .then(tradeHistory => {
    console.log(tradeHistory);
  });
