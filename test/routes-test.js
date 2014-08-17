var should = require('should'),
  request = require('supertest'),
  config = require('config'),
  koop = require('koop-server')(config);

before(function (done) {
    //Cache.db = PostGIS.connect( config.db.postgis.conn );
    controller = require('../controller/index.js')( koop );
    try { koop.register(require("../index.js")); } catch(e){ console.log(e); }
    done();
});

describe('Koop Routes', function(){

   /* describe('/gist', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/gist')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });*/

    describe('/gist/6021269', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/gist/6021269')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

    describe('/gist/6021269/FeatureServer', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/gist/6021269/FeatureServer')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

    describe('/gist/6021269/FeatureServer/0', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/gist/6021269/FeatureServer/0')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

    describe('/gist/6021269/FeatureServer/0/query', function() {
      it('should return 200', function(done) {
        request(koop)
          .get('/gist/6021269/FeatureServer/0/query')
          .end(function(err, res){
            res.should.have.status(200);
            done();
        });
      });
    });

});

