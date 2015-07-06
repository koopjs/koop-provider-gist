/* global before, describe, it */

var should = require('should')
var request = require('supertest')
var koop = require('koop')({})
var kooplib = require('koop/lib')

before(function (done) {
  var Provider = require('../index.js')
  var model = new Provider.model(kooplib) // eslint-disable-line
  var controller = new Provider.controller(model, kooplib.BaseController) // eslint-disable-line
  koop._bindRoutes(Provider.routes, controller)
  done()
})

describe('Koop Routes', function () {
  describe('/gist/6021269', function () {
    it('should return 200', function (done) {
      request(koop)
        .get('/gist/6021269')
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('/gist/6021269/FeatureServer', function () {
    it('should return 200', function (done) {
      request(koop)
        .get('/gist/6021269/FeatureServer')
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('/gist/6021269/FeatureServer/0', function () {
    it('should return 200', function (done) {
      request(koop)
        .get('/gist/6021269/FeatureServer/0')
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('/gist/6021269/FeatureServer/0/query', function () {
    it('should return 200', function (done) {
      request(koop)
        .get('/gist/6021269/FeatureServer/0/query')
        .end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          done()
        })
    })
  })

})
