var Geohub = require('geohub')

function Gist (koop) {
  if (!koop.config.ghtoken) {
    console.warn('No Github Token in config. This may cause problems accessing data.')
  }

  var gist = koop.BaseModel(koop)

  gist.find = function find (id, options, callback) {
    // looks for data in the cache first
    var type = 'Gist'

    koop.Cache.get(type, id, options, function (err, entry) {
      if (!err) return callback(null, entry)

      Geohub.gist({ id: id, token: koop.config.ghtoken }, function (err, geojson) {
        if (err) return callback(err, null)

        if (!geojson.length) {
          geojson = [geojson]
        }

        var _totalLayer = geojson.length
        var finalJson = []
        // local method to collect layers and send them all
        var _send = function (data) {
          finalJson.push(data)
          if (finalJson.length === _totalLayer) {
            callback(null, finalJson)
          }
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

  // compares the updated_at timestamp on the cached data and the hosted data
  // this method name is special reserved name that will get called by the cache model
  gist.checkCache = function checkCache (id, data, options, callback) {
    var json = data

    Geohub.gistSha(id, koop.config.ghtoken, function (err, sha) {
      if (err) return callback(err, null)

      if (sha === json[0].updated_at) {
        callback(null, false)
      } else {
        Geohub.gist({ id: id, token: koop.config.ghtoken }, function (err, geojson) {
          if (err) return callback(err, null)
          callback(null, geojson)
        })
      }
    })
  }

  return gist
}

module.exports = Gist
