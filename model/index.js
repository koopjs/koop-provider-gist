var geohub = require('geohub')
var provider = require('koop-provider')

/**
 * creates new gist model with access to koop instance
 *
 * @param {Object} koop - instance of koop app
 */
function gistModel (koop) {
  var gist = provider.createModel(koop)

  if (!koop.config.ghtoken) {
    koop.log.warn('No Github token in config for Gist provider. This may cause problems accessing data.')
  }

  /**
   * method for retrieving gist data by id
   * checks cache first, then tries to fetch from web source
   *
   * @param {string} id
   * @param {object} options
   * @param {function} callback
   */
  function find (id, options, callback) {
    // looks for data in the cache first
    var type = 'Gist'

    koop.Cache.get(type, id, options, function (err, entry) {
      if (!err) return callback(null, entry)

      geohub.gist({ id: id, token: koop.config.ghtoken }, function (err, geojson) {
        if (err) return callback(err, null)
        if (!geojson.length) geojson = [geojson]

        var finalJson = []
        var totalLayers = geojson.length

        // local method to collect layers and send them all
        function _send (data) {
          finalJson.push(data)
          if (finalJson.length === totalLayers) callback(null, finalJson)
        }

        geojson.forEach(function (layer, i) {
          koop.Cache.insert(type, id, layer, i, function (err, success) {
            if (err) return callback(err, null)
            if (success) _send(layer)
          })
        })

      })
    })
  }

  /**
   * compares the updated_at timestamp on the cached data and the hosted data
   * this method name is special reserved name that will get called by the cache model
   *
   * @param {string} id
   * @param {object} data
   * @param {object} options
   * @param {function} callback
   */
  function checkCache (id, data, options, callback) {
    geohub.gistSha(id, koop.config.ghtoken, function (err, sha) {
      if (err) return callback(err, null)
      if (sha === data[0].updated_at) return callback(null, false)

      geohub.gist({
        id: id,
        token: koop.config.ghtoken
      }, function (err, geojson) {
        if (err) return callback(err, null)
        callback(null, geojson)
      })
    })
  }

  /**
   * assign public functions to model
   */
  gist.find = find
  gist.checkCache = checkCache

  return gist
}

module.exports = gistModel
