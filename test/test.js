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
   it('rejects encoding tables of invalid size', function(){
      assert.throws(function(){
         sb.learnEncoding('foo', [1, 2]);
      }, RegExp( sb.errors.INVALID_TABLE_LENGTH ));
   });
   it('rejects extension tables of invalid size', function(){
      assert.throws(function(){
         sb.extendASCII([1, 2]);
      }, RegExp( sb.errors.INVALID_EXTENSION ));
   });
   it('rejects encoding tables with elements above 0x10FFFF', function(){
      assert.throws(function(){
         var extension = [];
         for( var i = 128; i < 256; i++ ){
            extension.push(i+3);
         }
         extension[0] = 0xFFFFFF;
         sb.learnEncoding('foo', sb.extendASCII(extension));
      }, RegExp( sb.errors.OUT_OF_UNICODE ));
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
   it("understands 'base64' encoding and 'start' value", function(){
      assert.equal(
         sb.bufToStr(new Buffer('Mithgol'), 'base64', 3),
         'aGdvbA=='
      );
   });
   it("understands 'hex' encoding, 'start' and 'end' values", function(){
      assert.equal(
         sb.bufToStr(new Buffer('Mithgol'), 'hex', 0, 6),
         '4d697468676f'
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
   it("understands 'cp866' encoding", function(){
      assert.equal(
         sb.bufToStr(
            new Buffer([0x8C, 0xA8, 0xE6, 0xA3, 0xAE, 0xAB]), 'cp866'
         ),
         'Мицгол'
      );
   });
   it('correctly creates UTF-16 surrogate pairs', function(){
      var extension = [];
      for( var i = 128; i < 256; i++ ){
         extension.push(i+3);
      }
      extension[0] = 0x10401;
      sb.learnEncoding('surrogated', sb.extendASCII(extension));
      assert.equal(
         sb.bufToStr(
            new Buffer([0x12, 128]), 'surrogated'
         ),
         '\u0012\ud801\udc01'
      );
   });
});