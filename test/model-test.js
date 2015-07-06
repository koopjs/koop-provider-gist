/* global before, describe, it */

var should = require('should')
var koop = require('koop/lib')
var Model = require('../models/Gist.js')
var gist

before(function (done) {
  koop.Cache.db = koop.LocalDB
  var data_dir = __dirname + '/output/'
  koop.Cache.data_dir = data_dir
  gist = new Model(koop)
  done()
})

describe('Github Model', function () {
  describe('when caching a github file', function () {
    it('should find the repo and return the data', function (done) {
      gist.find(6178185, {}, function (err, data) {
        should.not.exist(err)
        should.exist(data)
        data.length.should.equal(2)
        done()
      })
    })

    it('should find the repo and return the data', function (done) {
      gist.checkCache(6178185, [{updated_at: 1234}], {}, function (err, data) {
        should.not.exist(err)
        should.exist(data)
        data.length.should.equal(2)
        done()
      })
    })

  })

})
