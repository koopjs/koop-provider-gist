var express = require('express')
var logger = require('morgan')
var errorHandler = require('errorhandler')
var koop = require('koop')({
  ghtoken: process.env.KOOP_GHTOKEN || null
})
var gist = require('../')
var app = express()

koop.register(gist)

app.set('port', process.env.PORT || 3000)
app.use(koop)

if (app.get('env') === 'development') {
  app.use(logger('dev'))
  app.use(errorHandler({ dumpExceptions: true, showStack: true }))
}

if (app.get('env') === 'production') {
  app.use(logger())
  app.use(errorHandler())
}

app.get('/', function (req, res) {
  res.redirect('/gist')
})

app.listen(process.env.PORT || 1337, function () {
  console.log('Koop server listening at %d', this.address().port)
})
