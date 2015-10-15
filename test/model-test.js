var test = require('tape')
var koop = require('koop/lib')
var createGistModel = require('../model')
var gistId = 'c82a80ee4c5b91889efe'

koop.config = {
  data_dir: __dirname + '/output/',
  ghtoken: process.env.KOOP_GIST_TOKEN
}
koop.log = new koop.Logger({})
koop.Cache = new koop.DataCache(koop)
koop.Cache.db = koop.LocalDB
koop.Cache.db.log = koop.log

var gist = createGistModel(koop)

test('model: when caching a github file', function (t) {
  t.test('should find the repo and return the data', function (st) {
    gist.find({ id: gistId }, function (err, data) {
      st.error(err, 'does not error')
      st.ok(data, 'returns data')
      st.equal(data.length, 2, 'data has expected length')
      st.end()
    })
  })

  t.test('should find the repo and return the data (cache)', function (st) {
    gist.checkCache({
      id: gistId,
      data: [{ updated_at: 1234 }]
    }, function (err, data) {
      st.error(err, 'does not error')
      st.ok(data, 'returns data')
      st.equal(data.length, 2, 'data has expected length')
      st.end()
    })
  })
})
