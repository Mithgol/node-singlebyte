var singlebyte = function(){
   if(!( this instanceof singlebyte )){
      return new singlebyte();
   }

   this.encodings = [];

   // CP866
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

singlebyte.prototype.extendASCII = function(extensionTable){
   var i;
   var output = [];
   if( extensionTable.length !== 128 ){
      throw new Error(this.errors.INVALID_EXTENSION);
   }
   for( i = 0; i < 128; i++ ){
      output.push(i);
   }
   for( i = 0; i < extensionTable.length; i++ ){
      output.push( extensionTable[i] );
   }
   return output;
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
   INVALID_EXTENSION: 'The ASCII extension table must have 128 elements!',
   BUFFER_ENCODING  : "Cannot redefine a Node's encoding!"
};

module.exports = singlebyte();