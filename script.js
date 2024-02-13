const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const unorderedList = document.getElementById('unordered-list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
form.addEventListener('submit',addTransaction);
function generateID(){
     return Math.floor(Math.random() * 10000000);
}
function updateLocalStorage(){
     localStorage.setItem('transactions',JSON.stringify(transactions));
}
function addTransactionDOM(transaction){
     const sign = transaction.amount < 0 ? '-' : '+';
     const list = document.createElement('li');
     list.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
     list.innerHTML = `
          ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
          <button class="delete-button" onclick="removeTransaction(${transaction.id})">x</button>
     `;
     unorderedList.appendChild(list);
}
function updateValues(){
     const amounts = transactions.map(transaction => transaction.amount);
     const total = amounts.reduce((accurate,item) => (accurate += item),0).toFixed(2);
     const income = amounts.filter(item => item > 0).reduce((accurate,item) => (accurate += item),0).toFixed(2);
     const expense = (amounts.filter(item => item < 0).reduce((accurate,item) => (accurate += item),0) * -1).toFixed(2);
     balance.innerText = `$${total}`;
     moneyPlus.innerText = `$${income}`;
     moneyMinus.innerText = `$${expense}`;
}
function addTransaction(event){
     event.preventDefault();
     if(text.value.trim() === '' || amount.value.trim() === ''){
          alert('Please Add a Text and Amount');
     }else{
          const transaction = {
               id: generateID(),
               text: text.value,
               amount: +amount.value,
          };
          transactions.push(transaction);
          addTransactionDOM(transaction);
          updateValues();
          updateLocalStorage();
          text.value = '';
          amount.value = '';
     }
}
function init(){
     unorderedList.innerHTML = "";
     transactions.forEach(addTransactionDOM);
     updateValues();
}
init();
function removeTransaction(id){
     transactions = transactions.filter(transaction => transaction.id !== id);
     updateLocalStorage();
     init();
}