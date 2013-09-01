/*global describe, it */
var assert = require('assert');
var sb = require('../');

describe('Error processing', function(){
   it('rejects non-buffer source', function(){
      assert.throws(function(){
         sb.bufToString('foo', 'bar');
      }, RegExp( sb.NOT_A_BUFFER ));
   });
   it('rejects unknown encodings', function(){
      assert.throws(function(){
         sb.bufToString(new Buffer([1, 2]), 'foo');
      }, RegExp( sb.INVALID_ENCODING ));
   });
});