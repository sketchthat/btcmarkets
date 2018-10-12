// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Get Trading Fees
 *
 * Instrument: BTC
 * Currency: AUD
 */
btcm.account().tradingFees('BTC', 'AUD')
  .then(fee => {
    console.log(fee);
  });
