var pkg = require('./package')
var provider = require('koop-provider')

var gist = provider({
  name: 'Gist',
  version: pkg.version,
  model: require('./model'),
  controller: require('./controller'),
  routes: require('./routes')
})

module.exports = gist
