var test = require('tape')
var request = require('supertest')
var koop = require('koop')({
  ghtoken: process.env.KOOP_GIST_TOKEN
})
var kooplib = require('koop/lib')
var provider = require('../')
var model = provider.model(kooplib)
var controller = provider.controller(model)
var gistId = 'c82a80ee4c5b91889efe'

koop._bindRoutes(provider.routes, controller)

test('Koop Routes', function (t) {
  t.test('/gist/' + gistId, function (st) {
    request(koop)
      .get('/gist/' + gistId)
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })

  t.test('/gist/' + gistId + '/FeatureServer', function (st) {
    request(koop)
      .get('/gist/' + gistId + '/FeatureServer')
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })

  t.test('/gist/' + gistId + '/FeatureServer/0', function (st) {
    request(koop)
      .get('/gist/' + gistId + '/FeatureServer/0')
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })

  t.test('/gist/' + gistId + '/FeatureServer/0/query', function (st) {
    request(koop)
      .get('/gist/' + gistId + '/FeatureServer/0/query')
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })
})
