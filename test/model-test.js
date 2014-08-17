var should = require('should'),
  config = require('config'),
  koop = require('koop-server/lib');

var repo = 'geodata',
  user = 'chelm',
  file = 'co-river-basin';
  key = [repo, user, file].join('/');

before(function (done) {
  koop.Cache.db = koop.PostGIS.connect( config.db.postgis.conn );
  var data_dir = __dirname + '/output/';
  koop.Cache.data_dir = data_dir;
  Gist = new require('../models/Gist.js')( koop );
  done();
});

describe('Github Model', function(){

    describe('when caching a github file', function(){
       before(function(done ){
        // connect the cache
        //Cache.db = PostGIS.connect( config.db.postgis.conn );
        done();
      });

      it('should find the repo and return the data', function(done){
        Gist.find(6178185, {}, function(err, data){
          should.not.exist(err);
          should.exist(data);
          data.length.should.equal(1);
          done();
        });
      });

      it('should find the repo and return the data', function(done){
        Gist.checkCache(6178185, [{updated_at:1234}], {}, function(err, data){
          should.not.exist(err);
          should.exist(data);
          data.length.should.equal(2);
          done();
        });
      }); 
    
    });
});

