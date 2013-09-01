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
   if( Buffer.isEncoding(encodingName) ){
      throw new Error(this.errors.BUFFER_ENCODING);
   } else if( this.isEncoding(encodingName) ){
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

singlebyte.prototype.bufToString = function(buf, encoding, start, end){
   if(!( Buffer.isBuffer(buf) )){
      throw new Error(this.errors.NOT_A_BUFFER);
   }
   if(!( this.isEncoding(encoding) )){
      throw new Error(this.errors.INVALID_ENCODING);
   }
   if( Buffer.isEncoding(encoding) ){
      return buf.toString(encoding, start, end);
   }
   if( typeof end   === 'undefined' ) end   = buf.length;
   if( typeof start === 'undefined' ) start = 0;
};

singlebyte.prototype.errors = {
   NOT_A_BUFFER : 'The given source is not a buffer!',
   INVALID_ENCODING : 'The given encoding is not supported!',
   BUFFER_ENCODING  : "Cannot redefine a Node's encoding!"
};

module.exports = singlebyte();