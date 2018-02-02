const io = require('socket.io-client')

const fetch = require('./fetch')

const { baseUrl } = require('../config')

/**
 * Constructs the CoinCap API object.
 *
 * @return {Object}
 */
function createCoincap () {
  const socket = io(baseUrl, { autoConnect: false })

  const api = {}

  // Add JSON API supported endpoints
  ;[
    {
      method: 'coins',
      url: () => '/coins'
    },
    {
      method: 'map',
      url: () => '/map'
    },
    {
      method: 'front',
      url: () => '/front'
    },
    {
      method: 'global',
      url: () => '/global'
    },
    {
      method: 'coin',
      url: coin => `/page/${coin}`
    },
    {
      method: 'coinHistory',
      url: (coin, days) => `/history/${days ? `${days}day/` : ''}${coin}`
    }
  ].forEach(function ({ method, url }) {
    api[method] = (...args) => fetch(url(...args))
  })

  // Add Socket.IO methods
  ;[
    'open',
    'close',
    'on',
    'off'
  ].forEach(function (method) {
    api[method] = socket[method].bind(socket)
  })

  return api
}

module.exports = createCoincap()
