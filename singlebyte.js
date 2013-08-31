var singlebyte = function(){
   if(!( this instanceof singlebyte )){
      return new singlebyte();
   }
}

module.exports = singlebyte;