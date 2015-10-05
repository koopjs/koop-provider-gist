var debug = require('debug')('koop:gist:model')
var geohub = require('geohub')
var provider = require('koop-provider')
var TABLE_NAME = 'gist'

/**
 * creates new gist model with access to koop instance
 *
 * @param {Object} koop - instance of koop app
 */
function gistModel (koop) {
  var model = provider.model(koop)

  model.config = koop.config
  model.config.ghtoken = model.config.ghtoken || process.env.KOOP_GITHUB_TOKEN || null
  model.geohub = geohub

  if (!model.config.ghtoken) {
    koop.log.warn('[gist provider] No github access token configured. Github API requests may be rate limited.')
  }

  /**
   * Method for retrieving gist data by ID.
   * Checks cache first, then tries to fetch from web source.
   *
   * @param {object} options - id (required), query (optional)
   * @param {function} callback - err, geojson
   */
  model.find = function (options, callback) {
    var id = options.id
    var query = options.query || {}

    koop.Cache.get(TABLE_NAME, id, query, function (err, entry) {
      if (!err) {
        debug('retrieved data from cache', options)
        return callback(null, entry)
      }

      debug('fetching data from Github API (cache error: %s)', err.message, options)

      geohub.gist({
        id: id,
        token: model.config.ghtoken
      }, function (err, geojson) {
        if (err) return callback(err)
        if (!geojson.length) geojson = [geojson]

        var finalJson = []
        var totalLayers = geojson.length

        // local method to collect layers and send them all
        function _send (data) {
          finalJson.push(data)
          if (finalJson.length === totalLayers) callback(null, finalJson)
        }

        geojson.forEach(function (layer, i) {
          koop.Cache.insert(TABLE_NAME, id, layer, i, function (err, success) {
            if (err) return callback(err)
            if (!success) return callback(new Error('insert was unsuccessful'))

            _send(layer)
          })
        })
      })
    })
  }

  /**
   * Compares the updated_at timestamp on the cached data and the hosted data.
   * This method name is a special reserved name that will get called by koop's cache.
   * TODO: implementation needs to be revised, it's odd to return boolean (false) or object (geojson)
   *
   * @param {object} options - id, data (cached geojson data)
   * @param {function} callback - err, false || geojson (?)
   */
  model.checkCache = function (options, callback) {
    var id = options.id
    var data = options.data

    geohub.gistSha({
      id: id,
      token: model.config.ghtoken
    }, function (err, sha) {
      if (err) return callback(err)
      if (sha === data[0].updated_at) return callback(null, false)

      geohub.gist({
        id: id,
        token: model.config.ghtoken
      }, function (err, geojson) {
        if (err) return callback(err)
        callback(null, geojson)
      })
    })
  }

  return model
}

module.exports = gistModel
