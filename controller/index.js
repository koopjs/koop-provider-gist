var crypto = require('crypto')
var provider = require('koop-provider')

/**
 * creates new gist controller
 *
 * @param {object} model - instance of gist model
 */
var gistController = function (model) {
  var ctrl = provider.createController()

  /**
   * renders index view
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  function index (req, res) {
    res.render(__dirname + '/../views/index')
  }

  /**
   * finds gist by ID and returns geojson
   * optionally returns file based on export format if file system is available
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  function find (req, res) {
    if (!req.params.id) return res.status(404).send('Must specify a user and gist id')

    function _send (err, data) {
      if (err) return res.status(500).json(err)
      if (!data) return res.status(500).send('There was problem accessing this gist')
      if (!req.params.format) return res.json(data)
      if (!model.files.localDir) return res.status(501).send('No local file system configured for exports')

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
          return res.sendfile(path)
        }

        model.exportToFormat(req.params.format, dir, key, data[0], {}, function (err, file) {
          if (err) return res.status(500).send(err)
          res.sendfile(file)
        })
      })
    }

    model.find(req.params.id, req.query, function (err, data) {
      if (!req.params.layer) return _send(err, data)
      if (data[req.params.layer]) return _send(err, data[req.params.layer])
      _send('Layer not found', null)
    })
  }

  /**
   * returns feature service from gist ID
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  function featureservice (req, res) {
    if (!req.params.id) return res.send('Must specify a gist id', 404)

    var callback = req.query.callback
    delete req.query.callback

    model.find(req.params.id, req.query, function (err, data) {
      ctrl.processFeatureServer(req, res, err, data, callback)
    })
  }

  /**
   * renders preview view
   *
   * @param {object} req - incoming request object
   * @param {object} res - outgoing response object
   */
  function preview (req, res) {
    res.render(__dirname + '/../views/demo', { locals: { id: req.params.id } })
  }

  /**
   * assign public functions to controller
   */
  ctrl.index = index
  ctrl.find = find
  ctrl.featureservice = featureservice
  ctrl.preview = preview

  return ctrl
}

module.exports = gistController
