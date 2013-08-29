MortgageCalculator = function(form, output){
  this._form = document.getElementById(form);
  this._output = document.getElementById(output);
  this.wireUp.call(this);
  if(!localStorage['inputs.price']){
    this.reset.call(this);
  }else{
    this.loadFromPersisted.call(this);
  }
};

MortgageCalculator.prototype = function(){ 
  
    var getSelectedValue = function(radios) {
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
    },

    setSelectedValue = function(radios, value) {
        for (var i = 0, length = radios.length; i < length; i++) {
            radios[i].checked = radios[i].value === value
        }
    },
    
    reset = function () {
        localStorage['inputs.price'] = 0;
        localStorage['inputs.interest'] = 4.5; 
        localStorage['inputs.additional'] = 0;
        localStorage['inputs.currentCost'] = 0;
        localStorage['inputs.downpayment'] = 20; 
        localStorage['inputs.tax'] = 0.022;
        localStorage['inputs.taxType'] = 'percent';
        localStorage['inputs.insurance'] = 0.0024;
        loadFromPersisted.call(this);
    },

    loadFromPersisted = function(){
      this._form.price.value = localStorage['inputs.price'];
      this._form.interest.value = localStorage['inputs.interest'];
      this._form.additional = localStorage['inputs.additional'];
      this._form.currentCost.value = localStorage['inputs.currentCost'];
      this._form.downpayment.value = localStorage['inputs.downpayment'];
      this._form.tax.value = localStorage['inputs.tax'];
      setSelectedValue(this._form.taxType,localStorage['inputs.taxType']);
      this._form.insurance.value = localStorage['inputs.insurance'];
    },

    currencyFormatted = function(amount) {
        var i = parseFloat(amount);
        if (isNaN(i)) { i = 0.00; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        s = new String(i);
        if (s.indexOf('.') < 0) { s += '.00'; }
        if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
        s = minus + '$' + s;
        return s;
    },
    
    setValue = function(id, value) {
        this._form[id].value = currencyFormatted(value);
    },
    
    valueChanged = function(element){
      localStorage['inputs.' + element.target.name] = element.target.value;
      calculatePayment.call(this);
    },

    calculatePayment = function() {
        var princ = this._form.price.value * ((100 - this._form.downpayment.value) / 100);
        var intRate = (this._form.interest.value / 100) / 12;
        var currentCost = this._form.currentCost.value == '' ? 0 : (this._form.currentCost.value * 1);
        var additionalCost = this._form.additional.value == '' ? 0 : (this._form.additional.value * 1);
        var months = 30 * 12;
        var monthlyPayment = Math.floor((princ * intRate) / (1 - Math.pow(1 + intRate, (-1 * months))) * 100) / 100;
        var taxPayment = (getSelectedValue(this._form.taxType) == 'percent' ? this._form.tax.value * this._form.price.value : this._form.tax.value) / 12;
        var insurancePayment = this._form.insurance.value * this._form.price.value / 12;
        var pitiPayment = monthlyPayment + taxPayment + insurancePayment;
        setValue.call(this,'mortgage-payment', monthlyPayment);
        setValue.call(this,'tax-payment', taxPayment);
        setValue.call(this,'insurance-payment', insurancePayment);
        setValue.call(this,'piti-payment', pitiPayment);
        setValue.call(this,'add-additional', pitiPayment + additionalCost);
        setValue.call(this,'extra-cost', pitiPayment + additionalCost - currentCost);
    },
      
    wireUp = function(){
      this._form.price.onblur = valueChanged.bind(this);
      this._form.downpayment.onblur = valueChanged.bind(this);
      this._form.interest.onblur = valueChanged.bind(this);
      this._form.tax.onblur = valueChanged.bind(this);
      this._form.taxType[0].onchange = valueChanged.bind(this);
      this._form.taxType[1].onchange = valueChanged.bind(this);
      this._form.insurance.onblur = valueChanged.bind(this);
      this._form.additional.onblur = valueChanged.bind(this);
      this._form.currentCost.onblur = valueChanged.bind(this);
      this._form.reset.onclick = reset.bind(this);
    };
    
    return {
      reset: reset,
      wireUp: wireUp,
      loadFromPersisted: loadFromPersisted,
      calculatePayment: calculatePayment
    };
}();