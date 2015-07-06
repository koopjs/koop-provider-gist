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

Make sure your koop configuration includes a `ghtoken` key if you need to access private gists.

```js
var config = {
  'ghtoken': 'XXXXXX'
};

var koop = require('koop')(config);
var koopGist = require('koop-gist');

koop.register(koopGist);

var express = require('express');
var app = express();

app.use(koop);

app.listen(process.env.PORT || 1337, function () {
  console.log('Koop server listening at %d', this.address().port);
});
```

Once `koop-gist` is registered as provider and you've restarted your Koop server, you can preview GeoJSON files in gists using this pattern:

`/gist/{gist id}/preview`

so for example:

`/gist/6178185/preview`

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/Esri/contributing).

## License

Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](license.txt) file.

[](Esri Language: JavaScript)
