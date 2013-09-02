# node-singlebyte

A module for Node.js v0.10 to support more 1-byte encodings (because Node's [`Buffer`](http://nodejs.org/docs/latest/api/buffer.html) supports only `'ascii'` or `'binary'`).

# Installing singlebyte

[![(npm package version)](https://badge.fury.io/js/singlebyte.png)](https://npmjs.org/package/singlebyte)

* Latest packaged version: `npm install singlebyte`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-singlebyte/tarball/master`

You may visit https://github.com/Mithgol/node-singlebyte#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (However, `npm publish --force` may happen eventually.)

# Testing singlebyte

[![(build testing status)](https://travis-ci.org/Mithgol/node-singlebyte.png?branch=master)](https://travis-ci.org/Mithgol/node-singlebyte)

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of `singlebyte`).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of `singlebyte`).

After that you may run `npm test` (in the directory of `singlebyte`) for testing.

# License

MIT License, see the `LICENSE` file.