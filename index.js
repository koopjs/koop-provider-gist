var provider = {
  name: 'Gist',
  model: require('./models/Gist.js'),
  controller: require('./controller'),
  routes: require('./routes')
}

module.exports = provider
