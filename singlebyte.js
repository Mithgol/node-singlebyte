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

singlebyte.prototype.bufToString = function(buf, encoding){
   if(!( Buffer.isBuffer(buf) )){
      throw new Error(this.errors.NOT_A_BUFFER);
   }
   if(!( this.isEncoding(encoding) )){
      throw new Error(this.errors.INVALID_ENCODING);
   }
};

singlebyte.prototype.errors = {
   NOT_A_BUFFER : 'The given source is not a buffer!',
   INVALID_ENCODING: 'The given encoding is not supported!'
};

module.exports = singlebyte;