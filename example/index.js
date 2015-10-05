var morgan = require('morgan')
var errorHandler = require('errorhandler')
var app = require('express')()
var koop = require('koop')({
  'ghtoken': process.env.KOOP_GIST_TOKEN
})
var gist = require('../')

koop.register(gist)

app.set('port', process.env.PORT || 1337)
app.set('json spaces', 2)

if (app.get('env') === 'production') {
  app.use(morgan())
} else {
  app.use(morgan('dev'))
  app.use(errorHandler())
}

app.use('/koop/', koop)

app.get('/', function (req, res) {
  res.redirect('/koop/gist')
})

app.listen(app.get('port'), function () {
  console.log('koop-gist example server listening at %d', this.address().port)
})
