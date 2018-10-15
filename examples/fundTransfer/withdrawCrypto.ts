// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Withdraw Crypto Currency
 *
 * Amount: 50 XRP
 * Wallet Address: rPvKH3CoiKnne5wAYphhsWgqAEMf1tRAE7
 * Destination Tag: 1856
 * Instrument: XRP
 */

btcm.fundTransfer().withdrawCrypto(50, 'rPvKH3CoiKnne5wAYphhsWgqAEMf1tRAE7?dt=1856', 'XRP')
  .then(resp => {
    console.log(resp);
  });
