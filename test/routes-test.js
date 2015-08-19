var test = require('tape')
var request = require('supertest')
var koop = require('koop')({})
var kooplib = require('koop/lib')
var provider = require('../index.js')
var model = new provider.model(kooplib) // eslint-disable-line
var controller = new provider.controller(model, kooplib.BaseController) // eslint-disable-line

koop._bindRoutes(provider.routes, controller)

test('Koop Routes', function (t) {
  t.test('/gist/6021269', function (st) {
    request(koop)
      .get('/gist/6021269')
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })

  t.test('/gist/6021269/FeatureServer', function (st) {
    request(koop)
      .get('/gist/6021269/FeatureServer')
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })

  t.test('/gist/6021269/FeatureServer/0', function (st) {
    request(koop)
      .get('/gist/6021269/FeatureServer/0')
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })

  t.test('/gist/6021269/FeatureServer/0/query', function (st) {
    request(koop)
      .get('/gist/6021269/FeatureServer/0/query')
      .end(function (err, res) {
        st.error(err, 'does not error')
        st.equal(res.statusCode, 200, 'returns 200')
        st.end()
      })
  })

})
