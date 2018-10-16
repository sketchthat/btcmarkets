import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

/**
 * Get current exchange tick
 *
 * Instrument: BTC
 * Currency: AUD
 */
btcm.market().tick('BTC', 'AUD')
  .then(tick => {
    console.log(tick);
  });
