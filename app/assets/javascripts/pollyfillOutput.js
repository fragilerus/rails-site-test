window.addEventListener("load", function(event){
    if(typeof HTMLOutputElemnet === 'undefined'){
      var outputs = document.getElementsByTagName('output');
      for(var i = 0; i < outputs.length; i++){
        var propDesc = {
          get: function(){
            return this.getAttribute('value');
          },
          set: function(a){
            this.setAttribute('value',a);
            this.innerHTML = a;
          }
        };
        Object.defineProperty(outputs[i],'value',propDesc);
      }
    }  
},false)
  