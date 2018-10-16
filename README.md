[![Build Status](https://travis-ci.org/sketchthat/btcmarkets.svg?branch=master)](https://travis-ci.org/sketchthat/btcmarkets) [![Coverage Status](https://coveralls.io/repos/github/sketchthat/btcmarkets/badge.svg?branch=master)](https://coveralls.io/github/sketchthat/btcmarkets?branch=master)
![Dependencies](https://david-dm.org/sketchthat/btcmarkets.svg)

# BTCMarkets Wrapper

Typescript / Node wrapper for the Market, Public, Account and Trade APIs offered by [BTCMarkets](https://btcmarkets.net)

## Setup

Install the dependancies with npm / yarn.

```
npm install btcmarkets-australia --save
```

### API Key

In order to utilise the private functions you'll need to generate an [API Key](https://btcmarkets.net/account/apikey) with BTCMarkets.

## Usage

If using public methods api keys don't need to be passed to the constructor.

```
import { BTCMarkets } from 'btcmarkets-australia';

const btcm = new BTCMarkets('myPublicApiKey', 'myPrivateApiKey');
```

### Examples

Examples of usage can be found in the [`/examples`](/examples)directory.

- [Account](/examples/account)
- [Fund Transfer](/examples/fundTransfer)
- [Market](/examples/market)
- [Trading](/examples/trading)
- [Transaction](/examples/transaction)
