# koop-gist

> Github gist provider for [Koop](https://github.com/esri/koop)

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/koop-gist.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/koop-gist
[travis-image]: https://img.shields.io/travis/koopjs/koop-gist.svg?style=flat-square
[travis-url]: https://travis-ci.org/koopjs/koop-gist

Take GeoJSON from a Github [gist](https://help.github.com/articles/about-gists/) and serve it as an ArcGIS Feature Service, CSV, KML, or Shapefile.

## Install

Koop providers require that you first install Koop. For information on using Koop, see https://github.com/esri/koop.

You can add `koop-gist` to your Koop server's dependencies by installing it with npm and adding it to your package.json like so:

```
npm install koop-gist --save
```

## Usage

Make sure your koop configuration includes a github access token (`ghtoken` in the config object passed to koop or `KOOP_GIST_TOKEN` as an environmental variable). Your Github API requests will be rate limited and you will not have access private gists if you don't include a token.

```js
var koop = require('koop')({
  'ghtoken': 'XXXXXX' // defaults to `process.env.KOOP_GIST_TOKEN`
})
var koopGist = require('koop-gist')

koop.register(koopGist)

var app = require('express')()

app.use(koop)

app.listen(process.env.PORT || 1337, function () {
  console.log('Listening at http://%s:%d/', this.address().address, this.address().port)
})
```

There is an example server in the [`example`](example) directory.

Once `koop-gist` is registered as provider and you've restarted your Koop server, you can preview GeoJSON files in gists using this pattern:

```
/gist/{gist id}/preview
```

so for example:

```
/gist/6178185/preview
```

## Test

`koop-gist` uses [tape](https://github.com/substack/tape) for testing. It is recommended to create your own Github [access token](https://github.com/settings/tokens) for use during testing to ensure you will not hit Github API rate limits.

```
KOOP_GIST_TOKEN=XXXXXX npm test
```

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/Esri/contributing).

## License

[Apache 2.0](LICENSE)
