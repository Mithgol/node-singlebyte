//var _ = require('underscore');

var singlebyte = function(){
   if(!( this instanceof singlebyte )){
      return new singlebyte();
   }

   this.encodings = [];
};

singlebyte.prototype.isEncoding = function(encodingName){
   if( Buffer.isEncoding(encodingName) ) return true;
   for( var i = 0; i < this.encodings.length; i++ ){
      if( this.encodings[i].name === encodingName ) return true;
   }
   return false;
};

singlebyte.prototype.learnEncoding = function(encodingName, encodingTable){
   /*jshint bitwise: false */
   if( Buffer.isEncoding(encodingName) ){
      throw new Error(this.errors.BUFFER_ENCODING);
   }

   if( encodingTable.length !== 256 ){
      throw new Error(this.errors.INVALID_TABLE_LENGTH);
   }
   for( var j = 0; j < encodingTable.length; j++ ){
      encodingTable[j] = encodingTable[j] |0;
   }

   if( this.isEncoding(encodingName) ){
      for( var i = 0; i < this.encodings.length; i++ ){
         if( this.encodings[i].name === encodingName ){
            this.encodings[i].table = encodingTable;
            return;
         }
      }
   } else {
      this.encodings.push({
         name:  encodingName,
         table: encodingTable
      });
   }
};

singlebyte.prototype.getEncodingTable = function(encodingName){
   for( var i = 0; i < this.encodings.length; i++ ){
      if( this.encodings[i].name === encodingName ){
         return this.encodings[i].table;
      }
   }
   return null;
};

singlebyte.prototype.bufToStr = function(buf, encoding, start, end){
   if(!( Buffer.isBuffer(buf) )){
      throw new Error(this.errors.NOT_A_BUFFER);
   }
   if( Buffer.isEncoding(encoding) ){
      return buf.toString(encoding, start, end);
   }
   var table = this.getEncodingTable(encoding);
   if( table === null ) throw new Error(this.errors.UNKNOWN_ENCODING);

   if( typeof end   === 'undefined' ) end   = buf.length;
   if( typeof start === 'undefined' ) start = 0;

   var output = '';
   for( var i = start; i < end; i++ ){
      output += String.fromCharCode(table[ buf[i] ]);
   }
   return output;
};

singlebyte.prototype.errors = {
   NOT_A_BUFFER : 'The given source is not a buffer!',
   UNKNOWN_ENCODING : 'The given encoding is not defined!',
   INVALID_TABLE_LENGTH: 'The encoding table must have 256 elements!',
   BUFFER_ENCODING  : "Cannot redefine a Node's encoding!"
};

module.exports = singlebyte();