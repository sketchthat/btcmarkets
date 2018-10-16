// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Place Sell Limit Order
 *
 * Instrument: BTC
 * Currency: AUD
 * Price: $8,500.449
 * Volume: 0.54
 * Order Side: Ask
 * Order Type: Limit
 * Client Request Id: abc123 (Ignored by BTCM)
 */
btcm.trading().create('BTC', 'AUD', 8500.49, 0.54, 'Ask', 'Limit', 'abc123')
  .then(resp => {
    console.log(resp);
  });

/**
 * Place Sell Market Order
 *
 * Order Side: Ask
 * Order Type: Market
 */
btcm.trading().create('BTC', 'AUD', null, 0.54, 'Ask', 'Market', 'abc123')
  .then(resp => {
    console.log(resp);
  });

/**
 * Place Buy Limit Order
 *
 * Price: $8,700.11
 * Order Side: Bid
 * Order Type: Limit
 */
btcm.trading().create('BTC', 'AUD', 8700.11, 0.54, 'Bid', 'Limit', 'abc123')
.then(resp => {
  console.log(resp);
});

/**
 * Place Buy Market Order
 *
 * Order Side: Bid
 * Order Type: Market
 */
btcm.trading().create('BTC', 'AUD', null, 0.54, 'Bid', 'Limit', 'abc123')
  .then(resp => {
    console.log(resp);
  });
