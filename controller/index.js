var crypto = require('crypto')
var provider = require('koop-provider')
var request = require('request')
var pkg = require('../package.json')

/**
 * creates new gist controller
 *
 * @param {object} model - instance of gist model
 */
var gistController = function (model) {
  var ctrl = provider.controller()

  /**
   * renders index view
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  ctrl.index = function (req, res) {
    res.render(__dirname + '/../views/index', {
      baseUrl: req.baseUrl
    })
  }

  /**
   * renders preview view
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  ctrl.preview = function (req, res) {
    res.render(__dirname + '/../views/demo', {
      baseUrl: req.baseUrl,
      id: req.params.id
    })
  }

  /**
   * returns current Github API rate limit
   *
   * @param {object} req - incoming request
   * @param {object} res - outgoing response
   */
  ctrl.rate_limit = function (req, res) {
    var options = {
      url: 'https://api.github.com/rate_limit',
      headers: {
        'User-Agent': 'koop-gist/' + pkg.version
      }
    }

    if (model.config.ghtoken) {
      options.qs = { access_token: model.config.ghtoken }
    }

    request(options, function (err, response, body) {
      if (err) {
        return ctrl.errorResponse({
          code: response.statusCode,
          message: err.message
        }, res)
      }

      res.jsonp(JSON.parse(body))
    })
  }

  /**
   * finds gist by ID and returns geojson
   * optionally returns file based on export format if file system is available
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  ctrl.find = function (req, res) {
    if (!req.params.id) {
      return ctrl.errorResponse({
        code: 422,
        message: 'Must specify a gist ID'
      }, res)
    }

    function _send (err, data) {
      if (err) return ctrl.errorResponse({ message: err.message }, res)

      if (!data) {
        return ctrl.errorResponse({
          message: 'There was a problem accessing this gist'
        }, res)
      }

      if (!req.params.format) return res.jsonp(data)

      if (!model.files.localDir) {
        return ctrl.errorResponse({
          code: 501,
          message: 'No local file system configured for exports'
        }, res)
      }

      // change geojson to json
      req.params.format = req.params.format.replace('geojson', 'json')
      var dir = ['gist', req.params.id].join(':')

      // build the file key as an MD5 hash that's a join on the params and look for the file
      var toHash = JSON.stringify(req.params) + JSON.stringify(req.query)
      var key = crypto.createHash('md5').update(toHash).digest('hex')
      var path = ['files', dir].join('/')
      var fileName = key + '.' + req.params.format

      model.files.exists(path, fileName, function (exists, path) {
        if (exists) {
          if (path.substr(0, 4) === 'http') return res.redirect(path)
          return res.sendFile(path)
        }

        model.exportToFormat(req.params.format, dir, key, data[0], {}, function (err, file) {
          if (err) return ctrl.errorResponse({ message: err.message }, res)

          res.sendFile(file)
        })
      })
    }

    model.find({
      id: req.params.id,
      query: req.query
    }, function (err, data) {
      if (!req.params.layer) return _send(err, data)
      if (data[req.params.layer]) return _send(err, data[req.params.layer])

      _send(new Error('Layer not found'))
    })
  }

  /**
   * returns feature service from gist ID
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  ctrl.featureservice = function (req, res) {
    if (!req.params.id) {
      return ctrl.errorResponse({
        code: 422,
        message: 'Must specify a gist ID'
      }, res)
    }

    model.find({
      id: req.params.id,
      query: req.query
    }, function (err, data) {
      if (err) return ctrl.errorResponse({ message: err.message }, res)

      // grumble
      delete req.query.geometry
      delete req.query.where

      ctrl.processFeatureServer(req, res, data)
    })
  }

  return ctrl
}

module.exports = gistController
