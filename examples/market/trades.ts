import { BTCMarkets } from '../../src/index';

const btcm = new BTCMarkets();

/**
 * Get Paginated Market Trades
 */
btcm.market().trades('BTC', 'AUD')
  .then(async trades => {
    console.log(trades);

    // Paging
    if (trades.paging) {
      const newer = trades.paging.newer;
      // const older = withdrawHistory.paging.older;

      const newerResponse = await btcm.market().trades('BTC', 'AUD', null, newer.since, newer.indexForward);

      console.log(newerResponse);
    }
  });

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
