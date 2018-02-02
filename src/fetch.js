const fetch = require('isomorphic-fetch')

const { baseUrl } = require('../config')

/**
 * Executes an HTTP GET request to the CoinCap JSON API.
 *
 * @param  {String} path is the endpoint path.
 * @return {Promise}     a promise that will resolve to a JSON object.
 */
function fetchApi (path) {
  return fetch(`${baseUrl}${path}`).then(res => res.json())
}

module.exports = fetchApi
