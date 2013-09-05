Node's [`Buffer`](http://nodejs.org/docs/latest/api/buffer.html) supports `'ascii'` and `'binary'`, but sometimes you need more single-byte encodings.

This module (`singlebyte`) provides such support.

Node.js v0.10 (or newer) is required.

## Installing singlebyte

[![(npm package version)](https://badge.fury.io/js/singlebyte.png)](https://npmjs.org/package/singlebyte)

* Latest packaged version: `npm install singlebyte`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-singlebyte/tarball/master`

You may visit https://github.com/Mithgol/node-singlebyte#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (However, `npm publish --force` may happen eventually.)

## Using singlebyte

Require the installed module:

```js
var sb = require('singlebyte');
```

You get an object with the following methods:

### isEncoding(encodingName)

Returns `true` if the given encoding has been defined, `false` otherwise.

Works like Node.js Buffer's [`isEncoding`](http://nodejs.org/docs/latest/api/buffer.html#buffer_class_method_buffer_isencoding_encoding). More encodings can be defined (see below) in addition to Buffer's.

### learnEncoding(encodingName, encodingTable)

Defines an encoding.

Expects `encodingName` to be a string and `encodingTable` to be an array of exactly 256 elements.

Every (Nth) element is a number, which is the Unicode's code of the corresponding (Nth) character in the encoding.

The encodings defined in Node.js Buffer cannot be redefined.

### getEncodingTable(encodingName)

Returns an array of 256 elements previously given as `encodingTable` for the encoding.

If an encoding was never defined with `learnEncoding`, returns `null`.

**Note:**   for the encodings defined in Node.js Buffer, `isEncoding` returns `true` but `getEncodingTable` returns `null`.

### extendASCII(extensionTable)

Returns an array containing an encoding table of an [extended ASCII](http://en.wikipedia.org/wiki/Extended_ASCII) encoding.

The first 128 codes (0…127) are numbers from 0 thru 127.

The next 128 codes (128…255) are taken from `extensionTable` (that must have exactly 128 elements).

Then you may feed the returned array to `learnEncoding` as its second (`encodingTable`) parameter.

### bufToStr(buf, encoding, start, end)

Works almost like Node's [`buf.toString`](http://nodejs.org/docs/latest/api/buffer.html#buffer_buf_tostring_encoding_start_end), converting a Buffer to a string.

Takes the following parameters:

* `buf` is a source Buffer.

* `encoding` is either a Node's Buffer encoding or a previously defined single-byte encoding.

* `start` (optional, defaults to `0`) and `end` (optional, defaults to `buf.length`) define the starting byte and the ending byte of the source byte sequence in the given Buffer. The `end`th byte is not included; for example, `start == 0` and `end == 1` means that only one (0th) byte is decoded.

If a Buffer's encoding is given, `buf.toString` is called and its result is returned.

Otherwise, a string is built of Unicode characters (the codes of these characters are found for each single byte of the source according to the encoding table for the given `encoding`) and returned.

## Error processing

If an error is encountered, the module throws `new Error('…')` with one of the predefined strings (error descriptions). You may see these strings in the bottom of `singlebyte.js`.

## Testing singlebyte

[![(build testing status)](https://travis-ci.org/Mithgol/node-singlebyte.png?branch=master)](https://travis-ci.org/Mithgol/node-singlebyte)

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of `singlebyte`).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of `singlebyte`).

After that you may run `npm test` (in the directory of `singlebyte`) for testing.

## License

MIT License, see the `LICENSE` file.