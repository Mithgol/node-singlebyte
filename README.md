A **single-byte encoding** means that each byte corresponds to a character.

Node's [`Buffer`](http://nodejs.org/docs/latest/api/buffer.html) supports `'ascii'` and `'binary'`, but sometimes you need more single-byte encodings.

This module (`singlebyte`) provides such support for `'cp866'` ([code page 866](http://en.wikipedia.org/wiki/Code_page_866)).

This module can also be used to define more single-byte encodings.

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

You get an object that has the following methods:

### isEncoding(encodingName)

Returns `true` if the given encoding has been defined, `false` otherwise.

Works like Node.js Buffer's [`isEncoding`](http://nodejs.org/docs/latest/api/buffer.html#buffer_class_method_buffer_isencoding_encoding).

Node.js Buffer's encodings are known.

Additionally, `'cp866'` (for [code page 866](http://en.wikipedia.org/wiki/Code_page_866)) is defined in the module.

More encodings can be defined using `learnEncoding` method (see below).

### learnEncoding(encodingName, encodingTable)

Defines an encoding.

Expects `encodingName` to be a string and `encodingTable` to be an array of exactly 256 elements.

A single-byte encoding means that each byte correspongs to a character. The value of a byte is always in the `0…255` range, and `encodingTable[i]` defines the character that corresponds to the `i` value of that byte.

Each value of the `encodingTable` array is a number (a Unicode code of the corresponding character). If that code is outside of the `0…0x10FFFF` range, an error is thrown.

The encodings defined in Node.js Buffer cannot be redefined. (When such an attempt is made, an error is thrown.)

### getEncodingTable(encodingName)

Returns an array of 256 elements previously given as `encodingTable` for the encoding.

If an encoding was never defined with `learnEncoding`, returns `null`.

**Note:**   for the encodings defined in Node.js Buffer, `isEncoding` returns `true` but `getEncodingTable` returns `null`.

### extendASCII(extensionTable)

Returns an array containing an encoding table of an [extended ASCII](http://en.wikipedia.org/wiki/Extended_ASCII) encoding.

The first 128 codes (0…127) are numbers from 0 thru 127.

The next 128 codes (128…255) are taken from `extensionTable` (that must have exactly 128 elements).

Then you may feed the returned array to `learnEncoding` as its second (`encodingTable`) parameter.

For example, that's how `'cp866'` encoding is defined in the module's constructor:

```js
this.learnEncoding('cp866', this.extendASCII([
0x410,  0x411,  0x412,  0x413,  0x414,  0x415,  0x416,  0x417,
0x418,  0x419,  0x41A,  0x41B,  0x41C,  0x41D,  0x41E,  0x41F,
0x420,  0x421,  0x422,  0x423,  0x424,  0x425,  0x426,  0x427,
0x428,  0x429,  0x42A,  0x42B,  0x42C,  0x42D,  0x42E,  0x42F,
0x430,  0x431,  0x432,  0x433,  0x434,  0x435,  0x436,  0x437,
0x438,  0x439,  0x43A,  0x43B,  0x43C,  0x43D,  0x43E,  0x43F,
0x2591, 0x2592, 0x2593, 0x2502, 0x2524, 0x2561, 0x2562, 0x2556,
0x2555, 0x2563, 0x2551, 0x2557, 0x255D, 0x255C, 0x255B, 0x2510,
0x2514, 0x2534, 0x252C, 0x251C, 0x2500, 0x253C, 0x255E, 0x255F,
0x255A, 0x2554, 0x2569, 0x2566, 0x2560, 0x2550, 0x256C, 0x2567,
0x2568, 0x2564, 0x2565, 0x2559, 0x2558, 0x2552, 0x2553, 0x256B,
0x256A, 0x2518, 0x250C, 0x2588, 0x2584, 0x258C, 0x2590, 0x2580,
0x440,  0x441,  0x442,  0x443,  0x444,  0x445,  0x446,  0x447,
0x448,  0x449,  0x44A,  0x44B,  0x44C,  0x44D,  0x44E,  0x44F,
0x401,  0x451,  0x404,  0x454,  0x407,  0x457,  0x40E,  0x45E,
0xB0,   0x2219, 0xB7,   0x221A, 0x2116, 0xA4,   0x25A0, 0xA0
]));
```

### bufToStr(buf, encoding, start, end)

Works almost like Node's [`buf.toString`](http://nodejs.org/docs/latest/api/buffer.html#buffer_buf_tostring_encoding_start_end), converting a Buffer to a string.

Takes the following parameters:

* `buf` is a source Buffer.

* `encoding` is either a Node's Buffer encoding or a previously defined single-byte encoding.

* `start` (optional, defaults to `0`) and `end` (optional, defaults to `buf.length`) define the starting byte and the ending byte of the source byte sequence in the given Buffer. The `end`th byte is not included; for example, `start == 0` and `end == 1` means that only one (0th) byte is decoded.

If a Node.js Buffer's encoding is given, `buf.toString` is called and its result is returned.

Otherwise, a string is built of Unicode characters (the codes of these characters are found for each single byte of the source according to the encoding table for the given `encoding`) and returned.

**Note:**   if the encoding table contains a value in the `0x10000…0x10FFFF` range, the Unicode character for such a byte corresponds to a UTF-16 [surrogate pair](http://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B10000_to_U.2B10FFFF) and thus becomes **two** “characters” in the returned JavaScript string. (In JavaScript the “characters” of a string are actually UTF-16 hexadecets.)

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