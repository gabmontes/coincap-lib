# CoinCap.io API Access Library

This module allows to easily access the [CoinCap.io](https://coincap.io) JSON API and [Socket.IO](https://socket.io) API.

## Usage

Install the library:

```
$ npm install coincap-lib
```

Then use it to query the JSON API:

```js
const coincap = require('coincap-lib')

coincap.coins().then(console.log) // ["300", "611", "888", ...]
coincap.coinHistory('BTC', 1).then(console.log) // { market_cap: [...], ... }
```

Or connect to the Socket.IO API to receive trade events:

```js
coincap.open()
coincap.on('trades', console.log) // { coin: 'BTC', market_id: 'BTC_USD', ... }
```

## API

Refer to the [CoinCap.io API repo](https://github.com/CoinCapDev/CoinCap.io) for details.

### Queries

The following methods will call CoinCap.io JSON API and return a promise resolving to the response JSON:

- `coincap.coins()`: `/coins`
- `coincap.map()`: `/map`
- `coincap.front()`: `/front`
- `coincap.global()`: `/global`
- `coincap.coin(coin)`: `/page/:coin`
- `coincap.coinHistory(coin)`: `/history/:coin`
- `coincap.coinHistory(coin, days)`: `/history/:days/:coin`

Notes:

- `coin` parameter shall be a supported coin string as `'BTC'`.
- `days` parameter shall be an integer. Values not supported by the CoinCap.io API may return unexpected results.

## Events

The following methods will open and close the connection to the CoinCap.io [Socket.IO](https://socket.io) API:

- `coincap.open()`
- `coincap.close()`

These method will manage listening for trades in realtime:

- `coincap.on('trades', fn)`: subscribe to trade events.
- `coincap.off('trades', fn)`: unsubscribe from trade events.

Standard [Socket.IO](https://socket.io) events will also be emitted by `coincap`, i.e. `connect`, `disconnect`, etc.

## Disclaimer

Refer to [CoinCap.io](https://coincap.io) for API usage terms and conditions.
