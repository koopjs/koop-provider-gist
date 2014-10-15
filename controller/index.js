var extend = require('node.extend'),
  fs = require('fs'),
  BaseController = require('koop-server/lib/BaseController.js'),
  crypto = require('crypto');

var Controller = function( Gist ){

  var controller = {};
  controller.__proto__ = BaseController(); 

  controller.index = function(req, res){
    res.render(__dirname + '/../views/index');
  };

  controller.find = function(req, res){
    var _send = function( err, data ){
      if ( err ){
        res.json( err, 500 );
      } else { 
        var len = data.length;
        var allTopojson = [];
        var processTopojson = function( topology ){
          allTopojson.push(topology);
          if ( allTopojson.length == len ) {
            res.json( allTopojson );
          }
        };

        if ( data ){
          if (req.query.topojson ){
            var allData = {};
            data.forEach(function( d ){
              Gist.topojsonConvert(d, function(err, topology){
                processTopojson( topology );
              });
            });    
          } else if ( req.params.format ) {
            if ( !Gist.files.localDir ){
              res.send('No local file system configured for exports', 501);
              return;
            }
            // change geojson to json
            req.params.format = req.params.format.replace('geojson', 'json');
            var dir = ['gist', req.params.id ].join(':');
            // build the file key as an MD5 hash that's a join on the paams and look for the file 
            var toHash = JSON.stringify( req.params ) + JSON.stringify( req.query );
            var key = crypto.createHash('md5').update( toHash ).digest('hex');

            var path = ['files', dir].join('/');
            var fileName = key + '.' + req.params.format;

            Gist.files.exists(path, fileName, function( exists, path ){
              if ( exists ){
                if (path.substr(0, 4) == 'http'){
                  res.redirect( path );
                } else {
                  res.sendfile( path );
                }
              } else {
                Gist.exportToFormat( req.params.format, dir, key, data[0], {}, function(err, file){
                  if (err){
                    res.send(err, 500);
                  } else {
                    res.sendfile( file );
                  }
                });
              }
            });
          } else { 
            res.json( data );
          }
        } else {
          res.send('There a problem accessing this gist', 500);
        }
      }
    };
    if ( req.params.id ){
      var id = req.params.id;
      var d = {};
      Gist.find( id, req.query, function( err, data) {
        if (req.params.layer !== undefined && data[req.params.layer]){
          _send( err, data[req.params.layer] );
        } else if ( !req.params.layer ) {
          _send( err, data );
        } else {
          _send( 'Layer not found', null);
        }
      });
    } else {
      res.send('Must specify a user and gist id', 404);
    }
  };

  controller.featureservice = function(req, res){
    var callback = req.query.callback;
    delete req.query.callback;

    if ( req.params.id ){
      var id = req.params.id;
      Gist.find( id, req.query, function( err, data) {
        controller.processFeatureServer( req, res, err, data, callback);
      });
    } else {
      res.send('Must specify a gist id', 404);
    }

  };

  controller.preview = function(req, res){
    res.render(__dirname + '/../views/demo', { locals:{ id: req.params.id } });
  }

  return controller;

};

module.exports = Controller;
