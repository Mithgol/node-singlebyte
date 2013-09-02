/*global describe, it */
var assert = require('assert');
var sb = require('../');

describe('Error processing', function(){
   it('rejects non-buffer source', function(){
      assert.throws(function(){
         sb.bufToStr('foo', 'bar');
      }, RegExp( sb.errors.NOT_A_BUFFER ));
   });
   it('rejects unknown encodings', function(){
      assert.throws(function(){
         sb.bufToStr(new Buffer([1, 2]), 'foo');
      }, RegExp( sb.errors.UNKNOWN_ENCODING ));
   });
   it("rejects encodings defined for Node's Buffer", function(){
      assert.throws(function(){
         sb.learnEncoding('ascii', [1, 2]);
      }, RegExp( sb.errors.BUFFER_ENCODING ));
   });
   it('rejects tables of invalid size', function(){
      assert.throws(function(){
         sb.learnEncoding('foo', [1, 2]);
      }, RegExp( sb.errors.INVALID_TABLE_LENGTH ));
   });
});