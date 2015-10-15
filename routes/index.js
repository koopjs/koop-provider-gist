module.exports = {
  'get /gist': 'index',
  'get /gist/rate_limit': 'rate_limit',
  'get /gist/raw/:id': 'find',
  'get /gist/raw/:id/:layer': 'find',
  'get /gist/:id': 'find',
  'get /gist/:id.:format': 'find',
  'get /gist/:id/preview': 'preview',
  'get /gist/:id/FeatureServer': 'featureservice',
  'get /gist/:id/FeatureServer/:layer': 'featureservice',
  'get /gist/:id/FeatureServer/:layer/:method': 'featureservice'
}
