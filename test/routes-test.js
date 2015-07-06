/* global before, describe, it */

var should = require('should')
var request = require('supertest')
var koop = require('koop')({})
var kooplib = require('koop/lib')
var provider = require('../index.js')

before(function (done) {
  var model = new provider.model(kooplib) // eslint-disable-line
  var controller = new provider.controller(model, kooplib.BaseController) // eslint-disable-line
  koop._bindRoutes(provider.routes, controller)
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
