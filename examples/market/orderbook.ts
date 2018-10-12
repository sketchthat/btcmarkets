import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

/**
 * Get Orderbook
 *
 * Instrument: BTC
 * Currency: AUD
 */
btcm.market().orderbook('BTC', 'AUD')
  .then(orderbook => {
    console.log(orderbook);
  });
