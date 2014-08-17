module.exports = {
  'get /gist/:id/FeatureServer/:layer/:method': 'featureservice',
  'get /gist/:id/FeatureServer/:layer': 'featureservice',
  'get /gist/:id/FeatureServer': 'featureservice',
  'get /gist/:id.:format': 'find',
  'get /gist/:id': 'find',
  'get /gist/raw/:id': 'find',
  'get /gist/raw/:id/:layer': 'find',
  'get /gist': 'index',
  'get /gist/:id/preview' : 'preview'
}
