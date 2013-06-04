window.onload = function () {
    setDefaults(document.forms['input-form']);
}
function setDefaults(form) {
    form.price.value = 0;
    form.downpayment.value = 20;
    form.interest.value = 3.4;
    form.tax.value = 0.022;
    setSelectedValue(form['tax-type'],'percent');
    form.insurance.value = 0.0024;
}

function getSelectedValue(radios) {
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}
function setSelectedValue(radios, value) {
    for (var i = 0, length = radios.length; i < length; i++) {
        radios[i].checked = radios[i].value === value
    }
}


function calculatePayment(form) {
    var princ = form.price.value * ((100 - form.downpayment.value) / 100);
    var intRate = (form.interest.value / 100) / 12;
    var months = 30 * 12;
    var monthlyPayment = Math.floor((princ * intRate) / (1 - Math.pow(1 + intRate, (-1 * months))) * 100) / 100;
    var taxPayment = (getSelectedValue(form['tax-type']) == 'percent' ? form.tax.value * form.price.value : form.tax.value) / 12;
    var insurancePayment = form.insurance.value * form.price.value / 12;
    var pitiPayment = monthlyPayment + taxPayment + insurancePayment;
    setValue('mortgage-payment', monthlyPayment);
    setValue('tax-payment', taxPayment);
    setValue('insurance-payment', insurancePayment);
    setValue('piti-payment', pitiPayment);
    setValue('add-utils-payment', pitiPayment + 150);
    setValue('extra-cost', pitiPayment + 150 - 1225);
}

function currencyFormatted(amount) {
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
}

function setValue(id, value) {
    document.getElementById(id).innerHTML = currencyFormatted(value);
}