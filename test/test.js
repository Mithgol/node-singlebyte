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
   it('rejects extension tables of invalid size', function(){
      assert.throws(function(){
         sb.extendASCII([1, 2]);
      }, RegExp( sb.errors.INVALID_EXTENSION ));
   });
});

describe("Fallback to Node's Buffer", function(){
   it("understands 'ascii' encoding", function(){
      assert.equal(
         sb.bufToStr(new Buffer('Mithgol'), 'ascii'),
         'Mithgol'
      );
   });
   it("understands 'binary' encoding", function(){
      assert.equal(
         sb.bufToStr(new Buffer('Mithgol'), 'binary'),
         'Mithgol'
      );
   });
   it("understands 'hex' encoding", function(){
      assert.equal(
         sb.bufToStr(new Buffer('Mithgol'), 'hex'),
         '4d697468676f6c'
      );
   });
   it("understands 'base64' encoding", function(){
      assert.equal(
         sb.bufToStr(new Buffer('Mithgol'), 'base64'),
         'TWl0aGdvbA=='
      );
   });
});

describe("The module's abilities", function(){
   it('extends ASCII', function(){
      var i;
      var extension = [];
      for( i = 128; i < 256; i++ ){
         extension.push(i+3);
      }
      var extended = sb.extendASCII(extension);
      for( i = 0; i < 256; i++ ){
         assert.equal(
            extended[i],
            i + ((i >= 128) ? 3 : 0)
         );
      }
   });
});