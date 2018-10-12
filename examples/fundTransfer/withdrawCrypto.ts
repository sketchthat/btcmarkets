// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Withdraw Crypto Currency
 *
 * Amount: 0.45 BCH
 * Wallet Address: 17rK8eBG34nWrq3DiNWKGdRUCzm9s9NWwc
 * Instrument: BCH
 */
btcm.fundTransfer().withdrawCrypto(0.45, '17rK8eBG34nWrq3DiNWKGdRUCzm9s9NWwc', 'BCH')
  .then(resp => {
    console.log(resp);
  });
