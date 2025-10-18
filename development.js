const transaction_form = document.getElementById('transactionForm');
const transaction_list = document.getElementById('transactionList');
const total_balance = document.getElementById('totalBalance');
const total_income = document.getElementById('totalIncome');
const total_expense = document.getElementById('totalExpense');
let all_transaction = [];
function updateBalance(){
     let income = 0;
     let expense = 0;
     let balance = 0;
     all_transaction.forEach((transaction) => {
          if(transaction.type === 'Income'){
               income += parseFloat(transaction.amount);
               balance += parseFloat(transaction.amount);
          }else {
               expense += parseFloat(transaction.amount);
               balance -= parseFloat(transaction.amount);
          }
     });
     total_balance.innerText = '$' + balance;
     total_income.innerText = '$' + income;
     total_expense.innerText = '$' + expense;
}
function deleteTransaction(event){
     const button = event.currentTarget;
     const transactionItem = button.closest('.transaction-item');
     const index = Array.from(transaction_list.children).indexOf(transactionItem);
     all_transaction.splice(index,1);
     updateBalance();
     transactionItem.remove();
}
function updateList(type,amount,date,category){
     const li = document.createElement('li');
     const iconElement = document.createElement('div');
     const detailsElement = document.createElement('div');
     const nameElement = document.createElement('div');
     const dateElement = document.createElement('div');
     const amountElement = document.createElement('div');
     const button = document.createElement('button');
     li.classList.add('transaction-item');
     iconElement.classList.add('transaction-icon');
     detailsElement.classList.add('transaction-details');
     nameElement.classList.add('transaction-name');
     dateElement.classList.add('transaction-date');
     amountElement.classList.add('transaction-amount');
     button.classList.add('transaction-delete');
     iconElement.innerText = type === 'Income' ? '↑' : '↓';
     iconElement.classList.add(type === 'Income' ? 'income' : 'expense');
     nameElement.innerText = category;
     dateElement.innerText = new Date(date).toLocaleDateString('en-US',{
          month: 'short',
          day: 'numeric',
          year: 'numeric',
     });
     amountElement.innerText = (type === 'Income' ? '+' : '-') + '$' + amount;
     amountElement.classList.add(type === 'Income' ? 'income' : 'expense');
     button.innerText = 'x';
     button.addEventListener('click',deleteTransaction);
     detailsElement.appendChild(nameElement);
     detailsElement.appendChild(dateElement);
     li.appendChild(iconElement);
     li.appendChild(detailsElement);
     li.appendChild(amountElement);
     li.appendChild(button);
     transaction_list.prepend(li);
}
transaction_form.addEventListener('submit',function(event){
     event.preventDefault();
     const type = event.target.type.value;
     const amount = event.target.amount.value;
     const date = event.target.date.value;
     const category = event.target.category.value;
     updateList(type,amount,date,category);
     all_transaction.unshift({type,amount,date,category});
     updateBalance();
     transaction_form.reset();
});