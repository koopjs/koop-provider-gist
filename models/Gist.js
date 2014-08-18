var Geohub = require('geohub'),
  config = require('./config');

var Gist = function( koop ){

  this.find = function( id, options, callback ){
    // looks for data in the cache first
    var type = 'Gist';
    koop.Cache.get( type, id, options, function(err, entry ){
      if ( err ){
        Geohub.gist( { id: id, token: config.token }, function( err, geojson ){
          if (err){
            callback(err, null);
          } else {
            if ( !geojson.length ){
              geojson = [ geojson ];
            }
      
            var _totalLayer = geojson.length,
              finalJson = [];
            // local method to collect layers and send them all
            var _send = function(data){
              finalJson.push(data);
              if ( finalJson.length == _totalLayer ) {
                callback(null, finalJson);
              }
            };
  
            geojson.forEach(function(layer, i){
              koop.Cache.insert( type, id, layer, i, function( err, success){
                if ( success ) {
                  _send(layer);
                } 
              });
            });
          }
        });
      } else {
        callback( null, entry );
      }
    });
  };
  
  // compares the updated_at timestamp on the cached data and the hosted data
  // this method name is special reserved name that will get called by the cache model
  this.checkCache = function(id, data, options, callback){
    var json = data;
    Geohub.gistSha(id, config.token, function(err, sha){
      if ( sha == json[0].updated_at ){
        callback(null, false);
      } else {
        Geohub.gist( { id: id, token: config.token }, function( err, geojson ){
          callback(null, geojson);  
        });
      }
    });
  };

  this.topojsonConvert = function(data, callback){
    koop.Topojson.convert( data, callback);
  };

  this.exportToFormat = function(format, dir, key, data, options, callback){
    koop.exporter.exportToFormat( format, dir, key, data, options, callback);
  };

  return this;

};

module.exports = Gist;
