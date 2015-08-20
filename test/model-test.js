var test = require('tape')
var koop = require('koop/lib')
var Model = require('../models/Gist.js')

koop.config = {
  data_dir: __dirname + '/output/'
}

koop.log = new koop.Logger({logfile: './test.log'})
koop.Cache = new koop.DataCache(koop)
koop.Cache.db = koop.LocalDB
koop.Cache.db.log = koop.log

var gist = new Model(koop)

test('model: when caching a github file', function (t) {

  t.test('should find the repo and return the data', function (st) {
    gist.find(6178185, {}, function (err, data) {
      st.error(err, 'does not error')
      st.ok(data, 'returns data')
      st.equal(data.length, 2, 'data has expected length')
      st.end()
    })
  })

  t.test('should find the repo and return the data (cache)', function (st) {
    gist.checkCache(6178185, [{ updated_at: 1234 }], {}, function (err, data) {
      st.error(err, 'does not error')
      st.ok(data, 'returns data')
      st.equal(data.length, 2, 'data has expected length')
      st.end()
    })
  })

})
