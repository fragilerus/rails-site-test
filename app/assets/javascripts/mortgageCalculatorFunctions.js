MortgageCalculator = function(form, output){
  this._form = document.getElementById(form);
  this._output = document.getElementById(output);
  this.wireUp.call(this);
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
        this._form.price.value = 0;
        this._form.downpayment.value = 20;
        this._form.interest.value = 3.4;
        this._form.tax.value = 0.022;
        setSelectedValue(this._form['tax-type'],'percent');
        this._form.insurance.value = 0.0024;
        this._form['current-cost'].value = 0;
        
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
        document.getElementById(id).innerHTML = currencyFormatted(value);
    },
    
    calculatePayment = function() {
        var princ = this._form.price.value * ((100 - this._form.downpayment.value) / 100);
        var intRate = (this._form.interest.value / 100) / 12;
        var currentCost = this._form['current-cost'].value == '' ? 0 : (this._form['current-cost'].value * 1);
        var months = 30 * 12;
        var monthlyPayment = Math.floor((princ * intRate) / (1 - Math.pow(1 + intRate, (-1 * months))) * 100) / 100;
        var taxPayment = (getSelectedValue(this._form['tax-type']) == 'percent' ? this._form.tax.value * this._form.price.value : this._form.tax.value) / 12;
        var insurancePayment = this._form.insurance.value * this._form.price.value / 12;
        var pitiPayment = monthlyPayment + taxPayment + insurancePayment;
        setValue('mortgage-payment', monthlyPayment);
        setValue('tax-payment', taxPayment);
        setValue('insurance-payment', insurancePayment);
        setValue('piti-payment', pitiPayment);
        setValue('add-utils-payment', pitiPayment + 150);
        setValue('extra-cost', pitiPayment + 150 - currentCost);
    },
      
    wireUp = function(){
      this._form.price.onblur = calculatePayment.bind(this);
      this._form.downpayment.onblur = calculatePayment.bind(this);
      this._form.interest.onblur = calculatePayment.bind(this);
      this._form.tax.onblur = calculatePayment.bind(this);
      this._form['tax-type'][0].onchange = calculatePayment.bind(this);
      this._form['tax-type'][1].onchange = calculatePayment.bind(this);
      this._form.insurance.onblur = calculatePayment.bind(this);
      this._form['current-cost'].onblur = calculatePayment.bind(this);
      this._form.reset.onclick = reset.bind(this);
    };
    
    return {
      reset: reset,
      wireUp: wireUp,
      calculatePayment: calculatePayment
    };
}();