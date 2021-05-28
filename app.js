const form = document.getElementById('loan-form');
// listen for submit
form.addEventListener('submit', function(e){
//  show loader
document.getElementById('loading').style.display = 'block';

setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {

  // Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  //  monthly payment
  const y = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*y*calculatedInterest)/ (y-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)- principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  }else{
    errorFunc( 'please check numbers' )
  }

 
}
// show error

function errorFunc(err){
  const errorDiv = document.createElement('div');
  const grid= document.querySelector('.d-grid');
  const button = document.querySelector('.btn');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(err));
  grid.insertBefore(errorDiv, button);

  // make error message disappear after 3s
  setTimeout( removeError, 3000);
}

function removeError(){
  document.querySelector('.alert').remove();
}