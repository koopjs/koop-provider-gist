# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0-alpha] - 2015-10-15

### Fixed
* **controller**: preview route dependencies work on non-root mountpaths
* **model**: local cache works (resolved issue from koop upstream)
* **model**: github access tokens now work as expected

### Changed
* **provider**: name is now `gist` instead of `Gist`
* **provider**: `status.version` moved to `version`
* **controller**: using `koop-provider`'s `ctrl.errorResponse` method for API error responses
* **model**: simplify `find` method (use options object)

### Added
* **model**: debug information for github api and koop cache
* **model**: looks for `KOOP_GIST_TOKEN` environmental variable if `config.ghtoken` isn't specified
* **controller/routes**: added `rate_limit` route for checking github rate limit status
* **controller**: support for JSONP callbacks ([`res.jsonp`](http://expressjs.com/api.html#res.jsonp))

## [1.1.1] - 2015-09-11

### Fixed
* Resolved mount path issue for serving `/js/map.js` from koop

## [1.1.0] - 2015-09-11

### Changed
* Bump koop & koop-gist to latest versions in `example/package.json`
* convert tests to [tape](https://github.com/substack/tape)
* use koop-provider, refactor all the things

## [1.0.1] - 2015-08-12

### Fixed
* update Esri Leaflet to stable 1.0.0 release

## [1.0.0] - 2015-07-06

### Added
* Now checking build status with Travis-CI
* Added koop-gist server example in `example` directory

### Changed
* Using [standard](https://github.com/feross/standard) style

### Fixed
* Catching more potential errors throughout controller and model
* Reverted to leaflet CDN to fix broken `leaflet.css` link

## 0.0.2 - 2014-12-30

[2.0.0-alpha]: https://github.com/koopjs/koop-gist/compare/v1.1.1...v2.0.0-alpha
[1.1.1]: https://github.com/koopjs/koop-gist/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/koopjs/koop-gist/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/koopjs/koop-gist/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/koopjs/koop-gist/compare/v0.0.2...v1.0.0
