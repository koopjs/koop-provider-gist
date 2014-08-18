var should = require('should'),
  request = require('supertest'),
  config = require('config'),
  koop = require('koop-server')(config),
  kooplib = require('koop-server/lib');

before(function(done){
  var provider = require('../index.js');
  model = new provider.model( kooplib );
  controller = new provider.controller( model );
  koop._bindRoutes( provider.routes, controller );
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

