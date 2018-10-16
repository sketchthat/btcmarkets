import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

/**
 * Get historic ticks
 *
 * Instrument: BTC
 * Currency: AUD
 * Time: hour
 * Limit: 5
 * Since: 565 (Order ID)
 * Index Forward: true
 * Sort Forward: false
 */
btcm.market().historicTicks('BTC', 'AUD', 'hour', 5, 565, true, false)
  .then(historicTick => {
    console.log(historicTick);
  });
