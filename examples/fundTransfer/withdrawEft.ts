// Import Keys
import * as fs from 'fs';
const keys = JSON.parse(fs.readFileSync('./examples/keys.json', 'utf8'));

// Start Example
import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets(keys.publicKey, keys.privateKey);

/**
 * Withdraw EFT / Fiat
 *
 * Account Name: James Doe
 * Bank Name: ANZ
 * BSB: 012333
 * Account Number: 999999999
 * Currency: AUD
 * Amount: $1,500.33
 */
btcm.fundTransfer().withdrawETF('James Doe', 'ANZ', '012333', '999999999', 'AUD', 1500.33)
  .then(resp => {
    console.log(resp);
  });
