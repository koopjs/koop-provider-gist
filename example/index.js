var koop = require('koop')({})
var koopGist = require('koop-gist')

koop.register(koopGist)

var express = require('express')
var app = express()

app.use(koop)

app.get('/', function (req, res) {
  res.redirect('/gist')
})

app.listen(process.env.PORT || 1337, function () {
  console.log('Koop server listening at %d', this.address().port)
})
