import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

/**
 * Get Market Trades
 *
 * Instrument: BTC
 * Currency: AUD
 * Limit: 10
 * Since: 565 (Order ID)
 * Index Forward: true
 */
btcm.market().trades('BTC', 'AUD', 10, 565, true)
  .then(trades => {
    console.log(trades);
  });
