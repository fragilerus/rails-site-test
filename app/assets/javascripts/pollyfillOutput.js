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
      
      var forms = document.getElementsByTagName('form');
      for(var i = 0; i < forms.length; i++){
        var outputs = forms[i].getElementsByTagName('output');
        for(var j = 0; j < outputs.length; j++){
          if(outputs[j].hasAttribute('name'))
            forms[i][outputs[j].getAttribute('name')] = outputs[j];
        }
      }
    }  
},false)
  